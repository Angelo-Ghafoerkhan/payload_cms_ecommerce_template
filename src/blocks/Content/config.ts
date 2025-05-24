import type { Block, Field } from 'payload'

import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { SingleBlockOptions } from '../BlockOptions'
import { ContactSectionBlock } from '../ContactSection/config'
import { FormBlock } from '../Form/config'
import GoogleMapBlock from '../GoogleMap/config'
import { ImageLinkBlock } from '../ImageLink/config'
import { ImageWithTextOverlayBlock } from '../ImageWithOverlayText/config'
import { InfoCardBlock } from '../InfoCard/config'
import { StaffImageSpielBlock } from '../StaffImageSpielBlock/config'
import { SubscriptionPlanBlock } from '../SubscriptionPlanBlock/config'
import { MediaBlock } from '../MediaBlock/config'
import { animationField } from '@/fields/Animation/field'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },

  {
    name: 'contentType',
    type: 'select',
    options: [
      {
        label: 'Text',
        value: 'text',
      },
      {
        label: 'Block',
        value: 'block',
      },
    ],
    defaultValue: 'text',
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          BlocksFeature({
            blocks: SingleBlockOptions.filter(
              (block): block is Block =>
                'fields' in block && 'slug' in block && block.slug !== 'contactSection',
            ),
          }),
          AlignFeature(),
        ]
      },
    }),
    label: false,
    admin: {
      condition: (_, siblingData) => {
        return siblingData?.contentType === 'text'
      },
    },
  },
  {
    name: 'block',
    type: 'blocks',
    blocks: [
      ContactSectionBlock,
      FormBlock,
      GoogleMapBlock,
      ImageLinkBlock,
      ImageWithTextOverlayBlock,
      InfoCardBlock,
      MediaBlock,
      StaffImageSpielBlock,
      SubscriptionPlanBlock,
    ],
    admin: {
      condition: (_, siblingData) => {
        return siblingData?.contentType === 'block'
      },
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'columns',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: columnFields,
            },
          ],
        },
        {
          label: 'Animation',
          fields: [animationField],
        },
      ],
    },
  ],
}
