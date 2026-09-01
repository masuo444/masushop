import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '周年記念品に枡 — 10周年・50周年・100周年の企業ギフト',
  description:
    '企業の周年記念品に国産ヒノキ枡を。10周年・30周年・50周年・100周年の節目に「益々繁栄」の想いを届ける名入れ枡。企業ロゴ・社名・年号を焼印・レーザー刻印。10個〜10,000個対応。',
  keywords:
    '周年記念品,周年記念品 枡,企業 周年記念 ギフト,創立記念品,10周年 記念品,50周年 記念品,100周年 記念品,法人 記念品 名入れ,周年記念 ノベルティ',
  alternates: { canonical: `${baseUrl}/business/anniversary` },
  openGraph: {
    title: '周年記念品に枡 — 企業の節目を祝う名入れヒノキ枡',
    description: '企業の周年記念品に国産ヒノキ枡を。「益々繁栄」の想いを届ける名入れ枡。10個〜対応。',
    type: 'website',
    url: `${baseUrl}/business/anniversary`,
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const faqItems = [
  {
    q: '周年記念品の枡は何個から注文できますか？',
    a: '10個から承ります。1個からのサンプル製作も可能ですので、まずは仕上がりをご確認ください。',
  },
  {
    q: '社名とロゴを両方入れることはできますか？',
    a: 'はい、焼印・レーザー刻印ともに、ロゴ・社名・創立年・記念年などを自由にレイアウトできます。4面すべてに刻印することも可能です。',
  },
  {
    q: '納期はどのくらいですか？',
    a: '名入れ枡は約3週間、300個以上の大口注文は約4週間が目安です。お急ぎの場合もご相談ください。',
  },
  {
    q: '個別の箱入れやのし対応はできますか？',
    a: 'はい、個別包装・化粧箱入れ・のし紙対応も承ります。取引先へ直接発送する分納にも対応可能です。',
  },
]

export default function AnniversaryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '法人のお客様', href: `${baseUrl}/business` },
          { name: '周年記念品', href: `${baseUrl}/business/anniversary` },
        ]}
      />
      <FAQJsonLd items={faqItems} />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: '法人のお客様', href: '/business' },
              { label: '周年記念品' },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-16 text-center">
          <p className="text-[11px] tracking-[0.2em] text-[var(--color-accent)] mb-4">
            ANNIVERSARY GIFT
          </p>
          <h1
            className="serif text-3xl md:text-4xl font-light leading-relaxed mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            周年記念品に、枡を。
          </h1>
          <p
            className="text-[15px] leading-[2] max-w-2xl mx-auto"
            style={{ color: 'var(--color-muted)' }}
          >
            10周年、30周年、50周年、100周年——企業の節目に「益々（ますます）繁栄」の想いを届ける国産ヒノキ枡。
            企業ロゴや社名を美しく刻印し、取引先・社員に長く記憶に残る記念品をお届けします。
          </p>
        </section>

        {/* Why masu for anniversary */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
              周年記念品に枡が選ばれる理由
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  title: '「益々繁栄」の縁起物',
                  desc: '「枡」は「益す」に通じ、古来より縁起物として親しまれています。周年の節目に「益々のご発展を」という想いを形にできる、唯一無二の記念品です。',
                },
                {
                  title: '企業ブランドを美しく刻印',
                  desc: '焼印やレーザー刻印で、企業ロゴ・社名・創立年・記念年号を鮮明に表現。受け取った方の手元に長く残り、企業の存在感を持続的に伝えます。',
                },
                {
                  title: '実用性が高く、捨てられない',
                  desc: '酒器としてはもちろん、ペン立て・小物入れ・インテリアとしても活躍。デスクや棚に置かれ、日常的に目に触れることで企業ブランドの接触頻度が高まります。',
                },
                {
                  title: 'SDGs・サステナブルな選択',
                  desc: '国産ヒノキは再生可能な天然素材。プラスチック製ノベルティと異なり、環境配慮をアピールできます。CSR報告書にも記載しやすい記念品です。',
                },
              ].map((item) => (
                <div key={item.title} className="bg-[var(--background)] p-6 rounded-sm">
                  <h3 className="serif text-base font-medium mb-3" style={{ color: 'var(--foreground)' }}>
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended products */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
            周年記念品におすすめのサイズ
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                size: '一合枡',
                capacity: '180ml',
                price: '¥800〜/個',
                reason: '最も人気のサイズ。日本酒の酒器として実用的で、デスクのペン立てにも。取引先への配布に最適です。',
              },
              {
                size: '五勺枡',
                capacity: '100ml',
                price: '¥600〜/個',
                reason: 'コンパクトで上品。小物入れやアクセサリーケースとしても使え、女性にも喜ばれるサイズです。',
              },
              {
                size: '八勺枡',
                capacity: '144ml',
                price: '¥700〜/個',
                reason: '一合枡と五勺枡の中間サイズ。飲食店への記念品や、こだわりのある方への贈り物に。',
              },
            ].map((item) => (
              <div
                key={item.size}
                className="text-center p-6 border border-[var(--color-border)] rounded-sm"
              >
                <p className="serif text-lg font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  {item.size}
                </p>
                <p className="text-[12px] mb-1" style={{ color: 'var(--color-muted)' }}>
                  {item.capacity}
                </p>
                <p className="text-[14px] font-medium text-[var(--color-accent)] mb-4">
                  {item.price}
                </p>
                <p className="text-[13px] leading-[1.8]" style={{ color: 'var(--color-muted)' }}>
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-[12px] mt-6" style={{ color: 'var(--color-muted)' }}>
            ※ 価格は税別・本体のみ。数量に応じた割引あり。名入れ加工は別途。
          </p>
        </section>

        {/* Case studies */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
              導入事例
            </h2>
            <div className="space-y-8">
              {[
                {
                  company: '精密機器メーカー（従業員300名）',
                  occasion: '創業50周年記念',
                  product: '一合枡 × 500個（焼印：社名+ロゴ+「50th Anniversary」）',
                  voice: '取引先・社員に配布したところ、「こんな記念品は初めて」と大変好評でした。ヒノキの香りが箱を開けた瞬間に広がり、特別感がありました。',
                },
                {
                  company: 'IT企業（従業員80名）',
                  occasion: '設立10周年記念',
                  product: '五勺枡 × 120個（レーザー刻印：ロゴ+QRコード）',
                  voice: 'QRコードから社史ページに飛べるようにしました。デジタルとアナログの融合が社員にも取引先にも刺さりました。',
                },
                {
                  company: '老舗旅館',
                  occasion: '創業100周年記念',
                  product: '一合枡 × 1,000個（焼印：家紋+屋号+「百年感謝」）',
                  voice: '宿泊客への記念品として客室に設置。持ち帰り率はほぼ100%で、SNSでの投稿も多数いただきました。',
                },
              ].map((cs) => (
                <div key={cs.occasion} className="bg-[var(--background)] p-8 rounded-sm">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-[12px] px-3 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full">
                      {cs.occasion}
                    </span>
                    <span className="text-[12px]" style={{ color: 'var(--color-muted)' }}>
                      {cs.company}
                    </span>
                  </div>
                  <p className="text-[13px] font-medium mb-3" style={{ color: 'var(--foreground)' }}>
                    {cs.product}
                  </p>
                  <p className="text-[13px] leading-[1.9] italic" style={{ color: 'var(--color-muted)' }}>
                    「{cs.voice}」
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Order flow */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
            ご注文の流れ
          </h2>
          <div className="grid sm:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'お見積り', desc: 'サイズ・数量・加工方法をお伝えください' },
              { step: '02', title: 'デザイン確認', desc: 'レイアウトをご提案。修正は何度でも無料' },
              { step: '03', title: 'サンプル確認', desc: '実物で仕上がりを確認（任意）' },
              { step: '04', title: '量産・製作', desc: '一つずつ丁寧に製作' },
              { step: '05', title: '検品・納品', desc: '全品検品し梱包してお届け' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <span className="text-[11px] text-[var(--color-accent)]">{s.step}</span>
                <p className="serif text-sm font-medium mt-1 mb-2" style={{ color: 'var(--foreground)' }}>
                  {s.title}
                </p>
                <p className="text-[11px] leading-[1.7]" style={{ color: 'var(--color-muted)' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
              よくあるご質問
            </h2>
            <div className="space-y-6">
              {faqItems.map((item) => (
                <details key={item.q} className="group bg-[var(--background)] rounded-sm">
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
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="serif text-xl font-medium mb-4" style={{ color: 'var(--foreground)' }}>
            周年記念品のご相談はお気軽に
          </h2>
          <p className="text-[13px] mb-8 max-w-xl mx-auto leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
            サイズ選びからデザインのご提案、納品まで専門スタッフがワンストップで対応いたします。
            まずはお見積りからどうぞ。
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
