import { Media } from '@/payload-types'
import RichText from '@/components/RichText'

interface ImageLinkBlockProps {
  image: Media
}

const ImageLinkBlock: React.FC<ImageLinkBlockProps> = ({ image, text, url }) => {
  return (
    <div>
      <div>Image Link Block</div>
    </div>
  )
}

export default ImageLinkBlock
