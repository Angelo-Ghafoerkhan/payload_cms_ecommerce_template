import { ownerOrRelevant } from '@/access/ownerOrRelevant'
import type { CollectionConfig } from 'payload'
import sendTrackingEmail from '@/emails/sendTrackingEmail'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    group: 'Ecommerce',
  },
  access: {
    read: ownerOrRelevant,
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        if (operation !== 'update') return

        const oldUrl = previousDoc?.shipping?.trackingUrl
        const newUrl = doc.shipping?.trackingUrl

        if (oldUrl !== newUrl && newUrl) {
          const userEmail = doc.user?.email || doc.email

          if (userEmail) {
            await sendTrackingEmail(userEmail, newUrl, doc.orderRef)
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      required: false,
    },
    {
      name: 'email',
      type: 'email',
      required: false,
    },
    {
      name: 'lineItems',
      type: 'array',
      label: 'Line Items',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
              required: true,
            },
            {
              name: 'productVariant',
              type: 'text',
            },
            {
              name: 'quantity',
              type: 'number',
              required: true,
            },
            {
              name: 'linePrice',
              type: 'number',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'paymentStatus',
          type: 'select',
          options: [
            { value: 'paid', label: 'Paid' },
            { value: 'pending', label: 'Pending' },
            { value: 'failed', label: 'Failed' },
          ],
          required: true,
        },
        {
          name: 'total',
          type: 'number',
          required: true,
          admin: {
            description: 'Total cost of the order',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'paymentMethod',
          type: 'select',
          options: [
            { value: 'creditCard', label: 'Credit Card' },
            { value: 'paypal', label: 'PayPal' },
            { value: 'bankTransfer', label: 'Bank Transfer' },
          ],
          required: true,
        },
        {
          name: 'paymentDate',
          type: 'date',
        },
      ],
    },

    {
      name: 'invoice',
      type: 'group',
      fields: [
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'stripeId',
          type: 'text',
        },
        {
          name: 'transactionId',
          type: 'text',
        },
      ],
    },
    {
      name: 'orderRef',
      type: 'text',
    },
    {
      name: 'address',
      label: 'Shipping Address',
      type: 'group',
      fields: [
        {
          name: 'line1',
          type: 'text',
        },
        {
          name: 'line2',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'postCode',
          type: 'text',
        },
      ],
    },
    {
      name: 'discounts',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'discountCode',
              type: 'text',
            },
            {
              name: 'discountAmount',
              type: 'number',
            },
          ],
        },
      ],
    },
    {
      name: 'shipping',
      type: 'group',
      fields: [
        {
          name: 'trackingUrl',
          type: 'text',
        },
      ],
    },
  ],
}
