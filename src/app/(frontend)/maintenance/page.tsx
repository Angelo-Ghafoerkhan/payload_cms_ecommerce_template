import { getSettings } from '@/Globals/Settings/Component'
import MaintenancePage from './page.client'
import { Metadata } from 'next'
import { siteName } from '@payload-config'

export const metadata: Metadata = {
  title: `Site Under Maintenance | ${siteName}`,
}
export default async function Page() {
  const settings = await getSettings()

  return <MaintenancePage MAINTENANCE_PASSWORD={settings.maintenancePassword ?? ''} />
}
