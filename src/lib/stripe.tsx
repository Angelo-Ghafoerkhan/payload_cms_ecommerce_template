import stripePackage from 'stripe'

// Initialize Stripe with your secret key
const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
})

export default stripe
