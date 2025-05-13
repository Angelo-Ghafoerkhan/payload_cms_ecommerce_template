'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import MobileMenu from './components/MobileMenu'
import type { Header as HeaderType, Setting } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import RenderSocials from '@/Globals/Settings/components/RenderSocials'
import Link from 'next/link'
import { CMSLink } from '@/components/Link'

const MobileNav: React.FC<{ header: HeaderType; settings: Setting }> = ({ header, settings }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden' // Disable scrolling when menu is open
    } else {
      document.body.style.overflow = 'auto' // Enable scrolling when menu is closed
    }

    // Cleanup: reset when component is unmounted or menu is closed
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen]) // Trigger the effect when `isOpen` changes

  const close = () => setIsOpen(false)

  return (
    <div className="lg:hidden relative">
      <div
        className={clsx('cursor-pointer ml-4 mt-2 z-50', isOpen && 'fixed top-17 right-6')}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        data-theme={'dark' as string}
      >
        <i
          className={clsx(
            'h-0.5 w-9 block duration-300',
            isOpen && 'rotate-45 translate-y-2.5 bg-primary-foreground',
            !isOpen && 'bg-foreground',
          )}
        />
        <i
          className={clsx(
            'h-0.5 w-9 block my-2 transition-opacity duration-300',
            isOpen && 'opacity-0 bg-primary-foreground',
            !isOpen && 'bg-foreground',
          )}
        />
        <i
          className={clsx(
            'h-0.5 w-9 block duration-300',
            isOpen && '-rotate-45 -translate-y-2.5 bg-primary-foreground',
            !isOpen && 'bg-foreground',
          )}
        />
      </div>

      <div
        className={clsx(
          'w-screen h-screen flex flex-col gap-8 justify-center items-center text-primary-foreground font-semibold text-xl z-40 transition-transform duration-150 fixed top-0 left-0 bg-primary translate-x-full',
          isOpen && 'translate-x-px',
        )}
      >
        <div className="container flex flex-col max-w-[500px] w-full">
          <Logo
            dataTheme="dark"
            width={settings.logoWidth ?? undefined}
            height={settings.logoHeight ?? undefined}
            className="mb-2"
          />
          {header.settings?.showSocials && (
            <RenderSocials
              socials={settings.socials}
              className="fill-primary-foreground hover:fill-secondary"
            />
          )}
        </div>

        <MobileMenu close={close} header={header} />

        {header.settings?.showPhone ||
          (header.settings?.showEmail && (
            <div className="container flex flex-col max-w-[470px] w-full border border-secondary shadow-sm rounded-xl py-2">
              {header.settings?.showPhone && (
                <Link
                  href={`tel:${settings?.phoneNumber}`}
                  className="hover:text-secondary text-lg font-semibold"
                >
                  {settings.phoneNumber}
                </Link>
              )}
              {header.settings?.showEmail && (
                <Link
                  href={`mailto:${settings?.email}`}
                  className="hover:text-secondary text-lg font-semibold"
                >
                  {settings.email}
                </Link>
              )}
            </div>
          ))}
        <div className="container flex flex-col max-w-[500px] w-full">
          {header.settings?.showCTA && header.settings?.callToAction?.link && (
            <CMSLink
              {...header.settings.callToAction.link}
              className="text-lg h-9 px-4 outline-foreground border-[1.5px] border-foreground rounded-lg aspect-square bg-secondary backdrop-blur-lg shadow-lg flex items-center justify-center text-foreground font-bold group hover:bg-primary transition-colors"
              appearance="link"
              onClick={() => close()}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileNav
