'use client'

import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface ShippingRate {
  id: string
  name: string
  cost: number
}

interface SelectShippingProps {
  id: string
  label: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

const SelectShipping: React.FC<SelectShippingProps> = ({
  id,
  label,
  required = false,
  register,
  errors,
}) => {
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    const fetchShippingRates = async () => {
      try {
        const res = await fetch('/api/shipping?depth=1&draft=false', {
          cache: 'no-store',
        })
        if (!res.ok) {
          throw new Error(`Error fetching shipping rates: ${res.statusText}`)
        }
        const data = await res.json()
        // Adjust this if your API response structure differs:
        const rates: ShippingRate[] = data.docs || data
        setShippingRates(rates)
      } catch (error) {
        setFetchError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchShippingRates()
  }, [])

  if (loading) {
    return <div>Loading shipping options...</div>
  }

  if (fetchError) {
    return <div className="text-red-600">Error: {fetchError}</div>
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-xl after:content-['*'] after:text-red-600">
        {label}
      </label>
      <select
        id={id}
        {...register(id, { required })}
        className={clsx(
          'w-full pl-4 bg-transparent border-2 rounded-md min-h-10 px-4',
          !errors[id] ? 'border-border' : 'border-red-600',
        )}
      >
        <option value="">Select a shipping option</option>
        {shippingRates.map((rate) => (
          <option key={rate.id} value={rate.id} className="text-black capitalize">
            {rate.name} - £{rate.cost.toFixed(2)}
          </option>
        ))}
      </select>
      {errors[id] && <span className="text-red-600 text-sm mt-1">This field is required</span>}
    </div>
  )
}

export default SelectShipping
