'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post, Product, ProductCategory } from '@/payload-types'

type CMSLinkType = {
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
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
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
  } = props

  const handleClick = () => {
    onClick?.()
  }

  let href: string | null | undefined = url

  if (type === 'reference' && typeof reference?.value === 'object') {
    if (reference.relationTo === 'product-categories' || reference.relationTo === 'products') {
      // For categories or products, use the 'url' field if available.
      href = `/${(reference.value as { url?: string }).url}` || ''
    } else if ((reference.value as any).slug) {
      // For other types, use slug with a base path if not pages.
      href = `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${
        (reference.value as any).slug
      }`
    }
  }

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || ''} {...newTabProps}>
        {label && !hideLabel && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance} onClick={handleClick}>
      <Link className={cn(className)} href={href || ''} {...newTabProps}>
        {label && !hideLabel && label}
        {children && children}
      </Link>
    </Button>
  )
}
