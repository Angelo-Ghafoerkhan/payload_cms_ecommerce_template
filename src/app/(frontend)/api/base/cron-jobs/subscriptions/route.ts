import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import stripe from '@/lib/stripe'

// Your Bearer token (set in your environment, e.g., SUBSCRIPTIONS_CRON_BEARER_TOKEN)
const BEARER_TOKEN = process.env.SUBSCRIPTIONS_CRON_BEARER_TOKEN

export const dynamic = 'force-dynamic'

// Helper function to format a date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0] ?? ''
}

export const POST = async (request: Request) => {
  // Guard the route with a Bearer token.
  const authHeader = request.headers.get('authorization')
  if (
    !authHeader ||
    !authHeader.startsWith('Bearer ') ||
    authHeader.split(' ')[1] !== BEARER_TOKEN
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Initialize Payload
  const payloadInstance = await getPayload({ config })

  // Get today's date (ignoring time).
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = formatDate(today)

  try {
    // Fetch all active subscriptions.
    // Adjust limit as necessary.
    const result = await payloadInstance.find({
      collection: 'subscriptions',
      where: { status: { equals: 'active' } },
      limit: 1000,
    })

    let canceledCount = 0

    // Loop through subscriptions and check if their endDate (date part only) equals today.
    for (const sub of result.docs) {
      if (sub.endDate) {
        const subEndDate = new Date(sub.endDate)
        const subEndDateStr = formatDate(subEndDate)
        if (subEndDateStr === todayStr) {
          // Cancel the subscription in Stripe if there's a stripeId.
          if (sub.stripeId) {
            try {
              await stripe.subscriptions.cancel(sub.stripeId)
            } catch (err) {
              console.error(`Error canceling Stripe subscription ${sub.stripeId}:`, err)
            }
          }
          // Update the Payload subscription record to mark it as "cancelled".
          try {
            await payloadInstance.update({
              collection: 'subscriptions',
              id: sub.id,
              data: { status: 'cancelled' },
            })
            canceledCount++
          } catch (updateError: any) {
            console.error(`Error updating Payload subscription ${sub.id}:`, updateError)
          }
        }
      }
    }

    return NextResponse.json(
      { message: 'Cron job completed', canceled: canceledCount },
      { status: 200 },
    )
  } catch (error: any) {
    console.error('Error processing subscriptions cron job:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
