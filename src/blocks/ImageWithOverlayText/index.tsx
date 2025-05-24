import RichText from '@/components/RichText'
import AnimationType from '@/fields/Animation/types'
import { Media } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Image from 'next/image'

export type ImageWithTextOverlayBlockProps = {
  image: Media
  text: SerializedEditorState
  animation?: AnimationType
}

const ImageWithTextOverlayBlock: React.FC<ImageWithTextOverlayBlockProps> = ({ image, text }) => {
  return (
    <div className="relative min-h-96 rounded-xl overflow-hidden">
      {image?.url && (
        <Image
          src={image.url}
          alt={image.alt ?? ''}
          fill
          className="object-cover w-full h-full py-0 my-0"
        />
      )}

      <div
        className="absolute w-full h-full bg-black bg-opacity-40 p-4 flex justify-center items-center"
        data-theme="dark"
      >
        {text && (
          <RichText data={text} enableGutter={false} className="text-foreground prose-h2:mb-0" />
        )}
      </div>
    </div>
  )
}

export default ImageWithTextOverlayBlock
