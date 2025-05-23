import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import RenderSingleBlocks from '@/blocks/RenderSingleBlocks'
import type { IconGroupValue } from '@/fields/IconSelector/RenderIcon'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-8">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, contentType, block } = col

            const icon = link?.icon

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {contentType === 'text' && richText && (
                  <RichText data={richText} enableGutter={false} />
                )}

                {contentType === 'block' && block && (
                  <RenderSingleBlocks
                    blocks={block as any}
                    excludeBlockTypes={['tabsBlock']}
                    excludeMargin
                  />
                )}

                {enableLink && icon?.name && <CMSLink {...link} icon={icon as IconGroupValue} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
