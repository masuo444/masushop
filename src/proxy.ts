import { NextResponse, type NextRequest } from 'next/server'
import { isAdminConfigured, isAuthorizedAdmin } from '@/lib/admin-auth'
import { clientIp, withinLimit } from '@/lib/rate-limit'

// 管理画面のパスワードの失敗は、同じ接続元から15分に10回まで（総当たり対策）
const ADMIN_FAIL_LIMIT = 10
const ADMIN_FAIL_WINDOW_SEC = 15 * 60

/**
 * Next.js 16 では middleware.ts ではなく proxy.ts。
 * - 公開ページ: URLに日本語などがくっついた壊れたリンクだけを本来のページへ転送する
 *   （2026-11-04 AIクローラー記録は撤去。全ページで proxy が動き Vercel の CPU を消費して無料枠超過→チーム停止になったため。
 *    公開ページ全体を matcher に戻さないこと）
 * - 管理画面: Basic 認証をかける。ADMIN_PASSWORD が未設定なら管理画面そのものが無いものとして 404
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdmin = /^\/(api\/)?admin(\/|$)/.test(pathname)
  if (!isAdmin) {
    // 「/glossary枡用語辞典」のように、リンク文字がURLにくっついた壊れたリンク（Search Consoleで404として検出）を
    // 本来のページへ転送する。英数字のパスの直後に日本語などが続くものだけを対象にする
    const decoded = safeDecode(pathname)
    const broken = decoded.match(/^(\/[a-z0-9\-/]*[a-z0-9])[^\x00-\x7F].*$/)
    if (broken) {
      const url = request.nextUrl.clone()
      url.pathname = broken[1]
      url.search = ''
      return NextResponse.redirect(url, 301)
    }
    return NextResponse.next()
  }

  return guardAdmin(request)
}

function safeDecode(pathname: string) {
  try {
    return decodeURIComponent(pathname)
  } catch {
    return pathname
  }
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
    // 壊れたリンク（パーセントエンコードされた文字を含むURL）だけ。普通のページでは proxy を動かさない
    '/((?!api/|_next/|_vercel/).*%.*)',
  ],
}
