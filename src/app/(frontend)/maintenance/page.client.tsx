'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MaintenancePage = ({ MAINTENANCE_PASSWORD }: { MAINTENANCE_PASSWORD: string }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Check if the password is correct.
    if (password === MAINTENANCE_PASSWORD) {
      // Set a cookie that expires in 1 day.
      const expireDate = new Date()
      expireDate.setDate(expireDate.getDate() + 1)
      document.cookie = `maintenance_access=${password}; path=/; expires=${expireDate.toUTCString()};`
      router.push('/') // Redirect to home page (or the original page).
    } else {
      setError('Incorrect password.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl mb-4">Maintenance Mode</h1>
      <p className="mb-8">
        The site is currently undergoing maintenance. Please enter the password to continue.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter maintenance password"
          className="border p-2 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  )
}

export default MaintenancePage
