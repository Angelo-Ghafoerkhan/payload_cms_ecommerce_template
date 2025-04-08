'use client'

import React, { useEffect } from 'react'
import Button from '@/components/Button'
import { clearCart } from '@/collections/Ecommerce/Carts/utils/cartFunctions'
import { useRouter, useSearchParams } from 'next/navigation'

const Page = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const sessionId = searchParams.get('sessionId') as string

  useEffect(() => {
    if (!sessionId) {
      router.push('/')
      return
    }
    // Clear the cart when this page loads.
    clearCart().catch((error) => console.error('Failed to clear cart:', error))
  }, [router, sessionId])

  return (
    <>
      <h1 className="text-5xl text-primary font-bold font-header">We&lsquo;ve Got Your Order!</h1>
      <p className="text-lg my-8 font-body text-foreground">
        You should have received an email with confirmation.
      </p>
      <div>
        <Button text={'Continue Shopping'} type={'button'} link={'/'} rounded="lg" />
      </div>
    </>
  )
}

export default Page
