import type { CollectionConfig } from 'payload'

export const SubscriptionOrders: CollectionConfig = {
  slug: 'subscriptionOrders',
  labels: {
    singular: 'Order',
    plural: 'Orders',
  },
  admin: {
    group: 'Subscriptions',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true,
    },
    {
      name: 'subscription',
      type: 'relationship',
      relationTo: 'subscriptions',
      hasMany: false,
      required: true,
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
          name: 'amount',
          type: 'number',
          required: true,
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
          name: 'stripeSubscriptionId',
          type: 'text',
        },
        {
          name: 'transactionId',
          type: 'text',
        },
      ],
    },
  ],
}
