import Link from 'next/link'
import { getAllReviews, getAverageRating, getReviewCount } from '@/lib/reviews'
import ReviewCard from '@/components/ui/ReviewCard'

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

export default function ReviewSection() {
  const allReviews = getAllReviews()
  const avgRating = getAverageRating()
  const count = getReviewCount()

  // Star distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: allReviews.filter((r) => r.rating === star).length,
  }))

  // Show top-rated 6 reviews (sorted by rating desc, then date desc)
  const displayReviews = [...allReviews]
    .sort((a, b) => b.rating - a.rating || new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)

  return (
    <section style={{ padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <p className="section-label">REVIEWS</p>
        <h2
          className="section-title"
          style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif', marginBottom: '2rem' }}
        >
          お客様の声
        </h2>

        {/* Aggregate summary */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Average rating */}
          <div style={{ textAlign: 'center', minWidth: 120 }}>
            <p
              style={{
                fontSize: '2.5rem',
                fontWeight: 300,
                lineHeight: 1,
                marginBottom: '0.25rem',
                fontFamily: 'var(--font-serif-jp), Georgia, serif',
              }}
            >
              {avgRating}
            </p>
            <StarRating rating={avgRating} />
            <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
              {count}件のレビュー
            </p>
          </div>

          {/* Distribution bars */}
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

        {/* Review cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          {displayReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <Link href="/reviews" className="btn-outline">
          お客様の声をもっと見る
        </Link>
      </div>
    </section>
  )
}
