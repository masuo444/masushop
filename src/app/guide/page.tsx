import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { masuSizes, selectionGuide, faqItems } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡の選び方ガイド — 用途・サイズ別おすすめ',
  description:
    '枡選びのポイントは「用途」と「サイズ」。日本酒には一合枡、節分には五合枡、ギフトには名入れ五勺枡がおすすめ。全7サイズの比較表と用途別おすすめを解説。',
  keywords: '枡 選び方,枡 サイズ,枡 おすすめ,一合枡,五勺枡,枡 用途',
  alternates: { canonical: `${baseUrl}/guide`, languages: { ja: `${baseUrl}/guide`, en: `${baseUrl}/en/guide` } },
  openGraph: {
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
}

const guideFaqItems = faqItems.filter(
  (item) => item.category === 'サイズ' || item.category === '名入れ' || item.category === '基本'
)

export default function GuidePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '枡の選び方ガイド', href: `${baseUrl}/guide` },
        ]}
      />
      <SpeakableJsonLd url={`${baseUrl}/guide`} cssSelectors={['[data-speakable]', '.section-title']} />
      <FAQJsonLd
        items={guideFaqItems.map((item) => ({
          q: item.q,
          a: item.a,
        }))}
      />
      <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '選び方ガイド' }]} />

      {/* Hero */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="section-title mb-6">枡の選び方ガイド</h1>
          <p style={{ color: 'var(--color-muted)' }} className="text-sm leading-relaxed">
            用途・サイズ別に、最適な枡をご提案します
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Image
          src="/images/generated/masu-sizes.jpg"
          alt="枡の全サイズ比較"
          width={800}
          height={500}
          style={{ width: '100%', height: 'auto' }}
          className="rounded-sm"
        />
      </div>

      {/* Quick Answer */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div
            data-speakable
            className="p-8 rounded-sm"
            style={{ background: 'var(--color-accent-light)', borderLeft: '4px solid var(--color-accent)' }}
          >
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
              まず結論
            </p>
            <p className="text-sm leading-relaxed">
              枡選びのポイントは「用途」と「サイズ」。日本酒には一合枡（180ml）、節分には五合枡（900ml）、ギフトには名入れ五勺枡がおすすめです。
            </p>
          </div>
        </div>
      </section>

      {/* Selection Guide Table */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-title mb-12">用途別おすすめ枡</h2>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th className="text-left py-4 px-4 font-medium" style={{ color: 'var(--color-muted)' }}>
                    用途
                  </th>
                  <th className="text-left py-4 px-4 font-medium" style={{ color: 'var(--color-muted)' }}>
                    おすすめサイズ
                  </th>
                  <th className="text-left py-4 px-4 font-medium" style={{ color: 'var(--color-muted)' }}>
                    理由
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectionGuide.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-4 px-4 font-medium whitespace-nowrap">{item.purpose}</td>
                    <td className="py-4 px-4" style={{ color: 'var(--color-accent)' }}>
                      {item.recommended}
                    </td>
                    <td className="py-4 px-4" style={{ color: 'var(--color-muted)' }}>
                      {item.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {selectionGuide.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-sm"
                style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
              >
                <p className="font-medium mb-2">{item.purpose}</p>
                <p className="text-sm mb-2" style={{ color: 'var(--color-accent)' }}>
                  {item.recommended}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Size Chart */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-title mb-12">全7サイズ一覧</h2>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th className="text-left py-4 px-3 font-medium" style={{ color: 'var(--color-muted)' }}>
                    サイズ名
                  </th>
                  <th className="text-left py-4 px-3 font-medium" style={{ color: 'var(--color-muted)' }}>
                    外寸
                  </th>
                  <th className="text-left py-4 px-3 font-medium" style={{ color: 'var(--color-muted)' }}>
                    容量
                  </th>
                  <th className="text-left py-4 px-3 font-medium" style={{ color: 'var(--color-muted)' }}>
                    イメージ
                  </th>
                  <th className="text-left py-4 px-3 font-medium" style={{ color: 'var(--color-muted)' }}>
                    主な用途
                  </th>
                  <th className="text-right py-4 px-3 font-medium" style={{ color: 'var(--color-muted)' }}>
                    参考価格〜
                  </th>
                </tr>
              </thead>
              <tbody>
                {masuSizes.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-4 px-3 font-medium">
                      {s.name}
                      <span
                        className="block text-xs mt-0.5"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {s.reading}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-xs">{s.size}</td>
                    <td className="py-4 px-3">{s.capacity}</td>
                    <td className="py-4 px-3 text-xs" style={{ color: 'var(--color-muted)' }}>
                      {s.capacityNote}
                    </td>
                    <td className="py-4 px-3 text-xs" style={{ color: 'var(--color-muted)' }}>
                      {s.use}
                    </td>
                    <td className="py-4 px-3 text-right whitespace-nowrap">
                      {s.priceFrom.toLocaleString()}円
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {masuSizes.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-sm"
                style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      {s.reading}
                    </p>
                  </div>
                  <p className="font-medium">{s.priceFrom.toLocaleString()}円〜</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span style={{ color: 'var(--color-muted)' }}>外寸：</span>
                    {s.size}
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-muted)' }}>容量：</span>
                    {s.capacity}（{s.capacityNote}）
                  </div>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  {s.use}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 初めて枡を購入する方へ */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-12">初めて枡を購入する方へ</h2>

          {/* 単位解説 */}
          <div className="mb-12">
            <h3 className="text-lg font-medium mb-6">枡の単位解説 — 勺・合・升の関係</h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-muted)' }}>
              枡のサイズは日本の伝統的な体積の単位で表されます。基準は「合（ごう）」で、1合＝180mlです。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--color-muted)' }}>
                      単位
                    </th>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--color-muted)' }}>
                      読み方
                    </th>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--color-muted)' }}>
                      容量
                    </th>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--color-muted)' }}>
                      合との関係
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-3 px-4 font-medium">1勺</td>
                    <td className="py-3 px-4">いっしゃく</td>
                    <td className="py-3 px-4">18ml</td>
                    <td className="py-3 px-4" style={{ color: 'var(--color-muted)' }}>
                      1合の1/10
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-3 px-4 font-medium">1合</td>
                    <td className="py-3 px-4">いちごう</td>
                    <td className="py-3 px-4">180ml</td>
                    <td className="py-3 px-4" style={{ color: 'var(--color-accent)' }}>
                      基準
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-3 px-4 font-medium">1升</td>
                    <td className="py-3 px-4">いっしょう</td>
                    <td className="py-3 px-4">1,800ml</td>
                    <td className="py-3 px-4" style={{ color: 'var(--color-muted)' }}>
                      1合の10倍
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 身近なもので比較 */}
          <div>
            <h3 className="text-lg font-medium mb-6">身近なもので容量を比較</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="p-6 rounded-sm"
                style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
              >
                <p className="font-medium mb-3">550mlペットボトルと比較</p>
                <ul className="text-sm space-y-2" style={{ color: 'var(--color-muted)' }}>
                  <li>三勺枡（54ml）＝ ペットボトルの約1/10</li>
                  <li>一合枡（180ml）＝ ペットボトルの約1/3</li>
                  <li>五合枡（900ml）＝ ペットボトル約1.6本分</li>
                  <li>一升枡（1800ml）＝ ペットボトル約3.3本分</li>
                </ul>
              </div>
              <div
                className="p-6 rounded-sm"
                style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
              >
                <p className="font-medium mb-3">牛乳瓶（180ml）と比較</p>
                <ul className="text-sm space-y-2" style={{ color: 'var(--color-muted)' }}>
                  <li>三勺枡（54ml）＝ 牛乳瓶の約1/3</li>
                  <li>五勺枡（100ml）＝ 牛乳瓶の約半分</li>
                  <li>一合枡（180ml）＝ 牛乳瓶1本分</li>
                  <li>一升枡（1800ml）＝ 牛乳瓶10本分</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 名入れ加工の選び方 */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-title mb-12">名入れ加工の選び方</h2>

          {/* 比較表 */}
          <div className="hidden md:block overflow-x-auto mb-12">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th className="text-left py-4 px-4 font-medium" style={{ color: 'var(--color-muted)' }} />
                  <th className="text-left py-4 px-4 font-medium">焼印</th>
                  <th className="text-left py-4 px-4 font-medium">レーザー刻印</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="py-3 px-4 font-medium" style={{ color: 'var(--color-muted)' }}>
                    仕上がり
                  </td>
                  <td className="py-3 px-4">焦げ茶色の味わいある印字</td>
                  <td className="py-3 px-4">繊細で高精度な彫刻</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="py-3 px-4 font-medium" style={{ color: 'var(--color-muted)' }}>
                    色
                  </td>
                  <td className="py-3 px-4">白黒（焦げ茶）のみ</td>
                  <td className="py-3 px-4">白黒（濃淡表現可能）</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="py-3 px-4 font-medium" style={{ color: 'var(--color-muted)' }}>
                    細かさ
                  </td>
                  <td className="py-3 px-4">文字・シンプルなロゴ向き</td>
                  <td className="py-3 px-4">写真・細密デザインも可</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="py-3 px-4 font-medium" style={{ color: 'var(--color-muted)' }}>
                    大量生産
                  </td>
                  <td className="py-3 px-4">向いている</td>
                  <td className="py-3 px-4">少量〜中量向き</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="py-3 px-4 font-medium" style={{ color: 'var(--color-muted)' }}>
                    耐久性
                  </td>
                  <td className="py-3 px-4">高い（木自体に焼きつけ）</td>
                  <td className="py-3 px-4">高い（木自体を彫刻）</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile cards for comparison */}
          <div className="md:hidden space-y-6 mb-12">
            {[
              {
                name: '焼印',
                desc: '約400度の銅版を押し付ける伝統技法。焦げ茶色の味わいある仕上がり。大量生産に向いている。白黒のみ。',
              },
              {
                name: 'レーザー刻印',
                desc: '繊細で高精度な彫刻が可能。濃淡・写真表現にも対応。少量〜中量向き。白黒のみ。',
              },
            ].map((method) => (
              <div
                key={method.name}
                className="p-5 rounded-sm"
                style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
              >
                <p className="font-medium mb-2">{method.name}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {method.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 用途別おすすめ */}
          <h3 className="text-lg font-medium mb-6">用途別おすすめ加工方法</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="p-6 rounded-sm"
              style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
                大量生産・ノベルティ
              </p>
              <p className="text-sm font-medium mb-2">焼印がおすすめ</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                一度版を作れば高速に加工可能。企業ロゴや社名の大量刻印に最適です。
              </p>
            </div>
            <div
              className="p-6 rounded-sm"
              style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
                細かいデザイン・写真
              </p>
              <p className="text-sm font-medium mb-2">レーザーがおすすめ</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                細密なイラスト、写真、QRコードなどの精密デザインに対応可能です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-12">よくある質問</h2>
          <div className="space-y-0">
            {guideFaqItems.map((item, i) => (
              <details
                key={i}
                className="group"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium list-none">
                  <span>{item.q}</span>
                  <span
                    className="ml-4 text-lg transition-transform group-open:rotate-45"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    +
                  </span>
                </summary>
                <p
                  className="pb-5 text-sm leading-relaxed"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="section-title mb-6">最適な枡を見つけましょう</h2>
          <p className="text-sm mb-10 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            オーダーメイドのご相談や、商品の詳細はお気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/custom" className="btn-accent">
              オーダーメイド相談
            </Link>
            <Link href="/products" className="btn-outline">
              商品一覧を見る
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
