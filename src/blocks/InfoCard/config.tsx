import { Block } from 'payload'
import iconField from '@/fields/IconSelector/iconField'
import { animationField } from '@/fields/Animation/field'

export const InfoCardBlock: Block = {
  slug: 'infoCardBlock',
  interfaceName: 'InfoCardBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
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
        },
        {
          label: 'Animation',
          fields: [animationField],
        },
      ],
    },
  ],
}
