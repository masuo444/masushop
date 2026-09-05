import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { masuSizes } from '@/lib/masu-data'
import { getReviewsByProduct } from '@/lib/reviews'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url
type ProductPageProps = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return masuSizes.map((m) => ({ id: m.id }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = masuSizes.find((m) => m.id === id)
  if (!product) return {}

  let optionsSummary = '名入れ（焼印・レーザー）・特殊コーティング対応。'
  if (product.hasLidOption) {
    optionsSummary = '名入れ（焼印・レーザー）・特殊コーティング・蓋オプション対応。'
  }

  if (product.id === 'ichigo') {
    optionsSummary = '名入れ（焼印・レーザー）・特殊コーティング・蓋・専用パッケージ（クリアケース・白箱）対応。'
  }

  const title = `${product.name} — 国産ヒノキ枡 ${product.capacity}`
  const description = `${product.description} ${optionsSummary}`

  return {
    title,
    description,
    keywords: `${product.name},${product.reading},枡 ${product.capacity},ヒノキ枡,国産枡,名入れ枡,${product.id === 'ichigo' ? '一合枡 クリアケース,一合枡 白箱,枡 パッケージ,' : ''}${product.use}`,
    alternates: { canonical: `${baseUrl}/products/${product.id}` },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/products/${product.id}`,
      siteName: siteConfig.name,
      type: 'website',
    },
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = masuSizes.find((m) => m.id === id)
  if (!product) notFound()

  // レビューは当該サイズのものだけを使う（サイト全体の平均を商品評価として出さない）
  const productReviews = getReviewsByProduct(product.name)
  const ratingValue =
    productReviews.length > 0
      ? Math.round(
          (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length) * 10,
        ) / 10
      : null

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'MASU-STORE',
    },
    category: 'Kitchen & Dining > Drinkware',
    material: 'ヒノキ（檜） / Japanese Cypress (Hinoki)',
    manufacturer: {
      '@type': 'Organization',
      name: 'MASU-STORE',
      url: siteConfig.url,
    },
    countryOfOrigin: {
      '@type': 'Country',
      name: 'Japan',
    },
    ...(ratingValue !== null
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue,
            reviewCount: productReviews.length,
            bestRating: 5,
            worstRating: 1,
          },
          review: productReviews.map((r) => ({
            '@type': 'Review',
            name: r.title,
            reviewBody: r.body,
            datePublished: r.date,
            author: { '@type': 'Person', name: r.author },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: r.rating,
              bestRating: 5,
              worstRating: 1,
            },
          })),
        }
      : {}),
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: '素材',
        value: '国産ヒノキ（檜）',
      },
      {
        '@type': 'PropertyValue',
        name: '寸法',
        value: product.size,
      },
      {
        '@type': 'PropertyValue',
        name: '容量',
        value: product.capacity,
      },
      ...(product.id === 'ichigo'
        ? [
            {
              '@type': 'PropertyValue',
              name: '専用パッケージ',
              value: 'クリアケース・白箱',
            },
          ]
        : []),
    ],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/products/${product.id}`,
    },
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '商品一覧', href: `${baseUrl}/products` },
          { name: product.name, href: `${baseUrl}/products/${product.id}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* パンくず */}
      <nav className="mx-auto max-w-5xl px-6 py-4">
        <ol className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-muted)' }}>
          <li>
            <Link href="/" className="hover:underline">ホーム</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/products" className="hover:underline">商品一覧</Link>
          </li>
          <li>/</li>
          <li style={{ color: 'var(--foreground)' }}>{product.name}</li>
        </ol>
      </nav>

      {/* メインコンテンツ */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* 左カラム：商品情報 */}
          <div>
            {/* 商品名 */}
            <h1 className="section-title mb-1">{product.name}</h1>
            <p className="mb-6 text-sm" style={{ color: 'var(--color-muted)' }}>
              {product.reading}
            </p>

            {/* サイズ・容量 */}
            <dl
              className="mb-8 space-y-2 rounded-sm p-5 text-sm"
              style={{
                background: 'var(--color-subtle)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex justify-between">
                <dt style={{ color: 'var(--color-muted)' }}>外寸</dt>
                <dd>{product.size}</dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: 'var(--color-muted)' }}>容量</dt>
                <dd>{product.capacity}</dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: 'var(--color-muted)' }}>容量目安</dt>
                <dd>{product.capacityNote}</dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: 'var(--color-muted)' }}>価格</dt>
                <dd style={{ color: 'var(--color-accent)' }}>お見積り</dd>
              </div>
            </dl>

            {/* 説明文 */}
            <p className="mb-8 text-sm leading-[1.9]" style={{ color: 'var(--foreground)' }}>
              {product.description}
            </p>

            {/* 特長リスト */}
            <div className="mb-8">
              <h2 className="serif text-lg mb-4" style={{ color: 'var(--foreground)' }}>特長</h2>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm leading-relaxed"
                    style={{ color: 'var(--foreground)' }}
                  >
                    <span
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      &#10003;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* おすすめ用途 */}
            <div className="mb-10">
              <h2 className="serif text-lg mb-3" style={{ color: 'var(--foreground)' }}>
                おすすめ用途
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {product.use}
              </p>
            </div>

            <div className="divider mb-10" />

            {/* 関連ページ */}
            <div>
              <h2 className="serif text-lg mb-4" style={{ color: 'var(--foreground)' }}>
                関連情報
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/care"
                    className="text-sm hover:underline"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    枡のお手入れ方法 &rarr;
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guide"
                    className="text-sm hover:underline"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    枡の選び方ガイド &rarr;
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sake"
                    className="text-sm hover:underline"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    枡で日本酒を楽しむ &rarr;
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* 右カラム：ご相談 */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="rounded-sm p-6"
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--background)',
              }}
            >
              <h2 className="text-base font-medium mb-3">
                {product.name}のご相談
              </h2>
              <p
                className="text-[13px] leading-[1.9] mb-6"
                style={{ color: 'var(--color-muted)' }}
              >
                数量・名入れのご希望をお知らせいただければ、お見積りをお出しします。
                名入れは、入れたい文章をお送りいただければデザインからお作りします。
                ご相談・お見積りは無料です。
              </p>
              <Link
                href={`/custom?size=${product.id}`}
                className="block w-full rounded-sm py-3 text-center text-sm font-medium transition-opacity hover:opacity-85"
                style={{ background: 'var(--color-accent)', color: '#fff' }}
              >
                この枡のお見積り・ご相談
              </Link>
              <Link
                href="/original"
                className="mt-3 block w-full rounded-sm py-3 text-center text-sm transition-colors"
                style={{
                  border: '1px solid var(--color-border)',
                  color: 'var(--foreground)',
                }}
              >
                1個からのオリジナル枡
              </Link>
            </div>
          </div>
        </div>

        {product.id === 'ichigo' && (
          <section
            className="mt-16 rounded-sm p-6 md:p-10"
            style={{
              background: 'var(--color-subtle)',
              border: '1px solid var(--color-border)',
            }}
            aria-labelledby="ichigo-packaging-title"
          >
            <div className="mx-auto max-w-3xl text-center">
              <p
                className="mb-3 text-xs font-medium tracking-[0.18em]"
                style={{ color: 'var(--color-accent)' }}
              >
                一合枡限定オプション
              </p>
              <h2 id="ichigo-packaging-title" className="section-title mb-4">
                一合枡専用パッケージ
              </h2>
              <p className="text-sm leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                一合枡のみ、クリアケースと白箱をご用意できます。
                名入れギフト、企業記念品、引き出物などの個別包装にご利用ください。
                費用は数量に応じてお見積りいたします。
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <article
                className="overflow-hidden rounded-sm"
                style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
              >
                <Image
                  src="/images/package/ichigo-clear-case.webp"
                  alt="一合枡を入れられる透明なクリアケース"
                  width={1254}
                  height={1254}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="aspect-square w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="serif text-lg mb-2">クリアケース</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                    枡の木目や名入れデザインを見せたまま、展示・配布できる透明パッケージです。
                  </p>
                </div>
              </article>

              <article
                className="overflow-hidden rounded-sm"
                style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
              >
                <Image
                  src="/images/package/ichigo-white-box.webp"
                  alt="一合枡を個別包装できる白箱"
                  width={1254}
                  height={1254}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="aspect-square w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="serif text-lg mb-2">白箱</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                    清潔感のある個別包装。企業記念品や引き出物、贈答用の一合枡に適しています。
                  </p>
                </div>
              </article>
            </div>

            <div className="mt-8 text-center">
              <Link href="/custom?size=ichigo&type=packaging" className="btn-accent">
                パッケージ込みで見積り・相談する
              </Link>
            </div>
          </section>
        )}

        {productReviews.length > 0 && (
          <section className="mt-16" aria-labelledby="product-reviews-title">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
              <h2 id="product-reviews-title" className="serif text-2xl">
                {product.name}のお客様の声
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                <span
                  className="text-base font-medium"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {ratingValue}
                </span>
                {' / 5.0'}（{productReviews.length}件）
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {productReviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-sm p-6"
                  style={{
                    background: 'var(--color-subtle)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <p
                      aria-label={`5段階評価で${review.rating}`}
                      className="text-sm tracking-[0.15em]"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {'★'.repeat(review.rating)}
                      <span style={{ color: 'var(--color-border)' }}>
                        {'★'.repeat(5 - review.rating)}
                      </span>
                    </p>
                    {review.verified && (
                      <span className="text-[11px]" style={{ color: 'var(--color-muted)' }}>
                        購入者
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 text-sm font-medium">{review.title}</h3>
                  <p
                    className="mb-3 text-sm leading-[1.9]"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {review.body}
                  </p>
                  <p className="text-[11px]" style={{ color: 'var(--color-muted)' }}>
                    {review.author}・{review.purpose}・{review.date}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/reviews"
                className="text-sm underline underline-offset-4"
                style={{ color: 'var(--color-accent)' }}
              >
                すべてのお客様の声を見る
              </Link>
            </div>
          </section>
        )}
      </section>
    </>
  )
}
