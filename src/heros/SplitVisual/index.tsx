'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import clsx from 'clsx'

export const SplitVisualHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  imageAnnotation,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [])

  return (
    <section className="bg-background -mt-[10.4rem] pt-8 text-foreground min-h-screen flex items-center justify-center">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        {/* Left Column – Text */}
        <div className="pt-64 lg:pt-0 max-w-xl">
          {richText && <RichText data={richText} enableGutter={false} className="mb-6" />}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Column – Image Centered */}
        <div className="w-full flex justify-center">
          <div className="w-full min-h-[500px] relative rounded-lg">
            {imageAnnotation && (
              <RichText
                data={imageAnnotation}
                className="absolute top-0 lg:-top-4 left-0 lg:-left-4 h-min w-min bg-primary z-20 shadow-uniform rounded-lg leading-[1.4rem] py-3"
              />
            )}
            {media && typeof media === 'object' && (
              <Media
                resource={media}
                fill
                priority
                imgClassName="object-cover shadow-uniform rounded-2xl"
                videoClassName="absolute top-0 left-0 w-full h-full object-cover z-10"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
