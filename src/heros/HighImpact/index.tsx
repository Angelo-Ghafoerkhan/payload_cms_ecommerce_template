'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import clsx from 'clsx'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  alignContent,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative -mt-[10.4rem] flex items-center justify-center text-white h-min">
      {/* Overlay */}
      <div className="bg-black bg-opacity-40 w-full h-full min-h-[90vh] flex items-center">
        <div className="container mb-8 z-10 relative flex items-center" data-theme="dark">
          <div
            className={clsx(
              'max-w-[800px]',
              alignContent === 'right' && 'ml-auto',
              alignContent === 'center' && 'mx-auto',
            )}
          >
            {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
            {Array.isArray(links) && links.length > 0 && (
              <ul
                className={clsx(
                  'flex gap-4 ',
                  alignContent === 'center' && 'justify-center',
                  alignContent === 'right' && 'justify-end',
                )}
              >
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Overlay Shading */}
        <div className="absolute -bottom-px bg-gradient-to-b from-transparent to-background w-full h-1/2" />
      </div>

      {/* Image */}
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="-z-10 object-cover"
            priority
            resource={media}
            videoClassName="-z-10 object-cover absolute h-full w-full object-cover top-0 left-0"
          />
        )}
      </div>
    </div>
  )
}
