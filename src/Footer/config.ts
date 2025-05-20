import type { GlobalConfig, TextFieldSingleValidation } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import {
  FixedToolbarFeature,
  lexicalEditor,
  LinkFeature,
  LinkFields,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'

export const editor = lexicalEditor({
  features: [
    FixedToolbarFeature(),
    ParagraphFeature(),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
  ],
})

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  admin: {
    group: {
      title: 'Website',
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Main Footer',
          fields: [
            {
              name: 'columns',
              type: 'array',
              minRows: 2,
              maxRows: 4,
              fields: [
                {
                  name: 'columnType',
                  type: 'select',
                  options: [
                    {
                      label: 'Rows',
                      value: 'rows',
                    },
                    {
                      label: 'Logo',
                      value: 'logo',
                    },
                    {
                      label: 'Menu',
                      value: 'menu',
                    },
                    {
                      label: 'Call To Action',
                      value: 'cta',
                    },
                  ],
                },
                // If columnType is rows
                {
                  name: 'rows',
                  type: 'array',
                  minRows: 1,
                  maxRows: 3,
                  admin: {
                    condition: (data, siblingData) => siblingData.columnType === 'rows',
                  },
                  fields: [
                    {
                      name: 'rowType',
                      type: 'select',
                      options: [
                        {
                          label: 'Text',
                          value: 'text',
                        },
                        {
                          label: 'Logo',
                          value: 'Logo',
                        },
                        {
                          label: 'Location',
                          value: 'location',
                        },
                      ],
                    },
                    {
                      name: 'text',
                      type: 'richText',
                      editor,
                      admin: {
                        condition: (data, siblingData) => siblingData.rowType === 'text',
                      },
                    },
                  ],
                },
                // If columnType is menu
                {
                  name: 'menuType',
                  type: 'select',
                  options: [
                    { label: 'Custom', value: 'custom' },
                    { label: 'Contact', value: 'contact' },
                  ],
                  admin: {
                    condition: (data, siblingData) => siblingData.columnType === 'menu',
                  },
                },
                // if column type is menu and menu type is custom
                {
                  name: 'menuTitle',
                  type: 'text',
                  required: true,
                  admin: {
                    condition: (data, siblingData) =>
                      siblingData.columnType === 'menu' && siblingData.menuType === 'custom',
                  },
                },
                {
                  name: 'navItems',
                  type: 'array',
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                  maxRows: 6,
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/Footer/RowLabel#RowLabel',
                    },
                    condition: (data, siblingData) =>
                      siblingData.columnType === 'menu' && siblingData.menuType === 'custom',
                  },
                },
                // If columnType is cta
                {
                  name: 'cta',
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => siblingData.columnType === 'cta',
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'text',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'button',
                      type: 'group',
                      fields: [
                        {
                          name: 'text',
                          type: 'text',
                          required: true,
                        },
                        link({
                          appearances: false,
                        }),
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Footer Meta (Bottom)',
          name: 'footerMeta',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'left',
                  type: 'richText',
                  editor: editor,
                },
                {
                  name: 'right',
                  type: 'richText',
                  editor: editor,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
