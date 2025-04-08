import { Setting } from '@/payload-types'
import Link from 'next/link'
import clsx from 'clsx'

import Facebook from '../../assets/socials/facebook.svg'
import Instagram from '../../assets/socials/instagram.svg'
import Whatsapp from '../../assets/socials/whatsapp.svg'
import Tiktok from '../../assets/socials/tiktok.svg'
import Linkedin from '../../assets/socials/linkedin.svg'
import Pinterest from '../../assets/socials/pinterest.svg'
import Youtube from '../../assets/socials/youtube.svg'
import Twitter from '../../assets/socials/twitter.svg'

const socialIcons: Record<string, React.ElementType> = {
  facebook: Facebook,
  instagram: Instagram,
  whatsapp: Whatsapp,
  twitter: Twitter,
  tiktok: Tiktok,
  linkedin: Linkedin,
  pinterest: Pinterest,
  youtube: Youtube,
}

const RenderSocials = ({
  socials,
  className,
}: {
  socials: Setting['socials'] | undefined
  className?: string
}) => {
  if (!socials) return null

  return (
    <div className="flex gap-2">
      {Object.entries(socialIcons).map(([name, Icon]) => {
        if (socials[name as keyof typeof socials]) {
          return (
            <Link
              key={name}
              href={socials[name as keyof typeof socials] || ''}
              aria-label={name}
              className={clsx(className, 'w-7 h-7 aspect-square transition-colors duration-200')}
            >
              <p className="sr-only">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
              <Icon />
            </Link>
          )
        }
        return null
      })}
    </div>
  )
}

export default RenderSocials
