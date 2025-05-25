import { animationField } from '@/fields/Animation/field'
import { link } from '@/fields/link'
import { Block } from 'payload'

export const ImageOverlayCTA: Block = {
  slug: 'imageOverlayCTA',
  interfaceName: 'ImageOverlayCTA',
  labels: {
    plural: 'Image Overlay CTA',
    singular: 'Image Overlay CTA',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'overlay',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'text',
                  type: 'textarea',
                  required: false,
                },
              ],
            },
            link(),
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
