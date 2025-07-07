import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const tenant = path.split('/')[2];

  if (!tenant) return NextResponse.next()

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-tenant-ID', tenant)

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: ['/home/:tenant*']
}
