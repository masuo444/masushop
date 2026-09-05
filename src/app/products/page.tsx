import type { Metadata } from 'next'
import Link from 'next/link'
import { masuSizes } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, ItemListJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: '枡の商品一覧 — 国産ヒノキ枡 全サイズ',
  description:
    '国産ヒノキ枡の全7サイズ（三勺〜一升）の商品一覧。無地の枡は10個から、名入れのオリジナル枡は1個からご相談いただけます。焼印・レーザー刻印対応。JPYC決済にも対応。',
  keywords: '枡 購入,枡 通販,枡 販売,ヒノキ枡,名入れ枡,枡 サイズ,枡 価格,枡 法人,枡 ノベルティ',
  alternates: { canonical: `${siteConfig.url}/products` },
  openGraph: {
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const baseUrl = siteConfig.url


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

      {/* ===== ご注文・ご相談 ===== */}
      <section id="order" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="section-title mb-4">ご注文・ご相談</h2>
        <p
          className="mb-10 text-sm leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          ご注文はお問い合わせフォームから承ります。サイズ・数量・名入れのご希望をお知らせいただければ、
          お見積りをお出しします。ご相談・お見積りは無料です。
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/custom"
            className="rounded-sm p-6 transition-opacity hover:opacity-85"
            style={{ background: 'var(--color-accent)', color: '#fff' }}
          >
            <p className="text-sm font-medium mb-1">枡のお見積り・ご相談</p>
            <p className="text-xs leading-relaxed" style={{ opacity: 0.85 }}>
              サイズ・数量・名入れの希望をお知らせください
            </p>
          </Link>
          <Link
            href="/original"
            className="rounded-sm p-6 transition-colors"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <p className="text-sm font-medium mb-1">オリジナル枡（1個〜）</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              文章を送るだけで、デザイン制作からお任せいただけます
            </p>
          </Link>
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
        <Link href="/original" className="btn-primary">
          オリジナル枡の詳細を見る
        </Link>
      </section>
    </>
  )
}
