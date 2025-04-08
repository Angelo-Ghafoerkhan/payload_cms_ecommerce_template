import React, { useState } from 'react'
import Link from 'next/link'
import { Plan, Subscription, SubscriptionOrder } from '@/payload-types'

export interface SubscriptionWithOrdersAndPlan extends Omit<Subscription, 'plan' | 'orders'> {
  plan: Plan
  orders: SubscriptionOrder[]
}

const SingleSubscription: React.FC<{ subscription: SubscriptionWithOrdersAndPlan }> = ({
  subscription,
}) => {
  const [expanded, setExpanded] = useState(false)

  // Define status color based on subscription status.
  let statusColor = 'text-orange-500' // default: pending or other
  if (subscription.status === 'active') statusColor = 'text-green-500'
  else if (subscription.status === 'cancelled' || subscription.status === 'paused')
    statusColor = 'text-red-500'

  return (
    <div key={subscription.id} className="border p-4 mb-4 rounded-md shadow-sm">
      {/* Summary Section */}
      <div className="flex justify-between items-center">
        <div>
          <p>
            <strong>Plan:</strong> {subscription.plan.name}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={`${statusColor} capitalize`}>{subscription.status}</span>
          </p>
          <p>
            <strong>Start Date:</strong> {new Date(subscription.startDate).toLocaleDateString()}
          </p>
          {subscription.endDate && (
            <p>
              <strong>End Date:</strong> {new Date(subscription.endDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-4">
          {subscription.orders && subscription.orders.length > 0 ? (
            <div>
              <h3 className="font-bold mb-2">Subscription Orders</h3>
              {subscription.orders.map((order) => (
                <div key={order.id} className="border p-2 mb-2 rounded">
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className="capitalize">{order.paymentStatus}</span>
                  </p>
                  <p>
                    <strong>Amount:</strong> £{order.amount.toFixed(2)}
                  </p>
                  <p>
                    <strong>Payment Date:</strong>{' '}
                    {new Date(order.paymentDate as string).toLocaleDateString()}
                  </p>
                  {order.invoice && order.invoice.url && (
                    <p>
                      <strong>Invoice:</strong>{' '}
                      <Link href={order.invoice.url} className="underline text-blue-500">
                        View Invoice
                      </Link>
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No subscription orders found.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default SingleSubscription
