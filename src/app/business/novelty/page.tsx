import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '展示会・イベントのノベルティに枡 — 単価500円〜の名入れグッズ',
  description:
    '展示会・イベント用ノベルティに国産ヒノキ枡。単価500円〜で企業ロゴ入りの名入れ対応。来場者の記憶に残る木製ノベルティ。ブース集客力アップの実績多数。10個〜対応。',
  keywords:
    '展示会 ノベルティ,イベント ノベルティ,展示会 グッズ,ノベルティ 名入れ,ノベルティ 500円以下,法人 ノベルティ 木製,展示会 ブース 集客,ノベルティ おしゃれ,企業ノベルティ 印象に残る',
  alternates: { canonical: `${baseUrl}/business/novelty` },
  openGraph: {
    title: '展示会・イベントのノベルティに枡 — 単価500円〜の名入れグッズ',
    description: '展示会用ノベルティに国産ヒノキ枡。単価500円〜で来場者の記憶に残る木製ノベルティ。',
    type: 'website',
    url: `${baseUrl}/business/novelty`,
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const faqItems = [
  {
    q: '展示会まで2週間しかありませんが間に合いますか？',
    a: '無地枡であれば約2週間で納品可能です。名入れの場合は約3週間が目安ですが、在庫状況によってはお急ぎ対応も可能です。まずはご相談ください。',
  },
  {
    q: 'QRコードも刻印できますか？',
    a: 'はい、レーザー刻印であればQRコードも鮮明に再現できます。自社サイトやLP、SNSへの誘導に活用されるお客様が増えています。',
  },
  {
    q: '500個以上の大口注文は可能ですか？',
    a: 'はい、10,000個以上の実績もございます。数量に応じた割引を適用しますので、まずはお見積りをご依頼ください。',
  },
  {
    q: 'サンプルを事前に確認できますか？',
    a: 'はい、1〜2個のサンプルを実費で製作可能です。量産時にサンプル代は差し引きます。',
  },
]

export default function NoveltyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '法人のお客様', href: `${baseUrl}/business` },
          { name: '展示会ノベルティ', href: `${baseUrl}/business/novelty` },
        ]}
      />
      <FAQJsonLd items={faqItems} />

      <main className="min-h-screen bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: '法人のお客様', href: '/business' },
              { label: '展示会ノベルティ' },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-16 text-center">
          <p className="text-[11px] tracking-[0.2em] text-[var(--color-accent)] mb-4">
            EXHIBITION NOVELTY
          </p>
          <h1
            className="serif text-3xl md:text-4xl font-light leading-relaxed mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            足を止める、記憶に残る。
          </h1>
          <p
            className="text-[15px] leading-[2] max-w-2xl mx-auto"
            style={{ color: 'var(--color-muted)' }}
          >
            展示会のブースで配られるボールペンやクリアファイル。
            そのほとんどは、帰宅後にデスクの引き出しに消えていきます。
            ヒノキの香りと手触りが際立つ枡は、受け取った瞬間に「おっ」と足を止め、
            長くデスクに置かれる——それが枡ノベルティの強みです。
          </p>
        </section>

        {/* Comparison */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
              ノベルティ比較：枡 vs よくあるグッズ
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['', '枡（ヒノキ）', 'ボールペン', 'クリアファイル', 'エコバッグ'].map((h) => (
                      <th
                        key={h}
                        className="text-left p-3 border-b border-[var(--color-border)]"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['単価', '¥500〜', '¥50〜200', '¥30〜100', '¥200〜500'],
                    ['手渡し時のインパクト', '◎ 驚きがある', '△ ありふれている', '△ 特になし', '○ 普通'],
                    ['保管率', '◎ デスクに残る', '△ 引き出しへ', '× 廃棄されやすい', '○ 使われる'],
                    ['企業名の視認頻度', '◎ 毎日目に入る', '○ 使用時のみ', '△ ほぼ見ない', '○ 使用時'],
                    ['名入れの美しさ', '◎ 木目に映える', '○ 印刷', '○ 印刷', '○ 印刷'],
                    ['話題性', '◎ SNS映え', '× なし', '× なし', '△ 低い'],
                    ['環境配慮アピール', '◎ 天然素材', '× プラスチック', '× プラスチック', '○ 再利用'],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) => (
                        <td
                          key={i}
                          className={`p-3 border-b border-[var(--color-border)] ${i === 1 ? 'font-medium' : ''}`}
                          style={{ color: i === 1 ? 'var(--foreground)' : 'var(--color-muted)' }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Price tiers */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
            展示会ノベルティの価格目安
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                tier: 'ライトプラン',
                size: '三勺枡（54ml）',
                price: '¥500〜/個',
                desc: '手のひらサイズで配りやすい。小物入れやアクセサリートレイとして使えるコンパクトタイプ。大量配布向き。',
              },
              {
                tier: 'スタンダードプラン',
                size: '一合枡（180ml）',
                price: '¥800〜/個',
                highlight: true,
                desc: '最も人気のサイズ。酒器・ペン立てとして実用的で、名入れの面積も十分。VIP来場者向けに最適。',
              },
              {
                tier: 'プレミアムプラン',
                size: '一合枡 + コーティング',
                price: '¥1,600〜/個',
                desc: '食品衛生法対応のコーティングで実用性を強化。飲食関連の展示会や、特別なお客様への贈り物に。',
              },
            ].map((plan) => (
              <div
                key={plan.tier}
                className={`p-6 rounded-sm ${plan.highlight ? 'border-2 border-[var(--color-accent)]' : 'border border-[var(--color-border)]'}`}
              >
                {plan.highlight && (
                  <p className="text-[10px] text-[var(--color-accent)] tracking-[0.15em] mb-2">POPULAR</p>
                )}
                <p className="serif text-base font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  {plan.tier}
                </p>
                <p className="text-[12px] mb-2" style={{ color: 'var(--color-muted)' }}>
                  {plan.size}
                </p>
                <p className="text-xl font-medium text-[var(--color-accent)] mb-4">{plan.price}</p>
                <p className="text-[13px] leading-[1.8]" style={{ color: 'var(--color-muted)' }}>
                  {plan.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-[12px] mt-6" style={{ color: 'var(--color-muted)' }}>
            ※ 価格は税別。50個以上・100個以上でさらに数量割引が適用されます。
          </p>
        </section>

        {/* Results */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
              導入実績
            </h2>
            <div className="space-y-8">
              {[
                {
                  event: 'IT系展示会（東京ビッグサイト）',
                  product: '一合枡 × 200個（レーザー刻印：ロゴ+QRコード）',
                  result: 'ブース来場者数 前年比130%。名刺交換数も大幅増。「木の枡がもらえると聞いて来ました」という声も。',
                },
                {
                  event: '食品関連見本市（幕張メッセ）',
                  product: '三勺枡 × 500個（焼印：社名+商品名）',
                  result: '試飲用の酒器として使用し、そのまま配布。SNSでの#枡ノベルティ投稿が50件以上。',
                },
                {
                  event: '地方自治体の観光PRイベント',
                  product: '一合枡 × 100個（レーザー刻印：自治体ロゴ+観光QRコード）',
                  result: '「ヒノキの香りで日本の魅力を五感で伝えられた」と自治体担当者から高評価。翌年もリピート。',
                },
              ].map((cs) => (
                <div key={cs.event} className="bg-[var(--background)] p-8 rounded-sm">
                  <p className="text-[12px] text-[var(--color-accent)] mb-2">{cs.event}</p>
                  <p className="text-[13px] font-medium mb-3" style={{ color: 'var(--foreground)' }}>
                    {cs.product}
                  </p>
                  <p className="text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                    {cs.result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
            よくあるご質問
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <details key={item.q} className="group bg-[var(--color-subtle)] rounded-sm">
                <summary className="cursor-pointer p-5 text-[14px] font-medium list-none flex items-center justify-between" style={{ color: 'var(--foreground)' }}>
                  {item.q}
                  <span className="text-[var(--color-muted)] group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <p className="px-5 pb-5 text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--color-subtle)] py-20 text-center">
          <h2 className="serif text-xl font-medium mb-4" style={{ color: 'var(--foreground)' }}>
            次の展示会で、差がつくノベルティを。
          </h2>
          <p className="text-[13px] mb-8 max-w-xl mx-auto leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
            イベントの日程・数量・ご予算をお伝えいただければ、最適なプランをご提案します。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/custom"
              className="inline-block px-8 py-3 text-sm text-white rounded-sm transition-colors"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              無料お見積り
            </Link>
            <Link
              href="/business"
              className="inline-block px-8 py-3 text-sm border border-[var(--color-border)] rounded-sm transition-colors"
              style={{ color: 'var(--foreground)' }}
            >
              法人向けサービス一覧
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
