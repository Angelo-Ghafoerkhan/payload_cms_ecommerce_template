import { Metadata } from 'next'
import PageClient from './page.client'
import { siteName } from '@payload-config'

export const metadata: Metadata = {
  title: `My Account | ${siteName}`,
}

export default async function Page() {
  return <PageClient />
}
