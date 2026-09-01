/**
 * 「どこから来た問い合わせか」を記録するための最小限の計測。
 * セッション内で最初に開いたページと参照元だけを保持する（first-touch）。
 */

const STORAGE_KEY = 'masu-attribution'

export type Attribution = {
  landingPage: string
  referrer: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
}

const empty: Attribution = {
  landingPage: '',
  referrer: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
}

/** 初回訪問時の参照元を保存する。2回目以降は上書きしない。 */
export function captureAttribution() {
  if (typeof window === 'undefined') return
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const params = new URLSearchParams(window.location.search)
    const referrer = document.referrer || ''
    const sameSite = referrer.startsWith(window.location.origin)
    const data: Attribution = {
      landingPage: window.location.pathname + window.location.search,
      referrer: sameSite ? '' : referrer,
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // プライベートモード等でsessionStorageが使えなくても動作に影響させない
  }
}

/** フォーム送信時に付与する計測情報を返す。 */
export function getAttribution(): Attribution & { submittedFrom: string } {
  const submittedFrom =
    typeof window === 'undefined' ? '' : window.location.pathname
  if (typeof window === 'undefined') return { ...empty, submittedFrom }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    const stored = raw ? (JSON.parse(raw) as Partial<Attribution>) : {}
    return { ...empty, ...stored, submittedFrom }
  } catch {
    return { ...empty, submittedFrom }
  }
}
