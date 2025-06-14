/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React, {
  lazy,
  Suspense,
  type CSSProperties,
  useEffect,
  useState,
  useMemo,
  memo,
} from 'react'
import clsx from 'clsx'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import type { Media } from '@/payload-types'

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type Preset = 'primary' | 'secondary' | 'tertiary'

export type IconGroupValue = {
  source?: 'lucide' | 'upload' | null
  name?: string | null
  upload?: number | Media | null
  color?: string | null
  size?: number | null
}

export interface RenderIconProps {
  icon?: IconGroupValue | null
  className?: string
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const isPreset = (c?: string): c is Preset =>
  c === 'primary' || c === 'secondary' || c === 'tertiary'

const fallback = (
  <div className="animate-pulse rounded bg-gray-300" style={{ width: 24, height: 24 }} />
)

// simple in-memory cache for uploaded SVG files
const svgCache = new Map<string, string>()

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const _RenderIcon: React.FC<RenderIconProps> = ({ icon, className }) => {
  /* ------------------------------------------------------------------ */
  /*  Early exit                                                         */
  /* ------------------------------------------------------------------ */
  if (!icon) return null

  const { source, color, size = 24 } = icon

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
  /*  Lucide icon                                                        */
  /* ------------------------------------------------------------------ */
  if (source === 'lucide' && icon.name) {
    /** ⚠️  `useMemo` so we don’t create a new lazy component each render */

    const LucideIcon = useMemo(
      () => lazy(dynamicIconImports[icon.name as keyof typeof dynamicIconImports]),
      [icon.name],
    )

    return (
      <Suspense fallback={fallback}>
        <LucideIcon
          size={size ?? 24}
          className={clsx(className, twColour, 'pointer-events-none' /* ← let clicks through */)}
          {...(inlineColour ? { style: inlineColour } : {})}
        />
      </Suspense>
    )
  }

  /* ------------------------------------------------------------------ */
  /*  Uploaded SVG                                                       */
  /* ------------------------------------------------------------------ */
  if (source === 'upload') {
    const url =
      typeof icon.upload === 'string'
        ? icon.upload
        : typeof icon.upload === 'object' && icon.upload
          ? icon.upload.url
          : undefined

    if (!url) return null

    const [svgMarkup, setSvgMarkup] = useState<string | null>(svgCache.get(url) ?? null)

    useEffect(() => {
      if (svgMarkup || !url) return

      let cancelled = false
      fetch(url)
        .then((res) => res.text())
        .then((txt) => {
          if (!cancelled) {
            svgCache.set(url, txt)
            setSvgMarkup(txt)
          }
        })
        .catch(() => !cancelled && setSvgMarkup(null))

      return () => {
        cancelled = true
      }
    }, [url, svgMarkup])

    if (!svgMarkup) return fallback

    return (
      <div
        className={clsx(className, twColour, 'pointer-events-none' /* ← let clicks through */)}
        style={{ width: size ?? 24, height: size ?? 24, ...inlineColour }}
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
    )
  }

  return null
}

/* -------------------------------------------------------------------------- */
/*  Memo-wrap so parent re-renders don’t       */
/*  re-render the icon unless `icon` changes   */
/* -------------------------------------------------------------------------- */

export default memo(_RenderIcon)
