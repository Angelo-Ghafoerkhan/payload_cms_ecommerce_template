import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    group: 'Ecommerce',
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.slug) {
          data.url = `categories/${data.slug}`
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
    {
      name: 'url',
      type: 'text',
      admin: {
        readOnly: true, // Optional: make the field read-only in the admin panel
        position: 'sidebar',
      },
    },
  ],
}
