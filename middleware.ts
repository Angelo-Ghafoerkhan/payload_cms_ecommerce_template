// middleware.ts (or middleware.js) at the root of your Next.js project
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for the admin panel.
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Assume you store your user role in a cookie called "userRole"
    const role = request.cookies.get('userRole')?.value

    if (role !== 'admin') {
      // If the role is not admin, redirect them away.
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}

// Specify paths for which this middleware applies:
export const config = {
  matcher: ['/admin/:path*'],
}
