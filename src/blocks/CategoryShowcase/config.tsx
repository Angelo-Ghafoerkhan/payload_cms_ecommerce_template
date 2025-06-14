import { animationField } from '@/fields/Animation/field'
import { Block } from 'payload'

export const CategoryShowcase: Block = {
  slug: 'categoryShowcase',
  interfaceName: 'categoryShowcase',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'product-categories',
              required: true,
              hasMany: false,
            },
            {
              name: 'limit',
              type: 'number',
              defaultValue: 4,
              admin: {
                description: 'Number of products to display in this category',
                width: '50%',
              },
            },
            {
              name: 'showTitle',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show the category title above the products',
                width: '50%',
              },
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
