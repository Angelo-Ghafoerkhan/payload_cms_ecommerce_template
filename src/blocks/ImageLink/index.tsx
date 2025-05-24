'use client'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import ArrowRight from './components/ArrowRight'
import AnimationType from '@/fields/Animation/types'

export interface ImageLinkBlockProps {
  image: Media
  text: SerializedEditorState
  link: Parameters<typeof CMSLink>[0]
  animation?: AnimationType
}

const ImageLinkBlock: React.FC<ImageLinkBlockProps> = ({ image, text, link }) => {
  return (
    <div
      id="image-link"
      className="relative w-full h-full min-h-72 rounded-2xl shadow-uniform overflow-hidden"
      data-theme="dark"
    >
      {/* background image */}
      <Image
        src={image.url as string}
        alt={image.alt as string}
        fill
        priority
        className="object-cover m-0"
      />

      {/* clickable overlay */}
      <CMSLink
        {...link}
        className="absolute pt-8 inset-0 z-10 flex flex-col h-full justify-start gap-4 bg-black/50 text-white no-underline hover:bg-primary/50"
      >
        <RichText
          data={text}
          className="prose-h2:no-underline prose-h2:mb-1 prose-p:no-underline pb-16"
        />
        <ArrowRight className="fill-white w-16 h-auto absolute bottom-2 right-2" />
      </CMSLink>
    </div>
  )
}

export default ImageLinkBlock
