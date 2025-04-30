// lib/stripe.ts
import Stripe from 'stripe'

const apiVersion = '2025-02-24.acacia'
const secret = process.env.STRIPE_SECRET_KEY ?? ''

/**
 * True when a secret key is present.
 * You can use this to short-circuit routes:  if (!stripeEnabled) { … }
 */
export const stripeEnabled = Boolean(secret)

/**
 * The exported value is ALWAYS called `stripe`.
 *  • When `stripeEnabled` is true  → real Stripe SDK instance, plus .isConfigured = true
 *  • When false                    → minimal stub with .isConfigured = false
 */
const stripe = stripeEnabled
  ? Object.assign(new Stripe(secret, { apiVersion }), { isConfigured: true })
  : ({
      isConfigured: false,
      // Narrow mock — add more methods if your code touches them in dev.
      checkout: {
        sessions: {
          async create() {
            throw new Error(
              'Stripe is not configured – set STRIPE_SECRET_KEY to enable e-commerce.',
            )
          },
        },
      },
    } as const)

export default stripe as Stripe & { isConfigured: boolean }
