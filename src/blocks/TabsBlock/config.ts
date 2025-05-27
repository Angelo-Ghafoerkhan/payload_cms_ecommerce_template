// src/blocks/TabsBlock/config.ts
import { Block } from 'payload'
import { CallToAction } from '../CallToAction/config'
import { Content } from '../Content/config'
import { FAQBlock } from '../FAQBlock/config'
import { FormBlock } from '../Form/config'
import { Gallery } from '../Gallery/config'
import { ImageWithTextBlock } from '../ImageWithTextBlock/config'
import { MediaBlock } from '../MediaBlock/config'
import { StepItemGridBlock } from '../StepItemGrid/config'
import { animationField } from '@/fields/Animation/field'
import { link } from '@/fields/link'

export const TabsBlock: Block = {
  slug: 'tabsBlock',
  imageURL: '/images/blocks/tabs-block.jpg',
  labels: {
    singular: 'Tabs',
    plural: 'Tabs',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'tabPosition',
              type: 'select',
              label: 'Tab Position',
              defaultValue: 'left',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'middle' },
                { label: 'Right', value: 'right' },
              ],
            },
            {
              name: 'initialTab',
              type: 'number',
              label: 'Initial Active Tab (0-based index)',
              defaultValue: 0,
            },
            {
              name: 'tabs',
              type: 'array',
              label: 'Tabs',
              minRows: 1,
              maxRows: 10,
              fields: [
                { name: 'title', type: 'text', label: 'Title', required: true },
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    { value: 'content', label: 'Content' },
                    { value: 'link', label: 'Link' },
                  ],
                  defaultValue: 'content',
                },
                {
                  name: 'content',
                  type: 'blocks',
                  label: 'Content',
                  blocks: [
                    CallToAction,
                    Content,
                    FAQBlock,
                    Gallery,
                    ImageWithTextBlock,
                    MediaBlock,
                    FormBlock,
                    StepItemGridBlock,
                  ],
                  admin: {
                    condition: (data, siblingData) => siblingData.type === 'content',
                  },
                },
                link({
                  disableLabel: true,
                  disableIcon: true,
                  appearances: ['default'],
                  condition: (data, siblingData) => siblingData.type === 'link',
                }),
              ],
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
