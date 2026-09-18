/**
 * ご購入者アンケート（/voice）の選択肢と型。
 * クライアントとサーバーの両方から読むので、ここにはサーバー専用の処理を置かない。
 */
import { masuSizes } from '@/lib/masu-data'

export const VOICE_UNKNOWN_SIZE = 'unknown'

export const voicePurposes = [
  '自宅で日本酒',
  '贈り物',
  '結婚式・引出物',
  '法人ノベルティ・記念品',
  '鏡開き・イベント',
  '飲食店・業務用',
  'インテリア・小物入れ',
  'その他',
] as const

export const voiceProcessings = [
  'なし',
  'レーザー名入れ',
  '焼印',
  '金箔',
  'コーティング',
  'わからない',
] as const

export const voiceGoodPoints = [
  'ヒノキの香り',
  '木の質感・仕上がり',
  '名入れの仕上がり',
  'サイズ感',
  '対応・やり取り',
  '納期',
  '梱包',
  '贈った相手の反応',
  '価格',
] as const

export const voiceAttributes = ['個人', '法人', '飲食店', 'その他'] as const

export const prefectures = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県', '海外',
] as const

/** アンケートの回答（本人が入力した事実だけ） */
export type VoiceAnswers = {
  /** masuSizes の id、または VOICE_UNKNOWN_SIZE */
  sizes: string[]
  purpose: string
  processing: string
  /** 1〜5 */
  rating: number
  goodPoints: string[]
  concerns: string
  comment: string
  displayName: string
  attribute: string
  prefecture: string
}

export type VoiceStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'unpublished'

/** Blob の voice/<yyyy-mm>/<id>.json に保存する1件分 */
export type VoiceRecord = {
  id: string
  editToken: string
  createdAt: string
  updatedAt: string
  status: VoiceStatus
  /** ?ref= の値（card / email など）。流入元の分析用 */
  ref: string
  answers: VoiceAnswers
  /** 追客用。サイトには絶対に出さない */
  email: string
  draft: string
  draftSource: 'ai' | 'template'
  finalText: string
  consent: boolean
  submittedAt: string | null
  reviewedAt: string | null
}

/** サイトに掲載する公開用の1件（reviews/approved/<id>.json） */
export type ApprovedReview = {
  id: string
  displayName: string
  attribute: string
  prefecture: string
  /** masuSizes の id、または VOICE_UNKNOWN_SIZE */
  sizes: string[]
  purpose: string
  processing: string
  rating: number
  text: string
  /** アンケートの回答日（ISO） */
  date: string
  source: 'survey'
}

export function sizeLabel(id: string) {
  if (id === VOICE_UNKNOWN_SIZE) return 'サイズ不明'
  return masuSizes.find((m) => m.id === id)?.name ?? id
}

/** id は保存先の年月を含む（例: 202609-1a2b3c4d5e6f）。保存先パスを一覧取得なしで引けるようにするため */
export const VOICE_ID_PATTERN = /^(\d{4})(\d{2})-[0-9a-f]{12}$/

export function voicePathname(id: string) {
  const match = VOICE_ID_PATTERN.exec(id)
  if (!match) return null
  return `voice/${match[1]}-${match[2]}/${id}.json`
}

export function approvedPathname(id: string) {
  return `reviews/approved/${id}.json`
}

/** サイト掲載用に、回答から公開してよい項目だけを取り出す */
export function toApprovedReview(record: VoiceRecord): ApprovedReview {
  const { answers } = record
  return {
    id: record.id,
    displayName: answers.displayName || '匿名',
    attribute: answers.attribute,
    prefecture: answers.prefecture,
    sizes: answers.sizes,
    purpose: answers.purpose,
    processing: answers.processing,
    rating: answers.rating,
    text: record.finalText,
    date: record.submittedAt || record.createdAt,
    source: 'survey',
  }
}
