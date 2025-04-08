'use client'

import { Media, Setting } from '@/payload-types'
import { themeLocalStorageKey } from '@/providers/Theme/ThemeSelector/types'
import clsx from 'clsx'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  dataTheme?: 'dark' | 'light'
  width?: number
  height?: number
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props
  const [settings, setSettings] = useState<undefined | Setting>()
  const [value, setValue] = useState('')

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/globals/settings')
      const data = await res.json()
      setSettings(data)
    } catch (error) {
      console.log('Something went wrong while fetching settings')
    }
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const computedLogo = useMemo(() => {
    // Use dataTheme prop if provided, otherwise use the local state "value"
    const themeUsed = props.dataTheme || value
    const logoString = themeUsed === 'light' ? 'logoDark' : 'logoLight'

    if (settings && settings[logoString]) {
      const media = settings[logoString] as Media
      if (typeof media.url === 'string') {
        return media.url
      }
    }
    return '/api/media/file/Standard - Primaryw300px-300x160.png'
  }, [settings, value, props.dataTheme])

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      width={props.width ?? 100}
      height={props.height ?? 34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('object-contain', className)}
      src={computedLogo}
    />
  )
}
