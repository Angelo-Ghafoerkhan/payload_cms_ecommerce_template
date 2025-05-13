import React, { lazy, Suspense } from 'react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }} />

interface RenderIconProps {
  icon: {
    icon: keyof typeof dynamicIconImports
    color?: string
    size?: number
  }
}

const IconRenderer: React.FC<RenderIconProps> = ({ icon }) => {
  const LucideIcon = lazy(dynamicIconImports[icon.icon])

  return (
    <Suspense fallback={fallback}>
      <LucideIcon color={icon.color} size={icon.size} />
    </Suspense>
  )
}

export default IconRenderer
