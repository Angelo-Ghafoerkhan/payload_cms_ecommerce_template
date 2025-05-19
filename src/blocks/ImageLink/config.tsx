import { Block } from 'payload'
import { link } from '@/fields/link'

export const ImageLinkBlock: Block = {
  slug: 'imageLinkBlock',
  interfaceName: 'ImageLinkBlock',
  // imageURL: '/images/blocks/image-link-block.jpg',
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
}
