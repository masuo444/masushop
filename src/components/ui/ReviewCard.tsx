import type { Review } from '@/lib/reviews'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月`
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      style={{
        paddingTop: '2rem',
        paddingBottom: '2rem',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* Stars */}
      <div style={{ marginBottom: '0.75rem' }}>
        <span style={{ color: 'var(--color-accent)', letterSpacing: '0.05em', fontSize: '0.95rem' }}>
          {'★'.repeat(review.rating)}
          <span style={{ color: '#d4d4d4' }}>{'☆'.repeat(5 - review.rating)}</span>
        </span>
      </div>

      {/* Title */}
      <h3
        className="serif"
        style={{
          fontWeight: 400,
          fontSize: '1rem',
          lineHeight: 1.6,
          marginBottom: '0.5rem',
        }}
      >
        {review.title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontSize: '0.875rem',
          lineHeight: 1.9,
          color: 'var(--color-muted)',
          marginBottom: '1rem',
        }}
      >
        {review.body}
      </p>

      {/* Author line + product info */}
      <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
        <span>
          {review.verified && (
            <span style={{ opacity: 0.7 }}>ご購入者 </span>
          )}
          <span style={{ color: 'var(--foreground)' }}>{review.author}</span>
          <span style={{ margin: '0 0.4em' }}>·</span>
          {formatDate(review.date)}
        </span>
        <br />
        <span style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.25rem', display: 'inline-block' }}>
          {review.product} / {review.size}
        </span>
      </div>
    </div>
  )
}
