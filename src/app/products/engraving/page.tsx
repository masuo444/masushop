import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { masuSizes, sizeDetails } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡の名入れ｜焼印・レーザー刻印の違いと選び方（1個から）',
  description:
    '枡の名入れは焼印とレーザー刻印の2種類。焼印は約400度の銅版で押す伝統技法で社名・ロゴの量産向き、レーザー刻印は写真・QRコード・1個ずつ違う名前に対応。仕上がり・版の要否・向いている用途を比較表で解説。名入れは1個から、デザインデータ不要。',
  keywords: '枡 名入れ,枡 焼印,枡 ロゴ,枡 レーザー刻印,枡 名入れ 方法,枡 ロゴ入れ,枡 名入れ 1個から,名入れ枡',
  alternates: { canonical: `${baseUrl}/products/engraving` },
  openGraph: {
    title: '枡の名入れ｜焼印・レーザー刻印の違いと選び方（1個から）',
    description:
      '焼印は社名・ロゴの量産向き、レーザー刻印は写真・QRコード・1個ずつ違う名前に対応。仕上がり・版の要否・向いている用途を比較。',
    url: `${baseUrl}/products/engraving`,
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
    href: '/logo',
    linkLabel: '企業ロゴを枡に入れる',
  },
  {
    scenario: '結婚式で招待客の名前を1個ずつ入れたい',
    answer: 'レーザー刻印',
    reason: '1個ずつ異なるデザインに対応。個別の名前入れが可能です。',
    href: '/original',
    linkLabel: '名入れ枡を1個から作る',
  },
  {
    scenario: '写真やQRコードを枡に刻みたい',
    answer: 'レーザー刻印',
    reason: '濃淡表現が可能なレーザーなら、写真やQRコードも繊細に再現できます。',
    href: '/original',
    linkLabel: '写真・手書き文字の名入れ',
  },
  {
    scenario: '温かみのある伝統的な風合いを出したい',
    answer: '焼印',
    reason: '銅版で押す焼印は、木に焦げ目がつく独特の風合い。手仕事の温もりが伝わります。',
    href: '/glossary#yakiin',
    linkLabel: '焼印とは（用語辞典）',
  },
  {
    scenario: '少量でロゴ入りの枡を作りたい',
    answer: 'レーザー刻印',
    reason: '版代が不要なので、少ない数でも無理なくお作りできます。刻む内容が1個ずつ違っても対応できます。',
    href: '/logo',
    linkLabel: 'ロゴ入れの流れを見る',
  },
]

export default function EngravingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '商品一覧', href: `${baseUrl}/products` },
          { name: '名入れ方法', href: `${baseUrl}/products/engraving` },
        ]}
      />
      <SpeakableJsonLd url={`${baseUrl}/products/engraving`} cssSelectors={['[data-speakable]', '.section-title']} />
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: '商品一覧', href: '/products' },
          { label: '名入れ方法' },
        ]}
      />

      {/* Hero */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="section-title mb-6">枡の名入れ方法 — 焼印とレーザー刻印の比較</h1>
          <p data-speakable className="lead">
            枡の名入れは、焼印とレーザー刻印の2種類です。社名やロゴを同じ内容でまとめて入れるなら約400度の銅版で押す焼印、
            写真・手書き文字・QRコード・1個ずつ違う名前ならレーザー刻印が向いています。
            名入れは1個からご相談でき、入れたい文章やロゴを送るだけでデザインはこちらで制作します。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/original" className="btn-primary">
              名入れ枡を1個から作る
            </Link>
            <Link href="/custom" className="btn-outline">
              法人・まとめ注文の見積り
            </Link>
          </div>
        </div>
      </section>

      {/* 画像セクション */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="text-center">
            <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-sm" style={{ background: 'var(--color-subtle)' }}>
              <Image
                src="/images/generated/yakiin.jpg"
                alt="焼印による枡の名入れ — 焦げ茶色に焼き付けた社名"
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
                alt="レーザー刻印による枡の名入れ — 細い線まで再現したロゴ"
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
            <caption className="sr-only">焼印とレーザー刻印の比較</caption>
            <thead>
              <tr style={{ background: 'var(--color-subtle)', borderBottom: '2px solid var(--color-border)' }}>
                <th scope="col" className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>項目</th>
                <th scope="col" className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>焼印</th>
                <th scope="col" className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>レーザー刻印</th>
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
              オリジナル枡（1個から）について見る →
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
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--color-muted)' }}>
                {uc.reason}
              </p>
              <Link href={uc.href} className="text-xs underline" style={{ color: 'var(--color-accent)' }}>
                {uc.linkLabel} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* サイズ別の刻印面 */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="section-title mb-4 text-center">サイズ別・名入れできる面の大きさ</h2>
        <p className="lead text-center mb-10">
          名入れは全7サイズに対応しています。刻印面（側面1面）の大きさは枡の外寸で決まるため、入れたい文字量に合わせてサイズを選ぶと読みやすく仕上がります。
        </p>
        <div className="overflow-x-auto table-cards-wrap">
          <table className="w-full text-sm table-cards" style={{ borderCollapse: 'collapse' }}>
            <caption className="sr-only">サイズ別の刻印面の大きさと向いている内容</caption>
            <thead>
              <tr style={{ background: 'var(--color-subtle)', borderBottom: '2px solid var(--color-border)' }}>
                <th scope="col" className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>サイズ</th>
                <th scope="col" className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>外寸</th>
                <th scope="col" className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>刻印面の目安</th>
              </tr>
            </thead>
            <tbody>
              {masuSizes.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="px-4 py-4 font-medium">
                    <Link href={`/products/${m.id}`} className="hover:underline" style={{ color: 'var(--color-accent)' }}>
                      {m.name}
                    </Link>
                    <span className="block text-xs font-normal" style={{ color: 'var(--color-muted)' }}>{m.capacity}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap" data-label="外寸">{m.size}</td>
                  <td className="px-4 py-4 text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }} data-label="刻印面の目安">
                    {sizeDetails[m.id]?.engravingArea}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-center" style={{ color: 'var(--color-muted)' }}>
          容量や用途を含めた比較は
          <Link href="/products/sizes" className="underline mx-1" style={{ color: 'var(--color-accent)' }}>枡のサイズ一覧</Link>
          をご覧ください。名入れした枡を水や汚れから守る
          <Link href="/coating" className="underline mx-1" style={{ color: 'var(--color-accent)' }}>特殊コーティング</Link>
          も選べます。
        </p>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="section-title mb-4">名入れのご相談はお気軽に</h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
          個人の記念品は1個から、法人のノベルティ・周年記念品はまとめてお見積りします。
          <br />
          手書きのデザインやラフスケッチからの制作も承ります。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/original" className="btn-primary">
            1個から名入れ枡を作る
          </Link>
          <Link href="/custom" className="btn-outline">
            法人・まとめ注文の見積り
          </Link>
        </div>
      </section>
    </>
  )
}
