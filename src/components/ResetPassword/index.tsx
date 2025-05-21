'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import Button from '@/components/Button'
import { useState } from 'react'
import CreatePassword from '@/collections/Users/components/CreatePassword'

const ResetPassword = () => {
  const [passwordsValid, setPasswordsValid] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get('token') as string

  if (!token) {
    router.push('/client/login')
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {},
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    if (data.createPassword === data.repeatPassword) {
      const res = await fetch(`/api/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          password: data.password,
        }),
      })
        .then(() => {
          router.push('/login')
        })
        .catch(() => {
          toast.error('Something went wrong while changing password')
        })
    } else {
      toast.error('Passwords do not match')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-lg w-11/12 mx-auto max-w-[800px] mt-32 pb-32"
    >
      <h1 className="text-3xl font-bold mb-2">Password Reset</h1>
      <p className="mb-8">Please input a new password below.</p>

      <CreatePassword
        watch={watch}
        register={register}
        errors={errors}
        onValidityChange={(isValid) => setPasswordsValid(isValid)}
      />

      <div className="flex justify-center items-center mt-16">
        <Button type="submit" disabled={!passwordsValid}>
          Submit
        </Button>
      </div>
    </form>
  )
}

export default ResetPassword
