import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { masuSizes } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, ItemListJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import { getAverageRating, getReviewCount } from '@/lib/reviews'
import OrderConfigurator from '@/components/ui/OrderConfigurator'
import Cart from '@/components/ui/Cart'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: '枡の商品一覧 — 国産ヒノキ枡 全サイズ',
  description:
    '国産ヒノキ枡の全7サイズ（三勺〜一升）とFOMUSオリジナル枡の商品一覧。無垢の枡は法人・大口向け10個〜、オリジナル枡は1個から購入可能。まとめ買いほどお得。名入れ・焼印・レーザー刻印対応。JPYC決済にも対応。',
  keywords: '枡 購入,枡 通販,枡 販売,ヒノキ枡,名入れ枡,枡 サイズ,枡 価格,枡 法人,枡 ノベルティ',
  alternates: { canonical: `${siteConfig.url}/products` },
  openGraph: {
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const baseUrl = siteConfig.url

const originalProducts = [
  {
    name: 'FOMUSロゴ入り枡',
    description: 'FOMUSオリジナルロゴ入りのヒノキ枡',
    sub: '焼印でロゴを刻んだ定番モデル',

    image: '/images/original/fomus-masu.jpg',
  },
  {
    name: '枡の首飾り（MASU NECKLACE）',
    description: '三勺枡をベースにしたウェアラブル枡',
    sub: 'ヒノキの香りを身につける新しいアクセサリー',

    image: '/images/original/masu-necklace.jpg',
  },
  {
    name: '枡バッジ（MASU BADGE）',
    description: 'ミニチュア枡のピンバッジ',
    sub: 'スーツの襟元や帽子に',

    image: '/images/original/masu-badge.jpg',
  },
  {
    name: 'SILVA — カードゲーム × 枡',
    description: 'FOMUSオリジナルカードゲームと枡のセット',
    sub: '枡をカードケースとして使う新しい遊び方',

    image: '/images/original/silva.jpg',
  },
  {
    name: '七宝焼コラボ枡',
    description: '伝統工芸・七宝焼とヒノキ枡のコラボレーション',
    sub: '枡 × ジュエリーの融合',

    image: '/images/original/shippo-collab.jpg',
  },
  {
    name: 'MASUKAME',
    description: 'ヒノキで作った枡の亀',
    sub: '枡の技術を活かしたオブジェ',

    image: '/images/original/masukame.jpg',
  },
  {
    name: '枡タワー',
    description: '枡を積み上げたディスプレイ・オブジェ',
    sub: 'イベント・展示会の演出に',

    image: '/images/original/masu-tower.jpg',
  },
]

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '商品一覧', href: `${baseUrl}/products` },
        ]}
      />
      <ItemListJsonLd
        name="国産ヒノキ枡 全7サイズ"
        items={masuSizes.map((m, i) => ({
          name: m.name,
          url: `${baseUrl}/products/${m.id}`,
          position: i + 1,
          image: `${baseUrl}/images/masu-crest.jpg`,
          description: m.description,
        }))}
      />
      <SpeakableJsonLd
        url={`${baseUrl}/products`}
        cssSelectors={['.section-title', '[data-speakable]']}
      />

      {/* Product JSON-LD for each masu size */}
      {masuSizes.map((m) => (
        <script
          key={m.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: m.name,
              description: m.description,
              image: `${baseUrl}/images/masu-crest.jpg`,
              url: `${baseUrl}/products/${m.id}`,
              offers: {
                '@type': 'Offer',
                price: m.priceFrom,
                priceCurrency: 'JPY',
                availability: 'https://schema.org/InStock',
                url: `${baseUrl}/products/${m.id}`,
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

      <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '商品一覧' }]} />

      {/* Hero */}
      <section
        className="flex items-center justify-center py-20"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="section-title">商品一覧</h1>
        </div>
      </section>

      {/* ===== 枡を購入する ===== */}
      <section id="order" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="section-title mb-4">国産ヒノキ枡を購入する</h2>
        <p
          className="mb-10 text-sm leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          サイズ・オプションを選んで、そのまま決済に進めます。10個からご注文いただけます。
        </p>

        <OrderConfigurator />

        {/* カート */}
        <div className="mt-12">
          <Cart />
        </div>

        {/* 法人バナー */}
        <div
          className="mt-12 rounded-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-accent)' }}
        >
          <div>
            <p className="text-sm font-medium mb-1">法人・大量注文のお客様</p>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
              100個以上で数量割引あり。サンプル作成・請求書払いにも対応しています。
            </p>
          </div>
          <Link
            href="/business"
            className="shrink-0 text-xs px-5 py-2.5 rounded-sm font-medium transition-opacity hover:opacity-85"
            style={{ background: 'var(--color-accent)', color: '#fff' }}
          >
            法人ページを見る
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {originalProducts.map((p) => (
            <div
              key={p.name}
              className="flex flex-col rounded-sm overflow-hidden"
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--color-subtle)',
              }}
            >
              <Image
                src={p.image}
                alt={`${p.name} — ${p.description}`}
                width={600}
                height={600}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div className="flex flex-col justify-between flex-1 p-5">
                <div>
                  <h3 className="mb-1 text-base font-medium" style={{ color: 'var(--foreground)' }}>
                    {p.name}
                  </h3>
                  <p className="mb-1 text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                    {p.description}
                  </p>
                  <p className="mb-3 text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                    {p.sub}
                  </p>
                </div>
              </div>
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
