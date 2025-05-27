// src/blocks/TabsBlock/components/TabButton.tsx
'use client'

import React from 'react'

interface TabButtonProps {
  title: string
  isActive: boolean
  onClick: () => void
  type: 'content' | 'link'
  link?:
    | {
        type: 'custom'
        url?: string | null
        newTab?: boolean | null
      }
    | {
        type: 'reference'
        newTab?: boolean | null
        reference?: {
          relationTo: 'pages' | 'posts' | 'products' | 'product-categories'
          value: {
            slug: string
            [key: string]: any
          }
        }
      }
}

const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onClick, type, link }) => {
  const getHref = () => {
    if (!link) return '#'

    if (link.type === 'custom') {
      return link.url || '#'
    }

    if (link.type === 'reference' && link.reference) {
      const relationTo = link.reference.relationTo
      const value = link.reference.value

      if (typeof value === 'object' && value.slug) {
        return `${relationTo !== 'pages' ? `/${relationTo}` : ''}/${value.slug}`
      }
    }

    return '#'
  }

  if (type === 'link') {
    return (
      <a
        href={getHref()}
        target={link?.newTab ? '_blank' : undefined}
        rel={link?.newTab ? 'noopener noreferrer' : undefined}
        className={[
          'px-4 py-2 font-medium focus:outline-none',
          'text-foreground hover:text-secondary',
        ].join(' ')}
      >
        {title}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      className={[
        'px-4 py-2 font-medium focus:outline-none',
        isActive
          ? 'border-b-2 border-current text-primary'
          : 'text-foreground hover:text-secondary',
      ].join(' ')}
    >
      {title}
    </button>
  )
}

export default TabButton
