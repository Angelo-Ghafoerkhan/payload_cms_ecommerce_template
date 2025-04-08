import type { CollectionConfig } from 'payload'
import stripe from '@/lib/stripe' // your initialized Stripe instance

export const Discounts: CollectionConfig = {
  slug: 'discounts',
  admin: {
    defaultColumns: ['code', 'amount'],
    useAsTitle: 'code',
    group: 'Ecommerce',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, originalDoc }) => {
        const { id, code, amount } = data

        // Ensure that code is provided
        if (!code) {
          throw new Error('Discount code is required.')
        }

        if (operation === 'create') {
          // Create a new coupon in Stripe for a new discount.
          const coupon = await stripe.coupons.create({
            percent_off: amount,
            duration: 'forever',
            metadata: {
              payloadDiscountId: id,
              code,
            },
          })

          return {
            ...data,
            stripeCouponId: coupon.id,
          }
        } else if (operation === 'update') {
          // Since Stripe coupons cannot be updated,
          // create a new coupon if the code or amount has changed.
          if (originalDoc && (originalDoc.code !== code || originalDoc.amount !== amount)) {
            const newCoupon = await stripe.coupons.create({
              percent_off: amount,
              duration: 'forever',
              metadata: {
                payloadDiscountId: id,
                code,
              },
            })

            return {
              ...data,
              stripeCouponId: newCoupon.id,
            }
          }
        }
        return data
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        const doc = await req.payload.findByID({
          collection: 'discounts',
          id,
        })

        if (doc?.stripeCouponId) {
          try {
            // Delete the coupon from Stripe.
            await stripe.coupons.del(doc.stripeCouponId)
          } catch (error) {
            console.error('Error deleting coupon from Stripe:', error)
            // Optionally, decide if this should block deletion.
            throw new Error('Failed to delete associated Stripe coupon. Please try again later.')
          }
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      admin: {
        description: 'Percentage off (e.g. 10 for 10% discount)',
      },
    },
    {
      name: 'stripeCouponId',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
        description: 'The corresponding Stripe Coupon ID',
      },
    },
  ],
}
