import { admin } from '@/access/admin'
import stripe from '@/lib/stripe'
import {
  BoldFeature,
  FixedToolbarFeature,
  HTMLConverterFeature,
  InlineToolbarFeature,
  lexicalEditor,
  lexicalHTML,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Plans: CollectionConfig = {
  slug: 'plans',
  admin: {
    group: 'Subscriptions',
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: admin,
    delete: admin,
    update: admin,
  },
  hooks: {
    // BeforeChange: Create or update the Stripe product and price.
    beforeChange: [
      async ({ data, operation, originalDoc, req }) => {
        const { id, name, stripeDescription, price, billingCycle } = data
        // Use the plain text stripeDescription for Stripe.
        const stripeDesc = stripeDescription?.trim() || ''

        if (operation === 'create') {
          // Create a new product in Stripe.
          const product = await stripe.products.create({
            name,
            description: stripeDesc || undefined,
            metadata: { payloadPlanId: id },
          })

          // Create a price for the product.
          const recurringPrice = await stripe.prices.create({
            product: product.id,
            unit_amount: Math.round(price * 100),
            currency: 'gbp',
            recurring: { interval: billingCycle },
          })

          // Return updated data with new Stripe IDs.
          return { ...data, stripePriceId: recurringPrice.id, productId: product.id }
        } else if (operation === 'update') {
          // If the price or billingCycle has changed, create a new Stripe price.
          if (
            originalDoc &&
            (originalDoc.price !== price || originalDoc.billingCycle !== billingCycle)
          ) {
            // Create a new Stripe price.
            const newPrice = await stripe.prices.create({
              product: data.productId || originalDoc.productId,
              unit_amount: Math.round(price * 100),
              currency: 'gbp',
              recurring: { interval: billingCycle },
            })

            // Optionally, update subscriptions to use the new price.
            // (This is an asynchronous side-effect; if needed, you can trigger this separately.)
            try {
              const subscriptions = await stripe.subscriptions.list({
                price: originalDoc.stripePriceId,
                expand: ['data.items'],
              })
              for (const subscription of subscriptions.data) {
                await stripe.subscriptions.update(subscription.id, {
                  items: [
                    {
                      id: subscription.items.data[0]?.id ?? '',
                      price: newPrice.id,
                    },
                  ],
                })
              }
              // Deactivate the old price.
              await stripe.prices.update(originalDoc.stripePriceId, { active: false })
            } catch (err) {
              console.error('Error updating subscriptions:', err)
            }

            // Return updated data with the new Stripe price ID.
            return { ...data, stripePriceId: newPrice.id }
          }
          // Also, handle status changes.
          if (originalDoc && originalDoc.status !== data.status) {
            if (data.status === 'inactive' && originalDoc.stripePriceId) {
              await stripe.prices.update(originalDoc.stripePriceId, { active: false })
            } else if (data.status === 'active') {
              // If reactivating and the current price is inactive, create a new price.
              const currentPrice = await stripe.prices.retrieve(originalDoc.stripePriceId)
              if (!currentPrice.active) {
                const newPrice = await stripe.prices.create({
                  product: data.productId || originalDoc.productId,
                  unit_amount: Math.round(price * 100),
                  currency: 'gbp',
                  recurring: { interval: billingCycle },
                })
                try {
                  const subscriptions = await stripe.subscriptions.list({
                    price: originalDoc.stripePriceId,
                    expand: ['data.items'],
                  })
                  for (const subscription of subscriptions.data) {
                    await stripe.subscriptions.update(subscription.id, {
                      items: [
                        {
                          id: subscription.items.data[0]?.id ?? '',
                          price: newPrice.id,
                        },
                      ],
                    })
                  }
                } catch (err) {
                  console.error('Error updating subscriptions:', err)
                }
                return { ...data, stripePriceId: newPrice.id }
              }
            }
          }
          // If nothing changed that requires a new price, just return the data.
          return data
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      label: 'Plan Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: [
          ParagraphFeature(),
          BoldFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HTMLConverterFeature(),
        ],
      }),
    },
    lexicalHTML('description', { name: 'description_html' }),
    {
      name: 'stripeDescription',
      label: 'Stripe Description',
      type: 'textarea',
      admin: {
        description: 'This plain-text description will be sent to Stripe for product details.',
      },
      required: true,
    },
    // Field to store the Stripe product ID.
    {
      name: 'productId',
      type: 'text',
      required: false,
      admin: { readOnly: true },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'stripePriceId',
          type: 'text',
          required: false,
          admin: { readOnly: true },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'billingCycle',
          type: 'select',
          options: [
            { value: 'day', label: 'Daily' },
            { value: 'week', label: 'Weekly' },
            { value: 'month', label: 'Monthly' },
            { value: 'year', label: 'Yearly' },
          ],
          admin: { description: 'How often payment is taken for the subscription.' },
          required: true,
        },
        {
          name: 'subscriptionTerm',
          type: 'select',
          options: [
            { value: 'monthly', label: 'Monthly' },
            { value: 'quarterly', label: 'Quarterly' },
            { value: 'semi-annually', label: 'Semi-Annually' },
            { value: 'yearly', label: 'Yearly' },
          ],
          admin: { description: 'The length of the subscription: 1, 3, 6 or 12 months.' },
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
