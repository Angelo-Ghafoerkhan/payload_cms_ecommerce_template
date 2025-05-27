import { CMSLink, CMSLinkType } from '@/components/Link'
import { Media } from '@/payload-types'
import Image from 'next/image'

interface ImageOverlayCTAProps {
  backgroundImage: Media
  overlay: {
    title: string
    image: Media
    text?: string
  }
  link: CMSLinkType
}

const ImageOverlayCTA: React.FC<ImageOverlayCTAProps> = ({ backgroundImage, overlay, link }) => {
  return (
    <div className="relative m-4 rounded-3xl overflow-hidden h-screen md:h-[75vh]">
      <Image src="" alt="" fill className="object-cover rounded-2xl w-full h-full" />
      {/* overlay */}
      <div className="absolute pt-32 w-full h-full bg-black bg-opacity-20 z-[1]">
        <Image
          src={backgroundImage.url as string}
          alt={backgroundImage.alt ?? ''}
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 bg-black bg-opacity-20 w-full h-full flex items-center justify-center flex-col">
        <div className="bg-primary-foreground rounded-2xl text-center flex flex-col gap-4 items-center justify-center p-6 max-w-[750px]">
          <div className="prose">
            <h2 className="text-3xl max-w-[400px]">{overlay.title}</h2>
          </div>
          <div className="relative">
            <Image
              src={overlay.image.url as string}
              alt={overlay.image.alt ?? ''}
              width={400}
              height={200}
              className="rounded-2xl"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <CMSLink {...link} />
            </div>
          </div>
          <div className="prose">
            <p className="max-w-[500px]">{overlay.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageOverlayCTA
