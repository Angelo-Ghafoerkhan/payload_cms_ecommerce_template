'use client'

import Button from '@/components/Button'
import { Plan } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useEffect, useState } from 'react'
import ItemLoaderShimmer from '@/components/Loaders/ItemLoaderShimmer'

export interface SubscriptionPlanBlockProps {
  subscriptionPlan: Plan | string
}

const SubscriptionPlanBlock: React.FC<SubscriptionPlanBlockProps> = ({ subscriptionPlan }) => {
  const [plan, setPlan] = useState<Plan | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch(
          `/api/plans/${(subscriptionPlan as Plan).id ?? subscriptionPlan}?depth=1&draft=false&locale=undefined`,
          { cache: 'no-store' },
        )

        if (!response.ok) {
          throw new Error(`Error fetching plan: ${response.statusText}`)
        }

        const planData = await response.json()
        setPlan(planData)
      } catch (err) {
        setError((err as Error).message)
      }
    }

    fetchPlan()
  }, [subscriptionPlan])

  if (error) {
    return <div>Error: {error}</div>
  }

  // Show the loader until the plan is fetched
  if (!plan) {
    return <ItemLoaderShimmer className="h-96 w-full" />
  }

  // Map the stored subscription term to a formatted string.
  const subscriptionTermMapping: Record<string, string> = {
    monthly: '1 Month',
    quarterly: '3 Months',
    'semi-annually': '6 Months',
    yearly: '12 Months',
  }

  const formattedSubscriptionTerm =
    subscriptionTermMapping[plan.subscriptionTerm] || plan.subscriptionTerm

  return (
    <div>
      <div className="bg-card shadow-uniform p-4 flex flex-col">
        <h3 className="m-0">{formattedSubscriptionTerm}</h3>
        <h4 className="font-body font-normal">£{plan.price} / month</h4>
        <RichText data={plan.description} />
        <Button type="button" rounded="lg" link={`/subscriptions/sign-up?planId=${plan.id}`}>
          Sign Up Now
        </Button>
      </div>
    </div>
  )
}

export default SubscriptionPlanBlock
