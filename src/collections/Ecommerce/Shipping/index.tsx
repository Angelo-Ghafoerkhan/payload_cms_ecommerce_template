import { admin } from '@/access/admin'
import stripe from '@/lib/stripe'
import type { CollectionConfig } from 'payload'

export const Shipping: CollectionConfig = {
  slug: 'shipping',
  labels: {
    singular: 'Shipping Rate',
    plural: 'Shipping Rates',
  },
  admin: {
    group: 'Ecommerce',
  },
  access: {
    read: () => true,
    create: admin,
    update: admin,
    delete: admin,
  },
  hooks: {
    // BeforeChange: Create or update the shipping rate in Stripe.
    beforeChange: [
      async ({ data, operation }) => {
        const { id, name, shippingDescription, cost, deliveryEstimate } = data
        // Use the plain text shippingDescription for Stripe.
        const desc = shippingDescription?.trim() || ''
        const estimate = deliveryEstimate?.trim() || ''

        if (operation === 'create') {
          // Create a new shipping rate in Stripe.
          const shippingRate = await stripe.shippingRates.create({
            display_name: name,
            type: 'fixed_amount',
            fixed_amount: {
              amount: Math.round(cost * 100),
              currency: 'gbp',
            },
            // Include metadata for reference.
            metadata: {
              payloadShippingId: id,
              description: desc,
              deliveryEstimate: estimate,
            },
          })

          return {
            ...data,
            shippingRateId: shippingRate.id,
          }
        } else if (operation === 'update') {
          // If a shippingRateId exists, retrieve the existing shipping rate.
          if (data.shippingRateId) {
            let shippingRate
            try {
              shippingRate = await stripe.shippingRates.retrieve(data.shippingRateId)
            } catch (error) {
              shippingRate = undefined
            }

            // Compare the stored values with current data.
            const currentAmount = shippingRate ? shippingRate.fixed_amount?.amount : null
            const currentDesc = shippingRate?.metadata?.description
            const currentEstimate = shippingRate?.metadata?.deliveryEstimate

            // If nothing has changed, no new shipping rate is needed.
            if (
              shippingRate &&
              currentAmount === Math.round(cost * 100) &&
              currentDesc === desc &&
              currentEstimate === estimate
            ) {
              return data
            } else {
              // Create a new shipping rate when cost, description, or delivery estimate has changed.
              const newShippingRate = await stripe.shippingRates.create({
                display_name: name,
                type: 'fixed_amount',
                fixed_amount: {
                  amount: Math.round(cost * 100),
                  currency: 'gbp',
                },
                metadata: {
                  payloadShippingId: id,
                  description: desc,
                  deliveryEstimate: estimate,
                },
              })

              return {
                ...data,
                shippingRateId: newShippingRate.id,
              }
            }
          }
          return data
        }
        return data
      },
    ],
    // AfterChange: As an extra safeguard, check for updates and create a new shipping rate if necessary.
    afterChange: [
      async ({ doc, operation, previousDoc }) => {
        if (operation === 'update' && previousDoc) {
          const { shippingRateId, cost, deliveryEstimate, name } = doc
          if (
            previousDoc.cost !== cost ||
            previousDoc.deliveryEstimate !== deliveryEstimate ||
            previousDoc.name !== name
          ) {
            // Create a new shipping rate if any key field has changed.
            const newShippingRate = await stripe.shippingRates.create({
              display_name: name,
              type: 'fixed_amount',
              fixed_amount: {
                amount: Math.round(cost * 100),
                currency: 'gbp',
              },
              metadata: {
                payloadShippingId: doc.id,
                // Optionally, include updated shippingDescription if needed.
              },
            })
            return { ...doc, shippingRateId: newShippingRate.id }
          }
        }
        return doc
      },
    ],
    // BeforeDelete: Stripe does not support deletion of shipping rates.
    // Optionally, you could update metadata to mark it as deleted, but here we simply do nothing.
    beforeDelete: [
      async () => {
        return
      },
    ],
  },
  fields: [
    {
      name: 'name',
      label: 'Shipping Option Name',
      type: 'text',
      required: true,
    },
    {
      name: 'shippingDescription',
      label: 'Stripe Shipping Description',
      type: 'textarea',
      admin: {
        description:
          'This plain-text description will be sent to Stripe for shipping rate details.',
      },
      required: true,
    },
    {
      name: 'cost',
      label: 'Shipping Cost',
      type: 'number',
      required: true,
    },
    {
      name: 'deliveryEstimate',
      label: 'Delivery Estimate',
      type: 'text',
      required: false,
      admin: {
        description: 'Estimated delivery time, e.g. "3-5 days"',
      },
    },
    {
      name: 'shippingRateId',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
