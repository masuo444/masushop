import Link from 'next/link'
import { orderMinPriceText } from '@/lib/pricing'

/**
 * 「頼める条件」を最初の画面で言い切るブロック。
 * よく読まれているのに見積りへ進まれていないページ（サイズ一覧・式典・コラム）に置く。
 * 文言は llms.txt・FAQ と同じ事実だけを使う（ここに無い約束は書かない）。
 * 見えたかどうかを data-track-view で数える。
 */

const content = {
  personal: {
    eyebrow: 'ORDER',
    title: '名入れの枡は、1個から作れます',
    items: [
      ['数量', '名入れは1個から（無地の枡は10個から）'],
      ['価格', `1回のご注文 ${orderMinPriceText}。2個目以降は割安`],
      ['デザイン', 'データ不要。入れたい文章を送るだけで、書体とレイアウトを組みます'],
      ['確認', '注文の前に、見積りと仕上がりイメージを無料でお送りします'],
      ['納期', '名入れは約3週間が目安'],
    ],
    primary: '見積りと仕上がりイメージを受け取る（無料）',
  },
  business: {
    eyebrow: 'FOR BUSINESS',
    title: '式典・法人のご注文条件',
    items: [
      ['数量', '名入れは1個から、無地の枡は10個から。数量に応じてお見積り'],
      ['支払い', '請求書払い（月末締め翌月末払い）・銀行振込・クレジットカード'],
      ['デザイン', 'ロゴデータが無くても、名刺や看板の画像から刻印できます'],
      ['確認', '注文の前に、見積りと仕上がりイメージを無料でお送りします'],
      ['納期', '名入れは約3週間、大口（100個以上）は3〜4週間が目安'],
    ],
    primary: '式典・記念品のお見積り（無料）',
  },
} as const

export default function OfferBlock({
  variant = 'personal',
  quoteHref = '#offer-quote',
  trackId,
  className = '',
}: {
  variant?: keyof typeof content
  /** 主ボタンの行き先。ページ内の見積りフォームがあればそのアンカー */
  quoteHref?: string
  /** 計測用の名前（例: sizes）。どのページの案内が見られたかを分ける */
  trackId: string
  className?: string
}) {
  const c = content[variant]
  return (
    <aside
      aria-labelledby={`offer-${trackId}-title`}
      data-track-view={`offer:${trackId}`}
      className={`max-w-3xl mx-auto px-6 ${className}`}
    >
      <div
        className="rounded-sm p-6 md:p-8"
        style={{ border: '1px solid var(--color-border)', background: 'var(--background)' }}
      >
        <p className="text-[11px] tracking-[0.18em] mb-2" style={{ color: 'var(--color-accent)' }}>
          {c.eyebrow}
        </p>
        <h2
          id={`offer-${trackId}-title`}
          className="serif text-lg md:text-xl font-normal mb-5"
          style={{ color: 'var(--foreground)' }}
        >
          {c.title}
        </h2>
        <dl className="grid gap-x-5 gap-y-3 text-[14px] leading-[1.8] sm:grid-cols-[5.5em_1fr]">
          {c.items.map(([term, desc]) => (
            <div key={term} className="contents">
              <dt className="text-[12px] tracking-[0.08em] sm:pt-[2px]" style={{ color: 'var(--color-muted)' }}>
                {term}
              </dt>
              <dd className="mb-2 sm:mb-0" style={{ color: 'var(--foreground)' }}>
                {desc}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <a href={quoteHref} className="btn-accent text-center" style={{ padding: '13px 24px', fontSize: '14px' }}>
            {c.primary}
          </a>
          <Link href="/custom" className="btn-outline text-center" style={{ padding: '12px 24px', fontSize: '14px' }}>
            詳しく書いて相談する
          </Link>
        </div>
        <p className="mt-4 text-[12px]">
          <Link href="/calendar" className="underline underline-offset-4" style={{ color: 'var(--color-muted)' }}>
            行事ごとの「いつまでに相談すれば間に合うか」を見る →
          </Link>
        </p>
      </div>
    </aside>
  )
}
