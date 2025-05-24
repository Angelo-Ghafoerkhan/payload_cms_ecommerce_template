import { animationField } from '@/fields/Animation/field'
import type { Block } from 'payload'

export const SubscriptionPlanBlock: Block = {
  slug: 'subscriptionPlanBlock',
  interfaceName: 'SubscriptionPlanBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'subscriptionPlan',
              type: 'relationship',
              relationTo: 'plans',
            },
          ],
        },
        {
          label: 'Animation',
          fields: [animationField],
        },
      ],
    },
  ],
}
