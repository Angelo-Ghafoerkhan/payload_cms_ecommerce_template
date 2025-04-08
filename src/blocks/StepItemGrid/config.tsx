import { Block } from 'payload'
import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const StepItemGridBlock: Block = {
  slug: 'stepItemGrid',
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
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
                AlignFeature(),
              ]
            },
          }),
          label: false,
        },
      ],
    },
  ],
}
