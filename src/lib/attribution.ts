/**
 * 「どこから来た問い合わせか」を記録するための最小限の計測。
 * 初回訪問（first-touch）と今回の訪問（last-touch）、訪問回数、見たページの流れを
 * 訪問者のブラウザに90日間だけ保持し、フォーム送信時に管理者向け通知へ添える。
 */

const STORAGE_KEY = 'masu-attribution-v2'
const SESSION_KEY = 'masu-attribution-session'
const RETENTION_MS = 90 * 24 * 60 * 60 * 1000
const MAX_PAGES = 30

type Touch = {
  landingPage: string
  referrer: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  at: string
}

type Stored = {
  first: Touch
  last: Touch
  visitCount: number
  pages: { path: string; at: string; visit: number }[]
}

export type Attribution = {
  landingPage: string
  referrer: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  firstVisitAt: string
  lastLandingPage: string
  lastReferrer: string
  lastVisitAt: string
  visitCount: string
  pageTrail: string
  visitDurationSec: string
  screenSize: string
  language: string
}

const empty: Attribution = {
  landingPage: '',
  referrer: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  firstVisitAt: '',
  lastLandingPage: '',
  lastReferrer: '',
  lastVisitAt: '',
  visitCount: '',
  pageTrail: '',
  visitDurationSec: '',
  screenSize: '',
  language: '',
}

function currentTouch(): Touch {
  const params = new URLSearchParams(window.location.search)
  const referrer = document.referrer || ''
  const sameSite = referrer.startsWith(window.location.origin)
  return {
    landingPage: window.location.pathname + window.location.search,
    referrer: sameSite ? '' : referrer,
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    at: new Date().toISOString(),
  }
}

function load(): Stored | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  const stored = JSON.parse(raw) as Stored
  if (Date.now() - new Date(stored.first.at).getTime() > RETENTION_MS) {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
  return stored
}

/** ページを開くたびに呼ぶ。新しい訪問なら参照元を記録し、見たページを追記する。 */
export function captureAttribution(path: string) {
  if (typeof window === 'undefined') return
  try {
    let stored = load()
    if (!sessionStorage.getItem(SESSION_KEY)) {
      sessionStorage.setItem(SESSION_KEY, '1')
      const touch = currentTouch()
      stored = stored
        ? { ...stored, last: touch, visitCount: stored.visitCount + 1 }
        : { first: touch, last: touch, visitCount: 1, pages: [] }
    }
    if (!stored) return
    const previous = stored.pages[stored.pages.length - 1]
    if (previous?.path !== path || previous.visit !== stored.visitCount) {
      stored.pages = [
        ...stored.pages,
        { path, at: new Date().toISOString(), visit: stored.visitCount },
      ].slice(-MAX_PAGES)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  } catch {
    // プライベートモード等でストレージが使えなくても動作に影響させない
  }
}

/** フォーム送信時に付与する計測情報を返す。 */
export function getAttribution(): Attribution & { submittedFrom: string } {
  const submittedFrom =
    typeof window === 'undefined' ? '' : window.location.pathname
  if (typeof window === 'undefined') return { ...empty, submittedFrom }
  try {
    const stored = load()
    if (!stored) return { ...empty, submittedFrom }
    let lastVisit = 0
    const trail = stored.pages
      .map((page) => {
        const time = new Date(page.at).toLocaleString('ja-JP', {
          timeZone: 'Asia/Tokyo',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
        const header = page.visit !== lastVisit ? `【${page.visit}回目の訪問】\n` : ''
        lastVisit = page.visit
        return `${header}${time} ${page.path}`
      })
      .join('\n')
    return {
      landingPage: stored.first.landingPage,
      referrer: stored.first.referrer,
      utmSource: stored.first.utmSource,
      utmMedium: stored.first.utmMedium,
      utmCampaign: stored.first.utmCampaign,
      firstVisitAt: stored.first.at,
      lastLandingPage: stored.last.landingPage,
      lastReferrer: stored.last.referrer,
      lastVisitAt: stored.last.at,
      visitCount: String(stored.visitCount),
      pageTrail: trail,
      visitDurationSec: String(
        Math.round((Date.now() - new Date(stored.last.at).getTime()) / 1000),
      ),
      screenSize: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || '',
      submittedFrom,
    }
  } catch {
    return { ...empty, submittedFrom }
  }
}
