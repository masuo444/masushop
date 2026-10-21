import { NextResponse } from 'next/server'
import { isValidSiteEvent, type SiteEvent } from '@/lib/site-events'
import { hasEventStore, recordSiteEvent } from '@/lib/site-events-store'
import { detectAiBot } from '@/lib/ai-bots'
import { clientIp, withinLimit } from '@/lib/rate-limit'

/**
 * サイト内の行動を1件ずつ受け取って数える（navigator.sendBeacon から届く）。
 * 何があっても 204 を返し、画面の動作には一切影響させない。
 */

const BOT_UA = /bot|crawl|spider|slurp|headless|lighthouse|preview|fetch|python|curl|wget/i
// 1つの接続元から10分に200件まで（普通の閲覧では届かない数。水増し対策）
const LIMIT = 200
const WINDOW_SEC = 10 * 60

const noContent = () => new NextResponse(null, { status: 204 })

export async function POST(request: Request) {
  if (!hasEventStore()) return noContent()
  const ua = request.headers.get('user-agent') || ''
  if (!ua || BOT_UA.test(ua) || detectAiBot(ua)) return noContent()

  // 自サイト以外から送られてきたものは数えない
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (origin && host && new URL(origin).host !== host) return noContent()

  let body: unknown
  try {
    const text = await request.text()
    if (text.length > 2000) return noContent()
    body = JSON.parse(text)
  } catch {
    return noContent()
  }
  const items = (Array.isArray(body) ? body : [body]).slice(0, 20)

  try {
    if (!(await withinLimit(`track:${clientIp(request.headers)}`, LIMIT, WINDOW_SEC))) return noContent()
    await Promise.all(
      items
        .filter((item) => item && typeof item === 'object' && isValidSiteEvent(item))
        .map((item) => {
          const e = item as { event: SiteEvent; path: string; label: string; segment: string }
          return recordSiteEvent({ event: e.event, path: e.path, label: e.label, segment: e.segment.toLowerCase().startsWith('ai:') ? e.segment : e.segment.toLowerCase() })
        }),
    )
  } catch (error) {
    console.error('Site event record failed', error)
  }
  return noContent()
}
