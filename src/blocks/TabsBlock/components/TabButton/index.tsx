// src/blocks/TabsBlock/components/TabButton.tsx
'use client'

import React from 'react'

interface TabButtonProps {
  title: string
  isActive: boolean
  onClick: () => void
}

const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={[
      'px-4 py-2 font-medium focus:outline-none',
      isActive ? 'border-b-2 border-current text-primary' : 'text-foreground hover:text-gray-900',
    ].join(' ')}
  >
    {title}
  </button>
)

export default TabButton
