import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'OEM・オリジナル枡製作 — 自社ブランドの枡を作りませんか',
  description:
    'OEM・オリジナル枡の製作ならMASU-STORE。自社ブランドの枡を企画から製造・納品までワンストップで対応。飲食店のオリジナル酒器、酒蔵のオリジナル枡、ホテルのアメニティなど。小ロット10個〜対応。',
  keywords:
    '枡 OEM,オリジナル枡 製作,枡 オーダーメイド,枡 自社ブランド,枡 OEM 小ロット,飲食店 オリジナル枡,酒蔵 枡,ホテル アメニティ 枡,枡 特注,枡 オリジナル商品',
  alternates: { canonical: `${baseUrl}/business/oem` },
  openGraph: {
    title: 'OEM・オリジナル枡製作 — 自社ブランドの枡を作りませんか',
    description: 'OEM・オリジナル枡の製作。企画から製造・納品までワンストップ。小ロット10個〜対応。',
    type: 'website',
    url: `${baseUrl}/business/oem`,
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const faqItems = [
  {
    q: 'OEMの最小ロット数はいくつですか？',
    a: '名入れ・刻印のみのOEMは10個から、形状やサイズの特注は50個からご相談を承ります。',
  },
  {
    q: '完全オリジナルの形状（サイズ変更・特殊形状）は可能ですか？',
    a: 'ご要望に応じてご相談可能です。標準7サイズ以外の寸法変更や、八角形枡などの特殊形状についてはまずお問い合わせください。',
  },
  {
    q: 'パッケージ（箱）のオリジナル製作もできますか？',
    a: 'はい、枡に合わせた化粧箱・桐箱のオリジナル製作も承ります。ギフトボックス、スリーブ、のし紙のデザインも対応可能です。',
  },
  {
    q: '継続的な発注（定期注文）は可能ですか？',
    a: 'はい、月次・四半期ごとの定期注文にも対応します。焼印の銅版は保管しておりますので、リピート注文時の版代は不要です。',
  },
  {
    q: '自社ECサイトで販売したいのですが、商品写真の提供はありますか？',
    a: 'OEMの場合は商品撮影のご支援も可能です。商品画像データの提供についてはご相談ください。',
  },
]

export default function OemPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '法人のお客様', href: `${baseUrl}/business` },
          { name: 'OEM・オリジナル枡', href: `${baseUrl}/business/oem` },
        ]}
      />
      <FAQJsonLd items={faqItems} />

      <main className="min-h-screen bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: '法人のお客様', href: '/business' },
              { label: 'OEM・オリジナル枡' },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-16 text-center">
          <p className="text-[11px] tracking-[0.2em] text-[var(--color-accent)] mb-4">
            OEM &amp; ORIGINAL
          </p>
          <h1
            className="serif text-3xl md:text-4xl font-light leading-relaxed mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            あなたのブランドの枡を、つくる。
          </h1>
          <p
            className="text-[15px] leading-[2] max-w-2xl mx-auto"
            style={{ color: 'var(--color-muted)' }}
          >
            飲食店のオリジナル酒器、酒蔵の銘柄入り枡、ホテルのウェルカムアメニティ。
            企画のご相談から製造・納品まで、自社工場でワンストップ対応。
            「こんな枡がほしい」を形にします。
          </p>
        </section>

        {/* OEM examples */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
              OEM・オリジナル枡の活用シーン
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  title: '飲食店のオリジナル酒器',
                  desc: '店名や屋号を刻印した枡で日本酒を提供。「もっきり」スタイルでの提供は、お客様の体験価値を高め、SNS映えも抜群。リピーター獲得と口コミ拡散に貢献します。',
                  example: '居酒屋、日本料理店、バー、旅館',
                },
                {
                  title: '酒蔵・蔵元のオリジナル枡',
                  desc: '銘柄名やロゴを刻印した枡を、自社ECサイトや蔵見学のお土産として販売。お酒とのセット販売で客単価アップにも。',
                  example: '日本酒蔵、焼酎蔵、ウイスキー蒸留所',
                },
                {
                  title: 'ホテル・旅館のアメニティ',
                  desc: 'ウェルカムドリンク用の枡や、客室内のアメニティとして。施設名を入れれば、宿泊客が持ち帰る「最高のお土産」になります。',
                  example: '旅館、ホテル、リゾート施設',
                },
                {
                  title: 'ブランドグッズ・物販商品',
                  desc: '地域ブランド、観光協会、キャラクターグッズなど、自社ブランドの物販商品として枡を展開。小物入れやインテリアとしても人気です。',
                  example: '自治体、観光協会、アパレル、雑貨ブランド',
                },
              ].map((item) => (
                <div key={item.title} className="bg-[var(--background)] p-6 rounded-sm">
                  <h3 className="serif text-base font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-[1.9] mb-3" style={{ color: 'var(--color-muted)' }}>
                    {item.desc}
                  </p>
                  <p className="text-[11px]" style={{ color: 'var(--color-accent)' }}>
                    対象：{item.example}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we can do */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
            対応できるカスタマイズ
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                category: '名入れ・刻印',
                items: ['焼印（銅版）', 'レーザー刻印', 'ロゴ・社名・イラスト', 'QRコード', '1面〜4面対応'],
              },
              {
                category: '素材・仕上げ',
                items: ['国産ヒノキ（標準）', '食品衛生法対応コーティング', 'ウレタン塗装', '面取り加工', 'あられ組み（伝統技法）'],
              },
              {
                category: 'パッケージ',
                items: ['化粧箱', '桐箱', 'スリーブ', 'のし紙', '個別包装'],
              },
            ].map((group) => (
              <div key={group.category} className="border border-[var(--color-border)] p-6 rounded-sm">
                <h3 className="text-[14px] font-medium mb-4" style={{ color: 'var(--foreground)' }}>
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-[13px] flex items-center gap-2" style={{ color: 'var(--color-muted)' }}>
                      <span className="text-[var(--color-accent)]">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Flow */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
              OEM製作の流れ
            </h2>
            <div className="space-y-6">
              {[
                { step: '01', title: 'ヒアリング', desc: '用途・数量・ご希望のイメージ・ご予算をお伺いします。「こんなことできる？」というざっくりしたご相談でもOKです。' },
                { step: '02', title: '企画・ご提案', desc: 'ヒアリング内容をもとに、サイズ・加工方法・パッケージを含めたご提案書をお出しします。' },
                { step: '03', title: 'サンプル製作', desc: '実物サンプルを1〜2個製作。仕上がり・サイズ感・刻印の再現度をご確認いただきます。' },
                { step: '04', title: '量産', desc: 'サンプルご承認後、自社工場で量産。全品検品し品質を担保します。' },
                { step: '05', title: '納品', desc: '指定場所へ納品。複数箇所への分納にも対応。継続的なリピート注文もお任せください。' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-6 bg-[var(--background)] p-6 rounded-sm">
                  <span className="text-xl font-light text-[var(--color-accent)] flex-shrink-0">{item.step}</span>
                  <div>
                    <h3 className="text-[14px] font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                      {item.title}
                    </h3>
                    <p className="text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
            よくあるご質問
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <details key={item.q} className="group bg-[var(--color-subtle)] rounded-sm">
                <summary className="cursor-pointer p-5 text-[14px] font-medium list-none flex items-center justify-between" style={{ color: 'var(--foreground)' }}>
                  {item.q}
                  <span className="text-[var(--color-muted)] group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <p className="px-5 pb-5 text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--color-subtle)] py-20 text-center">
          <h2 className="serif text-xl font-medium mb-4" style={{ color: 'var(--foreground)' }}>
            オリジナル枡のご相談はお気軽に
          </h2>
          <p className="text-[13px] mb-8 max-w-xl mx-auto leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
            「こんな枡がほしい」「こういう用途に使えるか？」——ざっくりしたご相談でも大歓迎です。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/custom"
              className="inline-block px-8 py-3 text-sm text-white rounded-sm transition-colors"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              無料お見積り・ご相談
            </Link>
            <Link
              href="/business"
              className="inline-block px-8 py-3 text-sm border border-[var(--color-border)] rounded-sm transition-colors"
              style={{ color: 'var(--foreground)' }}
            >
              法人向けサービス一覧
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
