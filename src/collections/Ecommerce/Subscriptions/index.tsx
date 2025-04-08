import { ownerOrRelevant } from '@/access/ownerOrRelevant'
import type { CollectionConfig } from 'payload'

export const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  admin: {
    group: 'Subscriptions',
  },
  access: {
    read: ownerOrRelevant,
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
      name: 'plan',
      type: 'relationship',
      relationTo: 'plans', // Linking to the Plans collection
      hasMany: false,
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'stripeId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'pending', label: 'Pending' },
        { value: 'paused', label: 'Paused' },
        { value: 'cancelled', label: 'Cancelled' },
      ],
      required: true,
      defaultValue: 'active',
    },
    {
      name: 'orders',
      type: 'relationship',
      relationTo: 'subscriptionOrders',
      hasMany: true,
    },
  ],
}
