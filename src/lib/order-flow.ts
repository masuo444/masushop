/**
 * ご依頼の流れ（全ページ共通）。
 * 表示コンポーネント（OrderFlow）と HowTo 構造化データの両方がここを参照するので、
 * 流れを変えるときはこのファイルだけを直す。
 *
 * 事実に基づく内容のみ：見積りと仕上がりイメージは注文前に無料で送る。
 * 修正回数・実物サンプルの製作については約束しない。
 */
export type OrderFlowStep = {
  step: string
  title: string
  desc: string
  /** 小さく添える補足（「無料」など） */
  badge?: string
}

export const orderFlowSteps: OrderFlowStep[] = [
  {
    step: '01',
    title: 'ご相談',
    desc: '入れたい文章や用途、サイズ・個数の目安をお送りください。デザインデータは不要です。決まっていない項目は空欄で構いません。',
  },
  {
    step: '02',
    title: 'お見積り＋仕上がりイメージ',
    desc: '通常1〜2営業日以内に、お見積りと一緒に仕上がりイメージ（レイアウト画像）をお送りします。書体やレイアウトはこちらで組みます。',
    badge: '無料',
  },
  {
    step: '03',
    title: 'ご注文確定',
    desc: '仕上がりイメージと金額をご覧いただいてから、ご注文を判断してください。法人のお客様は請求書払い（月末締め翌月末払い）もご相談いただけます。',
  },
  {
    step: '04',
    title: '製作',
    desc: '国産ヒノキの枡に、職人が一つずつ名入れします。焼印の場合は初回に専用の銅版を製作します。',
  },
  {
    step: '05',
    title: 'お届け',
    desc: '一つずつ検品し、ヒノキの削り節を緩衝材にして梱包してお届けします。海外発送にも対応しています。',
  },
]

/** HowTo 構造化データ用 */
export const orderFlowHowToSteps = orderFlowSteps.map((s) => ({
  name: s.badge ? `${s.title}（${s.badge}）` : s.title,
  text: s.desc,
}))
