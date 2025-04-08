import { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'galleries',
  admin: {
    useAsTitle: 'name',
    group: 'Website',
  },
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      label: 'Gallery Description',
      type: 'textarea',
      required: true,
    },

    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
  ],
}
