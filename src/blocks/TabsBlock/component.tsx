// src/blocks/TabsBlock/component.client.tsx
'use client'

import React from 'react'
import type { Block } from 'payload'
import TabButton from './components/TabButton'
import dynamic from 'next/dynamic'
// import RenderClientBlocks from '../RenderClientBlocks'

const RenderClientBlocks = dynamic(() => import('@/blocks/RenderClientBlocks'), { ssr: false })

interface TabsBlockProps {
  tabPosition: 'left' | 'middle' | 'right'
  tabs: { title: string; content: Block[] }[]
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
        {tabs.map((tab, idx) => (
          <TabButton
            key={idx}
            title={tab.title}
            isActive={idx === activeTab}
            onClick={() => setActiveTab(idx)}
          />
        ))}
      </div>
      <div className="-mt-16">
        {/* Skip rendering tabsBlock inside itself */}
        {/* @ts-expect-error Server Component */}
        <RenderClientBlocks blocks={tabs[activeTab]?.content} />
      </div>
    </div>
  )
}
