import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { faqItems } from '@/lib/masu-data'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import RelatedMasu from '@/components/ui/RelatedMasu'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡のよくある質問｜サイズ・名入れ・納期・お手入れ・海外発送',
  description:
    '枡のサイズ（一合枡は85×85×56mm・180ml）、名入れは焼印・レーザー刻印で1個から、無地は10個から、納期は約2〜3週間。お手入れ、もっきり、節分・鏡開き、海外発送、支払い方法まで、枡に関する質問に答えます。',
  keywords: '枡 FAQ,枡 よくある質問,枡 サイズ,枡 名入れ,枡 お手入れ,枡 選び方,枡 納期,枡 何個から',
  alternates: { canonical: `${siteConfig.url}/faq`, languages: { ja: `${siteConfig.url}/faq`, en: `${siteConfig.url}/en/faq` } },
  openGraph: {
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const breadcrumbItems = [
  { name: 'ホーム', href: baseUrl },
  { name: 'よくある質問', href: `${baseUrl}/faq` },
]

const categories = ['基本', 'サイズ', '素材', '名入れ', 'お手入れ', '文化', '購入', '配送', '決済'] as const

function categoryToId(category: string): string {
  const map: Record<string, string> = {
    '基本': 'basic',
    'サイズ': 'size',
    '素材': 'material',
    '名入れ': 'engraving',
    'お手入れ': 'care',
    '文化': 'culture',
    '購入': 'purchase',
    '配送': 'shipping',
    '決済': 'payment',
  }
  return map[category] ?? category
}

// カテゴリごとの「詳しい解説ページ」
const categoryLinks: Record<string, { href: string; label: string }[]> = {
  '基本': [
    { href: '/history', label: '枡の歴史（1300年の変遷）' },
    { href: '/glossary', label: '枡用語辞典' },
  ],
  'サイズ': [
    { href: '/products/sizes', label: '枡のサイズ一覧表（全7サイズの寸法・容量）' },
    { href: '/guide', label: '枡の選び方ガイド' },
  ],
  '素材': [
    { href: '/sake', label: '枡で日本酒が美味しくなる理由' },
    { href: '/coating', label: '特殊コーティング加工' },
  ],
  '名入れ': [
    { href: '/products/engraving', label: '焼印とレーザー刻印の比較' },
    { href: '/original', label: '名入れ枡を1個から作る' },
    { href: '/logo', label: '企業ロゴを枡に入れる' },
  ],
  'お手入れ': [
    { href: '/care', label: 'ヒノキ枡のお手入れ方法' },
  ],
  '文化': [
    { href: '/sake', label: 'もっきり・枡酒の作法' },
    { href: '/gift', label: '枡ギフトガイド' },
  ],
  '購入': [
    { href: '/products', label: '商品一覧（全7サイズ）' },
    { href: '/products/ichigo', label: '一合枡（クリアケース・白箱対応）' },
  ],
  '配送': [
    { href: '/business', label: '法人向けのご案内（納期・大口注文）' },
  ],
  '決済': [
    { href: '/business', label: '法人向けのご案内（請求書払い）' },
  ],
}

// 個別の質問に対応するページ
const questionLinks: Record<string, { href: string; label: string }> = {
  '一合枡の大きさはどのくらいですか？': { href: '/products/ichigo', label: '一合枡の商品ページ' },
  '日本酒を飲むのに最適なサイズは？': { href: '/products/hasshaku', label: 'もっきりに使う八勺枡' },
  '節分の豆まきに使う枡のサイズは？': { href: '/products/gogo', label: '五合枡の商品ページ' },
  '鏡開きに使う枡のサイズは？': { href: '/business/ceremony', label: '式典・鏡開きの枡' },
  '枡のサイズにはどんな種類がありますか？': { href: '/products/sizes', label: '全7サイズの比較表' },
  '名入れ・焼印はできますか？': { href: '/products/engraving', label: '焼印とレーザー刻印の違い' },
  '何個から注文できますか？': { href: '/original', label: '1個からのオリジナル枡' },
  '手書きのデザインでも名入れできますか？': { href: '/original', label: '手書き文字・写真の名入れ' },
  '「もっきり」とは何ですか？': { href: '/sake', label: 'もっきりの飲み方と枡の選び方' },
  '枡はどこで買えますか？': { href: '/products', label: '商品一覧を見る' },
  '枡の個別パッケージは用意できますか？': { href: '/products/ichigo', label: '一合枡専用パッケージ' },
  '枡に名前やロゴを入れられますか？': { href: '/logo', label: 'ロゴ入れの流れ' },
  '枡のお手入れ方法は？': { href: '/care', label: 'お手入れ方法の詳しい解説' },
  '枡が縁起物とされる理由は？': { href: '/gift', label: '縁起物としての枡ギフト' },
}

export default function FAQPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FAQJsonLd items={faqItems} />
      <SpeakableJsonLd url={`${baseUrl}/faq`} cssSelectors={['[data-speakable]', '.section-title']} />

      {/* Breadcrumb */}
      <nav aria-label="パンくずリスト" className="max-w-4xl mx-auto px-6 pt-8 text-[11px] text-[var(--color-muted)]">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-[var(--foreground)] transition-colors">ホーム</Link></li>
          <li>/</li>
          <li className="text-[var(--foreground)]">よくある質問</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="section-title mt-4">枡のよくある質問</h1>
        <p data-speakable className="mt-6 text-sm leading-[2] max-w-2xl mx-auto text-[var(--foreground)]">
          枡の定番サイズは<Link href="/products/ichigo" className="underline">一合枡（180ml・85×85×56mm）</Link>。
          名入れは<Link href="/products/engraving" className="underline">焼印とレーザー刻印</Link>の2種類で<Link href="/original" className="underline">1個から</Link>、無地の枡は10個から承り、納期の目安は約2〜3週間です。
        </p>
        <p className="mt-4 text-sm text-[var(--color-muted)] leading-[2] max-w-2xl mx-auto">
          サイズの選び方、名入れ、お手入れ、文化、購入、配送・決済まで、カテゴリ別にまとめました。
        </p>
      </section>

      {/* Category Tabs */}
      <nav className="max-w-3xl mx-auto px-6 pb-12" aria-label="カテゴリ">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#${categoryToId(cat)}`}
              className="px-4 py-2 text-xs tracking-wide border border-[var(--color-border)] rounded hover:bg-[var(--color-subtle)] transition-colors"
            >
              {cat}
            </a>
          ))}
        </div>
      </nav>

      <div className="divider max-w-4xl mx-auto" />

      {/* FAQ Sections by Category */}
      <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">
        {categories.map((cat) => {
          const items = faqItems.filter((item) => item.category === cat)
          if (items.length === 0) return null
          const links = categoryLinks[cat] ?? []
          return (
            <section key={cat} id={categoryToId(cat)}>
              <h2 className="serif text-xl font-light mb-8">{cat}</h2>
              <div>
                {items.map((item) => {
                  const link = questionLinks[item.q]
                  return (
                    <details key={item.q} className="group" style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium list-none">
                        <span>{item.q}</span>
                        <span className="ml-4 text-lg transition-transform group-open:rotate-45" style={{ color: 'var(--color-muted)' }}>+</span>
                      </summary>
                      <p className={`${link ? 'pb-3' : 'pb-5'} text-sm leading-relaxed`} style={{ color: 'var(--color-muted)' }}>{item.a}</p>
                      {link && (
                        <p className="pb-5 text-xs">
                          <Link href={link.href} className="underline" style={{ color: 'var(--color-accent)' }}>
                            {link.label} →
                          </Link>
                        </p>
                      )}
                    </details>
                  )
                })}
              </div>
              {links.length > 0 && (
                <p className="mt-6 text-xs leading-[2]" style={{ color: 'var(--color-muted)' }}>
                  詳しい解説：
                  {links.map((l, i) => (
                    <span key={l.href}>
                      {i > 0 && <span className="mx-1">／</span>}
                      <Link href={l.href} className="underline" style={{ color: 'var(--color-accent)' }}>
                        {l.label}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </section>
          )
        })}
      </div>

      <div className="divider max-w-4xl mx-auto" />

      <RelatedMasu
        ids={['ichigo', 'hasshaku', 'goshaku', 'gogo']}
        heading="質問の多いサイズ"
        lead="日本酒には一合枡、もっきりには八勺枡、少量なら五勺枡、節分には五合枡。迷ったら一合枡を基準に選ぶのがおすすめです。"
      />

      <div className="divider max-w-4xl mx-auto" />

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-sm text-[var(--color-muted)] leading-[2] mb-8">
          お探しの回答が見つかりませんでしたか？<br />
          お気軽にお問い合わせください。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/custom" className="btn-primary">
            お問い合わせ・ご相談
          </Link>
          <Link href="/guide" className="btn-outline">
            枡の選び方ガイド
          </Link>
        </div>
      </section>
    </>
  )
}
