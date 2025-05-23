import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header, Setting } from '@/payload-types'

export async function Header() {
  console.log('Fetching header...')
  const headerData: Header = await getCachedGlobal('header', 1)()
  console.log('Header data:', headerData)

  console.log('Fetching settings...')
  const settings: Setting = await getCachedGlobal('settings', 1)()
  console.log('Settings data:', settings)

  return <HeaderClient data={headerData} settings={settings} />
}
