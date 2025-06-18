// src/components/RenderTabBlocks.tsx
'use client'

import React, { Fragment } from 'react'
import type { Page, Faq } from '@/payload-types'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { GalleryBlock } from './Gallery/component'
import FAQBlock from './FAQBlock'
import ImageWithTextBlock from './ImageWithTextBlock'
import StepItemGrid from './StepItemGrid/Component'
import ImageLinkBlock from './ImageLink'
import LogoCarouselBlock from './LogoCarousel'
import FAQSchema from '@/collections/Schemas/FAQSchema'
import RenderAnimation from '@/fields/Animation/RenderAnimation'
import InfoCardBlock from './InfoCard/component'
import StaffImageSpielBlock from './StaffImageSpielBlock/component'
import { GoogleMap } from './GoogleMap/component'
import ImageOverlayCTA from './ImageOverlayCTA'

const blockComponents: Record<string, React.ComponentType<any>> = {
  // content: ContentBlock,
  cta: CallToActionBlock,
  faqBlock: FAQBlock,
  formBlock: FormBlock,
  gallery: GalleryBlock,
  googleMap: GoogleMap,
  imageLinkBlock: ImageLinkBlock,
  imageWithTextBlock: ImageWithTextBlock,
  imageOverlayCTA: ImageOverlayCTA,
  infoCardBlock: InfoCardBlock,
  logoCarouselBlock: LogoCarouselBlock,
  mediaBlock: MediaBlock,
  staffImageSpielBlock: StaffImageSpielBlock,
  stepItemGrid: StepItemGrid,
}

interface RenderBlocksProps {
  blocks: Page['layout'][0][]
  excludeBlockTypes?: string[] // new
}

interface FAQBlockType {
  blockType: 'faqBlock'
  faqs: Faq
}
function isFAQBlock(block: any): block is FAQBlockType {
  return block.blockType === 'faqBlock' && block.faqs && Array.isArray(block.faqs.questions)
}

export const RenderTabBlocks: React.FC<RenderBlocksProps> = ({
  blocks,
  excludeBlockTypes = [],
}) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  const faqBlocks = blocks.filter(isFAQBlock)

  return (
    <Fragment>
      {blocks.map((block, idx) => {
        const { blockType, animation } = block as any

        // skip excluded types:
        if (excludeBlockTypes.includes(blockType)) return null

        const BlockComponent = blockType ? blockComponents[blockType] : null
        if (!BlockComponent) return null

        const content = <BlockComponent {...block} disableInnerContainer />

        if (animation?.enabled) {
          return (
            <div className="my-16" key={idx}>
              <RenderAnimation
                key={`${idx}-${animation.trigger}-${Date.now()}`} // force remount on tab change
                trigger={animation.trigger}
                type={animation.type}
                duration={animation.duration}
                delay={animation.delay}
                threshold={animation.threshold}
              >
                {content}
              </RenderAnimation>
            </div>
          )
        }

        return (
          <div className="my-16" key={idx}>
            {content}
          </div>
        )
      })}

      {faqBlocks.length > 0 && <FAQSchema faqBlocks={faqBlocks} />}
    </Fragment>
  )
}

export default RenderTabBlocks
