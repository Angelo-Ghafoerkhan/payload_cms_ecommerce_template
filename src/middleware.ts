// /middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// Helper: Fetch your global settings from Payload.
async function getSettings() {
  const controller = new AbortController()
  // cancel the fetch if it takes more than 500ms:
  const timeout = setTimeout(() => controller.abort(), 500)

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/settings?depth=2`, {
      signal: controller.signal,
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`Status ${res.status}`)
    return (await res.json()) as { enableMaintenanceMode: boolean; maintenancePassword: string }
  } catch (err) {
    console.warn('⚠️ getSettings failed, using defaults:', err)
    return { enableMaintenanceMode: false, maintenancePassword: '' }
  } finally {
    clearTimeout(timeout)
  }
}

export async function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next()
  }

  const { pathname } = req.nextUrl

  // Allow static files, API routes, admin routes, and the maintenance page itself
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/maintenance') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin')
  ) {
    return NextResponse.next()
  }

  const { enableMaintenanceMode, maintenancePassword } = await getSettings()

  // If maintenance mode is enabled...
  if (enableMaintenanceMode) {
    const cookie = req.cookies.get('maintenance_access')
    if (!cookie || cookie.value !== maintenancePassword) {
      const url = req.nextUrl.clone()
      url.pathname = '/maintenance'
      return NextResponse.rewrite(url)
    }
  }

  // If not under maintenance, allow the request to continue.
  return NextResponse.next()
}

// Specify which paths the middleware should apply to.
// Here we exclude maintenance, API, Next.js static files, images, and admin routes.
export const config = {
  matcher: '/((?!maintenance|api|_next/static|_next/image|admin).*)',
}
