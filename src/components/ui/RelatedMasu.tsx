import Link from 'next/link'
import { masuSizes } from '@/lib/masu-data'

/**
 * 記事末尾の「関連する枡」ブロック。
 * 読みもの（歴史・日本酒・用語辞典など）から商品ページへ文脈で送るための共通部品。
 * 見た目は商品ページ・サイズ比較ページのカードに合わせている。
 */
export default function RelatedMasu({
  ids,
  heading = '関連する枡',
  lead,
  className = '',
}: {
  ids: string[]
  heading?: string
  lead?: string
  className?: string
}) {
  const items = ids
    .map((id) => masuSizes.find((m) => m.id === id))
    .filter((m): m is (typeof masuSizes)[number] => Boolean(m))

  if (items.length === 0) return null

  const cols =
    items.length >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'

  return (
    <section className={`max-w-5xl mx-auto px-6 py-16 ${className}`} aria-labelledby="related-masu-title">
      <h2 id="related-masu-title" className="section-title mb-3 text-center">
        {heading}
      </h2>
      {lead && (
        <p className="lead text-center mb-10">{lead}</p>
      )}
      {!lead && <div className="mb-10" />}
      <div className={`grid gap-5 ${cols}`}>
        {items.map((m) => (
          <Link
            key={m.id}
            href={`/products/${m.id}`}
            className="block rounded-sm p-6 transition-colors hover:bg-[var(--color-subtle)]"
            style={{ border: '1px solid var(--color-border)', background: 'var(--background)' }}
          >
            <p className="serif text-lg mb-1" style={{ color: 'var(--foreground)' }}>
              {m.name}
            </p>
            <p className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>
              {m.reading} ／ {m.capacity}（{m.capacityNote}）
            </p>
            <p className="text-xs mb-1" style={{ color: 'var(--color-muted)' }}>
              外寸 {m.size}
            </p>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--color-muted)' }}>
              {m.use}
            </p>
            <span className="text-xs underline" style={{ color: 'var(--color-accent)' }}>
              {m.name}の詳細を見る →
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-center text-sm" style={{ color: 'var(--color-muted)' }}>
        <Link href="/products/sizes" className="underline" style={{ color: 'var(--color-accent)' }}>
          全7サイズの寸法・容量を比較する
        </Link>
        <span className="mx-3">／</span>
        <Link href="/products/engraving" className="underline" style={{ color: 'var(--color-accent)' }}>
          名入れ方法（焼印・レーザー刻印）を見る
        </Link>
      </p>
    </section>
  )
}
