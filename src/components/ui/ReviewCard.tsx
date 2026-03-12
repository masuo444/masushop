import type { Review } from '@/lib/reviews'

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ color: 'var(--color-accent)', letterSpacing: '0.1em' }}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月`
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      style={{
        padding: '1.5rem',
        border: '1px solid var(--color-border)',
        background: 'var(--color-subtle)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <StarRating rating={review.rating} />
        <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
          {formatDate(review.date)}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            padding: '0.2rem 0.5rem',
            background: 'var(--color-accent-light)',
            color: 'var(--color-accent)',
            letterSpacing: '0.05em',
          }}
        >
          {review.size}
        </span>
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            padding: '0.2rem 0.5rem',
            border: '1px solid var(--color-border)',
            color: 'var(--color-muted)',
            letterSpacing: '0.05em',
          }}
        >
          {review.purpose}
        </span>
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-serif-jp), Georgia, serif',
          fontWeight: 500,
          fontSize: '0.95rem',
          marginBottom: '0.5rem',
        }}
      >
        {review.title}
      </h3>

      <p
        style={{
          fontSize: '0.85rem',
          lineHeight: 1.8,
          color: 'var(--color-muted)',
          marginBottom: '0.75rem',
        }}
      >
        {review.body}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--foreground)' }}>
          {review.author}
        </span>
        {review.verified && (
          <span
            style={{
              fontSize: '0.65rem',
              padding: '0.15rem 0.4rem',
              background: 'var(--foreground)',
              color: 'var(--background)',
              letterSpacing: '0.1em',
            }}
          >
            購入者
          </span>
        )}
      </div>
    </div>
  )
}
