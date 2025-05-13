/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import local from 'next/font/local'
import { getServerSideURL } from '@/utilities/getURL'
import { Inter, Lato, Roboto } from 'next/font/google'
import Favicon from '@/components/Favicon'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

import './globals.css'
import { getSettings } from '@/Globals/Settings/Component'

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-header',
  weight: ['700', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '700', '900'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const settings = await getSettings()

  return (
    <html className={cn(roboto.variable, inter.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <Favicon head />
        {settings.googleAnalytics && <GoogleAnalytics gaId={settings.googleAnalytics} />}
        {settings.googleTag && <GoogleTagManager gtmId={settings.googleTag} />}
        {/* Facebook Pixel Script */}
        {settings.facebookPixel && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s) {
                    if(f.fbq)return; n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n; n.push=n; n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${settings.facebookPixel}');
                    fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${settings.facebookPixel}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
      </head>
      <body>
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}
          <div className="relative">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
