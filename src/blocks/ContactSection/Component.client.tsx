'use client'

import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useState } from 'react'
import Input from '@/components/forms/react-hook-form/Input/Input'
import Button from '@/components/Button'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import clsx from 'clsx'
import { Setting } from '@/payload-types'
import RenderSocials from '@/Globals/Settings/components/RenderSocials'

interface ContactSectionClientProps {
  settings: Setting
}

const ContactSectionClient: React.FC<ContactSectionClientProps> = ({ settings }) => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    fetch('/api/base/contact', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSuccess(true)
        setError(false)
        reset()
      })
      .catch(() => {
        setSuccess(false)
        setError(true)
      })
  }

  return (
    <div className="max-w-max-width w-11/12 mx-auto text-base font-body pb-8 md:pb-18">
      <div className="flex flex-col md:flex-row flex-wrap gap-8">
        {/* Section 1 */}
        <form onSubmit={handleSubmit(onSubmit)} className="min-w-[50%] grow">
          <h2 className="font-header font-semibold text-2xl mb-8">Get in Touch</h2>

          <div className="flex flex-col gap-8">
            <Input
              register={register}
              id="name"
              errors={errors}
              label="Name"
              placeholder="Your Name"
              required
              animatePlaceholder={false}
            />

            <Input
              register={register}
              id="email"
              errors={errors}
              label="Email"
              placeholder="your@email.com"
              required
              animatePlaceholder={false}
            />

            <Input
              register={register}
              id="phone"
              errors={errors}
              label="Phone Number"
              placeholder="Your Phone Number"
              type="number"
              required
              animatePlaceholder={false}
            />

            <Input
              register={register}
              id="message"
              errors={errors}
              label="Message"
              placeholder="How can I help you?"
              type="textarea"
              required
              animatePlaceholder={false}
            />

            <Button type="submit" text="Send Message" rounded="lg" />
          </div>

          {(success || error) && (
            <div
              className={clsx(
                'rounded-xl text-center mt-8 text-gray-900 border border-border',
                success && !error && 'bg-green-100',
                !success && error && 'bg-red-100',
                !success && !error && 'bg-gray-100',
              )}
            >
              <p className="p-4">
                {success ? 'Message Sent Successfully' : 'Something Went Wrong'}
              </p>
            </div>
          )}
        </form>

        {/* Section 2 */}
        <article className="relative grow">
          <h2 className="font-header font-semibold text-2xl mb-8">Contact Information</h2>

          <div className="flex flex-col gap-4 relative z-10">
            {settings.businessAddress && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <MapPin size={25} className="stroke-primary" />
                  <p className="font-bold font-header">Address</p>
                </div>
                <div>
                  <p className="ml-10">
                    {settings.businessAddress.split(',').map((line, index) => (
                      <span key={index}>
                        {line.trim()}
                        {index < (settings.businessAddress?.split(',')?.length ?? 0) - 1 && ','}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Phone size={25} className="stroke-primary" />
                <p className="font-bold font-header">Phone</p>
              </div>
              <div>
                <Link
                  href={`tel:${settings.phoneNumber}`}
                  className="ml-10 hover:text-tertiary transition-colors duration-300"
                >
                  {settings.phoneNumber}
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Mail size={25} className="stroke-primary" />
                <p className="font-bold font-header">Email</p>
              </div>
              <div>
                <Link
                  href={`mailto:${settings.email}`}
                  className="ml-10 hover:text-tertiary transition-colors duration-300"
                >
                  {settings.email}
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-header font-bold text-xl mb-2">Follow Us</h3>

              <RenderSocials
                socials={settings.socials}
                className="fill-primary hover:fill-secondary transition-colors"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default ContactSectionClient
