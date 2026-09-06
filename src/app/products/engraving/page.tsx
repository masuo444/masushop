import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡の名入れ方法を比較 — 焼印 vs レーザー刻印',
  description: '枡の名入れ2種類（焼印・レーザー刻印）を仕上がり・費用・納期・向いている用途で徹底比較。企業ノベルティ・ギフト・記念品の名入れ選びに。',
  keywords: '枡 名入れ 比較,枡 焼印,枡 レーザー刻印,枡 名入れ 方法,枡 ロゴ入れ',
  alternates: { canonical: `${baseUrl}/products/engraving` },
  openGraph: {
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const comparisonRows = [
  { label: '特徴', yakiin: '約400度の銅版で押す伝統技法', laser: '高精度レーザーで彫刻' },
  { label: '仕上がり', yakiin: '焦げ茶色の温かみある印字', laser: '繊細な彫刻、グラデーション可' },
  { label: '色', yakiin: '白黒（焦げ茶色）のみ', laser: '白黒の繊細な濃淡表現' },
  { label: '対応デザイン', yakiin: 'ロゴ・社名・シンプルなデザイン', laser: '写真・QRコード・細かいデザイン' },
  { label: '版の要否', yakiin: '専用の銅版を製作（初回のみ）', laser: '版は不要' },
  { label: '個別デザイン', yakiin: '不可（同一版で量産）', laser: '可能（1個ずつ異なるデザインOK）' },
  { label: '最小ロット', yakiin: '1個〜', laser: '1個〜' },
  { label: 'おすすめ', yakiin: '大量ノベルティ、企業ロゴ', laser: '少量・個別名入れ、写真入り' },
]

const useCases = [
  {
    scenario: '企業ロゴを100個以上のノベルティに入れたい',
    answer: '焼印',
    reason: '同一デザインの大量生産に最適。版代は初回のみなので、数が多いほどコスパが良くなります。',
  },
  {
    scenario: '結婚式で招待客の名前を1個ずつ入れたい',
    answer: 'レーザー刻印',
    reason: '1個ずつ異なるデザインに対応。個別の名前入れが可能です。',
  },
  {
    scenario: '写真やQRコードを枡に刻みたい',
    answer: 'レーザー刻印',
    reason: '濃淡表現が可能なレーザーなら、写真やQRコードも繊細に再現できます。',
  },
  {
    scenario: '温かみのある伝統的な風合いを出したい',
    answer: '焼印',
    reason: '銅版で押す焼印は、木に焦げ目がつく独特の風合い。手仕事の温もりが伝わります。',
  },
  {
    scenario: '少量でロゴ入りの枡を作りたい',
    answer: 'レーザー刻印',
    reason: '版代が不要なので、少ない数でも無理なくお作りできます。刻む内容が1個ずつ違っても対応できます。',
  },
]

export default function EngravingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '商品一覧', href: `${baseUrl}/products` },
          { name: '名入れ比較', href: `${baseUrl}/products/engraving` },
        ]}
      />
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: '商品一覧', href: '/products' },
          { label: '名入れ比較' },
        ]}
      />

      {/* Hero */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="section-title mb-6">枡の名入れ方法を比較</h1>
          <p style={{ color: 'var(--color-muted)' }} className="text-sm leading-relaxed">
            焼印とレーザー刻印、2つの加工方法を徹底比較
          </p>
        </div>
      </section>

      {/* 画像セクション */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="text-center">
            <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-sm" style={{ background: 'var(--color-subtle)' }}>
              <Image
                src="/images/generated/yakiin.jpg"
                alt="焼印による名入れ"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="text-sm font-medium">焼印</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>伝統技法による温かみある仕上がり</p>
          </div>
          <div className="text-center">
            <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-sm" style={{ background: 'var(--color-subtle)' }}>
              <Image
                src="/images/generated/laser-engraving.jpg"
                alt="レーザー刻印による名入れ"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="text-sm font-medium">レーザー刻印</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>高精度な彫刻で繊細な表現が可能</p>
          </div>
        </div>
      </section>

      {/* 比較表 */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="section-title mb-8 text-center">焼印 vs レーザー刻印 比較表</h2>
        <div className="overflow-x-auto table-cards-wrap">
          <table
            className="w-full text-sm table-cards"
            style={{ borderCollapse: 'collapse' }}
          >
            <thead>
              <tr style={{ background: 'var(--color-subtle)', borderBottom: '2px solid var(--color-border)' }}>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>項目</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>焼印</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>レーザー刻印</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.label}
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <td className="px-4 py-4 font-medium whitespace-nowrap">{row.label}</td>
                  <td className="px-4 py-4 leading-relaxed" data-label="焼印">{row.yakiin}</td>
                  <td className="px-4 py-4 leading-relaxed" data-label="レーザー刻印">{row.laser}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 rounded-sm border border-[var(--color-border)] p-6">
            <p
              className="text-[13px] leading-[1.9]"
              style={{ color: 'var(--color-muted)' }}
            >
              <span style={{ color: 'var(--foreground)' }}>
                入れたい文章やメッセージだけお送りいただければ、デザインの制作からお引き受けします。
              </span>
              {' '}書体選び・レイアウト・配置の調整までこちらで行い、仕上がりのイメージをご確認いただいたうえで製作します。デザインデータをご用意いただく必要はありません。費用は、枡のサイズ・刻む内容・数量に応じてお見積りいたします。
            </p>
            <Link
              href="/original"
              className="mt-4 inline-block text-[13px] underline"
              style={{ color: 'var(--color-accent)' }}
            >
              オリジナル枡について見る →
            </Link>
            <Link
              href="/logo"
              className="mt-4 ml-5 inline-block text-[13px] underline"
              style={{ color: 'var(--color-accent)' }}
            >
              企業ロゴを枡に入れる →
            </Link>
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* こんな時はどちらを選ぶ？ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="section-title mb-10 text-center">こんな時はどちらを選ぶ？</h2>
        <div className="space-y-6">
          {useCases.map((uc) => (
            <div
              key={uc.scenario}
              className="rounded-sm p-6"
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--background)',
              }}
            >
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                {uc.scenario}
              </p>
              <p className="text-sm mb-2">
                <span style={{ color: 'var(--color-accent)' }} className="font-medium">
                  {uc.answer}
                </span>
                がおすすめ
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {uc.reason}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="section-title mb-4">名入れのご相談はお気軽に</h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
          デザインデータの入稿方法、仕上がりイメージなど、お気軽にご相談ください。
          <br />
          手書きのデザインやラフスケッチからの制作も承ります。
        </p>
        <Link
          href="/custom"
          className="inline-block px-8 py-3 text-sm rounded-sm transition-opacity hover:opacity-80"
          style={{
            background: 'var(--foreground)',
            color: 'var(--background)',
          }}
        >
          オーダーメイド・名入れ相談
        </Link>
      </section>
    </>
  )
}
