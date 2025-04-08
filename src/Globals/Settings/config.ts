import type { GlobalConfig } from 'payload'
import { revalidateSettings } from './hooks/revalidateSettings'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Admin',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'businessAddress',
              type: 'textarea',
              label: 'Address',
            },
          ],
        },
        {
          label: 'Branding',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'logoLight',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                  label: 'Logo (Light Variation)',
                  admin: {
                    description: 'This is the logo that will be used on dark backgrounds.',
                  },
                },
                {
                  name: 'logoDark',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                  label: 'Logo (Dark Variation)',
                  admin: {
                    description: 'This is the logo that will be used on light backgrounds.',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logoWidth',
                  type: 'number',
                  min: 1,
                  max: 1000,
                  required: false,
                  label: 'Logo Width',
                },
                {
                  name: 'logoHeight',
                  type: 'number',
                  min: 1,
                  max: 1000,
                  required: false,
                  label: 'Logo Height',
                },
              ],
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'email',
                  type: 'text',
                  required: false,
                  label: 'Contact Email',
                },
                {
                  name: 'phoneNumber',
                  type: 'text',
                  required: false,
                  label: 'Contact Phone Number',
                },
              ],
            },
          ],
        },
        {
          label: 'Socials',
          fields: [
            {
              name: 'socials',
              type: 'group',
              fields: [
                {
                  name: 'facebook',
                  type: 'text',
                  required: false,
                  label: 'Facebook Page Link',
                  admin: {
                    description: 'Just your username is required',
                  },
                },
                {
                  name: 'instagram',
                  type: 'text',
                  required: false,
                  label: 'Instagram Page Link',
                  admin: {
                    description: 'Just your username is required',
                  },
                },
                {
                  name: 'whatsapp',
                  type: 'text',
                  required: false,
                  label: 'WhatsApp Number',
                  admin: {
                    description: 'Just your number is required',
                  },
                },
                {
                  name: 'twitter',
                  type: 'text',
                  required: false,
                  label: 'Twitter Page Link',
                  admin: {
                    description: 'Just your username is required',
                  },
                },
                {
                  name: 'tiktok',
                  type: 'text',
                  required: false,
                  label: 'TikTok Page Link',
                  admin: {
                    description: 'Just your username is required',
                  },
                },
                {
                  name: 'linkedin',
                  type: 'text',
                  required: false,
                  label: 'LinkedIn Page Link',
                  admin: {
                    description: 'Just your username is required',
                  },
                },
                {
                  name: 'pinterest',
                  type: 'text',
                  required: false,
                  label: 'Pinterest Page Link',
                  admin: {
                    description: 'Just your username is required',
                  },
                },
                {
                  name: 'youtube',
                  type: 'text',
                  required: false,
                  label: 'YouTube Channel Link',
                  admin: {
                    description: 'Just your username is required',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Tracking',
          fields: [
            {
              name: 'googleAnalytics',
              type: 'text',
              label: 'Google Analytics ID',
            },
            {
              name: 'googleTag',
              type: 'text',
              label: 'Google Tag ID',
            },
            {
              name: 'facebookPixel',
              type: 'text',
              label: 'Facebook Pixel',
            },
          ],
        },
        {
          label: 'Ecommerce',
          fields: [
            {
              name: 'enableEcommerce',
              type: 'checkbox',
            },
            {
              name: 'allowAccountCreation',
              type: 'checkbox',
              admin: {
                description: 'Allow customers to create an account (defaults to customer role)',
              },
            },
            {
              name: 'cartStyle',
              type: 'select',
              options: [
                { label: 'Popup', value: 'popup' },
                { label: 'Page', value: 'page' },
              ],
              required: false,
              defaultValue: 'page',
            },
          ],
        },
        {
          label: 'Maintenance',
          fields: [
            {
              name: 'enableMaintenanceMode',
              type: 'checkbox',
            },
            {
              name: 'maintenancePassword',
              type: 'text',
              required: true,
              admin: {
                condition: (data, siblingData) => siblingData.enableMaintenanceMode,
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSettings],
  },
}
