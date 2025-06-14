import { animationField } from '@/fields/Animation/field'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { SingleBlockOptions } from '../BlockOptions'
import { link } from '@/fields/link'

export const ImageWithTextBlock: Block = {
  slug: 'imageWithTextBlock',
  interfaceName: 'ImageWithTextBlock',
  imageURL: '/images/blocks/image-with-text-block.jpg',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'meta',
              type: 'group',
              admin: {
                position: 'sidebar',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'removeTitle',
                      type: 'checkbox',
                    },
                    {
                      name: 'flipImage',
                      type: 'checkbox',
                    },
                    {
                      name: 'primaryBackgroundColor',
                      type: 'checkbox',
                    },
                    {
                      name: 'containImage',
                      type: 'checkbox',
                    },
                  ],
                },
              ],
            },
            {
              name: 'title',
              type: 'text',
              admin: {
                condition: (data, siblingData) => !siblingData.meta.removeTitle,
              },
              required: true,
            },
            {
              name: 'images',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              minRows: 1,
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
                    BlocksFeature({
                      blocks: SingleBlockOptions.filter(
                        (block): block is Block =>
                          'fields' in block && 'slug' in block && block.slug !== 'contactSection',
                      ),
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    OrderedListFeature(),
                    UnorderedListFeature(),
                  ]
                },
              }),
            },
            {
              name: 'callToAction',
              type: 'checkbox',
              label: 'Call to Action',
            },
            link({
              overrides: {
                name: 'link',
                admin: {
                  condition: (data, siblingData) => siblingData.callToAction,
                },
              },
            }),
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
