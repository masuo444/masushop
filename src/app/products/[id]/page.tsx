import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { masuSizes, engravingMethods, optionPrices } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getAverageRating, getReviewCount } from '@/lib/reviews'
import ProductConfigurator from '@/components/ui/ProductConfigurator'

const baseUrl = siteConfig.url

export function generateStaticParams() {
  return masuSizes.map((m) => ({ id: m.id }))
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const product = masuSizes.find((m) => m.id === params.id)
  if (!product) return {}

  const optionsSummary = product.hasLidOption
    ? '名入れ（焼印・レーザー）・特殊コーティング・蓋オプション対応。'
    : '名入れ（焼印・レーザー）・特殊コーティング対応。'

  const title = `${product.name} — 国産ヒノキ枡 ${product.capacity}`
  const description = `${product.description} ${optionsSummary} ¥${product.priceFrom.toLocaleString()}〜`

  return {
    title,
    description,
    keywords: `${product.name},${product.reading},枡 ${product.capacity},ヒノキ枡,国産枡,名入れ枡,${product.use}`,
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

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = masuSizes.find((m) => m.id === params.id)
  if (!product) notFound()

  const variants = engravingMethods
    .filter((m) => m.id !== 'none')
    .map((method) => ({
      '@type': 'ProductModel',
      name: `${product.name}（${method.name}）`,
      offers: {
        '@type': 'Offer',
        price: product.priceFrom + method.pricePerUnit,
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock',
      },
    }))

  if (product.hasLidOption) {
    variants.push({
      '@type': 'ProductModel',
      name: `${product.name}（蓋付き）`,
      offers: {
        '@type': 'Offer',
        price: product.priceFrom + (product.id === 'sanjaku' ? optionPrices.lid.sanjaku : optionPrices.lid.ichigo),
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock',
      },
    })
  }

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
    material: 'ヒノキ（檜）',
    offers: {
      '@type': 'Offer',
      price: product.priceFrom,
      priceCurrency: 'JPY',
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/products/${product.id}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: getAverageRating(),
      reviewCount: getReviewCount(),
    },
    hasVariant: variants,
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
            {/* 商品画像 */}
            <div className="mb-8">
              <Image
                src="/images/masu-angle.jpg"
                alt={`${product.name} — 国産ヒノキ枡`}
                width={600}
                height={600}
                priority
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

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
                <dt style={{ color: 'var(--color-muted)' }}>参考価格</dt>
                <dd style={{ color: 'var(--color-accent)' }}>
                  &yen;{product.priceFrom.toLocaleString()}〜
                </dd>
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

          {/* 右カラム：コンフィギュレーター */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="rounded-sm p-6"
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--background)',
              }}
            >
              <ProductConfigurator product={product} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
