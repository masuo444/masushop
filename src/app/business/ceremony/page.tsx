import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '式典・鏡開き用の枡 — 祝い枡・振る舞い酒用の手配ガイド',
  description:
    '式典・鏡開き・竣工式・祝賀会で使う枡を手配するならMASU-STORE。振る舞い酒用の一合枡・五勺枡を10個〜対応。社名・イベント名の名入れ対応。納期約3週間。式典担当者向けの完全ガイド。',
  keywords:
    '鏡開き 枡,式典 枡,竣工式 枡,祝賀会 枡,振る舞い酒 枡,鏡開き 枡 手配,式典用 枡 注文,祝い枡,鏡開き 枡 名入れ,枡 イベント用',
  alternates: { canonical: `${baseUrl}/business/ceremony` },
  openGraph: {
    title: '式典・鏡開き用の枡 — 祝い枡・振る舞い酒用の手配ガイド',
    description: '式典・鏡開き・竣工式で使う枡を手配。一合枡・五勺枡を10個〜。名入れ対応、納期約3週間。',
    type: 'website',
    url: `${baseUrl}/business/ceremony`,
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const faqItems = [
  {
    q: '鏡開きの樽は取り扱っていますか？',
    a: '当店では枡のみの取り扱いとなります。鏡開き用の樽は酒造メーカーや樽専門店にご相談ください。枡のみのご注文も大歓迎です。',
  },
  {
    q: '式典当日までに間に合いますか？',
    a: '無地枡は約2週間、名入れ枡は約3週間が目安です。お急ぎの場合はご相談ください。在庫状況によっては短縮可能な場合もあります。',
  },
  {
    q: '使い終わった枡はそのまま持ち帰れますか？',
    a: 'はい、多くのお客様が式典後に記念品としてお持ち帰りいただいています。名入れ枡であれば、記念品としての価値がさらに高まります。',
  },
  {
    q: 'コーティングは必要ですか？',
    a: '振る舞い酒に使用する場合は、コーティングなしでもお使いいただけます。ヒノキの香りが日本酒に移り、独特の風味を楽しめます。食品衛生法に適合した接着剤を使用していますのでご安心ください。',
  },
]

export default function CeremonyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '法人のお客様', href: `${baseUrl}/business` },
          { name: '式典・鏡開き', href: `${baseUrl}/business/ceremony` },
        ]}
      />
      <FAQJsonLd items={faqItems} />

      <main className="min-h-screen bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: '法人のお客様', href: '/business' },
              { label: '式典・鏡開き' },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-16 text-center">
          <p className="text-[11px] tracking-[0.2em] text-[var(--color-accent)] mb-4">
            CEREMONY &amp; KAGAMIBIRAKI
          </p>
          <h1
            className="serif text-3xl md:text-4xl font-light leading-relaxed mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            式典・鏡開きに、本物の枡を。
          </h1>
          <p
            className="text-[15px] leading-[2] max-w-2xl mx-auto"
            style={{ color: 'var(--color-muted)' }}
          >
            竣工式、開業祝い、祝賀会——晴れの舞台にふさわしい国産ヒノキ枡。
            振る舞い酒で乾杯し、そのまま記念品としてお持ち帰りいただく。
            式典を「体験」として記憶に刻む、枡のある祝いの場をご提案します。
          </p>
        </section>

        {/* Use scenes */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
              枡が活躍する式典シーン
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  scene: '鏡開き・鏡割り',
                  desc: '日本酒の樽を木槌で開き、枡で振る舞う。日本の伝統的な祝い方で、参加者全員が一体感を味わえます。企業の新年会、プロジェクト完了の打ち上げにも。',
                  size: '一合枡・五勺枡',
                },
                {
                  scene: '竣工式・落成式',
                  desc: '新しいオフィスや施設のお披露目に。建物名やオープン日を刻印した枡で乾杯すれば、関係者への感謝と記念が一つになります。',
                  size: '一合枡',
                },
                {
                  scene: '開業・開店祝い',
                  desc: '新店舗のオープニングに、来賓やお客様に枡で振る舞い酒を。店名入りの枡をそのまま記念品にすれば、店舗の認知拡大にも。',
                  size: '五勺枡・一合枡',
                },
                {
                  scene: '表彰式・社内イベント',
                  desc: '永年勤続表彰、営業成績トップ表彰、社員旅行の記念品として。名前と日付を入れれば、受賞者にとって一生モノの記念品に。',
                  size: '一合枡 + 名入れ',
                },
              ].map((item) => (
                <div key={item.scene} className="bg-[var(--background)] p-6 rounded-sm">
                  <h3 className="serif text-base font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                    {item.scene}
                  </h3>
                  <p className="text-[13px] leading-[1.9] mb-3" style={{ color: 'var(--color-muted)' }}>
                    {item.desc}
                  </p>
                  <p className="text-[11px] text-[var(--color-accent)]">
                    おすすめ：{item.size}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preparation guide */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="serif text-xl font-medium text-center mb-4" style={{ color: 'var(--foreground)' }}>
            式典担当者のための準備ガイド
          </h2>
          <p className="text-center text-[13px] mb-12" style={{ color: 'var(--color-muted)' }}>
            初めて鏡開き・振る舞い酒を手配する方でも安心のステップガイド
          </p>
          <div className="space-y-8">
            {[
              {
                step: '4〜6週間前',
                title: '枡の種類・数量を決める',
                desc: '参加人数 + 予備10〜20%が目安。五勺枡（100ml）は軽く一杯、一合枡（180ml）はたっぷり飲める量。女性やお酒の弱い方が多い場合は五勺枡がおすすめです。',
              },
              {
                step: '4週間前',
                title: 'お見積り・名入れデザイン相談',
                desc: '当店に枡のサイズ・数量・名入れ内容をお伝えください。デザインレイアウトをご提案し、修正は何度でも無料です。',
              },
              {
                step: '3週間前',
                title: '発注・製作開始',
                desc: 'デザイン確定後、製作を開始します。進捗はメールでご報告。サンプル確認（任意）も可能です。',
              },
              {
                step: '1週間前',
                title: '納品・検品',
                desc: '式典会場または事務所に直送可能。個別包装にも対応しますので、受付での配布もスムーズです。',
              },
              {
                step: '当日',
                title: '鏡開き・乾杯',
                desc: '樽を開き、枡にお酒を注いで乾杯。式典後は記念品としてお持ち帰りいただきます。',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-[12px] font-medium text-[var(--color-accent)]">{item.step}</span>
                </div>
                <div className="flex-1 pb-8 border-l border-[var(--color-border)] pl-6">
                  <h3 className="text-[14px] font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
              式典用枡の価格目安
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['構成', '50個', '100個', '300個'].map((h) => (
                      <th key={h} className="text-left p-3 border-b border-[var(--color-border)]" style={{ color: 'var(--foreground)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['五勺枡（無地）', '¥570/個', '¥540/個', '¥510/個'],
                    ['五勺枡（名入れ）', '¥720/個', '¥690/個', '¥660/個'],
                    ['一合枡（無地）', '¥760/個', '¥720/個', '¥680/個'],
                    ['一合枡（名入れ）', '¥910/個', '¥870/個', '¥830/個'],
                    ['一合枡（名入れ+コーティング）', '¥1,710/個', '¥1,670/個', '¥1,630/個'],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) => (
                        <td key={i} className="p-3 border-b border-[var(--color-border)]" style={{ color: i === 0 ? 'var(--foreground)' : 'var(--color-muted)' }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12px] mt-4" style={{ color: 'var(--color-muted)' }}>
              ※ 価格は税別。名入れ（焼印・レーザー刻印）の費用は、内容と数量に応じて別途お見積りいたします。
            </p>
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
            式典用の枡のご相談はお気軽に
          </h2>
          <p className="text-[13px] mb-8 max-w-xl mx-auto leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
            式典の日程・参加人数・名入れ内容をお伝えいただければ、最適なプランをご提案します。
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
