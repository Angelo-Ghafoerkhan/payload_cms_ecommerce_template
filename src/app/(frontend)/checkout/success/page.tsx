import { siteName } from '@payload-config'
import PageContent from './_components/Page'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Order Success | ${siteName}`,
  description: 'Order Confirmation',
}

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <PageContent />
    </div>
  )
}
