import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { editor } from '@/Footer/config'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Website',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // Menu
        {
          label: 'Menu',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              fields: [
                {
                  name: 'itemType',
                  type: 'select',
                  options: [
                    { label: 'Standard', value: 'standard' },
                    { label: 'Dropdown', value: 'dropdown' },
                    { label: 'Mega', value: 'mega' },
                  ],
                },
                // if type is standard
                {
                  ...link({
                    appearances: false,
                    condition: (data, siblingData) => siblingData.itemType === 'standard',
                  }),
                },
                // if type is dropdown
                {
                  name: 'dropdown',
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => siblingData.itemType === 'dropdown',
                  },
                  fields: [
                    link({
                      appearances: false,
                    }),
                    {
                      name: 'children',
                      type: 'array',
                      fields: [
                        link({
                          appearances: false,
                        }),
                      ],
                    },
                  ],
                },
                // if type is mega
                {
                  name: 'mega',
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => siblingData.itemType === 'mega',
                  },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                    },
                    {
                      name: 'children',
                      type: 'array',
                      fields: [
                        {
                          name: 'type',
                          type: 'select',
                          options: [
                            { label: 'Standard', value: 'standard' },
                            { label: 'Group', value: 'group' },
                          ],
                        },
                        // if mega type is standard
                        {
                          name: 'standard',
                          type: 'group',
                          admin: {
                            condition: (data, siblingData) => siblingData.type === 'standard',
                          },
                          fields: [
                            {
                              name: 'image',
                              type: 'upload',
                              relationTo: 'media',
                            },
                            link({
                              appearances: false,
                            }),
                            {
                              name: 'text',
                              type: 'textarea',
                            },
                          ],
                        },
                        // if mega type is group
                        {
                          name: 'group',
                          type: 'group',
                          admin: {
                            condition: (data, siblingData) => siblingData.type === 'group',
                          },
                          fields: [
                            {
                              name: 'image',
                              type: 'upload',
                              relationTo: 'media',
                            },
                            link({
                              appearances: false,
                            }),
                            {
                              name: 'children',
                              type: 'array',
                              fields: [
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
              ],
              maxRows: 6,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Header/RowLabel#RowLabel',
                },
              },
            },
          ],
        },
        {
          label: 'Notifications Bar',
          name: 'notificationsBar',
          fields: [
            {
              name: 'enable',
              type: 'checkbox',
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'text',
              type: 'richText',
              label: 'Notifications Bar Text',
              editor: editor,
              admin: {
                condition: (data, siblingData) => siblingData?.enable,
                description: 'This text will be displayed in the center of the notifications bar.',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      label: 'Settings',
      name: 'settings',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'header',
          type: 'group',
          fields: [
            {
              name: 'sticky',
              type: 'checkbox',
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'hideOnScrollDown',
              type: 'checkbox',
              admin: {
                position: 'sidebar',
                condition: (data, siblingData) => siblingData.sticky,
              },
            },
          ],
        },
        {
          name: 'showPhone',
          type: 'checkbox',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'showEmail',
          type: 'checkbox',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'showSocials',
          type: 'checkbox',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'showCart',
          type: 'checkbox',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'showUser',
          type: 'checkbox',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'showSearch',
          type: 'checkbox',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'showCTA',
          label: 'Show Call To Action',
          type: 'checkbox',
        },
        {
          name: 'callToAction',
          type: 'group',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            condition: (data, siblingData) => siblingData.showCTA,
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
