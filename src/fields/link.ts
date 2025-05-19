import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import iconField from './IconSelector/iconField'

export type LinkAppearances = 'default' | 'secondary' | 'dark' | 'outline'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  secondary: {
    label: 'Secondary',
    value: 'secondary',
  },
  dark: {
    label: 'Dark',
    value: 'dark',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  disableIcon?: boolean
  overrides?: Partial<GroupField>
  condition?: (data: Partial<any>, siblingData: Partial<any>) => boolean
}) => Field

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  disableIcon = false,
  overrides = {},
  condition,
} = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
      condition,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages', 'posts', 'product-categories', 'products'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    const appearanceOptionsToUse =
      appearances === undefined
        ? Object.values(appearanceOptions) // all four
        : appearances.map((a) => appearanceOptions[a])

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })

    if (!disableIcon) {
      linkResult.fields.push({
        name: 'showIcon',
        type: 'checkbox',
        label: 'Show an icon in the button',
      })
      linkResult.fields.push(iconField({ condition: (data, siblingData) => siblingData.showIcon }))
    }
  }

  return deepMerge(linkResult, overrides)
}
