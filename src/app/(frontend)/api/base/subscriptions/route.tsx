import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import stripe from '@/lib/stripe' // Assuming your Stripe initialization is in `lib/stripe.ts`

interface RequestBody {
  userId: number
  planId: number
  paymentMethodId: string
  subscriptionId: number
}

export const POST = async (req: Request) => {
  const payload = await getPayload({ config: payloadConfig })
  try {
    const { userId, planId, subscriptionId, paymentMethodId }: RequestBody = await req.json()

    // Fetch the user from Payload CMS
    const user = await payload.findByID({ collection: 'users', id: userId })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Fetch the selected plan from Payload CMS
    const plan = await payload.findByID({ collection: 'plans', id: planId })

    if (!plan) {
      return NextResponse.json({ message: 'Plan not found' }, { status: 404 })
    }

    // Create a Stripe customer if they don't have one
    const stripeCustomer = user.stripeCustomerId
      ? await stripe.customers.retrieve(user.stripeCustomerId)
      : await stripe.customers.create({
          email: user.email,
          payment_method: paymentMethodId,
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        })

    const { id: stripeCustomerId } = stripeCustomer

    // Create a Stripe subscription
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [
        {
          price: plan.stripePriceId as string, // Assuming plan has a `stripePriceId` field
        },
      ],
      default_payment_method: paymentMethodId,
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        type: 'subscription',
        subscription: subscriptionId,
        plan: planId,
        user: userId,
      },
    })

    // Optionally, store subscription details in Payload CMS
    const subscriptionData = await payload.create({
      collection: 'subscriptions',
      data: {
        user: userId,
        plan: planId,
        startDate: new Date().toISOString(),
        endDate: calculateEndDate(plan.billingCycle).toISOString(), // Calculate the end date based on the billing cycle
        status: 'active',
      },
    })

    return NextResponse.json({ subscription, subscriptionData }, { status: 200 })
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json({ message: 'Error creating subscription' }, { status: 500 })
  }
}

// Helper function to calculate the end date based on the billing cycle
const calculateEndDate = (billingCycle: string): Date => {
  const today = new Date()

  switch (billingCycle) {
    case 'daily':
      today.setDate(today.getDate() + 1) // Add 1 day
      break
    case 'week':
      today.setDate(today.getDate() + 7) // Add 1 week
      break
    case 'month':
      today.setMonth(today.getMonth() + 1) // Add 1 month
      break
    case 'year':
      today.setFullYear(today.getFullYear() + 1) // Add 1 year
      break
    default:
      throw new Error('Invalid billing cycle')
  }

  return today
}
