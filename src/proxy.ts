import { NextResponse, type NextRequest } from 'next/server'
import { isAdminConfigured, isAuthorizedAdmin } from '@/lib/admin-auth'

/**
 * 管理画面の入口で Basic 認証をかける（Next.js 16 では middleware.ts ではなく proxy.ts）。
 * ADMIN_PASSWORD が未設定のときは、管理画面そのものが無いものとして 404 を返す。
 */
export function proxy(request: NextRequest) {
  if (!isAdminConfigured()) {
    return new NextResponse('Not Found', {
      status: 404,
      headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    })
  }

  if (!isAuthorizedAdmin(request.headers.get('authorization'))) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="MASU-STORE admin", charset="UTF-8"',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  }

  const response = NextResponse.next()
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  response.headers.set('Cache-Control', 'no-store')
  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
