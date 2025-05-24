import AnimationType from '@/fields/Animation/types'
import { Media } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

export interface StaffImageSpielBlockProps {
  name: string
  jobTitle: string
  image: Media
  spiel: SerializedEditorState
  animation?: AnimationType
}

const StaffImageSpielBlock: React.FC<StaffImageSpielBlockProps> = ({
  name,
  jobTitle,
  image,
  spiel,
}) => {
  return (
    <section className="flex items-center justify-center gap-4">
      <Image
        src={image.url as string}
        alt={image.alt as string}
        width={200}
        height={200}
        className="rounded-xl m-0 object-cover h-full aspect-square shadow-uniform"
      />
      <div>
        <h2 className="m-0">{name}</h2>
        <h4 className="m-0">{jobTitle}</h4>
        <RichText data={spiel} className="prose-p:m-0" />
      </div>
    </section>
  )
}

export default StaffImageSpielBlock
