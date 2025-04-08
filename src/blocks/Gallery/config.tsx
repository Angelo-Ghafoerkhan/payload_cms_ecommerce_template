import { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'gallery',
      relationTo: 'galleries',
      type: 'relationship',
      required: true,
    },
  ],
}
