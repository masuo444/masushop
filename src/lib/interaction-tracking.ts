/**
 * 問い合わせまでの行動を数える。送り先は3つ。
 * 1. 自前の記録（/api/track → Upstash）: 広告ブロッカーに左右されない。日報の「行動の流れ」はここから作る
 * 2. GA4: 既存の日報・週次アドバイスの集計（link_text / link_url / form_id は既定パラメータなので登録不要）
 * 3. Microsoft Clarity（設定されていれば）: 録画とヒートマップを、流入元や行動で絞り込めるようにする
 */

import { detectAiSource } from '@/lib/ai-sources'
import type { SiteEvent } from '@/lib/site-events'

type Gtag = (command: string, eventName: string, params?: Record<string, unknown>) => void
type Clarity = (command: string, ...args: string[]) => void

// 見積り・相談の行き先。/original は1個からの相談ページ（旧 /order-made）
const CTA_PATHS = ['/custom', '/original', '/order-made', '/contact', '/en/contact', '/en/shipping']
// ページ内の見積りフォームへ飛ぶリンク
const CTA_ANCHORS = /^#(quote|quick-quote|offer-quote)/
const CONTACT_PATTERN = /^(mailto:|tel:)|line\.me|lin\.ee/
const SEGMENT_KEY = 'masu-segment'
const SENT_KEY = 'masu-sent-events'

const SEARCH = /google\.|bing\.|yahoo\.|duckduckgo\.|ecosia\.|naver\.|baidu\.|yandex\./
const SOCIAL = /facebook\.|instagram\.|t\.co|twitter\.|x\.com|line\.me|youtube\.|tiktok\.|threads\.|note\.com|linkedin\./

function gtagSend(eventName: string, params: Record<string, unknown>) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag !== 'function') return
  try {
    gtag('event', eventName, params)
  } catch {
    // 計測の失敗で画面の操作を妨げない
  }
}

function clarity(...args: string[]) {
  const c = (window as unknown as { clarity?: Clarity }).clarity
  if (typeof c !== 'function') return
  try {
    c(args[0], ...args.slice(1))
  } catch {
    // 同上
  }
}

/** この訪問の流入元。最初のページで決めて、タブを閉じるまで使う */
export function sessionSegment() {
  try {
    const saved = sessionStorage.getItem(SEGMENT_KEY)
    if (saved) return saved
  } catch {
    // ストレージが使えなくても続ける
  }
  const params = new URLSearchParams(window.location.search)
  const referrer = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : ''
  const ai = detectAiSource(params.get('utm_source') || '', referrer)
  const host = referrer ? new URL(referrer).hostname : ''
  const segment = ai
    ? `ai:${ai}`
    : SEARCH.test(host)
      ? 'search'
      : SOCIAL.test(host) || /instagram|facebook|line|x|twitter/i.test(params.get('utm_source') || '')
        ? 'social'
        : host
          ? 'referral'
          : 'direct'
  try {
    sessionStorage.setItem(SEGMENT_KEY, segment)
  } catch {
    // 同上
  }
  clarity('set', 'traffic', segment)
  return segment
}

const queue: object[] = []
let flushTimer: ReturnType<typeof setTimeout> | null = null

function flush() {
  flushTimer = null
  if (!queue.length) return
  const body = JSON.stringify(queue.splice(0, queue.length))
  try {
    const sent = navigator.sendBeacon?.('/api/track', new Blob([body], { type: 'text/plain' }))
    if (!sent) fetch('/api/track', { method: 'POST', body, keepalive: true }).catch(() => {})
  } catch {
    // 同上
  }
}

/**
 * 行動を1件記録する。同じ訪問で同じページ・同じ行動は1回だけ数える。
 * GA4 と Clarity にも同じ行動を送る（GA4の既存イベント名がある行動はそちらで送る）。
 */
export function trackSiteEvent(event: SiteEvent, label = '', path = window.location.pathname) {
  const id = `${event}|${path}|${label}`
  try {
    const sent = new Set<string>(JSON.parse(sessionStorage.getItem(SENT_KEY) || '[]'))
    if (sent.has(id)) return
    sent.add(id)
    sessionStorage.setItem(SENT_KEY, JSON.stringify([...sent].slice(-300)))
  } catch {
    // ストレージが使えない場合は重複を許して数える
  }
  queue.push({ event, path: path.replace(/\/$/, '') || '/', label: label.slice(0, 60), segment: sessionSegment() })
  if (!flushTimer) flushTimer = setTimeout(flush, 800)
  clarity('event', label ? `${event}:${label}` : event)
}

function linkText(element: HTMLElement) {
  return (element.innerText || element.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 80)
}

/** ページを開くたびに呼ぶ（Analytics の pathname の変化） */
export function trackPageView(path: string) {
  trackSiteEvent('view', '', path)
  // Clarity は読み込みが後になることがあるので、ページごとに流入元を付け直す
  clarity('set', 'traffic', sessionSegment())
}

/** リスナーを登録し、解除関数を返す（useEffect のクリーンアップ用） */
export function trackInteractions() {
  const startedForms = new Set<string>()
  sessionSegment()

  const onClick = (event: MouseEvent) => {
    const anchor = (event.target as HTMLElement | null)?.closest('a')
    if (!anchor) return
    const href = anchor.getAttribute('href') || ''
    if (CONTACT_PATTERN.test(href)) {
      const kind = href.startsWith('mailto:') ? 'mail' : href.startsWith('tel:') ? 'tel' : 'line'
      gtagSend('contact_click', {
        link_text: linkText(anchor),
        link_url: href.replace(/^mailto:([^?]+).*/, 'mailto:$1'),
      })
      trackSiteEvent('cta', kind)
      return
    }
    if (CTA_ANCHORS.test(href)) {
      gtagSend('cta_click', { link_text: linkText(anchor), link_url: href })
      trackSiteEvent('cta', href)
      return
    }
    let path = ''
    try {
      path = href.startsWith('http') ? new URL(href).pathname : href.split(/[?#]/)[0]
    } catch {
      return
    }
    if (CTA_PATHS.some((cta) => path === cta) && path !== window.location.pathname) {
      gtagSend('cta_click', { link_text: linkText(anchor), link_url: path })
      trackSiteEvent('cta', path)
    }
  }

  const onFocus = (event: FocusEvent) => {
    const field = event.target as HTMLElement | null
    if (!field?.matches?.('input, textarea, select')) return
    const form = field.closest('form')
    if (!form) return
    const formId = `${window.location.pathname}${form.id ? `#${form.id}` : ''}`
    if (startedForms.has(formId)) return
    startedForms.add(formId)
    gtagSend('inquiry_form_start', { form_id: formId })
    trackSiteEvent('form_start', form.dataset.trackForm || form.id || 'form')
  }

  // 15秒以上、画面を表示したまま見た（裏のタブにしている時間は数えない）
  let visibleMs = 0
  let lastTick = Date.now()
  let engagedPath = window.location.pathname
  const engaged = new Set<string>()
  const tick = window.setInterval(() => {
    const now = Date.now()
    if (window.location.pathname !== engagedPath) {
      engagedPath = window.location.pathname
      visibleMs = 0
    } else if (document.visibilityState === 'visible') {
      visibleMs += now - lastTick
    }
    lastTick = now
    if (visibleMs >= 15000 && !engaged.has(engagedPath)) {
      engaged.add(engagedPath)
      trackSiteEvent('engaged')
    }
  }, 1000)

  // 75%までスクロールした
  const scrolled = new Set<string>()
  const onScroll = () => {
    const path = window.location.pathname
    if (scrolled.has(path)) return
    const doc = document.documentElement
    const max = doc.scrollHeight - window.innerHeight
    if (max > 200 && window.scrollY / max >= 0.75) {
      scrolled.add(path)
      trackSiteEvent('scroll', '75')
    }
  }

  // data-track-view を付けた要素（条件の案内・見積りフォーム）が半分以上見えた
  const seen = new WeakSet<Element>()
  const observer =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting || seen.has(entry.target)) continue
              seen.add(entry.target)
              trackSiteEvent('offer_view', (entry.target as HTMLElement).dataset.trackView || '')
            }
          },
          { threshold: 0.5 },
        )
      : null
  const observeAll = () => document.querySelectorAll('[data-track-view]').forEach((el) => observer?.observe(el))
  observeAll()
  // ページ移動（クライアント遷移）で新しく出た要素も拾う
  let pending = false
  const mutation = new MutationObserver(() => {
    if (pending) return
    pending = true
    requestAnimationFrame(() => {
      pending = false
      observeAll()
    })
  })
  mutation.observe(document.body, { childList: true, subtree: true })

  const onHide = () => {
    if (document.visibilityState === 'hidden') flush()
  }

  document.addEventListener('click', onClick, { capture: true })
  document.addEventListener('focusin', onFocus)
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('visibilitychange', onHide)
  return () => {
    document.removeEventListener('click', onClick, { capture: true })
    document.removeEventListener('focusin', onFocus)
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('visibilitychange', onHide)
    window.clearInterval(tick)
    observer?.disconnect()
    mutation.disconnect()
    flush()
  }
}
