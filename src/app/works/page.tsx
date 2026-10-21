import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'
import QuickQuote from '@/components/forms/QuickQuote'
import { jsonLd } from '@/lib/json-ld'
import { KURA_MASTER } from '@/lib/works'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '制作実績｜Kura Master 10周年記念枡・企業ロゴ入れ枡',
  description:
    'MASU-STOREの枡の制作実績。フランス・パリの日本酒コンクール「Kura Master」開催10周年の記念枡、企業・団体のロゴ入れ枡など。名入れは1個から、法人の大口・海外発送にも対応します。',
  alternates: {
    canonical: `${baseUrl}/works`,
    languages: { ja: `${baseUrl}/works`, en: `${baseUrl}/en/works` },
  },
  openGraph: {
    title: '制作実績｜Kura Master 10周年記念枡・企業ロゴ入れ枡',
    description: 'パリの日本酒コンクール「Kura Master」開催10周年の記念枡を制作。企業・団体のロゴ入れ枡の事例も。',
    url: `${baseUrl}/works`,
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const worksJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '制作実績',
  url: `${baseUrl}/works`,
  inLanguage: 'ja',
  hasPart: [
    {
      '@type': 'CreativeWork',
      name: KURA_MASTER.ja.title,
      description: KURA_MASTER.ja.lead,
      dateCreated: String(KURA_MASTER.edition),
      image: `${baseUrl}${KURA_MASTER.image.src}`,
      material: '国産ヒノキ',
      creator: { '@type': 'Organization', name: siteConfig.name, url: baseUrl },
      about: {
        '@type': 'Event',
        name: `Kura Master ${KURA_MASTER.edition} 授賞式`,
        startDate: KURA_MASTER.ceremonyDate,
        location: { '@type': 'Place', name: KURA_MASTER.ja.venue, address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' } },
        url: KURA_MASTER.url,
      },
    },
  ],
}

export default function WorksPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '制作実績', href: `${baseUrl}/works` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(worksJsonLd) }} />

      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '制作実績' }]} />
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-14 text-center">
        <p className="text-[11px] tracking-[0.2em] mb-4" style={{ color: 'var(--color-accent)' }}>
          WORKS
        </p>
        <h1 className="section-title mb-6">制作実績</h1>
        <p className="lead max-w-2xl mx-auto">
          パリの日本酒コンクールの記念枡から、企業のロゴ入れ、1個だけの記念品まで。
          国産ヒノキの枡に、それぞれの節目を刻んできました。
        </p>
      </section>

      {/* Kura Master */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.18em] mb-3" style={{ color: 'var(--color-accent)' }}>
            PARIS, FRANCE — {KURA_MASTER.edition}
          </p>
          <h2 className="serif text-2xl md:text-3xl font-light leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
            {KURA_MASTER.ja.title}
          </h2>
          <p className="text-[15px] leading-[2.1] mb-6" style={{ color: 'var(--foreground)' }}>
            {KURA_MASTER.ja.lead}
            {KURA_MASTER.ja.use}
          </p>
          <figure className="mb-6">
            <Image
              src={KURA_MASTER.image.src}
              alt={KURA_MASTER.ja.imageAlt}
              width={KURA_MASTER.image.width}
              height={KURA_MASTER.image.height}
              sizes="(max-width: 768px) 100vw, 720px"
              className="w-full max-w-md mx-auto rounded-sm"
              priority
            />
            <figcaption className="text-[12px] text-center mt-3" style={{ color: 'var(--color-muted)' }}>
              在フランス日本国大使公邸での授賞式に展示された記念枡（{KURA_MASTER.ja.method}）
            </figcaption>
          </figure>
          <dl className="grid grid-cols-[6em_1fr] gap-y-2 text-[14px] mb-6">
            <dt style={{ color: 'var(--color-muted)' }}>使われ方</dt><dd>{KURA_MASTER.ja.ceremonyLabel}での展示、受賞蔵への記念品</dd>
            <dt style={{ color: 'var(--color-muted)' }}>名入れ</dt><dd>{KURA_MASTER.ja.detail}</dd>
            <dt style={{ color: 'var(--color-muted)' }}>素材</dt><dd>国産ヒノキ</dd>
          </dl>
          <div className="rounded-sm p-6 md:p-7 mb-6" style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}>
            <h3 className="text-[13px] tracking-[0.08em] mb-3" style={{ color: 'var(--color-muted)' }}>
              Kura Master とは
            </h3>
            <p className="text-[14px] leading-[2]" style={{ color: 'var(--foreground)' }}>
              {KURA_MASTER.ja.about}
            </p>
            <p className="text-[13px] mt-4">
              <a
                href={KURA_MASTER.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
                style={{ color: 'var(--color-accent)' }}
              >
                Kura Master 公式サイト ↗
              </a>
            </p>
          </div>
          <p className="text-[14px] leading-[2]" style={{ color: 'var(--color-muted)' }}>
            日本酒を讃える場で、受賞した酒蔵へ贈る記念品として枡が選ばれました。
            大会・式典・周年の記念枡は、名入れの内容と数量に合わせてお見積りします。
          </p>
        </div>
      </section>

      {/* ロゴ入れ */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <h2 className="section-title mb-4 text-center">ロゴ入れ枡の仕上がり</h2>
        <p className="lead text-center mb-10 max-w-2xl mx-auto">
          企業・団体・施設のロゴをレーザー刻印で入れた一合枡です。ロゴの細い線まで、木目とともに刻めます。
          ロゴデータが無くても、名刺や看板の写真から起こして刻印します。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Image src="/images/works/ishiwa-ashiyu-front.jpg" alt="レーザー刻印でロゴを入れた一合枡 — 正面" width={1448} height={1086} className="w-full rounded-sm" />
          <Image src="/images/works/ishiwa-ashiyu-detail.jpg" alt="レーザー刻印の彫りの質感 — ロゴの線が木目とともに再現される" width={1536} height={1024} className="w-full rounded-sm" />
          <Image src="/images/works/ishiwa-ashiyu-hand.jpg" alt="ロゴを刻んだ一合枡を手のひらに載せたサイズ感" width={1448} height={1086} className="w-full rounded-sm" />
        </div>
        <p className="text-center mt-8 text-sm">
          <Link href="/logo" className="underline underline-offset-4" style={{ color: 'var(--color-accent)' }}>
            枡へのロゴ入れについて詳しく →
          </Link>
        </p>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ご依頼の幅 */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <h2 className="section-title mb-10 text-center">こんなご依頼をいただいています</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { title: '大会・式典の記念品', desc: '日本酒コンクールの周年記念、竣工式・鏡開き・表彰式など、その場に立ち会った人が持ち帰る記念の枡。', href: '/business/ceremony', link: '式典・鏡開きの枡' },
            { title: '業種を問わない企業の記念品', desc: '酒類や飲食に限らず、さまざまな業種の企業から、周年記念・ノベルティ・取引先への贈り物としてご依頼をいただいています。', href: '/business', link: '法人のお客様へ' },
            { title: '1個からの記念品・ギフト', desc: '退職・還暦・結婚などの節目に、名前と日付を刻んだ一点ものの枡。文章を送るだけで、デザインはこちらで組みます。', href: '/original', link: 'オーダーメイドの記念品' },
            { title: '海外への発送', desc: 'アジア・北米・ヨーロッパへの発送実績があります。英語などのメッセージの刻印にも対応します。', href: '/en', link: 'English site' },
          ].map((item) => (
            <div key={item.title} className="rounded-sm p-6" style={{ border: '1px solid var(--color-border)' }}>
              <h3 className="serif text-base mb-3" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
              <p className="text-[13px] leading-[1.9] mb-4" style={{ color: 'var(--color-muted)' }}>{item.desc}</p>
              <Link href={item.href} className="text-[13px] underline underline-offset-4" style={{ color: 'var(--color-accent)' }}>
                {item.link} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <QuickQuote
        id="offer-quote"
        formType="quick-quote-works"
        heading="記念の枡を、相談する"
        lead="用途・サイズ・個数を選んで連絡先を入れるだけ。名入れは1個から、大会・式典・企業の大口にも対応します。通常1〜2営業日以内に、お見積りと仕上がりイメージをお送りします。"
        className="bg-[var(--color-subtle)]"
      />
    </>
  )
}
