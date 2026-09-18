import { sizeLabel, VOICE_UNKNOWN_SIZE, type ApprovedReview } from '@/lib/voice'

function formatMonth(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}年${d.getMonth() + 1}月`
}

/** 購入者アンケートから承認・掲載した口コミ1件 */
export default function SurveyReviewCard({ review }: { review: ApprovedReview }) {
  const sizes = review.sizes.filter((s) => s !== VOICE_UNKNOWN_SIZE).map(sizeLabel)
  const processing =
    review.processing && review.processing !== 'なし' && review.processing !== 'わからない'
      ? review.processing
      : ''
  const details = [review.purpose, sizes.join('・'), processing].filter(Boolean)
  const author = [review.attribute, review.prefecture].filter(Boolean).join('・')

  return (
    <article
      className="rounded-sm p-6"
      style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
    >
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <p
          aria-label={`5段階評価で${review.rating}`}
          className="text-sm tracking-[0.15em]"
          style={{ color: 'var(--color-accent)' }}
        >
          {'★'.repeat(review.rating)}
          <span style={{ color: 'var(--color-border)' }}>{'★'.repeat(5 - review.rating)}</span>
        </p>
        <span
          className="text-[11px] px-2 py-0.5 rounded-sm"
          style={{ color: 'var(--color-accent)', border: '1px solid var(--color-accent)' }}
        >
          購入者アンケートより
        </span>
      </div>
      <p className="mb-3 text-sm leading-[1.9] whitespace-pre-wrap" style={{ color: 'var(--foreground)' }}>
        {review.text}
      </p>
      <p className="text-[11px] leading-[1.8]" style={{ color: 'var(--color-muted)' }}>
        {review.displayName || '匿名'}
        {author && `（${author}）`}・{formatMonth(review.date)}
        {details.length > 0 && (
          <>
            <br />
            {details.join(' / ')}
          </>
        )}
      </p>
    </article>
  )
}
