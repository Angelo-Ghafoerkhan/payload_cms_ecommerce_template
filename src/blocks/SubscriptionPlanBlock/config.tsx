import type { Block } from 'payload'

export const SubscriptionPlanBlock: Block = {
  slug: 'subscriptionPlanBlock',
  interfaceName: 'SubscriptionPlanBlock',
  fields: [
    {
      name: 'subscriptionPlan',
      type: 'relationship',
      relationTo: 'plans',
    },
  ],
}
