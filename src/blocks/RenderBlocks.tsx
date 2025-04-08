import React, { Fragment } from 'react'
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
import FAQSchema from '@/collections/Schemas/FAQSchema'
import { ContactSection } from './ContactSection/Component'

const blockComponents = {
  archive: ArchiveBlock,
  contactSection: ContactSection,
  content: ContentBlock,
  cta: CallToActionBlock,
  faqBlock: FAQBlock,
  formBlock: FormBlock,
  gallery: GalleryBlock,
  imageWithTextBlock: ImageWithTextBlock,
  mediaBlock: MediaBlock,
  stepItemGrid: StepItemGrid,
}

// Define an interface for FAQ blocks.
interface FAQBlockType {
  blockType: 'faqBlock'
  faqs: Faq
}

// Type guard function to determine if a block is an FAQ block.
function isFAQBlock(block: any): block is FAQBlockType {
  return block?.blockType === 'faqBlock' && block.faqs && Array.isArray(block.faqs.questions)
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  // Use the type guard to extract FAQ blocks.
  const faqBlocks = blocks.filter(isFAQBlock)

  return (
    <Fragment>
      {hasBlocks &&
        blocks.map((block, index) => {
          const { blockType } = block
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error: there may be type mismatches */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      {faqBlocks.length > 0 && <FAQSchema faqBlocks={faqBlocks} />}
    </Fragment>
  )
}

export default RenderBlocks
