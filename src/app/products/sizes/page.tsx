import type { Metadata } from 'next'
import Link from 'next/link'
import { masuSizes } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡のサイズ比較 — 全7サイズを徹底比較',
  description: '枡の全7サイズ（三勺・五勺・八勺・一合・二合半・五合・一升）を寸法・容量・用途・価格で徹底比較。用途別おすすめサイズがひと目でわかります。',
  keywords: '枡 サイズ 比較,枡 サイズ 一覧,枡 大きさ,一合枡 サイズ,枡 容量',
  alternates: { canonical: `${baseUrl}/products/sizes` },
  openGraph: {
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
}

const recommendations = [
  { purpose: '日本酒を飲む', recommended: '一合枡', id: 'ichigo', reason: '日本酒一合分（180ml）がぴったり入る定番サイズ。もっきりスタイルには八勺枡も人気です。' },
  { purpose: 'ギフト・記念品', recommended: '五勺枡 / 一合枡', id: 'goshaku', reason: '名入れを施してオリジナルギフトに。五勺枡はペアギフト、一合枡はノベルティに人気。' },
  { purpose: '節分の豆まき', recommended: '五合枡', id: 'gogo', reason: '家族分の豆がしっかり入り、手で持って撒きやすいサイズ。節分の定番です。' },
  { purpose: '鏡開き・式典', recommended: '一升枡', id: 'issho', reason: '一升瓶1本分が入る迫力サイズ。鏡開きや大型イベントに欠かせません。' },
  { purpose: 'インテリア・小物入れ', recommended: '三勺枡 / 二合半枡', id: 'sanjaku', reason: '三勺枡はアクセサリー入れに、二合半枡はペン立てや小物入れにぴったり。' },
]

export default function SizesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '商品一覧', href: `${baseUrl}/products` },
          { name: 'サイズ比較', href: `${baseUrl}/products/sizes` },
        ]}
      />
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: '商品一覧', href: '/products' },
          { label: 'サイズ比較' },
        ]}
      />

      {/* Hero */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="section-title mb-6">枡のサイズ比較</h1>
          <p style={{ color: 'var(--color-muted)' }} className="text-sm leading-relaxed">
            全7サイズを寸法・容量・用途・価格で徹底比較
          </p>
        </div>
      </section>

      {/* 比較表 */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="section-title mb-8 text-center">全7サイズ 比較表</h2>
        <div className="overflow-x-auto">
          <table
            className="w-full text-sm"
            style={{ borderCollapse: 'collapse' }}
          >
            <thead>
              <tr style={{ background: 'var(--color-subtle)', borderBottom: '2px solid var(--color-border)' }}>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>サイズ名</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>外寸</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>容量</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>容量目安</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>おすすめ用途</th>
                <th className="px-4 py-3 text-right font-medium" style={{ color: 'var(--color-muted)' }}>参考価格</th>
              </tr>
            </thead>
            <tbody>
              {masuSizes.map((masu) => (
                <tr
                  key={masu.id}
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <td className="px-4 py-4 font-medium">
                    <Link
                      href={`/products/${masu.id}`}
                      className="hover:underline"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {masu.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{masu.size}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{masu.capacity}</td>
                  <td className="px-4 py-4" style={{ color: 'var(--color-muted)' }}>{masu.capacityNote}</td>
                  <td className="px-4 py-4 text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>{masu.use}</td>
                  <td className="px-4 py-4 text-right whitespace-nowrap" style={{ color: 'var(--color-accent)' }}>
                    &yen;{masu.priceFrom.toLocaleString()}〜
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* 用途別おすすめ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="section-title mb-10 text-center">用途別おすすめサイズ</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <div
              key={rec.purpose}
              className="rounded-sm p-6"
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--background)',
              }}
            >
              <h3 className="serif text-base mb-2" style={{ color: 'var(--foreground)' }}>
                {rec.purpose}
              </h3>
              <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-accent)' }}>
                {rec.recommended}
              </p>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--color-muted)' }}>
                {rec.reason}
              </p>
              <Link
                href={`/products/${rec.id}`}
                className="text-xs hover:underline"
                style={{ color: 'var(--color-accent)' }}
              >
                商品詳細を見る &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="section-title mb-4">お気軽にご相談ください</h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
          サイズ選びに迷ったら、用途やご予算に合わせて最適なサイズをご提案いたします。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products#order"
            className="inline-block px-8 py-3 text-sm rounded-sm transition-opacity hover:opacity-80"
            style={{
              background: 'var(--foreground)',
              color: 'var(--background)',
            }}
          >
            商品一覧・ご注文
          </Link>
          <Link
            href="/custom"
            className="inline-block px-8 py-3 text-sm rounded-sm transition-opacity hover:opacity-80"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--foreground)',
            }}
          >
            オーダーメイド相談
          </Link>
        </div>
      </section>
    </>
  )
}
