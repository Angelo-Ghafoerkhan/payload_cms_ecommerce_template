// src/fields/Animation/RenderAnimation.tsx
'use client'

import React, { ReactNode, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export interface AnimationProps {
  enabled?: boolean
  trigger: 'onLoad' | 'onScroll' | 'onHover' | 'onComponentLoad'
  type: 'fade' | 'slideLeft' | 'slideRight' | 'zoom'
  duration: number
  delay: number
  threshold?: number
  children: ReactNode
}

export default function RenderAnimation({
  trigger,
  type,
  duration,
  delay,
  threshold = 50,
  children,
}: AnimationProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: `0px 0px -${threshold}% 0px`,
  })

  const variants = {
    fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
    slideLeft: { hidden: { x: -50, opacity: 0 }, show: { x: 0, opacity: 1 } },
    slideRight: { hidden: { x: 50, opacity: 0 }, show: { x: 0, opacity: 1 } },
    zoom: { hidden: { scale: 0.8, opacity: 0 }, show: { scale: 1, opacity: 1 } },
  }

  useEffect(() => {
    if (trigger === 'onLoad' || trigger === 'onComponentLoad') {
      controls.start('show')
    } else if (trigger === 'onScroll' && inView) {
      controls.start('show')
    }
  }, [trigger, inView, controls])

  const motionProps =
    trigger === 'onHover'
      ? { initial: 'hidden', whileHover: 'show', animate: 'hidden' }
      : { initial: 'hidden', animate: controls }

  return (
    <motion.div
      className="h-full"
      ref={ref}
      variants={variants[type]}
      {...motionProps}
      transition={{ duration: duration / 1000, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}
