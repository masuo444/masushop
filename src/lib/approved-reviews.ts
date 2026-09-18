/**
 * 管理画面で承認された「購入者アンケート」の口コミを読む。サーバー専用。
 *
 * 掲載に同意し、管理者が承認したものだけが reviews/approved/ に置かれる。
 * 構造化データ（Review / AggregateRating）はここから作るものだけを使い、
 * src/lib/reviews.ts の掲載文は構造化データに含めない。
 */
import { masuSizes } from '@/lib/masu-data'
import type { ApprovedReview } from '@/lib/voice'
import { isBlobConfigured, listApprovedReviewRecords } from '@/lib/voice-store'

export async function getApprovedReviews(): Promise<ApprovedReview[]> {
  // 本番で Blob が未設定なら何も出さない（ローカル開発ではメモリ上の承認分を確認できる）
  if (!isBlobConfigured() && process.env.NODE_ENV === 'production') return []
  try {
    const reviews = await listApprovedReviewRecords()
    return reviews.sort((a, b) => b.date.localeCompare(a.date))
  } catch (error) {
    console.error('Approved reviews could not be loaded', error)
    return []
  }
}

export async function getApprovedReviewsBySize(sizeId: string) {
  const reviews = await getApprovedReviews()
  return reviews.filter((r) => r.sizes.includes(sizeId))
}

export function averageRating(reviews: ApprovedReview[]) {
  if (reviews.length === 0) return null
  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  return Math.round((total / reviews.length) * 10) / 10
}

/** 商品ページの Product に足す review / aggregateRating。該当サイズの承認済みアンケートだけから作る */
export function productReviewJsonLd(sizeId: string, reviews: ApprovedReview[]) {
  const product = masuSizes.find((m) => m.id === sizeId)
  const ratingValue = averageRating(reviews)
  if (!product || reviews.length === 0 || ratingValue === null) return {}

  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.slice(0, 10).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.displayName || '匿名' },
      datePublished: r.date.slice(0, 10),
      reviewBody: r.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  }
}
