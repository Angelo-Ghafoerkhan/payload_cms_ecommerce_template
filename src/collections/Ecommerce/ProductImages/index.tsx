import { CollectionConfig } from 'payload'

export const ProductImages: CollectionConfig = {
  slug: 'product-images',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Ecommerce',
  },
  upload: true,
  fields: [
    {
      name: 'text',
      type: 'text',
    },
  ],
}
