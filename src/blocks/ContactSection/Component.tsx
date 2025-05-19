import { getSettings } from '@/Globals/Settings/Component'
import ContactSectionClient from './Component.client'

export async function ContactSection() {
  const settings = await getSettings()

  return <ContactSectionClient settings={settings} />
}

export default ContactSection
