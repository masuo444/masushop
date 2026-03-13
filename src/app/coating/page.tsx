import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: '特殊コーティング加工 — 撥水・撥油・防汚・抗菌',
  description:
    '枡に施せる特殊コーティング「ビバプロテクト」の詳細。撥水・撥油・防汚・抗菌効果で枡を長持ちさせます。日本食品分析センター（JFRL）の食品衛生法適合試験に合格済み。安心して飲食にお使いいただけます。',
  keywords:
    '枡 コーティング,枡 撥水,枡 防汚,枡 抗菌,ビバプロテクト,枡 お手入れ,枡 長持ち',
  alternates: { canonical: `${siteConfig.url}/coating` },
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

      {/* Hero */}
      <section
        className="py-16 md:py-24 text-center"
        style={{ background: 'var(--color-subtle)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-xs tracking-widest mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            COATING OPTION
          </p>
          <h1 className="section-title mb-4">特殊コーティング加工</h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            撥水・撥油・防汚・抗菌の4つの効果で、枡をより長く美しくお使いいただけます。
          </p>
        </div>
      </section>

      {/* コーティングとは */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="section-title mb-6">なぜコーティングが必要？</h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
          ヒノキ枡は天然の木製品のため、水分や油分が染み込みやすく、長期間の使用でシミやカビが発生することがあります。
          特殊コーティングを施すことで、木の質感と香りを保ちながら、水や汚れを弾き、お手入れを格段に楽にします。
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
          日本酒を飲む枡はもちろん、企業ノベルティやギフト用の枡にもおすすめです。
          コーティングなしの枡は使用後すぐに洗って乾燥させる必要がありますが、
          コーティング済みの枡なら、より気軽に日常使いしていただけます。
        </p>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* 4つの効果 */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="section-title mb-10 text-center">4つの効果</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div
            className="rounded-sm p-6"
            style={{ border: '1px solid var(--color-border)', background: 'var(--background)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="flex items-center justify-center w-10 h-10 rounded-full text-lg"
                style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
              >
                💧
              </span>
              <h3 className="text-base font-medium" style={{ color: 'var(--foreground)' }}>撥水</h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              水を強力に弾き、木材への浸透を防ぎます。日本酒やお茶を入れた後の染み込みを大幅に軽減。使用後のお手入れが格段に楽になります。
            </p>
          </div>
          <div
            className="rounded-sm p-6"
            style={{ border: '1px solid var(--color-border)', background: 'var(--background)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="flex items-center justify-center w-10 h-10 rounded-full text-lg"
                style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
              >
                🛡
              </span>
              <h3 className="text-base font-medium" style={{ color: 'var(--foreground)' }}>撥油</h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              油分の付着も防止。食品やおつまみを入れる器として使う場合にも、油ジミを気にせずお使いいただけます。
            </p>
          </div>
          <div
            className="rounded-sm p-6"
            style={{ border: '1px solid var(--color-border)', background: 'var(--background)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="flex items-center justify-center w-10 h-10 rounded-full text-lg"
                style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
              >
                ✨
              </span>
              <h3 className="text-base font-medium" style={{ color: 'var(--foreground)' }}>防汚</h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              汚れの付着を防ぎ、美しい木目をキープ。手垢やホコリが付きにくくなるため、インテリアやディスプレイ用途にも最適です。
            </p>
          </div>
          <div
            className="rounded-sm p-6"
            style={{ border: '1px solid var(--color-border)', background: 'var(--background)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="flex items-center justify-center w-10 h-10 rounded-full text-lg"
                style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
              >
                🦠
              </span>
              <h3 className="text-base font-medium" style={{ color: 'var(--foreground)' }}>抗菌</h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              抗菌効果により、雑菌の繁殖を抑制。飲食用途でも衛生的にお使いいただけます。飲食店やイベントでの大量使用にも安心です。
            </p>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* 使用コーティング剤 */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="section-title mb-6">使用コーティング剤</h2>
        <div
          className="rounded-sm p-6 mb-8"
          style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
        >
          <h3 className="text-base font-medium mb-1" style={{ color: 'var(--foreground)' }}>
            ビバプロテクト A-BM
          </h3>
          <p className="text-xs mb-4" style={{ color: 'var(--color-muted)' }}>
            株式会社タカハラコーポレーション / ビバ国際技術研究所
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
            「ビバプロテクト」は、特殊添加剤を配合した一液性常温硬化型の撥水・撥油コーティング剤です。
            ゴム・金属・樹脂・木材に幅広く使用でき、高い撥水・撥油効果で汚れの付着を防止します。
            被膜は柔軟性がありながら硬度3Hを実現し、耐熱性300℃という高い性能を持っています。
          </p>

          <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--foreground)' }}>
            技術仕様
          </h4>
          <div className="space-y-1">
            {[
              ['主成分', 'シリコン化合物'],
              ['対象材質', 'ゴム、金属、樹脂、木材'],
              ['硬度', '3H'],
              ['耐熱性', '300℃'],
              ['膜厚', '0.1〜0.2μm（ナノレベルの薄膜）'],
              ['膜耐久性', '約6ヶ月（使用環境による）'],
              ['乾燥時間', '3〜6時間'],
            ].map(([label, value]) => (
              <div key={label} className="flex text-xs py-1.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <span className="w-28 shrink-0" style={{ color: 'var(--color-muted)' }}>{label}</span>
                <span style={{ color: 'var(--foreground)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          ナノレベル（0.1〜0.2μm）の極薄被膜のため、ヒノキ本来の木目や手触りを損なうことなく、コーティング効果を発揮します。
          見た目や質感はほぼ変わらないまま、機能性だけが向上します。
        </p>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* 食品安全試験 */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="section-title mb-6">食品衛生法適合 — 安心の第三者試験</h2>
        <div
          className="rounded-sm p-6 mb-6"
          style={{
            background: 'var(--color-accent-light)',
            border: '1px solid var(--color-accent)',
          }}
        >
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
            一般財団法人 日本食品分析センター（JFRL）試験合格
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground)' }}>
            第三者機関である日本食品分析センターの分析試験（2022年9月）にて、
            食品衛生法の規格基準（昭和34年厚生省告示第370号）に適合していることが確認されています。
          </p>
        </div>

        <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--foreground)' }}>
          試験結果
        </h3>
        <div className="space-y-1 mb-6">
          {[
            ['カドミウム', '適合'],
            ['鉛', '適合'],
            ['重金属', '適合'],
            ['過マンガン酸カリウム消費量', '適合（7.6μg/mL, 0.8μg/mL）'],
          ].map(([item, result]) => (
            <div key={item} className="flex text-xs py-1.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <span className="w-48 shrink-0" style={{ color: 'var(--color-muted)' }}>{item}</span>
              <span className="font-medium" style={{ color: 'var(--color-accent)' }}>{result}</span>
            </div>
          ))}
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          合成樹脂（PET）および金属板（アルミ）での試験を実施し、いずれも食品衛生法の基準を満たしています。
          日本酒やお茶などの飲料を入れる枡にも安心してお使いいただけます。
        </p>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* こんな方におすすめ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="section-title mb-8">コーティングがおすすめのケース</h2>
        <div className="space-y-4">
          {[
            {
              title: '飲食店・居酒屋で枡を使う場合',
              desc: '毎日の営業で使う枡には必須。洗い物が楽になり、カビやシミの発生を抑え、衛生的に使い続けられます。',
            },
            {
              title: '企業ノベルティ・記念品として配布する場合',
              desc: '受け取った方がすぐに使えて、長く美しい状態を保てます。贈り物としての品質が一段上がります。',
            },
            {
              title: '日本酒用の枡を長く使いたい場合',
              desc: '日本酒のシミや匂い残りを防ぎ、ヒノキの香りをより長く楽しめます。',
            },
            {
              title: 'インテリア・ディスプレイとして飾る場合',
              desc: 'ホコリや手垢が付きにくくなり、お手入れの手間が減ります。',
            },
            {
              title: 'イベント・展示会で大量に使う場合',
              desc: '抗菌効果があり、不特定多数が手にするシーンでも衛生的です。',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-sm p-5"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <span
                className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full text-xs font-bold"
                style={{ background: 'var(--color-accent)', color: '#fff' }}
              >
                &#10003;
              </span>
              <div>
                <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* 料金 */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="section-title mb-6">料金</h2>
        <div
          className="rounded-sm p-6 text-center"
          style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-3xl font-medium tracking-tight mb-2" style={{ color: 'var(--color-accent)' }}>
            &yen;800<span className="text-base font-normal"> / 個（税別）</span>
          </p>
          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
            全サイズ共通。ご注文時にオプションとしてお選びいただけます。
          </p>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="section-title mb-4">コーティング付きの枡を注文する</h2>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          商品一覧ページで枡のサイズを選び、オプションで「コーティング」を選択してください。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products#order" className="btn-accent">
            商品一覧で枡を注文する
          </Link>
          <Link href="/custom" className="btn-outline">
            お見積り・ご相談
          </Link>
        </div>
      </section>
    </>
  )
}
