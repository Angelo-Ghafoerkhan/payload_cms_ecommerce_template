'use client'

import { Media } from '@/payload-types'
import Slider from 'react-infinite-logo-slider'
import Image from 'next/image'
import clsx from 'clsx'

interface LogoCarouselBlockProps {
  title?: string
  alignTitle: 'left' | 'center' | 'right'
  images: Media[]
  pauseOnHover: boolean
  duration: number
}

const LogoCarouselBlock: React.FC<LogoCarouselBlockProps> = ({
  title,
  alignTitle,
  images,
  pauseOnHover = true,
  duration = 40,
}) => {
  return (
    <div>
      {title && (
        <div
          className={clsx(
            'container flex',
            alignTitle === 'left'
              ? 'justify-start'
              : alignTitle === 'center'
                ? 'justify-center'
                : 'justify-end',
          )}
        >
          <div className="prose dark:prose-invert mb-8">
            <h2>{title}</h2>
          </div>
        </div>
      )}

      <div id="logo-carousel">
        <Slider
          width="360px"
          duration={duration}
          pauseOnHover={pauseOnHover}
          blurBorders={false}
          blurBorderColor={'#fff'}
        >
          {images.map((image, index) => (
            <Slider.Slide key={index}>
              <div id="slide">
                <div id="slide-image-container">
                  <Image
                    src={image.url as string}
                    alt={`Slide ${index}`}
                    width={300}
                    height={200}
                  />
                </div>
              </div>
            </Slider.Slide>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default LogoCarouselBlock
