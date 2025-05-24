import { Block } from 'payload'
import { link } from '@/fields/link'
import { animationField } from '@/fields/Animation/field'

export const ImageLinkBlock: Block = {
  slug: 'imageLinkBlock',
  interfaceName: 'ImageLinkBlock',
  // imageURL: '/images/blocks/image-link-block.jpg',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'text',
              type: 'richText',
              required: true,
            },
            link({ disableIcon: true, disableLabel: true }),
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
