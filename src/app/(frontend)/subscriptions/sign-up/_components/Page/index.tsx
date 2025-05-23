'use client'

import Button from '@/components/Button'
import LoaderFullPage from '@/components/Loaders/LoaderFullPage'
import LoginSignUp from '@/components/LoginSignUp'
import { Plan } from '@/payload-types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'react-toast'

const Page = () => {
  return (
    <Suspense fallback={<LoaderFullPage loading={true} />}>
      <PageClient />
    </Suspense>
  )
}

const PageClient = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [showLogin, setShowLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [planData, setPlanData] = useState<Plan | undefined>(undefined)

  // Get the planId from the query string. If not found, default to an empty string.
  const planId = searchParams.get('planId') || ''

  // Check if user is logged in and store the user in state.
  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const response = await fetch('/api/users/me')
      const data = await response.json()
      const { user } = data

      if (user) {
        setShowLogin(false)
        setCurrentUser(user)
      } else {
        setShowLogin(true)
        setCurrentUser(null)
      }
    }

    checkIsLoggedIn()
  }, [pathname])

  // Fetch plan details.
  useEffect(() => {
    const fetchPlan = async () => {
      if (!planId) {
        router.back()
        return
      }

      try {
        const response = await fetch(`/api/plans/${planId}?depth=2`)
        if (!response.ok) {
          console.error('Failed to fetch plan data')
          return
        }
        const plan = await response.json()
        setPlanData(plan)
      } catch (error) {
        console.error('Error fetching plan:', error)
      }
    }

    fetchPlan()
  }, [planId, router])

  // Map subscriptionTerm to a formatted string.
  const subscriptionTermMapping: Record<string, string> = {
    monthly: '1 Month',
    quarterly: '3 Months',
    'semi-annually': '6 Months',
    yearly: '12 Months',
  }
  const formattedSubscriptionTerm =
    subscriptionTermMapping[planData?.subscriptionTerm as string] || planData?.subscriptionTerm

  // Function to create the subscription by calling your API route.
  async function createSubscription() {
    if (!currentUser || !planData) {
      toast.error('User or plan data missing.')
      return
    }

    try {
      const res = await fetch('/api/base/subscriptions/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id, planId: planData.id }),
      })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url // Redirect the customer to Stripe Checkout.
      } else {
        console.error(data.message)
        toast.error(data.message || 'Failed to create subscription.')
      }
    } catch (error) {
      console.error('Error in createSubscription:', error)
      toast.error('An error occurred while creating subscription.')
    }
  }

  return (
    <div className="mt-48 mb-32 container">
      {showLogin && <LoginSignUp />}
      {!showLogin && (
        <div>
          <h1 className="font-header text-4xl">SELECTED PACKAGE</h1>
          <h2 className="text-2xl font-header my-3">{formattedSubscriptionTerm}</h2>
          <h3 className="text-xl mb-8">£{planData?.price} / month</h3>
          <Button type="button" link="/pricing" rounded="lg">
            Change Package
          </Button>

          <div className="mt-20">
            <Button type="button" onClick={createSubscription} rounded="lg">
              Proceed To Payment Setup
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
