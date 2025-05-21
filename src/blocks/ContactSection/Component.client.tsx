'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Setting } from '@/payload-types'
import RenderSocials from '@/Globals/Settings/components/RenderSocials'

interface ContactSectionClientProps {
  settings: Setting
}

const ContactSectionClient: React.FC<ContactSectionClientProps> = ({ settings }) => {
  return (
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
  )
}

export default ContactSectionClient
