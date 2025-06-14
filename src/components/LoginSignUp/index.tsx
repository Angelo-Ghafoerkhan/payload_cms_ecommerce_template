'use client'

import Input from '@/components/forms/react-hook-form/Input/Input'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'

import Button from '@/components/Button'
import { toast } from 'react-toast'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import ModalNoConfirm from '@/components/ModalNoConfirm'

import CreatePassword from '@/collections/Users/components/CreatePassword'
import { mergeCartsAfterLogin } from '@/collections/Ecommerce/Carts/utils/cartFunctions'
import { Metadata } from 'next'
import { useHeaderTheme } from '@/providers/HeaderTheme'

interface LoginSignUpProps {
  onAuth?: () => void // ← new optional prop
}

const LoginSignUp: FC<LoginSignUpProps> = ({ onAuth }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [passwordsValid, setPasswordsValid] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

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
          onAuth?.()
          router.push(pathname)
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
        onAuth?.()
        router.push(pathname)
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
            animatePlaceholder={false}
          />
          <div className="mt-8 flex">
            <Button type="submit" onClick={handleRequestPassword}>
              Request Password Reset
            </Button>
          </div>
        </form>
      </ModalNoConfirm>
      <div>
        <div className="pb-32 w-full flex items-center justify-center flex-col bg-cover">
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
                  animatePlaceholder={false}
                />
              )}
              <Input
                type="text"
                label="Email Address"
                required
                id="email"
                register={register}
                errors={errors}
                animatePlaceholder={false}
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
                <Button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</Button>
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

export default LoginSignUp
