'use client'

import Button from '@/components/Button'
import LoginSignUp from '@/components/LoginSignUp'
import { Plan } from '@/payload-types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'react-toast'
import Image from 'next/image'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from '@/components/forms/react-hook-form/Input/Input'
import UploadFile, { fileToBase64 } from '@/components/forms/react-hook-form/UploadFile'
import LoaderFullPage from '@/components/Loaders/LoaderFullPage'

const Page = () => {
  return (
    <Suspense fallback={<LoaderFullPage loading={true} />}>
      <PageContent />
    </Suspense>
  )
}

const PageContent = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [showLogin, setShowLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [planData, setPlanData] = useState<Plan | undefined>(undefined)
  const [submitting, setSubmitting] = useState(false) // Prevent multiple submissions
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  // Get the planId from the query string. If not found, default to empty string.
  const planId = searchParams.get('planId') || ''

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    control,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      bodyWeight: '',
      hoursPerWeekTraining: '',
      jobTitle: '',
      foodAllergies: '',
      healthConditions: '',
      goalWeight: '',
      howOftenContact: '',
      foodDislikes: '',
      anyQuestions: '',
      images: '',
    },
  })

  // Check if the user is logged in.
  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const response = await fetch('/api/users/me')
      const data = await response.json()
      const { user } = data

      if (user) {
        setShowLogin(false)
        setCurrentUser(user)
      } else {
        setShowLogin(true)
        setCurrentUser(null)
      }
    }
    checkIsLoggedIn()
  }, [pathname])

  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  // Fetch plan details.
  useEffect(() => {
    const fetchPlan = async () => {
      if (!planId) {
        router.back()
        return
      }
      try {
        const response = await fetch(`/api/plans/${planId}?depth=2`)
        if (!response.ok) {
          console.error('Failed to fetch plan data')
          return
        }
        const plan = await response.json()
        setPlanData(plan)
      } catch (error) {
        console.error('Error fetching plan:', error)
      }
    }
    fetchPlan()
  }, [planId, router])

  // Map subscriptionTerm to a formatted string.
  const subscriptionTermMapping: Record<string, string> = {
    monthly: '1 Month',
    quarterly: '3 Months',
    'semi-annually': '6 Months',
    yearly: '12 Months',
  }
  const formattedSubscriptionTerm =
    subscriptionTermMapping[planData?.subscriptionTerm as string] || planData?.subscriptionTerm

  // Function to create the subscription by calling your API route.
  async function createSubscription() {
    if (!currentUser || !planData) {
      toast.error('User or plan data missing.')
      return
    }

    try {
      const res = await fetch('/api/base/subscriptions/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id, planId: planData.id }),
      })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url // Redirect to Stripe Checkout.
      } else {
        console.error(data.message)
        toast.error(data.message || 'Failed to create subscription.')
      }
    } catch (error) {
      console.error('Error in createSubscription:', error)
      toast.error('An error occurred while creating subscription.')
    }
  }

  // onSubmit handler.
  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    if (submitting) return // Prevent duplicate submission
    setSubmitting(true)

    let imagesBase64: { name: string; data: string } | { name: string; data: string }[] = []

    if (formData.images) {
      if (Array.isArray(formData.images)) {
        imagesBase64 = await Promise.all(
          formData.images.map(async (file: File) => ({
            name: file.name,
            data: await fileToBase64(file),
          })),
        )
      } else {
        const file = formData.images as File
        imagesBase64 = { name: file.name, data: await fileToBase64(file) }
      }
    }

    // Overwrite the images field with the converted base64 data.
    const payloadData = {
      ...formData,
      images: imagesBase64,
    }

    try {
      await fetch('/api/base/subscriptions/sign-up/form', {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadData),
      })
      await createSubscription()
      setSuccess(true)
      setError(false)

      reset()
    } catch (err) {
      setSuccess(false)
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (showLogin) {
    return (
      <div className="mt-48 mb-32 container">
        <LoginSignUp onAuth={() => setShowLogin(false)} />
      </div>
    )
  } else {
    return (
      <>
        <div className="relative flex items-center justify-center text-white h-min">
          {/* Overlay */}
          <div className="bg-black bg-opacity-40 w-full h-full min-h-[70vh] flex items-center">
            <div
              className="container mt-16 lg:mt-0 z-10 relative flex items-center"
              data-theme="dark"
            >
              <div className="max-w-[800px] prose md:prose-md dark:prose-invert">
                <div>
                  <h1>SELECTED PACKAGE</h1>
                  <h2 className="text-2xl font-header my-3">{formattedSubscriptionTerm}</h2>
                  <h3 className="text-xl mb-8">£{planData?.price} / month</h3>
                  <Button type="button" link="/pricing" rounded="lg">
                    Change Package
                  </Button>
                </div>
              </div>
            </div>
            {/* Overlay Shading */}
            <div className="absolute -bottom-px bg-gradient-to-b from-transparent to-background w-full h-1/2" />
          </div>
          {/* Background Image */}
          <div className="min-h-[50vh] select-none">
            <Image
              src="/api/media/file/healthy-food-bowl-1.jpeg"
              alt=""
              fill
              className="-z-10 object-cover"
              priority
            />
          </div>
        </div>
        <div className="container">
          <form className="my-32 flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)}>
            {/* Form Top: User Information */}
            <div>
              <h2 className="font-header mb-8 text-2xl">Your Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                <Input
                  id="name"
                  placeholder="Your Name"
                  label="Name"
                  register={register}
                  errors={errors}
                  animatePlaceholder={true}
                  watch={watch}
                  required
                />
                <Input
                  id="email"
                  placeholder="Your Email"
                  label="Email"
                  register={register}
                  errors={errors}
                  animatePlaceholder={true}
                  watch={watch}
                  required
                />
                <Input
                  id="phone"
                  placeholder="Phone Number"
                  label="Phone Number"
                  register={register}
                  errors={errors}
                  animatePlaceholder={true}
                  watch={watch}
                  required
                />
              </div>
            </div>

            {/* Form Bottom: Goals and Additional Information */}
            <div>
              <h2 className="font-header mb-8 text-2xl">A Little More About Your Goals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                <Input
                  id="bodyWeight"
                  label="What is your current body weight?"
                  register={register}
                  errors={errors}
                  animatePlaceholder={true}
                  watch={watch}
                  required
                />
                <Input
                  id="hoursPerWeekTraining"
                  label="How many hours a week do you train?"
                  register={register}
                  errors={errors}
                  animatePlaceholder={true}
                  watch={watch}
                  required
                />
                <Input
                  id="jobTitle"
                  label="What is your current job title?"
                  register={register}
                  errors={errors}
                  animatePlaceholder={true}
                  watch={watch}
                  required
                />
                <Input
                  id="foodAllergies"
                  label="Do you have any food allergies?"
                  register={register}
                  errors={errors}
                  animatePlaceholder={true}
                  watch={watch}
                  required
                />
                <Input
                  id="healthConditions"
                  label="Do you have any health conditions? (Diabetes, Crohn's, etc)"
                  register={register}
                  errors={errors}
                  animatePlaceholder={true}
                  watch={watch}
                  required
                />
                <Input
                  id="goalWeight"
                  label="What is your goal weight?"
                  register={register}
                  errors={errors}
                  animatePlaceholder={true}
                  watch={watch}
                  required
                />
                <Input
                  id="howOftenContact"
                  label="How often would you like contact with me?"
                  register={register}
                  errors={errors}
                  animatePlaceholder={true}
                  watch={watch}
                  required
                />
                <Input
                  id="foodDislikes"
                  label="Are there any foods you dislike?"
                  register={register}
                  errors={errors}
                  animatePlaceholder={true}
                  watch={watch}
                  required
                />
                <Input
                  id="anyQuestions"
                  type="textarea"
                  label="Any questions you’d like to ask me?"
                  register={register}
                  errors={errors}
                  animatePlaceholder={false}
                  watch={watch}
                  required
                />
                <UploadFile
                  id="images"
                  errors={errors}
                  accepts="jpg, jpeg, png"
                  control={control}
                  label="Photos of current physique (Front, Side & Rear)*"
                  required={false}
                  hasMany
                  isImages
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-12 flex justify-center">
              <div className="max-w-max">
                <Button type="submit" rounded="lg" disabled={submitting}>
                  Proceed To Payment Setup
                </Button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }
}

export default Page
