import { NextResponse } from 'next/server'
import stripe from '@/lib/stripe' // Your initialized Stripe instance
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { updateProductStock } from '@/collections/Ecommerce/Carts/utils/cartFunctions'
import sendOrderEmail from '@/emails/sendOrderEmail'

// Decode cartSummary from metadata.
function decodeCartSummary(cartSummaryRaw: string) {
  if (!cartSummaryRaw) return []
  return cartSummaryRaw
    .split(',')
    .map((itemStr: string) => {
      // Expected format: "productId:variantxquantity_linePrice"
      const parts = itemStr.split('_')
      if (parts.length !== 2) return null
      const [itemPart, linePricePart] = parts
      const itemParts = itemPart?.split('x')
      if (itemParts?.length !== 2) return null
      const [prodVariantPart, quantityStr] = itemParts
      const variantParts = prodVariantPart?.split(':')
      if ((variantParts ?? []).length < 1) return null
      const product = (variantParts ?? [])[0]
      const productVariant = variantParts?.[1] ?? ''
      const quantity = parseInt(quantityStr as string, 10)
      const linePrice = parseFloat(linePricePart as string)
      if (isNaN(quantity) || isNaN(linePrice)) return null
      return {
        product: parseInt(product as string, 10),
        productVariant,
        quantity,
        linePrice,
      }
    })
    .filter((item) => item !== null)
}

export const dynamic = 'force-dynamic'

// Your webhook secret key.
const endpointSecret: string = process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET as string

export const POST = async (request: Request) => {
  const payloadInstance = await getPayload({ config })
  const signature = (await headers()).get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })
  }
  let event: Stripe.Event
  let rawBody: Buffer
  try {
    const arrayBuffer = await request.arrayBuffer()
    rawBody = Buffer.from(arrayBuffer)
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret)
  } catch (err: any) {
    console.error('Error verifying Stripe webhook:', err)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const stripeSubscriptionId = session.subscription as string | null

      if (stripeSubscriptionId) {
        // Subscription flow – initial subscription payment.
        const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)
        const websiteSubscriptionId = subscription.metadata?.websiteSubscriptionId

        if (websiteSubscriptionId) {
          try {
            await payloadInstance.update({
              collection: 'subscriptions',
              id: websiteSubscriptionId,
              data: {
                stripeId: stripeSubscriptionId,
                status: 'active',
              },
            })
          } catch (error: any) {
            console.error('Error updating subscription record:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
          }
          try {
            const customerEmail = session.customer_details?.email || session.customer_email
            if (customerEmail) {
              await sendOrderEmail(customerEmail, 'subscription')
            }
          } catch (emailError: any) {
            console.error('Error sending subscription email:', emailError)
          }
        }
        return NextResponse.json(
          { message: 'Subscription processed successfully.' },
          { status: 200 },
        )
      } else {
        // One-time payment flow.
        const sessionAny = session as any
        const userIdRaw = sessionAny.metadata?.userId
        const orderRef = sessionAny.metadata?.orderRef // if you're using an orderRef
        const cartSummaryRaw = sessionAny.metadata?.cartSummary || ''

        const lineItems = decodeCartSummary(cartSummaryRaw)
        const address = session.collected_information?.shipping_details?.address

        const orderData: any = {
          paymentStatus: 'paid',
          total: session.amount_total ? session.amount_total / 100 : 0,
          paymentMethod: 'creditCard',
          paymentDate: new Date(session.created * 1000).toISOString(),
          orderRef,
          invoice: {
            // Initially leave invoice details empty.
            url: '',
            stripeId: session.id,
            transactionId: '',
          },
          address: {
            line1: address?.line1,
            line2: address?.line2,
            city: address?.city,
            postCode: address?.postal_code,
          },
          lineItems,
        }

        if (userIdRaw && !isNaN(parseInt(userIdRaw))) {
          orderData.user = parseInt(userIdRaw)
        } else {
          orderData.email = session.customer_email || sessionAny.customer_details?.email || ''
        }

        try {
          // Create the order record.
          const productOrder = await payloadInstance.create({
            collection: 'orders',
            data: orderData,
          })

          // Now, if a PaymentIntent exists, retrieve it and update the order with invoice details.
          if (session.payment_intent) {
            const paymentIntent = await stripe.paymentIntents.retrieve(
              session.payment_intent as string,
            )
            const charges = await stripe.charges.list({
              payment_intent: session.payment_intent as string,
            })
            const charge = charges.data[0]
            const receiptUrl = charge?.receipt_url || ''
            const transactionId = charge?.id || ''
            // Update the order record with these details.
            await payloadInstance.update({
              collection: 'orders',
              id: productOrder.id,
              data: {
                invoice: {
                  url: receiptUrl,
                  stripeId: session.id,
                  transactionId,
                },
              },
            })
          }

          // Optionally update product stock.
          if (lineItems && Array.isArray(lineItems)) {
            for (const item of lineItems) {
              await updateProductStock(
                payloadInstance,
                item.product,
                item.quantity,
                item.productVariant,
              )
            }
          }

          try {
            const customerEmail = session.customer_email || sessionAny.customer_details?.email || ''
            if (customerEmail) {
              await sendOrderEmail(customerEmail, 'order')
            }
          } catch (emailError: any) {}
          return NextResponse.json({ productOrder }, { status: 200 })
        } catch (error: any) {
          console.error('Error creating order:', error)
          return NextResponse.json({ error: error.message }, { status: 500 })
        }
      }
    }

    case 'invoice.payment_succeeded': {
      // This branch handles recurring invoices (subscription payments).
      const invoice = event.data.object as Stripe.Invoice
      const stripeSubscriptionId = invoice.subscription as string | null
      if (stripeSubscriptionId) {
        const billingReason = invoice.billing_reason // e.g., "subscription_create" or "subscription_cycle"
        if (billingReason === 'subscription_cycle' || billingReason === 'subscription_create') {
          // Retrieve the subscription to get our custom metadata.
          const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)
          // Assume metadata contains the Payload subscription document ID.
          const websiteSubscriptionId = subscription.metadata?.websiteSubscriptionId
          // Also assume metadata includes payloadUserId.
          const payloadUserId = subscription.metadata?.payloadUserId
          if (websiteSubscriptionId && payloadUserId) {
            try {
              // Create a new subscription order record for this recurring invoice.
              const newSubOrder = await payloadInstance.create({
                collection: 'subscriptionOrders',
                data: {
                  // Convert IDs from metadata as needed.
                  user: parseInt(payloadUserId as string),
                  subscription: parseInt(websiteSubscriptionId as string),
                  paymentStatus: 'paid',
                  amount: invoice.amount_paid / 100,
                  paymentMethod: 'creditCard',
                  paymentDate: new Date(invoice.created * 1000).toISOString(),
                  invoice: {
                    url: invoice.hosted_invoice_url,
                    stripeId: invoice.id,
                    stripeSubscriptionId,
                    transactionId: invoice.payment_intent as string,
                  },
                },
              })
              console.log(
                `Created recurring subscription order with ID ${newSubOrder.id} for subscription ${websiteSubscriptionId}`,
              )

              // Now update the parent subscription record to include this order.
              // First, retrieve the existing subscription document from Payload.
              const subDoc = await payloadInstance.findByID({
                collection: 'subscriptions',
                id: websiteSubscriptionId,
              })
              const existingOrders = Array.isArray(subDoc.orders) ? subDoc.orders : []
              const updatedOrders = [...existingOrders, newSubOrder.id]
              await payloadInstance.update({
                collection: 'subscriptions',
                id: websiteSubscriptionId,
                data: { orders: updatedOrders },
              })
            } catch (updateError: any) {
              return NextResponse.json({ error: updateError.message }, { status: 500 })
            }
          } else {
            console.warn('Missing websiteSubscriptionId or payloadUserId in subscription metadata.')
          }
        } else {
          console.log(
            'Billing reason is not subscription_cycle/subscription_create; skipping recurring update.',
          )
        }
        return NextResponse.json(
          { message: 'Recurring invoice processed successfully.' },
          { status: 200 },
        )
      } else {
        console.warn('Recurring invoice received without a subscription ID.')
        return NextResponse.json(
          { message: 'No subscription ID in recurring invoice.' },
          { status: 400 },
        )
      }
    }

    case 'invoice.payment_failed': {
      const failedInvoice = event.data.object as Stripe.Invoice
      const stripeSubscriptionId = failedInvoice.subscription as string | null

      if (stripeSubscriptionId) {
        const failedSubscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)
        const userId = failedSubscription.metadata.user
        const subscriptionId = failedSubscription.metadata.subscription
        try {
          const failedOrder = await payloadInstance.create({
            collection: 'subscriptionOrders',
            data: {
              user: parseInt(userId as string),
              subscription: parseInt(subscriptionId as string),
              paymentStatus: 'failed',
              amount: failedInvoice.amount_paid / 100,
              paymentMethod: 'creditCard',
              paymentDate: new Date(failedInvoice.created * 1000).toISOString(),
              invoice: {
                url: failedInvoice.hosted_invoice_url,
                stripeId: failedInvoice.id,
                stripeSubscriptionId,
                transactionId: failedInvoice.payment_intent as string,
              },
            },
          })
          return NextResponse.json({ failedOrder }, { status: 200 })
        } catch (error: any) {
          console.error('Error creating failed subscription order:', error)
          return NextResponse.json({ error: error.message }, { status: 500 })
        }
      } else {
        const failedInvoiceAny = failedInvoice as any
        const userIdRaw = failedInvoiceAny.metadata?.userId
        const orderData: any = {
          paymentStatus: 'failed',
          total: failedInvoice.amount_paid / 100,
          paymentMethod: 'creditCard',
          paymentDate: new Date(failedInvoice.created * 1000).toISOString(),
          invoice: {
            url: failedInvoice.hosted_invoice_url,
            stripeId: failedInvoice.id,
            transactionId: failedInvoice.payment_intent as string,
          },
        }
        if (userIdRaw && !isNaN(parseInt(userIdRaw))) {
          orderData.user = parseInt(userIdRaw)
        } else {
          orderData.email =
            failedInvoice.customer_email || failedInvoiceAny.customer_details?.email || ''
        }
        try {
          const failedProductOrder = await payloadInstance.create({
            collection: 'orders',
            data: orderData,
          })
          return NextResponse.json({ failedProductOrder }, { status: 200 })
        } catch (error: any) {
          console.error('Error creating failed order:', error)
          return NextResponse.json({ error: error.message }, { status: 500 })
        }
      }
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
      break
  }

  return NextResponse.json({ message: 'Event processed' }, { status: 200 })
}
