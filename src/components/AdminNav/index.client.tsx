'use client'

import type { groupNavItems } from '@payloadcms/ui/shared'
import type { NavPreferences } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import { Link, NavGroup, useConfig, useTranslation } from '@payloadcms/ui'
import { EntityType } from '@payloadcms/ui/shared'
import { usePathname } from 'next/navigation.js'
import { formatAdminURL } from 'payload/shared'
import React, { Fragment } from 'react'
import {
  Shield, // “Admin”
  Globe, // “Website”
  FileText, // “Posts”
  ClipboardList, // “Forms”
  ShoppingCart, // “E-commerce”
  CreditCard, // “Subscriptions”
} from 'lucide-react'

const baseClass = 'nav'

export const DefaultNavClient: React.FC<{
  groups: ReturnType<typeof groupNavItems>
  navPreferences?: NavPreferences
}> = ({ groups, navPreferences }) => {
  const pathname = usePathname()

  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()

  const { i18n } = useTranslation()

  const groupIcons: Record<string, React.FC<{ className?: string; size?: number }>> = {
    admin: Shield,
    website: Globe,
    posts: FileText,
    forms: ClipboardList,
    ecommerce: ShoppingCart,
    subscriptions: CreditCard,
  }

  const priority = ['admin', 'website', 'posts', 'forms'] as const

  const orderedGroups = [...groups].sort((a, b) => {
    const ia = priority.indexOf(a.label.toLowerCase() as (typeof priority)[number])
    const ib = priority.indexOf(b.label.toLowerCase() as (typeof priority)[number])

    // if both are in the priority list, keep their priority order
    if (ia !== -1 && ib !== -1) return ia - ib
    // if only a is in the list, it comes first
    if (ia !== -1) return -1
    // if only b is in the list, b comes first
    if (ib !== -1) return 1
    // otherwise keep original relative order (stable sort trick)
    return 0
  })

  return (
    <div>
      {orderedGroups.map(({ entities, label }, key) => {
        return (
          <NavGroup
            isOpen={navPreferences?.groups?.[label]?.open}
            key={key}
            label={
              (
                <span className="nav__group-label">
                  {(() => {
                    const Icon = groupIcons[label.toLowerCase()]
                    return Icon ? <Icon size={16} className="nav__group-icon" /> : null
                  })()}
                  {getTranslation(label, i18n)}
                </span>
              ) as unknown as string
            }
          >
            {entities.map(({ slug, type, label }, i) => {
              let href: string | undefined
              let id: string | undefined

              if (type === EntityType.collection) {
                href = formatAdminURL({ adminRoute, path: `/collections/${slug}` })
                id = `nav-${slug}`
              } else if (type === EntityType.global) {
                href = formatAdminURL({ adminRoute, path: `/globals/${slug}` })
                id = `nav-global-${slug}`
              }

              const isActive =
                href !== undefined &&
                pathname.startsWith(href) &&
                ['/', undefined].includes(pathname[href.length])

              const Label = (
                <>
                  {isActive && <div className={`${baseClass}__link-indicator`} />}
                  <span className={`${baseClass}__link-label`}>{getTranslation(label, i18n)}</span>
                </>
              )

              // If the URL matches the link exactly
              if (pathname === href) {
                return (
                  <div className={`${baseClass}__link`} id={id} key={i}>
                    {Label}
                  </div>
                )
              }

              return (
                <Link className={`${baseClass}__link`} href={href} id={id} key={i} prefetch={false}>
                  {Label}
                </Link>
              )
            })}
          </NavGroup>
        )
      })}
    </div>
  )
}
