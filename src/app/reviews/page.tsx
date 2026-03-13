import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllReviews, getAverageRating, getReviewCount } from '@/lib/reviews'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import ReviewCard from '@/components/ui/ReviewCard'
import siteConfig from '@/lib/site-config'
import Breadcrumb from '@/components/ui/Breadcrumb'

const avgRating = getAverageRating()
const reviewCount = getReviewCount()

export const metadata: Metadata = {
  title: 'お客様の声',
  description: `枡の専門店MASU-STOREのお客様レビュー。${reviewCount}件のレビュー、平均評価${avgRating}点。日本酒・ギフト・ノベルティ・行事など多彩な用途でご好評いただいています。`,
  alternates: { canonical: `${siteConfig.url}/reviews` },
  openGraph: {
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const baseUrl = siteConfig.url

const purposeGroups = [
  { label: '日本酒', purpose: '日本酒' },
  { label: 'ギフト', purpose: 'ギフト' },
  { label: 'ノベルティ', purpose: 'ノベルティ' },
  { label: '行事', purpose: '行事' },
  { label: 'インテリア', purpose: 'インテリア' },
]

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const empty = 5 - full
  return (
    <span style={{ color: 'var(--color-accent)', letterSpacing: '0.1em', fontSize: '1.25rem' }}>
      {'★'.repeat(full)}
      {'☆'.repeat(empty)}
    </span>
  )
}

export default function ReviewsPage() {
  const allReviews = getAllReviews()
  const avgRatingValue = getAverageRating()
  const count = getReviewCount()

  // Star distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: allReviews.filter((r) => r.rating === star).length,
  }))

  // AggregateRating JSON-LD
  const aggregateRatingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: '国産ヒノキ枡',
    brand: { '@type': 'Brand', name: 'MASU-STORE' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRatingValue,
      reviewCount: count,
      bestRating: 5,
      worstRating: 1,
    },
    review: allReviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      name: r.title,
      reviewBody: r.body,
    })),
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: 'お客様の声', href: `${baseUrl}/reviews` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingJsonLd) }}
      />
      <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: 'お客様の声' }]} />

      {/* Hero */}
      <section
        className="flex items-center justify-center py-20"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="section-title">お客様の声</h1>
        </div>
      </section>

      {/* Aggregate summary */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ textAlign: 'center', minWidth: 120 }}>
            <p
              className="serif"
              style={{
                fontSize: '2.5rem',
                fontWeight: 300,
                lineHeight: 1,
                marginBottom: '0.25rem',
              }}
            >
              {avgRatingValue}
            </p>
            <StarRating rating={avgRatingValue} />
            <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
              {count}件のレビュー
            </p>
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            {distribution.map((d) => (
              <div
                key={d.star}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.25rem',
                }}
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', width: '2rem', textAlign: 'right' }}>
                  {d.star}★
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 8,
                    background: 'var(--color-border)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: `${(d.count / count) * 100}%`,
                      background: 'var(--color-accent)',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)', width: '1.5rem' }}>
                  {d.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Purpose filter labels (static display) */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.4rem 1rem',
              background: 'var(--foreground)',
              color: 'var(--background)',
              letterSpacing: '0.1em',
            }}
          >
            全て（{count}）
          </span>
          {purposeGroups.map((g) => {
            const groupCount = allReviews.filter((r) => r.purpose === g.purpose).length
            return (
              <span
                key={g.purpose}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.4rem 1rem',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-muted)',
                  letterSpacing: '0.1em',
                }}
              >
                {g.label}（{groupCount}）
              </span>
            )
          })}
        </div>

        <div
          data-speakable
          className="rounded-sm p-6 mb-12"
          style={{ background: 'var(--color-accent-light)', borderLeft: '4px solid var(--color-accent)' }}
        >
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-accent)' }}>お客様の声まとめ</p>
          <p className="text-sm leading-[2]">
            日本酒の晩酌・結婚祝い・企業ノベルティなど多彩な用途で高評価。「ヒノキの香りが日本酒の味を引き立てる」「もらった方に喜ばれた」「展示会の集客に貢献」といった声が寄せられています。
          </p>
        </div>
      </section>

      <div className="divider mx-auto max-w-5xl" />

      {/* Reviews grouped by purpose */}
      {purposeGroups.map((group) => {
        const groupReviews = allReviews.filter((r) => r.purpose === group.purpose)
        if (groupReviews.length === 0) return null

        return (
          <section key={group.purpose} className="mx-auto max-w-5xl px-6 py-12">
            <h2
              className="serif"
              style={{
                fontSize: '1.25rem',
                fontWeight: 400,
                marginBottom: '1.5rem',
              }}
            >
              {group.label}用途のレビュー
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {groupReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </section>
        )
      })}

      <div className="divider mx-auto max-w-5xl" />

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h2
          className="serif section-title"
          style={{
            marginBottom: '1rem',
          }}
        >
          あなたも枡を体験しませんか
        </h2>
        <p
          style={{
            fontSize: '0.9rem',
            lineHeight: 1.8,
            color: 'var(--color-muted)',
            marginBottom: '2rem',
          }}
        >
          商品一覧からお好みの枡をお選びいただくか、名入れ・オーダーメイドのご相談もお気軽にどうぞ。
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/products" className="btn-primary">
            商品を見る
          </Link>
          <Link href="/custom" className="btn-outline">
            名入れ・オーダーメイド
          </Link>
        </div>
      </section>
    </>
  )
}
