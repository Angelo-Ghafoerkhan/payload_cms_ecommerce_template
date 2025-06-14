'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Setting } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import MobileNav from './MobileNav'
import { CMSLink } from '@/components/Link'
import RenderSocials from '@/Globals/Settings/components/RenderSocials'

import { User, Phone, Mail } from 'lucide-react'
import { SearchIcon } from 'lucide-react'
import clsx from 'clsx'
import RichText from '@/components/RichText'
import Cart from './Cart'

interface HeaderClientProps {
  data: Header
  settings: Setting
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, settings }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [loggedIn, setLoggedIn] = useState(false) // State to track if user is logged in
  const [isScrolled, setIsScrolled] = useState(false)

  // ---- STATES AND LOGIC FOR SCROLL DETECTION ----
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [hideHeader, setHideHeader] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      const threshold = 100

      setIsScrolled(currentScrollPos > threshold)

      if (currentScrollPos <= threshold) {
        setHideHeader(false)
      } else {
        if (currentScrollPos > prevScrollPos) {
          setHideHeader(true)
        } else {
          setHideHeader(false)
        }
      }

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  // ---- END SCROLL DETECTION LOGIC ----

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const response = await fetch('/api/users/me')
      const data = await response.json()
      const { user } = data

      if (user) setLoggedIn(true)
      else setLoggedIn(false)
    }

    checkIsLoggedIn()
  }, [])

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const {
    showPhone,
    showEmail,
    showSocials,
    showSearch,
    showCTA,
    callToAction,
    showCart,
    showUser,
  } = (data.settings as Header['settings']) ?? {}

  return (
    <header
      className={clsx(
        'w-screen z-40 pb-2 transition-transform duration-300',
        hideHeader && data.settings?.header?.hideOnScrollDown
          ? '-translate-y-[120%]'
          : 'translate-y-0',
        data.settings?.header?.sticky ? 'fixed' : 'absolute',
        isScrolled && !data.settings?.header?.isHovering && 'bg-black shadow-md bg-opacity-40', // Add background when scrolled
        !isScrolled && 'bg-transparent', // Remove background when at the top
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      {data.notificationsBar?.enable && (
        <div className="h-9 bg-tertiary w-full">
          <div className="h-full container grid grid-cols-6">
            <div className="hidden sm:flex items-center justify-start col-span-1">
              {showSocials && (
                <RenderSocials
                  socials={settings.socials}
                  className="fill-tertiary-foreground hover:fill-primary"
                />
              )}
            </div>
            <div className="col-span-6 sm:col-span-4">
              {data.notificationsBar.text && (
                <RichText
                  data={data.notificationsBar.text}
                  className="text-center whitespace-nowrap"
                />
              )}
            </div>
            <div className="hidden sm:flex items-center justify-end col-span-1">
              {showSearch && (
                <Link href="/search">
                  <SearchIcon className="stroke-tertiary-foreground hover:stroke-primary" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={clsx('container mt-2')}>
        <div
          className={clsx(
            'flex justify-between items-center gap-4 py-6',
            data.settings?.header?.isHovering && 'bg-black/50 rounded-2xl px-4',
          )}
        >
          <Link href="/">
            <Logo
              loading="eager"
              priority="high"
              dataTheme={headerTheme as 'dark' | 'light' | undefined}
              width={settings.logoWidth ?? undefined}
              height={settings.logoHeight ?? undefined}
            />
          </Link>
          <HeaderNav data={data} />

          {/* Optionals - in settings - CTA */}
          <div className="flex gap-2 w-max">
            {showPhone && settings.phoneNumber && (
              <Link
                href={`tel:${settings.phoneNumber}`}
                className="hidden md:flex h-9 outline-foreground border-[1.5px] border-foreground rounded-lg aspect-square bg-white/30 backdrop-blur-lg shadow-lg items-center justify-center group hover:bg-primary transition-colors"
              >
                <Phone size={24} className="min-w-6 stroke-foreground" />
              </Link>
            )}
            {showEmail && settings.email && (
              <Link
                href={`mailto:${settings.email}`}
                className="hidden md:flex h-9 outline-foreground border-[1.5px] border-foreground rounded-lg aspect-square bg-white/30 backdrop-blur-lg shadow-lg items-center justify-center group hover:bg-primary transition-colors"
              >
                <Mail size={24} className="min-w-6 stroke-foreground" />
              </Link>
            )}
            {showCart && settings.enableEcommerce && (
              <Cart
                type={settings.cartStyle as 'page' | 'popup'}
                className="h-9 outline-foreground border-[1.5px] border-foreground rounded-lg aspect-square bg-white/30 backdrop-blur-lg shadow-lg flex items-center justify-center group hover:bg-primary transition-colors"
              />
            )}

            {showUser && settings.allowAccountCreation && (
              <Link
                href={loggedIn ? '/account' : '/login'}
                className="h-9 outline-foreground border-[1.5px] border-foreground rounded-lg aspect-square bg-white/30 backdrop-blur-lg shadow-lg flex items-center justify-center group hover:bg-primary transition-colors"
              >
                <User size={24} className="min-w-6 stroke-foreground" />
              </Link>
            )}

            {showCTA && callToAction?.link && <CMSLink {...callToAction.link} />}
            <MobileNav header={data} settings={settings} />
          </div>
          {/* End of Optionals */}
        </div>
      </div>
    </header>
  )
}
