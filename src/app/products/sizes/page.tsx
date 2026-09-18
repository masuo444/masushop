import type { Metadata } from 'next'
import Link from 'next/link'
import { masuSizes, faqItems } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡のサイズ一覧表｜勺・合・升の容量と寸法（三勺〜一升）',
  description:
    '枡のサイズは1勺＝約18ml、1合＝180ml、1升＝1,800ml。三勺（54ml）から一升（1,800ml）まで全7サイズの外寸・容量・用途を比較表で解説。日本酒・もっきり・節分・鏡開き・名入れギフトに向くサイズの選び方も。',
  keywords: '枡 サイズ,枡 サイズ 一覧,枡 大きさ,枡 寸法,一合枡 サイズ,枡 容量,勺 合 升,枡 サイズ 比較',
  alternates: { canonical: `${baseUrl}/products/sizes` },
  openGraph: {
    title: '枡のサイズ一覧表｜勺・合・升の容量と寸法（三勺〜一升）',
    description:
      '三勺（54ml）から一升（1,800ml）まで全7サイズの外寸・容量・用途を比較表で解説。用途別の選び方も。',
    url: `${baseUrl}/products/sizes`,
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const recommendations = [
  { purpose: '日本酒を飲む（普段使い）', recommended: '一合枡（180ml）', id: 'ichigo', reason: '日本酒一合がぴったり入る定番サイズ。手のひらに収まり、蓋・クリアケース・白箱にも対応します。' },
  { purpose: '居酒屋スタイルの「もっきり」', recommended: '八勺枡（144ml）', id: 'hasshaku', reason: 'グラスを中に置き、溢れた日本酒を受けるのにちょうど良い余白。飲食店の業務用にも選ばれます。' },
  { purpose: '少量をゆっくり味わう', recommended: '五勺枡（100ml）', id: 'goshaku', reason: 'おちょこより大きく、一合枡より小さい中間の容量。飲み切りやすい量に収まります。' },
  { purpose: '名入れギフト・企業記念品', recommended: '一合枡 または 五勺枡', id: 'ichigo', reason: '名入れギフトと企業ノベルティで最も選ばれるのは一合枡。ペアで贈る結婚祝いには五勺枡も人気です。' },
  { purpose: '節分の豆まき', recommended: '五合枡（900ml）', id: 'gogo', reason: '家族分の豆がしっかり入り、片手で持って撒きやすい大きさ。神社仏閣の節分祭では一升枡も使われます。' },
  { purpose: '鏡開き・式典・ディスプレイ', recommended: '一升枡（1,800ml）', id: 'issho', reason: '一升瓶1本分が入る最大サイズ。乾杯用に配る枡は一合枡・八勺枡が一般的です。' },
  { purpose: 'インテリア・小物入れ', recommended: '三勺枡 / 二合半枡', id: 'sanjaku', reason: '三勺枡はアクセサリー入れに、二合半枡はペン立てや名刺入れにちょうど良いサイズです。' },
]

// このページに表示する質問だけを FAQPage 構造化データに入れる
const sizeFaqItems = faqItems.filter((item) => item.category === 'サイズ')

const faqLinks: Record<string, { href: string; label: string }> = {
  '一合枡の大きさはどのくらいですか？': { href: '/products/ichigo', label: '一合枡の商品ページ' },
  '日本酒を飲むのに最適なサイズは？': { href: '/sake', label: '枡と日本酒 — もっきりの作法' },
  '節分の豆まきに使う枡のサイズは？': { href: '/products/gogo', label: '五合枡の商品ページ' },
  '鏡開きに使う枡のサイズは？': { href: '/business/ceremony', label: '式典・鏡開きの枡' },
}

export default function SizesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '商品一覧', href: `${baseUrl}/products` },
          { name: 'サイズ一覧', href: `${baseUrl}/products/sizes` },
        ]}
      />
      <SpeakableJsonLd url={`${baseUrl}/products/sizes`} cssSelectors={['[data-speakable]', '.section-title']} />
      <FAQJsonLd items={sizeFaqItems} />
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: '商品一覧', href: '/products' },
          { label: 'サイズ一覧' },
        ]}
      />

      {/* Hero */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="section-title mb-6">枡のサイズ・大きさ一覧（勺・合・升）</h1>
          <p data-speakable className="lead">
            枡の容量は1勺（しゃく）＝約18ml、1合（ごう）＝180ml、1升（しょう）＝1,800mlで、それぞれ10倍の関係にあります。
            当店の枡は三勺（54ml）から一升（1,800ml）までの7サイズ。
            日本酒には<Link href="/products/ichigo" className="underline" style={{ color: 'var(--color-accent)' }}>一合枡（180ml）</Link>、
            居酒屋のもっきりには<Link href="/products/hasshaku" className="underline" style={{ color: 'var(--color-accent)' }}>八勺枡（144ml）</Link>、
            節分の豆まきには<Link href="/products/gogo" className="underline" style={{ color: 'var(--color-accent)' }}>五合枡（900ml）</Link>、
            鏡開きには<Link href="/products/issho" className="underline" style={{ color: 'var(--color-accent)' }}>一升枡</Link>が定番です。
          </p>
        </div>
      </section>

      {/* 比較表 */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="section-title mb-4 text-center">全7サイズ 比較表</h2>
        <p className="lead text-center mb-8">
          寸法はすべて外寸（幅×奥行×高さ）です。サイズ名を押すと、各サイズの用途や刻印面の大きさを確認できます。
        </p>
        <div className="overflow-x-auto table-cards-wrap">
          <table
            className="w-full text-sm table-cards"
            style={{ borderCollapse: 'collapse' }}
          >
            <caption className="sr-only">国産ヒノキ枡 全7サイズの外寸・容量・用途</caption>
            <thead>
              <tr style={{ background: 'var(--color-subtle)', borderBottom: '2px solid var(--color-border)' }}>
                <th scope="col" className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>サイズ名</th>
                <th scope="col" className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>外寸</th>
                <th scope="col" className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>容量</th>
                <th scope="col" className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>容量目安</th>
                <th scope="col" className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>おすすめ用途</th>
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
                    <span className="block text-xs font-normal" style={{ color: 'var(--color-muted)' }}>
                      {masu.reading}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap" data-label="外寸">{masu.size}</td>
                  <td className="px-4 py-4 whitespace-nowrap" data-label="容量">{masu.capacity}</td>
                  <td className="px-4 py-4" style={{ color: 'var(--color-muted)' }} data-label="容量目安">{masu.capacityNote}</td>
                  <td className="px-4 py-4 text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }} data-label="おすすめ用途">{masu.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          ※ 1升は1891年（明治24年）の度量衡法で約1.8039リットルと定められました。本ページでは端数を省き、1合＝180ml、1升＝1,800mlとして表記しています。
          蓋付きに対応するのは<Link href="/products/sanjaku" className="underline">三勺枡</Link>と<Link href="/products/ichigo" className="underline">一合枡</Link>の2サイズ、専用パッケージ（クリアケース・白箱）に対応するのは一合枡のみです。
        </p>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* 単位の解説 */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="section-title mb-6">勺・合・升の関係</h2>
        <div className="space-y-4 text-sm leading-[2.2]">
          <p>
            枡のサイズ名は、日本の伝統的な体積の単位で付けられています。基準になるのは「合」で、1合＝180ml。
            その10分の1が1勺（約18ml）、10倍が1升（1,800ml）です。「三勺枡」は3勺＝54ml、「八勺枡」は8勺＝144ml、「二合半枡」は2.5合＝450mlというように、名前を見ればおおよその容量が分かります。
          </p>
          <p>
            日本酒の「一合徳利」「一升瓶」、炊飯器の「一合炊き」も同じ単位です。一升瓶1本の日本酒は<Link href="/products/issho" className="underline" style={{ color: 'var(--color-accent)' }}>一升枡</Link>にちょうど収まり、<Link href="/products/ichigo" className="underline" style={{ color: 'var(--color-accent)' }}>一合枡</Link>10杯分にあたります。
            単位の由来や京枡の歴史は<Link href="/history" className="underline" style={{ color: 'var(--color-accent)' }}>枡の歴史</Link>、各用語の定義は<Link href="/glossary#gou" className="underline" style={{ color: 'var(--color-accent)' }}>枡用語辞典</Link>で解説しています。
          </p>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* 用途別おすすめ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="section-title mb-4 text-center">用途別・サイズの選び方</h2>
        <p className="lead text-center mb-10">
          サイズが決まっていない場合は、まず一合枡を基準に検討すると選びやすくなります。
        </p>
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
        <p className="mt-8 text-center text-sm" style={{ color: 'var(--color-muted)' }}>
          用途から順に絞り込みたい方は
          <Link href="/guide" className="underline mx-1" style={{ color: 'var(--color-accent)' }}>枡の選び方ガイド</Link>
          、名入れ方法で迷ったら
          <Link href="/products/engraving" className="underline mx-1" style={{ color: 'var(--color-accent)' }}>焼印とレーザー刻印の比較</Link>
          をご覧ください。
        </p>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="section-title mb-8">サイズに関するよくある質問</h2>
        <div>
          {sizeFaqItems.map((item) => {
            const link = faqLinks[item.q]
            return (
              <details key={item.q} className="group" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium list-none">
                  <span>{item.q}</span>
                  <span className="ml-4 text-lg transition-transform group-open:rotate-45" style={{ color: 'var(--color-muted)' }}>+</span>
                </summary>
                <p className="pb-3 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.a}</p>
                {link && (
                  <p className="pb-5 text-xs">
                    <Link href={link.href} className="underline" style={{ color: 'var(--color-accent)' }}>
                      {link.label} →
                    </Link>
                  </p>
                )}
              </details>
            )
          })}
        </div>
        <p className="mt-8 text-sm" style={{ color: 'var(--color-muted)' }}>
          名入れ・お手入れ・納期など、その他の質問は
          <Link href="/faq" className="underline mx-1" style={{ color: 'var(--color-accent)' }}>よくある質問</Link>
          にまとめています。
        </p>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="section-title mb-4">お気軽にご相談ください</h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
          サイズ選びに迷ったら、用途やご予算に合わせて最適なサイズをご提案いたします。
          名入れは1個から、無地の枡は10個からご相談いただけます。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-block px-8 py-3 text-sm rounded-sm transition-opacity hover:opacity-80"
            style={{
              background: 'var(--foreground)',
              color: 'var(--background)',
            }}
          >
            商品一覧を見る
          </Link>
          <Link
            href="/custom"
            className="inline-block px-8 py-3 text-sm rounded-sm transition-opacity hover:opacity-80"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--foreground)',
            }}
          >
            お見積り・ご相談
          </Link>
        </div>
      </section>
    </>
  )
}
