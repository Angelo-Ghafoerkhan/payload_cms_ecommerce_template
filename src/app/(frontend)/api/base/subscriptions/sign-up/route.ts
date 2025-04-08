import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import stripe from '@/lib/stripe'

/**
 * Helper to add months to a date.
 */
function addMonths(date: Date, months: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

export const POST = async (request: Request) => {
  const payload = await getPayload({ config })

  try {
    const body = await request.json()
    const { userId, planId } = body

    if (!userId || !planId) {
      return NextResponse.json({ message: 'User ID and Plan ID are required.' }, { status: 400 })
    }

    // Fetch the user record.
    const user = await payload.findByID({ collection: 'users', id: userId })
    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 })
    }

    // Ensure the user has a Stripe customer ID.
    if (!user.stripeCustomerId) {
      if (!user.email || !user.name) {
        return NextResponse.json({ message: 'User email and name are required.' }, { status: 400 })
      }

      const stripeCustomer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { payloadUserId: user.id },
      })

      // Update the user record with the new Stripe customer ID.
      await payload.update({
        collection: 'users',
        id: user.id,
        data: { stripeCustomerId: stripeCustomer.id },
        req: request,
      })

      user.stripeCustomerId = stripeCustomer.id
    }

    // Fetch the plan record.
    const plan = await payload.findByID({ collection: 'plans', id: planId })
    if (!plan) {
      return NextResponse.json({ message: 'Plan not found.' }, { status: 404 })
    }
    if (!plan.stripePriceId) {
      return NextResponse.json(
        { message: 'Plan does not have a valid Stripe Price ID.' },
        { status: 400 },
      )
    }

    // Calculate subscription dates.
    const startDate = new Date()
    let monthsToAdd = 0
    switch (plan.subscriptionTerm) {
      case 'monthly':
        monthsToAdd = 1
        break
      case 'quarterly':
        monthsToAdd = 3
        break
      case 'semi-annually':
        monthsToAdd = 6
        break
      case 'yearly':
        monthsToAdd = 12
        break
      default:
        monthsToAdd = 1
    }
    const endDate = addMonths(startDate, monthsToAdd)

    // Create a Payload subscription record with a "pending" status.
    const payloadSubscription = await payload.create({
      collection: 'subscriptions',
      data: {
        user: userId,
        plan: planId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status: 'pending',
      },
      req: request,
    })

    // Define success and cancel URLs.
    const success_url = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/account?tab=subscriptions&session_id={CHECKOUT_SESSION_ID}`
    const cancel_url = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/pricing`

    // Create the Stripe Checkout session in subscription mode.
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: user.stripeCustomerId,
      line_items: [{ price: plan.stripePriceId, quantity: 1 }],
      success_url,
      cancel_url,
      metadata: {
        payloadUserId: user.id,
        payloadPlanId: plan.id,
        websiteSubscriptionId: payloadSubscription.id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
      subscription_data: {
        metadata: {
          payloadUserId: user.id,
          payloadPlanId: plan.id,
          websiteSubscriptionId: payloadSubscription.id,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      },
    })

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (error: any) {
    console.error('Error creating subscription Checkout session:', error)
    return NextResponse.json(
      { message: 'Error creating subscription Checkout session', error: error.message },
      { status: 500 },
    )
  }
}
