import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { anyone } from '@/access/anyone'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'productType', 'price', 'stock'],
    group: 'Ecommerce',
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Product Name',
              required: true,
            },
            {
              name: 'productType',
              type: 'select',
              label: 'Product Type',
              options: [
                {
                  label: 'Standard',
                  value: 'standard',
                },
                {
                  label: 'Variable',
                  value: 'variable',
                },
              ],
              defaultValue: 'standard',
              required: true,
            },
            ...slugField('name'),
            {
              name: 'url',
              type: 'text',
              admin: {
                readOnly: true,
                position: 'sidebar',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'primaryCategory',
                  label: {
                    singular: 'Primary Category',
                    plural: 'Primary Categories',
                  },
                  type: 'relationship',
                  relationTo: 'product-categories',
                  required: true,
                  admin: {
                    position: 'sidebar',
                  },
                },
                {
                  name: 'categories',
                  label: {
                    singular: 'Other Categories',
                    plural: 'Other Categories',
                  },
                  type: 'relationship',
                  relationTo: 'product-categories',
                  admin: {
                    position: 'sidebar',
                  },
                  hasMany: true,
                },
              ],
            },

            {
              name: 'introDescription',
              type: 'textarea',
              required: false,
              admin: {
                description:
                  'This is the small product description, this will be used on category pages and below the "Add to Cart" button.',
              },
            },

            {
              name: 'description',
              type: 'richText',
              required: true,
              admin: {
                description:
                  'This is the main product description, this will be below the product.',
              },
            },

            // Standard product fields: only visible when productType is standard
            {
              name: 'price',
              type: 'number',
              label: 'Price (£)',
              required: true,
              admin: {
                step: 0.01,
                condition: (data) => data?.productType === 'standard',
              },
            },
            {
              name: 'stock',
              type: 'number',
              label: 'Stock',
              required: true,
              admin: {
                condition: (data) => data?.productType === 'standard',
              },
            },
            {
              name: 'images',
              type: 'upload',
              relationTo: 'product-images',
              label: 'Product Images',
              hasMany: true,
              admin: {
                condition: (data) => data?.productType === 'standard',
              },
            },
            // Variable product fields: only visible when productType is variable
            {
              name: 'variants',
              type: 'array',
              label: 'Variants',
              admin: {
                condition: (data) => data?.productType === 'variable',
                components: {
                  RowLabel: '@/collections/Ecommerce/Products/RowLabel#RowLabel',
                },
              },
              fields: [
                {
                  name: 'variantName',
                  type: 'text',
                  label: 'Variant Name',
                  required: true,
                },
                {
                  name: 'sku',
                  type: 'text',
                  label: 'SKU',
                  required: true,
                },
                {
                  name: 'price',
                  type: 'number',
                  label: 'Variant Price (£)',
                  required: true,
                  admin: {
                    step: 0.01,
                  },
                },
                {
                  name: 'stock',
                  type: 'number',
                  label: 'Variant Stock',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'product-images',
                  label: 'Variant Image',
                  required: false,
                },
              ],
            },
          ],
        },
        {
          name: 'specifications',
          label: 'Specifications',
          fields: [
            {
              name: 'specs',
              label: 'Specifications',
              type: 'array', // This makes it an array field
              fields: [
                {
                  name: 'label',
                  label: 'Label',
                  type: 'text', // You can allow users to enter any key
                  required: true,
                },
                {
                  name: 'value',
                  label: 'Value',
                  type: 'text', // You can allow users to enter any value
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'product-images',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // If the product has a primaryCategory and a slug, build the URL.
        if (data.primaryCategory && data.slug) {
          // Look up the primary category using the Payload API.
          const category = await req.payload.findByID({
            collection: 'product-categories',
            id: data.primaryCategory,
          })
          // If the category has a URL, combine it with the product slug.
          if (category && category.url) {
            data.url = `${category.url}/${data.slug}`
          }
        }
        return data
      },
    ],
  },
}
