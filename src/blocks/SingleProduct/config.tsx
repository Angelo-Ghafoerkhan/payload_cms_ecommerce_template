import { Block } from 'payload'

export const SingleProduct: Block = {
  slug: 'singleProduct',
  interfaceName: 'singleProduct',
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      hasMany: false,
    },
  ],
}
