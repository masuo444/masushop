import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { faqItems } from '@/lib/masu-data'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'よくある質問（FAQ） — 枡のサイズ・名入れ・お手入れ',
  description:
    '枡に関するよくある質問をまとめました。サイズの選び方、名入れ方法、お手入れ、日本酒との関係、節分・鏡開きの文化、配送・決済まで。',
  keywords: '枡 FAQ,枡 よくある質問,枡 サイズ,枡 名入れ,枡 お手入れ,枡 選び方',
  alternates: { canonical: `${siteConfig.url}/faq`, languages: { ja: `${siteConfig.url}/faq`, en: `${siteConfig.url}/en/faq` } },
  openGraph: {
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const breadcrumbItems = [
  { name: 'ホーム', href: baseUrl },
  { name: 'よくある質問', href: `${baseUrl}/faq` },
]

const categories = ['基本', 'サイズ', '素材', '名入れ', 'お手入れ', '文化', '配送', '決済'] as const

function categoryToId(category: string): string {
  const map: Record<string, string> = {
    '基本': 'basic',
    'サイズ': 'size',
    '素材': 'material',
    '名入れ': 'engraving',
    'お手入れ': 'care',
    '文化': 'culture',
    '配送': 'shipping',
    '決済': 'payment',
  }
  return map[category] ?? category
}

export default function FAQPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FAQJsonLd items={faqItems} />

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
        <h1 className="section-title mt-4">よくある質問</h1>
        <p className="mt-6 text-sm text-[var(--color-muted)] leading-[2] max-w-2xl mx-auto">
          枡に関するよくある質問をカテゴリ別にまとめました。<br />
          サイズの選び方、名入れ、お手入れ、文化、配送・決済まで。
        </p>
      </section>

      {/* Category Tabs */}
      <nav className="max-w-3xl mx-auto px-6 pb-12">
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
          return (
            <section key={cat} id={categoryToId(cat)}>
              <h2 className="serif text-xl font-light mb-8">{cat}</h2>
              <div>
                {items.map((item, i) => (
                  <details key={i} className="group" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium list-none">
                      <span>{item.q}</span>
                      <span className="ml-4 text-lg transition-transform group-open:rotate-45" style={{ color: 'var(--color-muted)' }}>+</span>
                    </summary>
                    <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )
        })}
      </div>

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
