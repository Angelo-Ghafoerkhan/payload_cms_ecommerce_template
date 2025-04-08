import { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: '',
  fields: [
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      required: true,
    },
  ],
}
