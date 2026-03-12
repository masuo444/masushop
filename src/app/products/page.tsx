import type { Metadata } from 'next'
import Link from 'next/link'
import { masuSizes } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { fetchMasuProducts, fetchAllProducts } from '@/lib/api'
import ProductCard from '@/components/ui/ProductCard'
import { getAverageRating, getReviewCount } from '@/lib/reviews'

export const metadata: Metadata = {
  title: '枡の商品一覧 — 国産ヒノキ枡 全サイズ',
  description:
    '国産ヒノキ枡の全7サイズ（三勺〜一升）とFOMUSオリジナル枡の商品一覧。無垢の枡は法人・大口向け10個〜、オリジナル枡は1個から購入可能。まとめ買いほどお得。名入れ・焼印・レーザー刻印対応。JPYC決済にも対応。',
  keywords: '枡 購入,枡 通販,枡 販売,ヒノキ枡,名入れ枡,枡 サイズ,枡 価格,枡 法人,枡 ノベルティ',
  alternates: { canonical: `${siteConfig.url}/products` },
}

const baseUrl = siteConfig.url

const originalProducts = [
  {
    name: '枡の首飾り（MASU NECKLACE）',
    description: '三勺枡をベースにしたウェアラブル枡',
    sub: 'ヒノキの香りを身につける新しいアクセサリー',
    price: 'お問い合わせ',
  },
  {
    name: '枡バッジ（MASU BADGE）',
    description: 'ミニチュア枡のピンバッジ',
    sub: 'スーツの襟元や帽子に',
    price: 'お問い合わせ',
  },
  {
    name: 'アート枡',
    description: 'アーティストとのコラボレーション枡',
    sub: '限定デザイン',
    price: 'お問い合わせ',
  },
  {
    name: '枡キャンドル',
    description: '一合枡にソイキャンドルを注いだインテリアアイテム',
    sub: 'ヒノキ × キャンドルの香りの融合',
    price: 'お問い合わせ',
  },
]

export default async function ProductsPage() {
  const products = await fetchMasuProducts()
  const allProducts = products.length > 0 ? products : await fetchAllProducts(8)
  const displayProducts = products.length > 0 ? products : allProducts

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '商品一覧', href: `${baseUrl}/products` },
        ]}
      />

      {/* Product JSON-LD for each product */}
      {displayProducts.map((product) => (
        <script
          key={product.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.name,
              description: product.description || product.name,
              image: product.images[0] || undefined,
              url: product.url,
              offers: {
                '@type': 'Offer',
                price: product.price,
                priceCurrency: 'JPY',
                availability: product.is_available
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/OutOfStock',
                url: product.url,
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: getAverageRating(),
                reviewCount: getReviewCount(),
              },
            }),
          }}
        />
      ))}

      {/* Hero */}
      <section
        className="flex items-center justify-center py-20"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="section-title">商品一覧</h1>
        </div>
      </section>

      {/* ===== オンラインで購入可能な枡 ===== */}
      <section id="online" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="section-title mb-4">オンラインで購入可能な枡</h2>
        <p
          className="mb-10 text-sm leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          FOMUS SHOPで販売中の枡製品です。1個からご購入いただけます。
        </p>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div
            className="rounded-sm px-6 py-10 text-center"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-subtle)',
            }}
          >
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              現在準備中です。お見積りフォームからお問い合わせください。
            </p>
            <Link href="/custom" className="btn-primary mt-4 inline-block">
              お見積りフォームへ
            </Link>
          </div>
        )}
      </section>

      <div className="divider mx-auto max-w-5xl" />

      {/* ===== 無垢の枡 ===== */}
      <section id="standard" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="section-title mb-4">無垢の枡 — 無地・名入れ対応</h2>
        <p
          className="mb-10 text-sm leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          ※ 無垢の枡は{siteConfig.standardMasuMinOrder}
          個以上からのご注文となります。法人・団体のお客様向け。まとめ買いほどお得です。
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {masuSizes.map((m) => (
            <div
              key={m.id}
              className="flex flex-col justify-between rounded-sm p-6"
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--background)',
              }}
            >
              <div>
                <h3 className="mb-1 text-lg font-medium" style={{ color: 'var(--foreground)' }}>
                  {m.name}
                </h3>
                <p className="mb-4 text-xs" style={{ color: 'var(--color-muted)' }}>
                  {m.reading}
                </p>

                <dl className="mb-4 space-y-1 text-sm" style={{ color: 'var(--foreground)' }}>
                  <div className="flex justify-between">
                    <dt style={{ color: 'var(--color-muted)' }}>外寸</dt>
                    <dd>{m.size}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt style={{ color: 'var(--color-muted)' }}>容量</dt>
                    <dd>{m.capacity}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt style={{ color: 'var(--color-muted)' }}>容量目安</dt>
                    <dd>{m.capacityNote}</dd>
                  </div>
                </dl>

                <p className="mb-4 text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  用途：{m.use}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base font-medium" style={{ color: 'var(--color-accent)' }}>
                  &yen;{m.priceFrom.toLocaleString()}〜 / 個
                </span>
                <span
                  className="rounded-sm px-2 py-0.5 text-[10px] tracking-wider"
                  style={{
                    background: 'var(--color-accent-light)',
                    color: 'var(--color-accent)',
                  }}
                >
                  名入れ対応
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/business" className="btn-primary">
            法人・大口のお見積りはこちら
          </Link>
        </div>
      </section>

      <div className="divider mx-auto max-w-5xl" />

      {/* ===== FOMUS オリジナル枡 ===== */}
      <section id="original" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="section-title mb-4">
          FOMUSロゴ入り・オリジナルデザイン枡 — 1個から購入可能
        </h2>
        <p className="mb-10 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          FOMUSが伝統の枡にアート・デザインを掛け合わせたオリジナルプロダクト。FOMUSロゴ入り・オリジナルデザイン枡は1個からお買い求めいただけます。
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {originalProducts.map((p) => (
            <div
              key={p.name}
              className="flex flex-col justify-between rounded-sm p-6"
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--color-subtle)',
              }}
            >
              <div>
                <h3 className="mb-2 text-lg font-medium" style={{ color: 'var(--foreground)' }}>
                  {p.name}
                </h3>
                <p className="mb-1 text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                  {p.description}
                </p>
                <p className="mb-4 text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {p.sub}
                </p>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
                価格：{p.price}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={siteConfig.fomusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent"
          >
            購入・お問い合わせはFOMUS SHOPへ
          </a>
        </div>
      </section>

      <div className="divider mx-auto max-w-5xl" />

      {/* ===== JPYC決済対応 ===== */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div
          className="rounded-sm px-6 py-5 text-center text-sm leading-relaxed"
          style={{
            background: 'var(--color-accent-light)',
            color: 'var(--color-accent)',
            border: '1px solid var(--color-accent)',
          }}
        >
          当店ではJPYC（日本円ステーブルコイン）でのお支払いに対応しています。
        </div>
      </section>

      <div className="divider mx-auto max-w-5xl" />

      {/* ===== CTA: カスタム ===== */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h2 className="section-title mb-4">オリジナル枡を作りませんか？</h2>
        <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          名入れ・焼印・レーザー刻印・オリジナルデザインなど、あなただけの枡をお作りします。
        </p>
        <Link href="/custom" className="btn-primary">
          オーダーメイドの詳細を見る
        </Link>
      </section>
    </>
  )
}
