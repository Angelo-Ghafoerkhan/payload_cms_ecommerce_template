import { Block } from 'payload'

export const ReviewCard: Block = {
  slug: 'reviewCard',
  interfaceName: 'reviewCard',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      defaultValue: 5,
      admin: {
        description: 'Rating in stars (1 to 5)',
      },
    },
    {
      name: 'reviewText',
      type: 'textarea',
      required: true,
    },
  ],
}
