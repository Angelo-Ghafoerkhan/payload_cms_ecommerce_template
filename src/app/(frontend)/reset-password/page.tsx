// app/(frontend)/reset-password/page.tsx
'use client'

import { Suspense } from 'react'
import ResetPassword from '@/components/ResetPassword'
import LoaderFullPage from '@/components/Loaders/LoaderFullPage'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoaderFullPage loading={true} />}>
      <div className="pt-48 container">
        <ResetPassword />
      </div>
    </Suspense>
  )
}
