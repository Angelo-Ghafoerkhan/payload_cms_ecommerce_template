import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const StaffImageSpielBlock: Block = {
  slug: 'staffImageSpielBlock',
  interfaceName: 'staffImageSpielBlock',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'jobTitle',
      type: 'text',
      required: true,
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      hasMany: false,
    },
    {
      name: 'spiel',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features({ defaultFeatures, rootFeatures }) {
          return defaultFeatures
        },
      }),
    },
  ],
}
