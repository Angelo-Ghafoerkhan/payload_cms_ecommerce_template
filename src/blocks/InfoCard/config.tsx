import { Block } from 'payload'
import iconField from '@/fields/IconSelector/iconField'

export const InfoCardBlock: Block = {
  slug: 'infoCardBlock',
  interfaceName: 'InfoCardBlock',
  fields: [
    iconField(),
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'text',
      type: 'richText',
    },
  ],
}
