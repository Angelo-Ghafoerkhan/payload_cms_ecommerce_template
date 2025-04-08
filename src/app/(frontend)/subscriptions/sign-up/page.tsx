import { Metadata } from 'next'
import PageContent from './_components/Page'
import { useSearchParams } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Subscription Sign Up',
  description: 'Subscription Sign Up',
}

const Page = async () => {
  return <PageContent />
}

export default Page
