import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import siteConfig from '@/lib/site-config'
import { getAllArticles, getArticleBySlug } from '@/lib/blog-articles'
import type { ArticleSection } from '@/lib/blog-articles'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }))
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${baseUrl}/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      siteName: siteConfig.name,
      locale: 'ja_JP',
    },
    twitter: { card: 'summary_large_image' },
    alternates: { canonical: `${baseUrl}/blog/${article.slug}` },
  }
}

// --- Section Renderers ---

function SectionHeading({ section }: { section: ArticleSection }) {
  return (
    <h2
      className="serif mt-12 mb-4 text-xl font-medium leading-relaxed"
      style={{ color: 'var(--foreground)' }}
    >
      {section.heading}
    </h2>
  )
}

function SectionParagraph({ section }: { section: ArticleSection }) {
  return (
    <p
      className="mb-6 text-[15px]"
      style={{ lineHeight: 1.9, color: 'var(--color-muted)' }}
    >
      {section.text}
    </p>
  )
}

function SectionList({ section }: { section: ArticleSection }) {
  return (
    <ul className="mb-6 space-y-3 pl-5">
      {section.items?.map((item, i) => (
        <li
          key={i}
          className="text-[15px] list-disc"
          style={{ lineHeight: 1.9, color: 'var(--color-muted)' }}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function SectionTable({ section }: { section: ArticleSection }) {
  return (
    <div className="mb-6 overflow-x-auto">
      <table
        className="w-full text-[13px]"
        style={{ borderCollapse: 'collapse' }}
      >
        {section.headers && (
          <thead>
            <tr>
              {section.headers.map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left font-medium"
                  style={{
                    borderBottom: '2px solid var(--color-border)',
                    color: 'var(--foreground)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {section.rows?.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3"
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                    color: 'var(--color-muted)',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SectionCallout({ section }: { section: ArticleSection }) {
  const borderColor =
    section.variant === 'warning'
      ? '#c0392b'
      : section.variant === 'tip'
        ? 'var(--color-accent)'
        : '#2980b9'
  const bgColor =
    section.variant === 'warning'
      ? '#fdf2f2'
      : section.variant === 'tip'
        ? 'var(--color-accent-light)'
        : '#f0f7ff'
  const label =
    section.variant === 'warning'
      ? '注意'
      : section.variant === 'tip'
        ? 'ポイント'
        : '情報'

  return (
    <div
      className="mb-6 rounded px-5 py-4"
      style={{ borderLeft: `3px solid ${borderColor}`, background: bgColor }}
    >
      <p
        className="mb-1 text-xs font-medium tracking-wider"
        style={{ color: borderColor }}
      >
        {label}
      </p>
      <p className="text-[14px]" style={{ lineHeight: 1.8, color: 'var(--foreground)' }}>
        {section.text}
      </p>
    </div>
  )
}

function SectionFaq({ section }: { section: ArticleSection }) {
  return (
    <details
      className="group mb-3"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <summary
        className="flex cursor-pointer items-center justify-between py-4 text-[15px] font-medium"
        style={{ color: 'var(--foreground)' }}
      >
        <span>Q. {section.q}</span>
        <span
          className="ml-4 text-xs transition-transform group-open:rotate-45"
          style={{ color: 'var(--color-muted)' }}
        >
          +
        </span>
      </summary>
      <p
        className="pb-4 text-[14px]"
        style={{ lineHeight: 1.8, color: 'var(--color-muted)' }}
      >
        A. {section.a}
      </p>
    </details>
  )
}

function ArticleContent({ sections }: { sections: ArticleSection[] }) {
  return (
    <>
      {sections.map((section, i) => {
        switch (section.type) {
          case 'heading':
            return <SectionHeading key={i} section={section} />
          case 'paragraph':
            return <SectionParagraph key={i} section={section} />
          case 'list':
            return <SectionList key={i} section={section} />
          case 'table':
            return <SectionTable key={i} section={section} />
          case 'callout':
            return <SectionCallout key={i} section={section} />
          case 'faq':
            return <SectionFaq key={i} section={section} />
          default:
            return null
        }
      })}
    </>
  )
}

export default function BlogArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const allArticles = getAllArticles()
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: { '@type': 'Organization', name: siteConfig.name },
    mainEntityOfPage: `${baseUrl}/blog/${article.slug}`,
  }

  const publishedDate = new Date(article.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const updatedDate = new Date(article.updatedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '枡コラム', href: `${baseUrl}/blog` },
          { name: article.title, href: `${baseUrl}/blog/${article.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="パンくずリスト"
        className="mx-auto max-w-4xl px-6 pt-8 text-[11px] text-[var(--color-muted)]"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-[var(--foreground)]">
              ホーム
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="transition-colors hover:text-[var(--foreground)]">
              枡コラム
            </Link>
          </li>
          <li>/</li>
          <li className="text-[var(--foreground)]">{article.title}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <h1 className="section-title mt-4">{article.title}</h1>
        <div
          className="mt-6 flex items-center justify-center gap-4 text-xs"
          style={{ color: 'var(--color-muted)' }}
        >
          <time dateTime={article.publishedAt}>公開: {publishedDate}</time>
          {article.publishedAt !== article.updatedAt && (
            <time dateTime={article.updatedAt}>更新: {updatedDate}</time>
          )}
          <span>{article.readingTime}で読めます</span>
        </div>
      </section>

      <div className="divider" />

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <ArticleContent sections={article.content} />
      </article>

      <div className="divider" />

      {/* Related Articles */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2
          className="mb-10 text-center text-xl font-light"
          style={{ color: 'var(--foreground)' }}
        >
          関連記事
        </h2>
        <div className="flex flex-col">
          {relatedArticles.map((related, i) => (
            <div key={related.slug}>
              {i > 0 && <div className="divider" />}
              <Link
                href={`/blog/${related.slug}`}
                className="group block py-6 transition-opacity hover:opacity-80"
              >
                <p className="mb-1 text-[10px] tracking-wider" style={{ color: 'var(--color-accent)' }}>
                  {related.category}
                </p>
                <h3
                  className="mb-2 text-base font-medium leading-relaxed"
                  style={{ color: 'var(--foreground)' }}
                >
                  {related.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {related.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2
          className="mb-4 text-xl font-light"
          style={{ color: 'var(--foreground)' }}
        >
          枡の購入・名入れオーダー
        </h2>
        <p
          className="mx-auto mb-8 max-w-lg text-sm leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          国産ヒノキ枡の購入から名入れ・オリジナル枡の制作まで、お気軽にご相談ください。
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/products" className="btn-primary">
            商品一覧を見る
          </Link>
          <Link href="/custom" className="btn-outline">
            名入れ・オーダーメイド
          </Link>
        </div>
      </section>
    </>
  )
}
