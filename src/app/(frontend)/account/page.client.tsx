'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { clearCart } from '@/collections/Ecommerce/Carts/utils/cartFunctions'
import SingleOrder from './_components/SingleOrder'
import { Order, Subscription } from '@/payload-types'
import SingleSubscription, { SubscriptionWithOrdersAndPlan } from './_components/SingleSubscription'
import LoaderFullPage from '@/components/Loaders/LoaderFullPage'

interface User {
  id: string
  name: string
  email: string
}

const TABS = {
  user: 'user',
  orders: 'orders',
  subscriptions: 'subscriptions',
}

const Page = () => {
  return (
    <Suspense fallback={<LoaderFullPage loading={true} />}>
      <PageClient />
    </Suspense>
  )
}

const PageClient: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithOrdersAndPlan[]>([])
  const [activeTab, setActiveTab] = useState<string>(TABS.user)
  const router = useRouter()
  const searchParams = useSearchParams()

  // reset the cart if the url has come from stripe
  useEffect(() => {
    async function handleClearCart() {
      const sessionId = searchParams.get('session_id')
      if (sessionId) {
        try {
          await clearCart()
        } catch (error) {
          console.error('Error clearing cart:', error)
        }
      }
    }
    handleClearCart()
  }, [searchParams])

  // Read active tab from query parameter on mount.
  useEffect(() => {
    const tabFromQuery = searchParams.get('tab')
    if (tabFromQuery && Object.values(TABS).includes(tabFromQuery)) {
      setActiveTab(tabFromQuery)
    }
  }, [searchParams])

  // Fetch the current user. If not found, redirect to /login.
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
          cache: 'no-store',
        })
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json()
        if (!data.user) {
          router.push('/login')
        } else {
          setUser(data.user)
        }
      } catch (err) {
        console.error('Error fetching user:', err)
        router.push('/login')
      }
    }
    fetchUser()
  }, [router])

  // Fetch orders and subscriptions after user is available.
  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const ordersURL =
            `${process.env.NEXT_PUBLIC_SERVER_URL}` +
            `/api/orders?where[user][equals]=${encodeURIComponent(user.id)}`

          const response = await fetch(ordersURL, { cache: 'no-store' })

          if (!response.ok) throw new Error(response.statusText)
          const data = await response.json()

          setOrders(data.docs || [])
        } catch (err) {
          console.error('Error fetching orders:', err)
        }
      }

      const fetchSubscriptions = async () => {
        try {
          const subscriptionsUrl =
            `${process.env.NEXT_PUBLIC_SERVER_URL}` +
            `/api/subscriptions?where[user][equals]=${encodeURIComponent(user.id)}`

          const response = await fetch(subscriptionsUrl, { cache: 'no-store' })

          if (!response.ok) throw new Error(response.statusText)
          const data = await response.json()
          setSubscriptions(data.docs || [])
        } catch (err) {
          console.error('Error fetching subscriptions:', err)
        }
      }

      fetchOrders()
      fetchSubscriptions()
    }
  }, [user])

  // When changing tabs, update state and the query parameter.
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    const params = new URLSearchParams(window.location.search)
    params.set('tab', tab)
    router.replace(`${window.location.pathname}?${params.toString()}`)
  }

  return (
    <div className="container mt-48 min-h-screen">
      <div className="prose">
        <h1>My Account</h1>
      </div>

      {/* Tabs for navigation */}
      <div className="mt-8 flex space-x-4 border-b pb-2">
        <button
          onClick={() => handleTabChange(TABS.user)}
          className={`px-4 py-2 ${
            activeTab === TABS.user ? 'border-b-2 border-primary font-bold' : 'text-gray-600'
          }`}
        >
          User Info
        </button>
        <button
          onClick={() => handleTabChange(TABS.orders)}
          className={`px-4 py-2 ${
            activeTab === TABS.orders ? 'border-b-2 border-primary font-bold' : 'text-gray-600'
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => handleTabChange(TABS.subscriptions)}
          className={`px-4 py-2 ${
            activeTab === TABS.subscriptions
              ? 'border-b-2 border-primary font-bold'
              : 'text-gray-600'
          }`}
        >
          Subscriptions
        </button>
      </div>

      <div className="tab-content mt-8">
        {activeTab === TABS.user && user && (
          <div>
            <h2 className="text-3xl font-header mb-4">User Info</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
        {activeTab === TABS.orders && (
          <div>
            <h2 className="text-3xl font-header mb-4">Orders</h2>
            {orders.length > 0 ? (
              orders.map((order) => <SingleOrder key={order.id} order={order} />)
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        )}
        {activeTab === TABS.subscriptions && (
          <div>
            <h2 className="text-3xl font-header mb-4">Subscriptions</h2>
            {subscriptions.length > 0 ? (
              subscriptions.map((sub) => <SingleSubscription key={sub.id} subscription={sub} />)
            ) : (
              <p>No subscriptions found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
