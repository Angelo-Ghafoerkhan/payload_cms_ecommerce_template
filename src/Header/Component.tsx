import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header, Setting } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const settings: Setting = await getCachedGlobal('settings', 1)()

  return <HeaderClient data={headerData} settings={settings} />
}
