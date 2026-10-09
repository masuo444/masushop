import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'
import { isAdminConfigured, isAuthorizedAdmin } from '@/lib/admin-auth'
import { detectAiBot, recordAiBotVisit } from '@/lib/ai-bots'

/**
 * Next.js 16 では middleware.ts ではなく proxy.ts。
 * - 公開ページ: AIのクローラーが読みに来たら記録する（表示は何も変えない）
 * - 管理画面: Basic 認証をかける。ADMIN_PASSWORD が未設定なら管理画面そのものが無いものとして 404
 */
export function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl
  const isAdmin = /^\/(api\/)?admin(\/|$)/.test(pathname)
  if (!isAdmin) {
    const bot = detectAiBot(request.headers.get('user-agent') || '')
    if (bot) event.waitUntil(recordAiBotVisit(bot.name, pathname))
    return NextResponse.next()
  }

  return guardAdmin(request)
}

function guardAdmin(request: NextRequest) {
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
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/llms.txt',
    '/llms-full.txt',
    '/robots.txt',
    '/sitemap.xml',
    // 公開ページ（API・Next.jsの内部ファイル・画像などの拡張子付きファイルは除く）
    '/((?!api/|_next/|_vercel/|.*\\.[a-zA-Z0-9]+$).*)',
  ],
}
