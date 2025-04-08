import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer, Setting } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import RichText from '@/components/RichText'
import Link from 'next/link'
import RenderSocials from '@/Globals/Settings/components/RenderSocials'
import clsx from 'clsx'

const renderColumn = (
  column: Extract<Footer['columns'], Array<any>>[number],
  index: number,
  settings: Setting,
): React.JSX.Element | null => {
  switch (column?.columnType) {
    case 'logo':
      return (
        <Logo
          key={index}
          width={settings.logoWidth ?? undefined}
          height={settings.logoHeight ?? undefined}
        />
      )
    case 'menu':
      if (column?.menuType === 'custom') {
        return (
          <nav key={index}>
            <h3 className="font-header text-primary">{column?.menuTitle}</h3>
            <div className="flex flex-col">
              {column?.navItems?.map(({ link }, i) => {
                return (
                  <CMSLink
                    className="text-tertiary-foreground hover:text-primary"
                    key={i}
                    {...link}
                  />
                )
              })}
            </div>
          </nav>
        )
      } else if (column?.menuType === 'contact') {
        return (
          <div key={index}>
            <h3 className="font-header text-primary">Contact</h3>
            <div className="flex flex-col">
              {settings.email && (
                <Link
                  href={`mailto:${settings.email}`}
                  className="text-body text-tertiary-foreground hover:text-primary"
                >
                  {settings.email}
                </Link>
              )}
              {settings.phoneNumber && (
                <Link
                  href={`tel:${settings.phoneNumber}`}
                  className="text-body text-tertiary-foreground hover:text-primary"
                >
                  {settings.phoneNumber}
                </Link>
              )}
              <RenderSocials
                socials={settings.socials}
                className="fill-primary-foreground hover:fill-primary"
              />
            </div>
          </div>
        )
      }

    case 'cta':
      return (
        <div key={index}>
          <h3 className="font-header text-primary">{column.cta?.title}</h3>
          <p className="mb-2">{column.cta?.text}</p>
          <CMSLink {...column.cta?.button.link} appearance="default" />
        </div>
      )
    default:
      return null
  }
}

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const settings: Setting = await getCachedGlobal('settings', 1)()

  const columns = footerData?.columns || []

  return (
    <footer className="mt-auto border-t border-border bg-tertiary text-tertiary-foreground">
      <div
        className={clsx(
          'container py-8 gap-4 md:justify-between grid',
          `grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns.length}`,
        )}
      >
        {columns.map((column, index) => {
          return renderColumn(column, index, settings)
        })}
      </div>
      <div>
        <ThemeSelector />
      </div>
      <div className="container flex justify-between py-4 flex-wrap gap-4">
        {footerData?.footerMeta?.left && (
          <RichText
            data={footerData?.footerMeta?.left}
            className="text-primary-foreground"
            enableProse={false}
            enableGutter={false}
          />
        )}
        {footerData?.footerMeta?.right && (
          <RichText
            data={footerData?.footerMeta?.right}
            className="text-primary-foreground text-right"
            enableProse={false}
            enableGutter={false}
          />
        )}
      </div>
    </footer>
  )
}
