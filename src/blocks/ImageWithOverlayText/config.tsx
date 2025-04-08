import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const ImageWithTextOverlayBlock: Block = {
  slug: 'imageWithTextOverlayBlock',
  interfaceName: 'ImageWithTextOverlayBlock',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'text',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            OrderedListFeature(),
            UnorderedListFeature(),
            AlignFeature(),
          ]
        },
      }),
    },
    {
      name: 'callToAction',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: false,
        },
        {
          name: 'link',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
}
