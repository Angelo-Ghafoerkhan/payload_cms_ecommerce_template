'use client'

import React, { useEffect, useRef } from 'react'
import type { Block } from 'payload'
import TabButton from './components/TabButton'
import RenderTabBlocks from '../RenderTabBlocks'
import { useSearchParams, useRouter } from 'next/navigation'
import RichText from '@/components/RichText'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface TabsBlockProps {
  intro?: SerializedEditorState
  tabPosition: 'left' | 'middle' | 'right'
  allowUrlControls?: boolean
  tabs: {
    title: string
    type: 'content' | 'link'
    content?: Block[]
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
  }[]
  initialTab?: number
}

const positionMap = {
  left: 'justify-start',
  middle: 'md:justify-center',
  right: 'md:justify-end',
}

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')

export default function TabsBlockClient({
  intro,
  tabPosition = 'left',
  tabs,
  initialTab = 0,
  allowUrlControls = false,
}: TabsBlockProps) {
  const [activeTab, setActiveTab] = React.useState<number | undefined>(
    allowUrlControls ? undefined : initialTab,
  )
  const searchParams = useSearchParams()
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Set tab from URL on load if allowed
  useEffect(() => {
    if (!allowUrlControls) return

    const tabQuery = searchParams.get('tab')
    if (tabQuery) {
      const foundIdx = tabs.findIndex((tab) => slugify(tab.title) === tabQuery.toLowerCase())
      if (foundIdx !== -1) {
        setActiveTab(foundIdx)
        return
      }
    }

    // Fallback to initialTab if nothing matched
    setActiveTab(initialTab)
  }, [allowUrlControls, searchParams, tabs, initialTab])

  const handleTabClick = (idx: number, type: 'content' | 'link', title: string) => {
    if (type === 'content') {
      if (!allowUrlControls) {
        setActiveTab(idx)
      }

      if (allowUrlControls) {
        const scrollX = scrollRef.current?.scrollLeft ?? 0
        const slug = slugify(title)
        const params = new URLSearchParams(Array.from(searchParams.entries()))
        params.set('tab', slug)
        router.replace(`?${params.toString()}`)

        requestAnimationFrame(() => {
          if (scrollRef.current) scrollRef.current.scrollLeft = scrollX
        })
      }
    }
  }

  if (!Array.isArray(tabs) || tabs.length === 0 || activeTab === undefined) return null

  return (
    <div className="w-full gap-8">
      {intro && <RichText data={intro} className="max-w-[800px] mb-8" />}
      <div className="relative container">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-background z-30" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-background z-30" />

        <div
          ref={scrollRef}
          className={`flex ${positionMap[tabPosition]} space-x-4 pb-4 border-b overflow-x-auto scrollbar-hide relative z-20 pr-6 pl-6`}
        >
          {tabs.map((tab, idx) => (
            <TabButton
              key={idx}
              title={tab.title}
              isActive={idx === activeTab}
              onClick={() => handleTabClick(idx, tab.type, tab.title)}
              type={tab.type}
              link={tab.type === 'link' ? tab.link : undefined}
            />
          ))}
        </div>
      </div>

      {tabs[activeTab]?.type === 'content' && (
        <div className="-mt-16">
          {/* @ts-expect-error Server Component */}
          <RenderTabBlocks blocks={tabs[activeTab]?.content || []} />
        </div>
      )}
    </div>
  )
}
