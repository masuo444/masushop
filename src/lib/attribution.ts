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

// ブラウザの保存領域が使えない端末（Cookieを全てブロック、容量ゼロ等）でも、
// ページを開いている間の分だけは残せるよう、メモリにも同じ内容を持つ。
let memory: Stored | null = null
let storageWorks = true

function isStored(value: unknown): value is Stored {
  const v = value as Stored | null
  return Boolean(v && v.first?.at && v.last?.at && Array.isArray(v.pages) && Number.isFinite(v.visitCount))
}

function load(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    storageWorks = true
    if (!raw) return memory
    const stored: unknown = JSON.parse(raw)
    // 壊れた記録や古い形式は捨てて作り直す（残すと以後ずっと記録できなくなる）
    if (!isStored(stored) || Date.now() - new Date(stored.first.at).getTime() > RETENTION_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return stored
  } catch {
    storageWorks = false
    return memory
  }
}

function save(stored: Stored) {
  memory = stored
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    storageWorks = true
  } catch {
    storageWorks = false
  }
}

/** この訪問（タブ）で既に入口を記録したか。記録していなければ印を付ける */
function isNewSession() {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false
    sessionStorage.setItem(SESSION_KEY, '1')
    return true
  } catch {
    // 保存できない端末では、ページを読み込み直すまでを1回の訪問として扱う
    return memory === null
  }
}

/** ページを開くたびに呼ぶ。新しい訪問なら参照元を記録し、見たページを追記する。 */
export function captureAttribution(path: string) {
  if (typeof window === 'undefined') return
  try {
    let stored = load()
    const newSession = isNewSession()
    if (!stored) {
      // 記録が無い。初めての訪問のほか、タブを開いたまま日数が経ち、
      // Safari が保存領域だけを消した場合もここに来る（以前はここで記録を諦めていた）
      const touch = currentTouch()
      stored = { first: touch, last: touch, visitCount: 1, pages: [] }
    } else if (newSession) {
      stored = { ...stored, last: currentTouch(), visitCount: stored.visitCount + 1 }
    }
    const previous = stored.pages[stored.pages.length - 1]
    if (previous?.path !== path || previous.visit !== stored.visitCount) {
      stored = {
        ...stored,
        pages: [...stored.pages, { path, at: new Date().toISOString(), visit: stored.visitCount }].slice(-MAX_PAGES),
      }
    }
    save(stored)
  } catch {
    // 計測の失敗でページの動作に影響させない
  }
}

/** フォーム送信時に付与する計測情報を返す。 */
export function getAttribution(): Attribution & { submittedFrom: string } {
  if (typeof window === 'undefined') return { ...empty, submittedFrom: '' }
  const submittedFrom = window.location.pathname
  // 保存した記録が読めなくても、端末の情報と送信ページは必ず返す
  const base = { ...empty, submittedFrom }
  try {
    base.screenSize = `${window.screen.width}x${window.screen.height}`
    base.language = navigator.language || ''
  } catch {
    // 同上
  }
  try {
    let stored = load()
    if (!stored) {
      // 送信の時点で記録が無ければ、いま分かる範囲（このページと参照元）で作る
      captureAttribution(submittedFrom)
      stored = memory
    }
    if (!stored) return base
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
      ...base,
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
      pageTrail: storageWorks
        ? trail
        : `${trail}\n（この端末は履歴を保存できない設定のため、今回ページを開いてからの分だけです）`,
      visitDurationSec: String(
        Math.round((Date.now() - new Date(stored.last.at).getTime()) / 1000),
      ),
    }
  } catch {
    return base
  }
}
