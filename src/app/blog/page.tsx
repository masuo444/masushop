import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getAllArticles } from '@/lib/blog-articles'

export const metadata: Metadata = {
  title: '枡コラム — 枡に関する知識・情報',
  description:
    '枡（ます）に関するコラム記事の一覧。枡の1300年の歴史、日本酒との関係、お手入れ方法、サイズ別の選び方ガイド、法人向けノベルティ活用事例など、枡にまつわる知識と情報をお届けします。',
  keywords: '枡 コラム,枡 ブログ,枡 歴史,枡 日本酒,枡 お手入れ,枡 選び方,枡 ノベルティ',
  alternates: { canonical: `${siteConfig.url}/blog` },
}

const baseUrl = siteConfig.url

const blogArticles = getAllArticles()

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '枡コラム — 枡に関する知識・情報',
  description:
    '枡（ます）に関するコラム記事の一覧。枡にまつわる知識と情報をお届けします。',
  url: `${baseUrl}/blog`,
  hasPart: blogArticles.map((article) => ({
    '@type': 'Article',
    headline: article.title,
    url: `${baseUrl}/blog/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
  })),
}

const existingArticles = [
  {
    title: '枡の歴史 — 1300年の物語',
    description:
      '奈良時代から現代まで、枡が辿ってきた1300年の歴史を詳しく解説。計量器としての役割、度量衡統一の歩み、そして現代のインテリア・ギフトとしての進化まで。',
    href: '/history',
    note: '3000字超のロングコンテンツ',
  },
  {
    title: '枡と日本酒 — もっきりの作法と楽しみ方',
    description:
      '枡で日本酒を飲むとなぜ美味しいのか。ヒノキの香りが生む特別な味わい、居酒屋の「もっきり」の作法、枡酒の正しい飲み方を紹介します。',
    href: '/sake',
  },
  {
    title: '枡のお手入れ方法 — 長持ちさせる3つのポイント',
    description:
      '大切な枡を長く使い続けるためのお手入れガイド。使用後の洗い方、乾燥方法、保管のコツ、ヤニやカビが出たときの対処法をまとめました。',
    href: '/care',
  },
  {
    title: '枡の選び方ガイド — 用途・サイズ別おすすめ',
    description:
      '全7サイズの枡から、用途に合った最適なサイズを選ぶためのガイド。日本酒、ギフト、節分、鏡開き、インテリアなど目的別にご案内します。',
    href: '/guide',
  },
  {
    title: '法人向け枡ノベルティの活用事例',
    description:
      '企業の周年記念品、イベント配布、顧客ギフトとしての枡ノベルティ活用事例。名入れ・ロゴ入りの法人向けオーダーの流れもご紹介。',
    href: '/business',
  },
]

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '枡コラム', href: `${baseUrl}/blog` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Hero */}
      <section
        className="flex items-center justify-center py-20"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="section-label">Column</p>
          <h1 className="section-title">枡コラム</h1>
        </div>
      </section>

      {/* New blog articles */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="flex flex-col">
          {blogArticles.map((article, i) => {
            const date = new Date(article.publishedAt).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            return (
              <div key={article.slug}>
                {i > 0 && <div className="divider" />}
                <Link
                  href={`/blog/${article.slug}`}
                  className="group block py-8 transition-opacity hover:opacity-80"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-3 text-[11px]">
                    <span
                      className="tracking-wider"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {article.category}
                    </span>
                    <span style={{ color: 'var(--color-muted)' }}>{date}</span>
                    <span style={{ color: 'var(--color-muted)' }}>
                      {article.readingTime}
                    </span>
                  </div>
                  <h2
                    className="mb-2 text-lg font-medium leading-relaxed"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {article.title}
                  </h2>
                  <p
                    className="mb-3 text-sm leading-relaxed"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {article.description}
                  </p>
                  <span
                    className="text-xs tracking-wider transition-colors"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    記事を読む &rarr;
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      <div className="divider" />

      {/* Existing article links */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p
          className="mb-8 text-center text-[10px] tracking-[0.4em] uppercase"
          style={{ color: 'var(--color-muted)' }}
        >
          Featured Guides
        </p>
        <div className="flex flex-col">
          {existingArticles.map((article, i) => (
            <div key={article.href}>
              {i > 0 && <div className="divider" />}
              <Link
                href={article.href}
                className="group block py-8 transition-opacity hover:opacity-80"
              >
                <h2
                  className="mb-2 text-lg font-medium leading-relaxed"
                  style={{ color: 'var(--foreground)' }}
                >
                  {article.title}
                </h2>
                <p
                  className="mb-3 text-sm leading-relaxed"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {article.description}
                </p>
                {article.note && (
                  <p
                    className="mb-3 text-xs"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {article.note}
                  </p>
                )}
                <span
                  className="text-xs tracking-wider transition-colors"
                  style={{ color: 'var(--color-accent)' }}
                >
                  記事を読む &rarr;
                </span>
              </Link>
            </div>
          ))}
        </div>

        <div className="divider" />

        <p
          className="mt-8 text-center text-xs"
          style={{ color: 'var(--color-muted)' }}
        >
          記事は随時追加していきます。
        </p>
      </section>
    </>
  )
}
