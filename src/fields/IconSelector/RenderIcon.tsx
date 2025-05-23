'use client'

import React, { lazy, Suspense, useEffect, useState, type CSSProperties } from 'react'
import clsx from 'clsx'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { Media } from '@/payload-types'

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type Preset = 'primary' | 'secondary' | 'tertiary'

export type IconGroupValue = {
  source?: 'lucide' | 'upload' | null
  name?: string | null
  upload?: number | Media | null | undefined
  color?: string | null
  size?: number | null
}

/* -------------------------------------------------------------------------- */

const isPreset = (c?: string): c is Preset =>
  c === 'primary' || c === 'secondary' || c === 'tertiary'

const fallback = (
  <div className="animate-pulse bg-gray-300 rounded" style={{ width: 24, height: 24 }} />
)

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export interface RenderIconProps {
  icon?: IconGroupValue | null
  className?: string
}

const RenderIcon: React.FC<RenderIconProps> = ({ icon, className }) => {
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null)

  // Extract values safely
  const source = icon?.source
  const color = icon?.color
  const size = icon?.size ?? 24

  // Determine upload URL if applicable
  const url =
    source === 'upload'
      ? typeof icon?.upload === 'string'
        ? icon.upload
        : typeof icon?.upload === 'object' && icon?.upload !== null && 'url' in icon.upload
          ? (icon.upload as Media).url
          : undefined
      : undefined

  // Fetch SVG markup for uploaded icons
  useEffect(() => {
    let mounted = true
    if (source === 'upload' && url) {
      fetch(url)
        .then((res) => res.text())
        .then((txt) => mounted && setSvgMarkup(txt))
        .catch(() => mounted && setSvgMarkup(null))
    } else {
      setSvgMarkup(null)
    }
    return () => {
      mounted = false
    }
  }, [source, url])

  /* ------------------------------------------------------------------ */
  /*  Early exit                                                         */
  /* ------------------------------------------------------------------ */
  if (!icon) return null

  /* ------------------------------------------------------------------ */
  /*  Colour helpers                                                     */
  /* ------------------------------------------------------------------ */

  /** Tailwind utility: stroke-* for Lucide, fill-* for upload */
  const twColour = isPreset(color ?? undefined)
    ? `${source === 'upload' ? 'fill' : 'stroke'}-${color}`
    : undefined

  /** Inline style for hex values */
  const inlineColour: CSSProperties | undefined =
    !isPreset(color ?? undefined) && color?.startsWith('#')
      ? source === 'upload'
        ? { fill: color }
        : { stroke: color }
      : undefined

  /* ------------------------------------------------------------------ */
  /*  Lucide                                                             */
  /* ------------------------------------------------------------------ */
  if (source === 'lucide' && icon.name) {
    const LucideIcon = lazy(dynamicIconImports[icon.name as keyof typeof dynamicIconImports])

    return (
      <Suspense fallback={fallback}>
        <LucideIcon
          size={size}
          className={clsx(className, twColour)}
          {...(inlineColour ? { style: inlineColour } : {})}
        />
      </Suspense>
    )
  }

  /* ------------------------------------------------------------------ */
  /*  Uploaded SVG                                                      */
  /* ------------------------------------------------------------------ */
  if (source === 'upload') {
    if (!url) return null
    if (!svgMarkup) return fallback

    return (
      <div
        className={clsx(className, twColour)}
        style={{ width: size, height: size, ...inlineColour }}
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
    )
  }

  return null
}

export default RenderIcon
