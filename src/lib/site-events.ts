/**
 * サイト内の行動を自前で数えるための共通定義（ブラウザとサーバーの両方から読む）。
 *
 * GA4 は広告ブロッカーや計測拒否で2〜3割取りこぼすため、問い合わせまでの行動は
 * 自前でも数える（Upstash Redis・AIクローラー記録と同じ置き場）。
 * 1回の訪問（タブを開いている間）で同じ行動は1回しか数えないので、数字は「その行動をした訪問の数」になる。
 * 個人を特定する情報（IP・端末ID・入力内容）は保存しない。
 */

export const SITE_EVENTS = {
  view: 'ページを開いた',
  engaged: '15秒以上見た',
  scroll: '下まで読んだ（75%）',
  offer_view: '条件の案内を見た',
  cta: '見積り・相談へのボタンを押した',
  quote_step: 'かんたん見積りの各段階',
  form_start: 'フォームに入力し始めた',
  lead: '見積り・問い合わせを送信した',
} as const

export type SiteEvent = keyof typeof SITE_EVENTS

/** 流入元。AIは名前つき（ai:ChatGPT）で持つ */
export const SEGMENT_LABEL: Record<string, string> = {
  search: '検索',
  ai: 'AI',
  social: 'SNS',
  referral: '他サイト',
  direct: '直接・ブックマーク',
}

export const QUOTE_STEP_NAMES = ['用途', 'サイズ', '個数', '名入れ', '連絡先'] as const

// 実在しそうなパスだけ受け付ける（proxy.ts の AIクローラー記録と同じ考え方）
const PATH_PATTERN = /^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+){0,3})?$/
const LABEL_PATTERN = /^[a-z0-9:#/._-]{0,60}$/i
const SEGMENT_PATTERN = /^(?:search|social|referral|direct|ai:[a-z0-9. -]{1,24})$/i

export function isValidSiteEvent(input: { event?: unknown; path?: unknown; label?: unknown; segment?: unknown }) {
  return (
    typeof input.event === 'string' &&
    Object.prototype.hasOwnProperty.call(SITE_EVENTS, input.event) &&
    typeof input.path === 'string' &&
    PATH_PATTERN.test(input.path) &&
    typeof input.label === 'string' &&
    LABEL_PATTERN.test(input.label) &&
    typeof input.segment === 'string' &&
    SEGMENT_PATTERN.test(input.segment)
  )
}
