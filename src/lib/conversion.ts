/**
 * 問い合わせ送信を GA4 のコンバージョンとして記録する。
 *
 * 通知メールには流入経路が入っているが、それでは1件ずつしか追えない。
 * どのページ経由の問い合わせが多いか、大口がどこから来ているかを
 * 集計できるようにするため、送信時にイベントを送る。
 */

type Gtag = (command: string, eventName: string, params?: Record<string, unknown>) => void

/**
 * 自由入力の数量を集計しやすい区分に丸める。
 * 「100個くらい」「約50」「1,000個以上」なども拾えるよう、最初の数値を見る。
 */
export function quantityBucket(raw: string): string {
  if (!raw) return 'unknown'
  const normalized = raw
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/,/g, '')
  const match = normalized.match(/\d+/)
  if (!match) return 'undecided'

  const n = Number(match[0])
  if (!Number.isFinite(n) || n <= 0) return 'undecided'
  if (n === 1) return '1'
  if (n < 10) return '2-9'
  if (n < 50) return '10-49'
  if (n < 100) return '50-99'
  if (n < 300) return '100-299'
  if (n < 1000) return '300-999'
  return '1000+'
}

/** 大口（100個以上）かどうか。GA4側で高価値のリードを絞り込むために使う。 */
export function isHighValue(bucket: string): boolean {
  return bucket === '100-299' || bucket === '300-999' || bucket === '1000+'
}

export function trackLead(params: {
  formType: string
  quantity: string
  purpose?: string
  masuSize?: string
  submittedFrom?: string
}) {
  if (typeof window === 'undefined') return
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag !== 'function') return

  const bucket = quantityBucket(params.quantity)

  try {
    gtag('event', 'generate_lead', {
      form_type: params.formType,
      quantity_bucket: bucket,
      high_value: isHighValue(bucket),
      purpose: params.purpose || '',
      masu_size: params.masuSize || '',
      submitted_from: params.submittedFrom || window.location.pathname,
    })
  } catch {
    // 計測の失敗で送信完了の表示を妨げない
  }
}
