import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'
import { isAdminConfigured, isAuthorizedAdmin } from '@/lib/admin-auth'
import { detectAiBot, recordAiBotVisit } from '@/lib/ai-bots'
import { clientIp, withinLimit } from '@/lib/rate-limit'

const RECORDABLE_PATH = /^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+){0,3})?$|^\/(?:llms|llms-full|robots)\.txt$|^\/sitemap\.xml$/
// 管理画面のパスワードの失敗は、同じ接続元から15分に10回まで（総当たり対策）
const ADMIN_FAIL_LIMIT = 10
const ADMIN_FAIL_WINDOW_SEC = 15 * 60

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
    // 実在しそうなパスだけ数える（ボットを名乗った偽アクセスで記録を水増しされないように）
    if (bot && RECORDABLE_PATH.test(pathname)) event.waitUntil(recordAiBotVisit(bot.name, pathname))
    return NextResponse.next()
  }

  return guardAdmin(request)
}

async function guardAdmin(request: NextRequest) {
  if (!isAdminConfigured()) {
    return new NextResponse('Not Found', {
      status: 404,
      headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    })
  }

  const failKey = `admin-fail:${clientIp(request.headers)}`
  if (!(await withinLimit(failKey, ADMIN_FAIL_LIMIT, ADMIN_FAIL_WINDOW_SEC, { peek: true }))) {
    return new NextResponse('Too many attempts', {
      status: 429,
      headers: { 'Retry-After': String(ADMIN_FAIL_WINDOW_SEC), 'X-Robots-Tag': 'noindex, nofollow' },
    })
  }

  if (!isAuthorizedAdmin(request.headers.get('authorization'))) {
    // 認証情報を送ってきて間違えた回だけ数える（最初のパスワード入力画面の表示は数えない）
    if (request.headers.get('authorization')) await withinLimit(failKey, ADMIN_FAIL_LIMIT, ADMIN_FAIL_WINDOW_SEC)
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
