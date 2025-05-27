// src/blocks/TabsBlock/component.client.tsx
'use client'

import React from 'react'
import type { Block } from 'payload'
import TabButton from './components/TabButton'
import RenderTabBlocks from '../RenderTabBlocks'

interface TabsBlockProps {
  tabPosition: 'left' | 'middle' | 'right'
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
  middle: 'justify-center',
  right: 'justify-end',
}

export default function TabsBlockClient({
  tabPosition = 'left',
  tabs,
  initialTab = 0,
}: TabsBlockProps) {
  const [activeTab, setActiveTab] = React.useState(initialTab)
  if (!Array.isArray(tabs) || tabs.length === 0) return null

  return (
    <div className="w-full container gap-8">
      <div className={`flex ${positionMap[tabPosition]} space-x-4 border-b pb-4`}>
        {tabs.map((tab, idx) => {
          console.log('Tab:', tab, 'Index:', idx, 'Active Tab:', activeTab)
          return (
            <TabButton
              key={idx}
              title={tab.title}
              isActive={idx === activeTab}
              onClick={() => {
                if (tab.type === 'content') {
                  setActiveTab(idx)
                }
              }}
              type={tab.type}
              link={tab.type === 'link' ? tab.link : undefined}
            />
          )
        })}
      </div>

      {/* Render only if active tab is 'content' */}
      {tabs[activeTab]?.type === 'content' && (
        <div className="-mt-16">
          {/* @ts-expect-error Server Component */}
          <RenderTabBlocks blocks={tabs[activeTab]?.content || []} />
        </div>
      )}
    </div>
  )
}
