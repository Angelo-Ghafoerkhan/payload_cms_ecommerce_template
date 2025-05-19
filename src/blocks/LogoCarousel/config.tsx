import { animationField } from '@/fields/Animation/field'
import { Block } from 'payload'

export const LogoCarouselBlock: Block = {
  slug: 'logoCarouselBlock',
  interfaceName: 'LogoCarousel',
  // imageURL: '/images/blocks/image-link-block.jpg',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'alignTitle',
                  type: 'select',
                  options: [
                    { label: 'Left', value: 'left' },
                    { label: 'Center', value: 'center' },
                    { label: 'Right', value: 'right' },
                  ],
                  admin: {
                    condition: (data) => data.title !== '',
                  },
                },
              ],
            },

            {
              name: 'duration',
              type: 'number',
              defaultValue: 40,
            },
            {
              name: 'pauseOnHover',
              type: 'checkbox',
              defaultValue: 'true',
            },
            {
              name: 'images',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              required: true,
              minRows: 3,
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
