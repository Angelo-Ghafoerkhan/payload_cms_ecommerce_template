// src/components/AnimatedBlockWrapper.tsx
'use client'

import React from 'react'
import clsx from 'clsx'
import RenderAnimation, { AnimationProps } from '@/fields/Animation/RenderAnimation'

interface AnimatedBlockWrapperProps {
  animation?: AnimationProps
  children: React.ReactNode
  className?: string
}

const AnimatedBlockWrapper: React.FC<AnimatedBlockWrapperProps> = ({
  animation,
  children,
  className,
}) => {
  if (animation?.enabled) {
    return (
      <RenderAnimation
        trigger={animation.trigger}
        type={animation.type}
        duration={animation.duration}
        delay={animation.delay}
      >
        {children}
      </RenderAnimation>
    )
  }

  return <div className={clsx('my-16', className)}>{children}</div>
}

export default AnimatedBlockWrapper
