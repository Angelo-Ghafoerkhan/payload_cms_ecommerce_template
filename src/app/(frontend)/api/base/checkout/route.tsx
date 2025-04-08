import type { NextRequest } from 'next/server'
import Stripe from 'stripe'
import stripeInstance from '@/lib/stripe' // your initialized Stripe instance
import { v4 as uuidv4 } from 'uuid'

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { cartItems, discountCode, user } = body

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return new Response(JSON.stringify({ error: 'No cart items provided.' }), { status: 400 })
    }

    // Recalculate line items using the latest product data.
    const recalculatedLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    for (const item of cartItems) {
      const productId =
        typeof item.productId === 'number'
          ? item.productId
          : typeof item.product === 'object'
            ? item.product.id
            : item.product

      if (!productId || isNaN(Number(productId))) {
        throw new Error(`Invalid product ID: ${productId}`)
      }

      const productRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}?depth=2`,
        { cache: 'no-store' },
      )
      if (!productRes.ok) {
        throw new Error(`Failed to fetch product ${item.productId}`)
      }
      const productData = await productRes.json()

      if (productData.productType === 'variable') {
        // For variable products, find the correct variant based on an identifier (e.g. SKU).
        const variant = productData.variants?.find((v: any) => v.sku === item.productVariant)
        if (!variant) {
          throw new Error(
            `Variant not found for product ${item.productId} with identifier ${item.productVariant}`,
          )
        }
        recalculatedLineItems.push({
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `${productData.name} - ${variant.variantName}`,
              images:
                variant.image &&
                typeof variant.image.url === 'string' &&
                variant.image.url.startsWith('http')
                  ? [variant.image.url]
                  : (productData.images || [])
                      .map((img: any) => img.url)
                      .filter((url: string) => typeof url === 'string' && url.startsWith('http')),
            },
            unit_amount: Math.round(variant.price * 100),
          },
          quantity: item.quantity,
        })
      } else {
        // Standard product.
        recalculatedLineItems.push({
          price_data: {
            currency: 'gbp',
            product_data: {
              name: productData.name,
              images: (productData.images || [])
                .map((img: any) => img.url)
                .filter((url: string) => typeof url === 'string' && url.startsWith('http')),
            },
            unit_amount: Math.round(productData.price * 100),
          },
          quantity: item.quantity,
        })
      }
    }

    // Fetch shipping rates from your Payload shipping collection.
    const shippingRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/shipping?depth=1&draft=false`,
      { cache: 'no-store' },
    )
    let shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] = []
    if (shippingRes.ok) {
      const shippingData = await shippingRes.json()
      if (shippingData.docs && Array.isArray(shippingData.docs)) {
        shippingOptions = shippingData.docs.map((rate: any) => ({
          shipping_rate: rate.shippingRateId,
        }))
      }
    } else {
      console.warn(
        'Failed to fetch shipping rates; checkout will proceed without shipping options.',
      )
    }

    const orderRef = uuidv4()

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      invoice_creation: {
        enabled: true,
      },
      line_items: recalculatedLineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA'],
      },
      shipping_options: shippingOptions,
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/account?tab=orders&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
      metadata: {
        userId: user?.id || 'guest',
        // Save a light summary (for debugging or later order association)
        cartSummary: cartItems
          .map(
            (item: any) =>
              `${typeof item.product === 'object' ? item.product.id : item.product}:${
                item.productVariant || 'default'
              }x${item.quantity}_${item.linePrice}`,
          )
          .join(','),
        orderRef,
      },
    }

    // If a discount code was passed, fetch the corresponding discount from Payload.
    if (discountCode) {
      const discountRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/discounts?where[code][equals]=${discountCode}&limit=1`,
        { cache: 'no-store' },
      )
      if (discountRes.ok) {
        const discountData = await discountRes.json()
        if (discountData.docs && discountData.docs.length > 0) {
          const discount = discountData.docs[0]
          if (discount.stripeCouponId) {
            sessionParams.discounts = [
              {
                coupon: discount.stripeCouponId,
              },
            ]
          }
        }
      } else {
        console.warn(`Failed to fetch discount for code: ${discountCode}`)
      }
    }

    // Attach the Stripe customer if available.
    if (user?.stripeCustomerId) {
      sessionParams.customer = user.stripeCustomerId
    }

    const session = await stripeInstance.checkout.sessions.create(sessionParams)

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
