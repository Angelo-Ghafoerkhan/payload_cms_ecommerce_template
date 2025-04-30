'use client'

import Input from '@/components/forms/react-hook-form/Input/Input'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'

import Button from '@/components/Button'
import { toast } from 'react-toast'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ModalNoConfirm from '@/components/ModalNoConfirm'

import CreatePassword from '@/collections/Users/components/CreatePassword'
import { mergeCartsAfterLogin } from '@/collections/Ecommerce/Carts/utils/cartFunctions'

import { useHeaderTheme } from '@/providers/HeaderTheme'

export default function Page() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [passwordsValid, setPasswordsValid] = useState(false)

  const router = useRouter()

  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  })

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const response = await fetch('/api/users/me')
      const data = await response.json()
      const { user } = data

      if (user?.role === 'customer') router.push('/account')
      else if (user?.role === 'admin') router.push('/admin')
    }

    checkIsLoggedIn()
  }, [router])

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    if (isSignUp) {
      // Handle account creation
      if (!passwordsValid) {
        toast.error('Password does not meet requirements')
        return
      }

      const res = await fetch('/api/base/users/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          createPassword: data.createPassword,
        }),
      })

      if (res.ok) {
        toast.success('Account created successfully')
        setIsSignUp(false)
        // Handle login
        const res = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.createPassword,
          }),
        })

        if (res.ok) {
          const userData = await res.json()
          await mergeCartsAfterLogin(userData.user.id)
          // toast.success('Logged in successfully')
          // Redirect based on user role
          if (userData.user?.role === 'customer') router.push('/account')
          else if (userData.user?.role === 'admin') router.push('/admin')
        } else {
          const errorData = await res.json()
          toast.error(errorData.message || 'Failed to log in')
        }
      } else {
        const errorData = await res.json()
        toast.error(errorData.message || 'Failed to create account')
      }
    } else {
      // Handle login
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      if (res.ok) {
        const userData = await res.json()
        await mergeCartsAfterLogin(userData.user.id)
        // toast.success('Logged in successfully')
        // Redirect based on user role
        if (userData.user?.role === 'customer') router.push('/account')
        else if (userData.user?.role === 'admin') router.push('/admin')
      } else {
        const errorData = await res.json()
        toast.error(errorData.message || 'Failed to log in')
      }
    }
  }

  const emailToReset = watch('emailToReset')

  const handleRequestPassword = async () => {
    const response = await fetch('/api/users/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailToReset }),
    })

    if (response.ok) {
      toast.success('If you have an account, an email has been sent')
      setModalOpen(false)
    } else {
      toast.error('Something went wrong')
    }
  }

  return (
    <>
      <ModalNoConfirm onClose={() => setModalOpen(false)} isOpen={modalOpen}>
        <form onSubmit={handleRequestPassword}>
          <Input
            type="text"
            label="Email Address"
            required
            id="emailToReset"
            register={register}
            errors={errors}
          />
          <div className="mt-8 flex">
            <Button text="Request Password Reset" type="submit" onClick={handleRequestPassword} />
          </div>
        </form>
      </ModalNoConfirm>
      <div>
        <div className="pt-48 pb-32 w-full flex items-center justify-center flex-col bg-cover">
          <div className="mt-8 bg-card w-11/12 p-4 lg:p-8 max-w-[500px] mx-auto rounded-md shadow-sm shadow-gray-200">
            <h1 className="font-bold text-2xl text-center mb-6">
              {isSignUp ? 'Create an account' : 'Login to your account'}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {isSignUp && (
                <Input
                  type="text"
                  label="Name"
                  required
                  id="name"
                  register={register}
                  errors={errors}
                />
              )}
              <Input
                type="text"
                label="Email Address"
                required
                id="email"
                register={register}
                errors={errors}
              />
              {!isSignUp && (
                <Input
                  type="password"
                  label="Password"
                  required
                  id="password"
                  register={register}
                  errors={errors}
                  animatePlaceholder={false}
                />
              )}
              {isSignUp && (
                <CreatePassword
                  register={register}
                  watch={watch}
                  errors={errors}
                  onValidityChange={(isValid) => setPasswordsValid(isValid)}
                />
              )}

              {!isSignUp && (
                <div className="flex justify-end">
                  <p
                    className="hover:text-tertiary transition-colors cursor-pointer"
                    onClick={() => setModalOpen(true)}
                  >
                    Forgot Password
                  </p>
                </div>
              )}
              <div className="flex mt-8">
                <Button text={isSignUp ? 'Sign Up' : 'Log In'} type="submit" />
              </div>
            </form>
            <div className="flex justify-center mt-4">
              {isSignUp ? (
                <p>
                  Already have an account?{' '}
                  <span className="text-tertiary cursor-pointer" onClick={() => setIsSignUp(false)}>
                    Log in
                  </span>
                </p>
              ) : (
                <p>
                  Don&lsquo;t have an account?{' '}
                  <span className="text-tertiary cursor-pointer" onClick={() => setIsSignUp(true)}>
                    Sign up
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
