// src/components/RenderBlocks.tsx

import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
import type { Faq, Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { GalleryBlock } from './Gallery/component'
import FAQBlock from './FAQBlock'
import ImageWithTextBlock from './ImageWithTextBlock'
import StepItemGrid from './StepItemGrid/Component'
import { ContactSection } from './ContactSection/Component'
import TabsBlock from './TabsBlock'
import ImageLinkBlock from './ImageLink'
import LogoCarouselBlock from './LogoCarousel'
import FAQSchema from '@/collections/Schemas/FAQSchema'

const blockComponents = {
  archive: ArchiveBlock,
  contactSection: ContactSection,
  content: ContentBlock,
  cta: CallToActionBlock,
  faqBlock: FAQBlock,
  formBlock: FormBlock,
  gallery: GalleryBlock,
  imageLinkBlock: ImageLinkBlock,
  imageWithTextBlock: ImageWithTextBlock,
  logoCarouselBlock: LogoCarouselBlock,
  mediaBlock: MediaBlock,
  stepItemGrid: StepItemGrid,
  tabsBlock: TabsBlock,
}

// dynamically load your animation renderer on the client
const AnimationRenderer = dynamic(() => import('@/fields/Animation/RenderAnimation'), {})

// type guard for FAQ blocks
interface FAQBlockType {
  blockType: 'faqBlock'
  faqs: Faq
}
function isFAQBlock(block: any): block is FAQBlockType {
  return block?.blockType === 'faqBlock' && block.faqs && Array.isArray(block.faqs.questions)
}

export const RenderBlocks: React.FC<{ blocks: Page['layout'][0][] }> = ({ blocks }) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  // collect FAQ blocks for the schema render later
  const faqBlocks = blocks.filter(isFAQBlock)

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType, animation } = block as any
        const Block = blockType && (blockComponents as any)[blockType]
        if (!Block) return null

        // create the block content
        const content = <Block {...block} disableInnerContainer />

        // if animation is enabled, wrap it
        if (animation?.enabled) {
          return (
            <div className="my-16" key={index}>
              <AnimationRenderer
                trigger={animation.trigger}
                type={animation.type}
                duration={animation.duration}
                delay={animation.delay}
              >
                {content}
              </AnimationRenderer>
            </div>
          )
        }

        // otherwise, just render normally
        return (
          <div className="my-16" key={index}>
            {content}
          </div>
        )
      })}

      {/* render FAQ schema below all blocks that were FAQ blocks */}
      {faqBlocks.length > 0 && <FAQSchema faqBlocks={faqBlocks} />}
    </Fragment>
  )
}

export default RenderBlocks
