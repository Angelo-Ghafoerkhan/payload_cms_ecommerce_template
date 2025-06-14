// src/components/RenderSingleBlocks.tsx
import React, { Fragment } from 'react'
import type { Page, Faq } from '@/payload-types'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import ImageWithTextBlock from './ImageWithTextBlock'
import ImageLinkBlock from './ImageLink'
import FAQSchema from '@/collections/Schemas/FAQSchema'
import ContactSection from './ContactSection/Component'
import RenderAnimation from '@/fields/Animation/RenderAnimation'
import InfoCardBlock from './InfoCard/component'
import StaffImageSpielBlock from './StaffImageSpielBlock/component'
import { GoogleMap } from './GoogleMap/component'
import clsx from 'clsx'
import SingleProduct from './SingleProduct/component'
import ReviewCard from './ReviewCard/component'

const blockComponents: Record<string, React.ComponentType<any>> = {
  contactSection: ContactSection,
  formBlock: FormBlock,
  googleMap: GoogleMap,
  imageLinkBlock: ImageLinkBlock,
  imageWithTextBlock: ImageWithTextBlock,
  infoCardBlock: InfoCardBlock,
  mediaBlock: MediaBlock,
  reviewCard: ReviewCard,
  singleProduct: SingleProduct,
  staffImageSpielBlock: StaffImageSpielBlock,
}

interface RenderBlocksProps {
  blocks: Page['layout'][0][]
  excludeBlockTypes?: string[]
  excludeMargin?: boolean
}

interface FAQBlockType {
  blockType: 'faqBlock'
  faqs: Faq
}
function isFAQBlock(block: any): block is FAQBlockType {
  return block.blockType === 'faqBlock' && block.faqs && Array.isArray(block.faqs.questions)
}

export const RenderSingleBlocks: React.FC<RenderBlocksProps> = ({
  blocks,
  excludeBlockTypes = [],
  excludeMargin = false,
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
            <div className={clsx('h-full', !excludeMargin && 'my-16')} key={idx}>
              <RenderAnimation
                trigger={animation.trigger}
                type={animation.type}
                duration={animation.duration}
                delay={animation.delay}
              >
                {content}
              </RenderAnimation>
            </div>
          )
        }

        return (
          <div className={clsx('h-full', !excludeMargin && 'my-16')} key={idx}>
            {content}
          </div>
        )
      })}

      {faqBlocks.length > 0 && <FAQSchema faqBlocks={faqBlocks} />}
    </Fragment>
  )
}

export default RenderSingleBlocks
