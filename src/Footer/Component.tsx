import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { MapPin } from 'lucide-react'
import type { Footer, Setting } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import RichText from '@/components/RichText'
import Link from 'next/link'
import RenderSocials from '@/Globals/Settings/components/RenderSocials'
import clsx from 'clsx'

export const ContactInfo: React.FC<{ settings: Setting }> = ({ settings }) => {
  if (!settings) return null

  return (
    <div className="text-sm text-tertiary-foreground">
      <h3 className="font-header text-lg text-primary-foreground mb-2">Contact</h3>
      <div className="space-y-2">
        {settings.email && (
          <Link href={`mailto:${settings.email}`} className="block hover:text-secondary">
            {settings.email}
          </Link>
        )}
        {settings.phoneNumber && (
          <Link href={`tel:${settings.phoneNumber}`} className="block hover:text-secondary">
            {settings.phoneNumber}
          </Link>
        )}
        <RenderSocials
          socials={settings.socials}
          className="fill-primary-foreground hover:fill-secondary"
        />
      </div>
    </div>
  )
}

const formatDay = (day: string) => {
  switch (day) {
    case 'mon-fri':
      return 'Monday – Friday'
    case 'weekend':
      return 'Saturday & Sunday'
    default:
      return day.charAt(0).toUpperCase() + day.slice(1)
  }
}

export const OpeningHours: React.FC<{ openingHours?: Setting['openingHours'] }> = ({
  openingHours,
}) => {
  if (!openingHours || openingHours.length === 0) return null

  return (
    <div className="text-sm text-tertiary-foreground">
      <h3 className="font-header text-lg text-primary-foreground mb-2">Opening Hours</h3>
      <ul className="space-y-1">
        {openingHours.map(({ day, openTime, closeTime }) => (
          <li key={day}>
            <span className="capitalize">{formatDay(day)}</span>: {openTime} – {closeTime}
          </li>
        ))}
      </ul>
    </div>
  )
}

const renderRow = (
  row:
    | { rowType: 'text'; text: any }
    | { rowType: 'Logo' }
    | { rowType: 'location' }
    | { rowType: 'openingHours' }
    | { rowType: 'contact' },
  i: number,
  settings: Setting,
) => {
  switch (row?.rowType) {
    case 'text':
      return (
        <RichText
          key={i}
          data={row.text}
          enableProse={false}
          enableGutter={false}
          className="text-tertiary-foreground"
        />
      )

    case 'Logo':
      return (
        <Logo
          key={i}
          width={settings.logoWidth ?? undefined}
          height={settings.logoHeight ?? undefined}
        />
      )

    case 'location':
      if (!settings.businessAddress) return null
      return (
        <div key={i} className="flex items-start gap-2 text-tertiary-foreground">
          <MapPin size={20} className="mt-0.5" />
          <span>{settings.businessAddress}</span>
        </div>
      )

    case 'openingHours':
      return <OpeningHours key={i} openingHours={settings.openingHours} />

    case 'contact':
      return <ContactInfo key={i} settings={settings} />

    default:
      return null
  }
}

const renderColumn = (
  column: Extract<Footer['columns'], Array<any>>[number],
  index: number,
  settings: Setting,
): React.JSX.Element | null => {
  switch (column?.columnType) {
    case 'rows':
      return (
        <div key={index} className="flex flex-col gap-4">
          {column.rows
            ?.filter(
              (
                row,
              ): row is
                | { rowType: 'text'; text: any }
                | { rowType: 'Logo' }
                | { rowType: 'location' }
                | { rowType: 'openingHours' }
                | { rowType: 'contact' } =>
                row?.rowType === 'text' ||
                row?.rowType === 'Logo' ||
                row?.rowType === 'location' ||
                row?.rowType === 'openingHours' ||
                row?.rowType === 'contact',
            )
            .map((row, i) => renderRow(row, i, settings))}
        </div>
      )
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
            <h3 className="font-header text-lg text-primary-foreground">{column?.menuTitle}</h3>
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
        return <ContactInfo key={index} settings={settings} />
      }

    case 'cta':
      return (
        <div key={index}>
          <h3 className="font-header text-lg text-primary-foreground">{column.cta?.title}</h3>
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

  console.log('Getting global settings')
  const settings = await getCachedGlobal('settings', 1)()
  console.log('Got settings')

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
