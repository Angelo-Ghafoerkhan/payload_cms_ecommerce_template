'use client'

import React, { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from '@/components/Button'
import LoaderFullPage from '@/components/Loaders/LoaderFullPage'

const PageContent = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const sessionId = searchParams.get('sessionId')

  useEffect(() => {
    if (!sessionId) {
      router.push('/')
      return
    }
    // Clear the cart or any other logic
  }, [router, sessionId])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl text-primary font-bold">We&#39;ve Got Your Order!</h1>
      <p className="text-lg my-8">You should have received an email with confirmation.</p>
      <Button type="button" link="/" rounded="lg">
        Continue Shopping
      </Button>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<LoaderFullPage loading={true} />}>
      <PageContent />
    </Suspense>
  )
}
