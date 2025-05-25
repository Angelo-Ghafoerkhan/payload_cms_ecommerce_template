'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import type { Page, Post, Product, ProductCategory } from '@/payload-types'
import dynamic from 'next/dynamic'
import type { IconGroupValue } from '@/fields/IconSelector/RenderIcon'

const RenderIcon = dynamic(() => import('@/fields/IconSelector/RenderIcon'), {
  ssr: false,
})

export type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'product-categories' | 'products'
    value:
      | Page
      | Post
      | ProductCategory
      | Product
      | { slug?: string; url?: string }
      | string
      | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  onClick?: () => void
  hideLabel?: boolean
  icon?: IconGroupValue
}

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  appearance = 'inline',
  children,
  className,
  label,
  newTab,
  reference,
  size: sizeFromProps,
  url,
  onClick,
  hideLabel = false,
  icon,
}) => {
  /* ------------------------------------------------ link target -------- */
  let href: string | null | undefined = url

  if (type === 'reference' && typeof reference?.value === 'object') {
    if (reference.relationTo === 'product-categories' || reference.relationTo === 'products') {
      href = `/${(reference.value as { url?: string }).url}` || ''
    } else if ((reference.value as any).slug) {
      href = `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${
        (reference.value as any).slug
      }`
    }
  }

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* ------------------------------------------------ common classes ----- */
  const withIconGap = icon ? 'inline-flex items-center gap-2' : ''
  const linkClasses = cn(className, withIconGap)

  /* ------------------------------------------------ inline ------------- */
  if (appearance === 'inline') {
    return (
      <Link className={linkClasses} href={href || ''} {...newTabProps}>
        {label && !hideLabel && label}
        {children}
        {icon && <RenderIcon icon={icon} />}
      </Link>
    )
  }

  /* ------------------------------------------------ button styles ------ */
  const size = appearance === 'link' ? 'clear' : sizeFromProps

  return (
    <Button
      asChild
      className={className}
      size={size}
      variant={appearance}
      onClick={() => onClick?.()}
    >
      <Link className={linkClasses} href={href || ''} {...newTabProps}>
        {label && !hideLabel && label}
        {children}
        {icon && <RenderIcon icon={icon} />}
      </Link>
    </Button>
  )
}
