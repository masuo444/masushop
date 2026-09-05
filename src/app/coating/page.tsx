import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: '特殊コーティング加工 — 枡を水・汚れから守る',
  description:
    '枡に施せる特殊コーティングの詳細。水・油・汚れを弾いて、枡を長持ちさせます。食品衛生法の基準に適合済みで、日本酒を飲む枡にも安心。枡のご注文時に選べるオプションです。',
  keywords:
    '枡 コーティング,枡 撥水,枡 防汚,枡 抗菌,枡 お手入れ,枡 長持ち',
  alternates: { canonical: `${siteConfig.url}/coating` },
  openGraph: {
    title: '特殊コーティング加工 — 枡を水・汚れから守る',
    description: '枡に施せる特殊コーティングの詳細。水・油・汚れを弾いて、枡を長持ちさせます。食品衛生法の基準に適合済み。',
    type: 'article',
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const baseUrl = siteConfig.url

export default function CoatingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '特殊コーティング', href: `${baseUrl}/coating` },
        ]}
      />
      <SpeakableJsonLd url={`${baseUrl}/coating`} cssSelectors={['[data-speakable]', '.section-title']} />
      <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '特殊コーティング' }]} />

      {/* Hero */}
      <section
        className="py-16 md:py-24 text-center"
        style={{ background: 'var(--color-subtle)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs tracking-widest mb-4" style={{ color: 'var(--color-accent)' }}>
            COATING OPTION
          </p>
          <h1 className="section-title mb-4">特殊コーティング加工</h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            水や汚れを弾いて、枡を長く美しく保つオプションです。
          </p>
        </div>
      </section>

      {/* コーティングって何？ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="section-title mb-6">コーティングすると、何が変わる？</h2>
        <p className="text-sm leading-[2] mb-6" style={{ color: 'var(--foreground)' }}>
          枡はヒノキの天然木でできているため、水や日本酒を入れると少しずつ木に染み込んでいきます。
          これは木ならではの風合いでもありますが、シミやカビの原因にもなります。
        </p>
        <p className="text-sm leading-[2] mb-6" style={{ color: 'var(--foreground)' }}>
          コーティングを施すと、<strong>枡の表面に目に見えないほど薄い膜</strong>ができ、
          水や油を弾くようになります。見た目や手触りはほとんど変わりません。
          ヒノキの香りもそのまま楽しめます。
        </p>
        <div
          data-speakable
          className="rounded-sm p-5"
          style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-accent)' }}
        >
          <p className="text-sm leading-[2]" style={{ color: 'var(--foreground)' }}>
            <strong style={{ color: 'var(--color-accent)' }}>ひとことで言うと：</strong>
            お手入れが楽になり、枡が長持ちするようになるオプションです。
          </p>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* コーティングあり・なし比較 */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="section-title mb-10 text-center">コーティングあり・なし の違い</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th className="text-left py-3 pr-4" style={{ color: 'var(--color-muted)' }}></th>
                <th className="text-center py-3 px-4" style={{ color: 'var(--color-muted)' }}>コーティングなし</th>
                <th
                  className="text-center py-3 px-4 rounded-t-sm"
                  style={{ color: 'var(--color-accent)', background: 'var(--color-accent-light)' }}
                >
                  コーティングあり
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ['水を入れたとき', '木に少しずつ染み込む', '水を弾いて染み込みにくい'],
                ['日本酒のシミ', 'つきやすい', 'つきにくい'],
                ['油汚れ', '染み込みやすい', '弾いて落としやすい'],
                ['カビのリスク', '湿気が残ると発生しやすい', '水分を弾くので発生しにくい'],
                ['お手入れ', 'すぐ洗って、すぐ乾燥が必要', 'さっと水洗いでOK'],
                ['見た目・手触り', 'そのままの木の質感', 'ほぼ変わらない'],
                ['ヒノキの香り', 'そのまま', 'そのまま楽しめる'],
              ].map(([label, without, withCoat]) => (
                <tr key={label} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="py-3 pr-4 text-xs font-medium" style={{ color: 'var(--foreground)' }}>
                    {label}
                  </td>
                  <td className="text-center py-3 px-4 text-xs" style={{ color: 'var(--color-muted)' }}>
                    {without}
                  </td>
                  <td
                    className="text-center py-3 px-4 text-xs font-medium"
                    style={{ color: 'var(--color-accent)', background: 'var(--color-accent-light)' }}
                  >
                    {withCoat}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* 安全性 */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="section-title mb-6">口に触れても大丈夫？</h2>
        <p className="text-sm leading-[2] mb-6" style={{ color: 'var(--foreground)' }}>
          はい、安心してお使いいただけます。
        </p>
        <p className="text-sm leading-[2] mb-8" style={{ color: 'var(--foreground)' }}>
          このコーティングは、<strong>日本食品分析センター（JFRL）</strong>という
          国の基準に基づいて食品の安全性を調べる第三者機関で試験を受けています。
          食品衛生法が定める基準をすべてクリアしており、
          日本酒やお茶など飲み物を入れる枡にも安心してお使いいただけます。
        </p>
        <div
          className="rounded-sm p-6"
          style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-sm font-medium mb-3" style={{ color: 'var(--foreground)' }}>
            試験結果（2022年9月 / 日本食品分析センター）
          </p>
          <div className="space-y-2">
            {[
              '有害物質（カドミウム・鉛）→ 基準値以下で適合',
              '重金属 → 基準値以下で適合',
              '溶出物 → 基準値以下で適合',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs" style={{ color: 'var(--foreground)' }}>
                <span style={{ color: 'var(--color-accent)' }}>&#10003;</span>
                {item}
              </div>
            ))}
          </div>
          <p className="text-[11px] mt-4 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            試験番号: 第22080132001-0101号 / 第22080132001-0201号
            <br />
            食品、添加物等の規格基準（昭和34年厚生省告示第370号）に基づく試験
          </p>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* どんなコーティング？ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="section-title mb-6">どんなコーティング？</h2>
        <p className="text-sm leading-[2] mb-6" style={{ color: 'var(--foreground)' }}>
          使用しているのは「<strong>ビバプロテクト</strong>」という、
          株式会社タカハラコーポレーションが開発した特殊コーティング剤です。
          電車の車体や工業製品にも使われている実績のある技術で、木材にも対応しています。
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          {[
            {
              title: '膜の厚さ',
              desc: 'わずか0.1〜0.2ミクロン。髪の毛の太さの約1/500という薄さなので、見た目や手触りはほぼ変わりません。',
            },
            {
              title: '耐熱性',
              desc: '300℃まで耐えられるので、熱いお茶を入れても問題ありません。',
            },
            {
              title: '耐久性',
              desc: '使用環境にもよりますが、約6ヶ月間効果が持続します。',
            },
            {
              title: '対応素材',
              desc: 'ゴム・金属・樹脂・木材に対応。ヒノキ枡との相性も良好です。',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-sm p-5"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* こんな方におすすめ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="section-title mb-8">こんな方におすすめ</h2>
        <div className="space-y-3">
          {[
            {
              who: '日本酒を枡で飲みたい方',
              why: 'シミや匂い残りを気にせず、毎日の晩酌に使えます。',
            },
            {
              who: '飲食店・居酒屋で枡を使うオーナー様',
              why: '洗い物が楽に。カビやシミを防ぎ、衛生的に使い続けられます。',
            },
            {
              who: 'ノベルティ・記念品として配る企業様',
              why: 'もらった方がすぐ使えて、長くきれいな状態を保てます。',
            },
            {
              who: 'ギフトとして贈る方',
              why: '「お手入れが簡単」というのは、もらう側にとって嬉しいポイントです。',
            },
            {
              who: '枡をインテリアとして飾りたい方',
              why: 'ホコリや手垢が付きにくく、美しい状態をキープしやすくなります。',
            },
          ].map((item) => (
            <div
              key={item.who}
              className="flex gap-4 rounded-sm p-5"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <span
                className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full text-[10px] font-bold"
                style={{ background: 'var(--color-accent)', color: '#fff' }}
              >
                &#10003;
              </span>
              <div>
                <h3 className="text-sm font-medium mb-0.5" style={{ color: 'var(--foreground)' }}>
                  {item.who}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {item.why}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* 料金 */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="section-title mb-6 text-center">料金</h2>
        <div
          className="rounded-sm p-8 text-center"
          style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-2xl font-medium tracking-tight mb-2" style={{ color: 'var(--color-accent)' }}>
            お見積り
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            全サイズに対応。枡のご注文時にオプションとして追加できます。
            サイズと数量をお知らせいただければ、お見積りをお送りします。
          </p>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="section-title mb-4">コーティング付きの枡を注文する</h2>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          商品一覧でサイズを選び、オプションで「コーティング」にチェックを入れるだけです。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products#order" className="btn-accent">
            枡を注文する
          </Link>
          <Link href="/custom" className="btn-outline">
            お見積り・ご相談
          </Link>
        </div>
      </section>
    </>
  )
}
