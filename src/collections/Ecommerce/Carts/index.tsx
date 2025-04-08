import type { CollectionConfig } from 'payload'

export const Carts: CollectionConfig = {
  slug: 'carts',
  admin: {
    group: 'Ecommerce',
    // hidden: true,
  },
  access: {
    delete: () => true,
  },
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'users',
      unique: true,
      hasMany: false,
      required: true,
    },
    {
      name: 'lineItems',
      type: 'array',
      label: 'Line Items',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'productVariant',
          type: 'text',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
        },
        {
          name: 'linePrice',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      admin: {
        description: 'Total cost of the cart',
      },
    },
    {
      name: 'discountCode',
      type: 'text',
      required: false,
    },
  ],
}
