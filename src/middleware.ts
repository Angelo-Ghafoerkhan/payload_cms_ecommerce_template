// /middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// Helper: Fetch your global settings from Payload.
async function getSettings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/settings?depth=2`)

  console.log(res)
  if (!res.ok) return { enableMaintenanceMode: false }
  const data = await res.json()
  // Assuming your global Payload document is stored in "data.doc"
  return data || { enableMaintenanceMode: false }
}

export async function middleware(req: NextRequest) {
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

  // Fetch global settings from Payload.
  const settings = await getSettings()

  // If maintenance mode is enabled...
  if (settings.enableMaintenanceMode) {
    // Check for a maintenance access cookie.
    // Note: Local storage is not available in middleware; use cookies instead.
    const maintenanceCookie = req.cookies.get('maintenance_access')
    // In this example, the cookie value must exactly match the maintenancePassword in settings.
    if (!maintenanceCookie || maintenanceCookie.value !== settings.maintenancePassword) {
      // Rewrite the URL to the maintenance page.
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
