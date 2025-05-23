import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Setting } from '@/payload-types'

export async function getSettings() {
  console.log('Fetching settings...')
  const settings = (await getCachedGlobal('settings', 1)()) as Setting
  console.log('Fetched settings')
  return settings
}
