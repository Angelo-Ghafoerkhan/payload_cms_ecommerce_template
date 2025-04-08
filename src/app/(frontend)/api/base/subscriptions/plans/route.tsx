import { NextResponse } from 'next/server'
import stripe from '@/lib/stripe' // Assuming this is where you initialize Stripe
import { Plan } from '@/payload-types'
import removeHTMLTags from '@/utilities/removeHTMLTags'

export const POST = async (req: Request) => {
  try {
    const { name, description_html, price, billingCycle }: Plan = await req.json()

    // Create a new product in Stripe if no productId is provided
    const product = await stripe.products.create({
      name,
      description: removeHTMLTags(description_html as string),
    })

    // Create a price in Stripe based on the billing cycle and subscription term
    const recurringPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: price * 100, // Convert price to the smallest currency unit (e.g., cents)
      currency: 'usd',
      recurring: {
        interval: billingCycle, // This determines how often the customer is billed (monthly, quarterly, etc.)
      },
    })

    // Return the product and price details
    return NextResponse.json({ product, price: recurringPrice }, { status: 200 })
  } catch (error) {
    console.error('Error creating plan:', error)
    return NextResponse.json({ message: 'Error creating plan' }, { status: 500 })
  }
}

// PATCH route for updating an existing plan
export const PATCH = async (req: Request) => {
  try {
    const { name, description_html, price, billingCycle, id }: Plan = await req.json()

    // Ensure that a productId is provided for updating an existing plan
    if (!id) {
      return NextResponse.json(
        { message: 'Product ID is required to update a plan.' },
        { status: 400 },
      )
    }

    // Update the existing product in Stripe
    const existingProduct = await stripe.products.update(id.toString(), {
      name,
      description: removeHTMLTags(description_html as string),
    })

    // Update the price for the existing product (create a new price)
    const recurringPrice = await stripe.prices.create({
      product: existingProduct.id,
      unit_amount: price * 100, // Convert price to the smallest currency unit (e.g., cents)
      currency: 'usd',
      recurring: {
        interval: billingCycle, // This determines how often the customer is billed (monthly, quarterly, etc.)
      },
    })

    // Return the updated product and price details
    return NextResponse.json({ product: existingProduct, price: recurringPrice }, { status: 200 })
  } catch (error) {
    console.error('Error updating plan:', error)
    return NextResponse.json({ message: 'Error updating plan' }, { status: 500 })
  }
}
