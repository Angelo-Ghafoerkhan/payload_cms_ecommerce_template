'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Order } from '@/payload-types'

interface SingleOrderProps {
  order: Order
}

const SingleOrder: React.FC<SingleOrderProps> = ({ order }) => {
  const [expanded, setExpanded] = useState(false)

  // Determine status color.
  let statusColor = 'text-orange-500' // default: pending
  if (order.paymentStatus === 'paid') statusColor = 'text-green-500'
  else if (order.paymentStatus === 'failed') statusColor = 'text-red-500'

  // Helper function to extract image URL from a line item.
  const getImageUrl = (item: any): string => {
    if (item.product && typeof item.product === 'object') {
      const prod = item.product
      // If product is variable, try to get the variant image.
      if (prod.productType === 'variable' && Array.isArray(prod.variants)) {
        const variant = prod.variants.find((v: any) => v.sku === item.productVariant)
        if (variant && variant.image) {
          return variant.image.url || ''
        }
      }
      // Fallback: use the first image of the product.
      if (prod.images && prod.images.length > 0) {
        return prod.images[0].url || ''
      }
    }
    return ''
  }

  return (
    <div key={order.id} className="border p-4 mb-4 rounded-md shadow-sm">
      {/* Summary Section */}
      <div className="flex justify-between items-center">
        <div>
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Status:</strong> <span className={statusColor}>{order.paymentStatus}</span>
          </p>
          <p>
            <strong>Total:</strong> £{order.total.toFixed(2)}
          </p>
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
          {order.invoice && order.invoice.url && (
            <p>
              <strong>Invoice:</strong>{' '}
              <Link href={order.invoice.url} className="underline text-blue-600">
                View Invoice
              </Link>
            </p>
          )}

          {/* Shipping Address */}
          {order.address && (
            <div className="mt-4">
              <h3 className="font-bold">Shipping Address</h3>
              {order.address.line1 && <p>{order.address.line1}</p>}
              {order.address.line2 && <p>{order.address.line2}</p>}
              {order.address.city && <p>{order.address.city}</p>}
              {order.address.postCode && <p>{order.address.postCode}</p>}
            </div>
          )}

          {/* Line Items */}
          <div className="mt-4">
            <strong>Line Items:</strong>
            {order.lineItems && order.lineItems.length > 0 ? (
              order.lineItems.map((item: any, index: number) => (
                <div key={index} className="flex items-center space-x-4 border p-2 my-2 rounded-md">
                  {getImageUrl(item) && (
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={getImageUrl(item)}
                        alt="Product Image"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div>
                    <p>
                      <strong>Product:</strong>{' '}
                      {typeof item.product === 'object' ? item.product.name : item.product}
                    </p>
                    {item.productVariant && item.productVariant !== 'default' && (
                      <p>
                        <strong>Variant:</strong> {item.productVariant}
                      </p>
                    )}
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Line Price:</strong> £{item.linePrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No line items found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleOrder
