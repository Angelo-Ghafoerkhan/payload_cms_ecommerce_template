import { Metadata } from 'next'
import CartPage from './page.client'
import { siteName } from '@payload-config'

export const metadata: Metadata = {
  title: `Cart | ${siteName}`,
  description: 'Your shopping cart',
}

export default async function Page() {
  return <CartPage />
}
