// src/components/RenderBlocks.tsx
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
import TabsBlock from './TabsBlock/component'
import ArchiveBlock from './ArchiveBlock/Component'
import ContactSection from './ContactSection/Component'
import RenderAnimation from '@/fields/Animation/RenderAnimation'
import InfoCardBlock from './InfoCard/component'
import StaffImageSpielBlock from './StaffImageSpielBlock/component'
import { GoogleMap } from './GoogleMap/component'
import clsx from 'clsx'
import ImageOverlayCTA from './ImageOverlayCTA'

const blockComponents: Record<string, React.ComponentType<any>> = {
  archive: ArchiveBlock,
  contactSection: ContactSection,
  content: ContentBlock,
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
  tabsBlock: TabsBlock,
}

interface RenderBlocksProps {
  blocks: Page['layout'][0][]
  excludeBlockTypes?: string[]
  excludeMargin?: boolean
  clientOnly?: boolean
}

interface FAQBlockType {
  blockType: 'faqBlock'
  faqs: Faq
}
function isFAQBlock(block: any): block is FAQBlockType {
  return block.blockType === 'faqBlock' && block.faqs && Array.isArray(block.faqs.questions)
}

export const RenderBlocks: React.FC<RenderBlocksProps> = ({
  blocks,
  excludeBlockTypes = [],
  excludeMargin = false,
  clientOnly = false,
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
            <div className={clsx(!excludeMargin && 'my-16')} key={idx}>
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
          <div className={clsx(!excludeMargin && 'my-16')} key={idx}>
            {content}
          </div>
        )
      })}

      {faqBlocks.length > 0 && <FAQSchema faqBlocks={faqBlocks} />}
    </Fragment>
  )
}

export default RenderBlocks
