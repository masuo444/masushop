import Link from 'next/link'
import { getAllReviews, getAverageRating, getReviewCount } from '@/lib/reviews'
import ReviewCard from '@/components/ui/ReviewCard'
import SurveyReviewCard from '@/components/voice/SurveyReviewCard'
import { getApprovedReviews } from '@/lib/approved-reviews'

export default async function ReviewSection() {
  // 購入者アンケートで掲載に同意・承認されたものを新しい順に最大3件
  const surveyReviews = (await getApprovedReviews()).slice(0, 3)
  const allReviews = getAllReviews()
  const avgRating = getAverageRating()
  const count = getReviewCount()

  // Pick 3 reviews: highest-rated first, then most recent
  const displayReviews = [...allReviews]
    .sort((a, b) => b.rating - a.rating || new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <section style={{ paddingTop: '6rem', paddingBottom: '8rem' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Heading */}
        <h2
          className="serif"
          style={{
            fontSize: '1.5rem',
            fontWeight: 400,
            letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}
        >
          お客様の声
        </h2>

        {/* Summary line */}
        <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '3rem' }}>
          お客様評価{' '}
          <span style={{ color: 'var(--color-accent)' }}>{'★'.repeat(Math.round(avgRating))}</span>
          {avgRating}（{count}件のレビュー）
        </p>

        {surveyReviews.length > 0 && (
          <div className="grid gap-4 mb-8">
            {surveyReviews.map((review) => (
              <SurveyReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* Review cards */}
        <div>
          {displayReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Link to all reviews */}
        <div style={{ marginTop: '2.5rem' }}>
          <Link
            href="/reviews"
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-muted)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
          >
            すべてのレビューを見る →
          </Link>
        </div>
      </div>
    </section>
  )
}
