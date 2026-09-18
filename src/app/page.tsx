import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { faqItems, masuSizes } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { orderMinPriceNote } from '@/lib/pricing'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import ReviewSection from '@/components/ui/ReviewSection'
import Differentiators from '@/components/ui/Differentiators'
import OrderFlow from '@/components/ui/OrderFlow'
import QuickQuote from '@/components/forms/QuickQuote'

export const metadata: Metadata = {
  title: { absolute: '枡の専門店 MASU-STORE｜名入れ枡を1個から、仕上がりイメージ無料' },
  description:
    '国産ヒノキの枡を全7サイズ（三勺54ml〜一升1,800ml）。文章を送るだけで、デザインから仕上がり確認まで名入れ枡をまるごとお任せ。ご注文前に、お見積りと仕上がりイメージを無料でお送りします。1個から、法人は10個から。請求書払い・海外発送に対応。',
  alternates: { canonical: siteConfig.url, languages: { ja: siteConfig.url, en: `${siteConfig.url}/en` } },
  openGraph: {
    title: '枡の専門店 MASU-STORE｜名入れ枡を1個から、仕上がりイメージ無料',
    description:
      '文章を送るだけで、デザインから仕上がり確認まで名入れ枡をまるごとお任せ。ご注文前に見積りと仕上がりイメージを無料でお送りします。1個から／法人10個から。',
    url: siteConfig.url,
  },
}

const displayedFaqItems = faqItems.slice(0, 5)

const trustItems = ['国産ヒノキ', 'デザインデータ不要', '注文前に仕上がりイメージ無料', '請求書払い', '海外発送']

// お客様の声の欄に購入者アンケートの承認分を出すため、1時間ごとに作り直す（承認時は即時）
export const revalidate = 3600


export default function HomePage() {
  const baseUrl = siteConfig.url

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
        ]}
      />
      <FAQJsonLd
        items={displayedFaqItems.map((item) => ({ q: item.q, a: item.a }))}
      />
      <SpeakableJsonLd
        url={baseUrl}
        cssSelectors={['[data-speakable]', '.section-title']}
      />

      {/* ===== HERO ===== */}
      <section
        style={{
          background: '#2C2420',
          color: '#FAFAF7',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: 'clamp(2.5rem, 8vw, 6.5rem) 1.5rem clamp(2rem, 5vw, 4rem)',
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'center',
          }}
          className="max-md:!grid-cols-1 max-md:!text-center"
        >
          <div>
            <p
              className="text-[11px]"
              style={{
                letterSpacing: '0.2em',
                color: '#C8C1B8',
                marginBottom: '1.25rem',
              }}
            >
              国産ヒノキ枡の専門店 MASU-STORE
            </p>
            <h1
              className="serif"
              data-speakable
              style={{
                fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                fontWeight: 300,
                lineHeight: 1.65,
                marginBottom: '1.25rem',
                letterSpacing: '0.05em',
              }}
            >
              <span className="inline-block">文章を送るだけ。</span>
              <br />
              <span className="inline-block">デザインから</span>
              <span className="inline-block">仕上がり確認まで、</span>
              <span className="inline-block">名入れ枡を</span>
              <span className="inline-block">まるごとお任せ。</span>
            </h1>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 2,
                color: '#FAFAF7',
                maxWidth: 480,
                marginBottom: '0.5rem',
              }}
              className="max-md:!mx-auto"
            >
              ご注文前に、見積りと仕上がりイメージを無料でお送りします。
            </p>
            <p
              style={{
                fontSize: '0.9375rem',
                lineHeight: 1.9,
                color: '#C8C1B8',
                maxWidth: 480,
                marginBottom: '1.75rem',
              }}
              className="max-md:!mx-auto"
            >
              1個から／法人10個から・請求書払い可
            </p>

            {/* 入口を2つに分ける */}
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', maxWidth: 480 }}
              className="max-md:!mx-auto max-sm:!grid-cols-1"
            >
              <Link
                href="/original"
                className="block rounded-sm transition-colors hover:bg-[#F4F1EC]"
                style={{ background: '#FAFAF7', color: '#2C2420', padding: '1rem 1.25rem', textAlign: 'left' }}
              >
                <span className="block text-[11px]" style={{ letterSpacing: '0.12em', color: '#7B5B2A' }}>
                  個人のお客様
                </span>
                <span className="serif block" style={{ fontSize: '1.125rem', marginTop: '0.25rem' }}>
                  個人・1個から →
                </span>
                <span className="block text-[13px]" style={{ color: '#6F675F', marginTop: '0.25rem' }}>
                  記念品・ギフトの名入れ枡
                </span>
              </Link>
              <Link
                href="/business"
                className="block rounded-sm transition-colors hover:border-[#FAFAF7]"
                style={{ border: '1px solid #6B605A', color: '#FAFAF7', padding: '1rem 1.25rem', textAlign: 'left' }}
              >
                <span className="block text-[11px]" style={{ letterSpacing: '0.12em', color: '#C8C1B8' }}>
                  法人のお客様
                </span>
                <span className="serif block" style={{ fontSize: '1.125rem', marginTop: '0.25rem' }}>
                  法人・10個から →
                </span>
                <span className="block text-[13px]" style={{ color: '#C8C1B8', marginTop: '0.25rem' }}>
                  ノベルティ・周年記念・式典
                </span>
              </Link>
            </div>
            <p
              className="text-[13px] max-md:!mx-auto"
              style={{ color: '#C8C1B8', marginTop: '1rem', maxWidth: 480, lineHeight: 1.8 }}
            >
              {orderMinPriceNote}
            </p>
          </div>
          <div className="max-md:!order-first">
            <Image
              src="/images/masu-crest.jpg"
              alt="国産ヒノキ枡 — 枡の専門店 MASU-STORE"
              width={600}
              height={600}
              priority
              className="max-md:!max-w-[190px]"
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: 440,
                margin: '0 auto',
              }}
            />
          </div>
        </div>

        {/* 信頼の帯 */}
        <div style={{ borderTop: '1px solid #4A413B' }}>
          <ul
            style={{
              listStyle: 'none',
              maxWidth: 1100,
              margin: '0 auto',
              padding: '1rem 1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem 0',
              fontSize: '0.8125rem',
              letterSpacing: '0.06em',
              color: '#C8C1B8',
            }}
          >
            {trustItems.map((item, i) => (
              <li key={item} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && (
                  <span aria-hidden style={{ margin: '0 0.875rem', color: '#5A504A' }}>
                    ｜
                  </span>
                )}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 30秒かんたん見積り ===== */}
      <QuickQuote />

      {/* ===== 制作事例 ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 1.5rem', background: 'var(--color-subtle)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 className="serif section-title" style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
            制作事例
          </h2>
          <p className="lead text-center" style={{ marginBottom: '2.5rem' }}>
            石和源泉 足湯ひろば様の枡です（掲載許可をいただいています）。
            レーザー刻印なら、ロゴの線も木目とともにこの精度で刻めます。
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
            }}
            className="max-sm:!grid-cols-1"
          >
            {[
              { src: '/images/works/ishiwa-ashiyu-front.jpg', alt: 'レーザー刻印を施した一合枡 — 正面', w: 1448, h: 1086 },
              { src: '/images/works/ishiwa-ashiyu-detail.jpg', alt: 'レーザー刻印の彫りの質感 — 木目とともに再現', w: 1536, h: 1024 },
              { src: '/images/works/ishiwa-ashiyu-hand.jpg', alt: '手のひらに載る一合枡のサイズ感', w: 1448, h: 1086 },
            ].map((img) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 2 }}
              />
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/logo" style={{ textDecoration: 'underline', color: 'var(--color-accent)', fontSize: '0.9375rem' }}>
              ロゴ入れの詳細を見る →
            </Link>
          </p>
        </div>
      </section>

      {/* ===== ご依頼の流れ ===== */}
      <OrderFlow background="plain" />

      {/* ===== 法人のご発注条件 ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 1.5rem', background: 'var(--color-subtle)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 className="serif section-title" style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
            法人のご発注について
          </h2>
          <p className="lead text-center" style={{ marginBottom: '2.5rem' }}>
            周年記念品、展示会ノベルティ、株主優待、式典の振る舞い枡。
            数量が増えるほど単価は下がります。
          </p>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}
            className="max-md:!grid-cols-2"
          >
            {[
              { label: '対応数量', value: '10個から', note: '大口は数量に応じて割引をご案内します' },
              { label: '納期の目安', value: '約3週間', note: '無地は約2週間、300個以上は約4週間' },
              { label: '仕上がりイメージ', value: '注文前に無料', note: 'お見積りと一緒にレイアウト画像をお送りします' },
              { label: 'お支払い', value: '請求書払い可', note: '月末締め翌月末払いにも対応します' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: 'var(--background)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 2,
                  padding: '1.5rem 1.25rem',
                }}
              >
                <p className="text-[11px]" style={{ color: 'var(--color-accent)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                  {item.label}
                </p>
                <p className="serif" style={{ fontSize: '1.125rem', marginBottom: '0.625rem' }}>
                  {item.value}
                </p>
                <p className="text-[13px]" style={{ color: 'var(--color-muted)' }}>
                  {item.note}
                </p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            <Link href="/business" className="btn-accent">
              法人向けの詳細を見る
            </Link>
            <Link href="/custom" className="btn-outline">
              詳しく書いて相談する
            </Link>
          </div>
        </div>
      </section>

      <Differentiators />

      {/* ===== お客様の声 ===== */}
      <ReviewSection />

      {/* ===== サイズから選ぶ ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 1.5rem', background: 'var(--color-subtle)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 className="serif section-title" style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
            全7サイズから選ぶ
          </h2>
          <p className="lead text-center" style={{ marginBottom: '2.5rem' }}>
            三勺（54ml）から一升（1,800ml）まで、すべて国産ヒノキ。
            日本酒には一合枡、もっきりには八勺枡、節分には五合枡、鏡開きには一升枡が定番です。
          </p>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}
            className="max-md:!grid-cols-2"
          >
            {masuSizes.map((m) => (
              <Link
                key={m.id}
                href={`/products/${m.id}`}
                className="transition-colors hover:bg-[var(--color-accent-light)]"
                style={{
                  background: 'var(--background)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 2,
                  padding: '1.25rem 1.125rem',
                  display: 'block',
                }}
              >
                <p className="serif" style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                  {m.name}
                </p>
                <p className="text-[11px]" style={{ color: 'var(--color-accent)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                  {m.capacity}
                </p>
                <p className="text-[13px]" style={{ color: 'var(--color-muted)' }}>
                  {m.size}
                  <br />
                  {m.capacityNote}
                </p>
              </Link>
            ))}
            <Link
              href="/products/sizes"
              className="transition-colors hover:bg-[var(--color-accent-light)]"
              style={{
                border: '1px solid var(--color-accent)',
                background: 'var(--color-accent-light)',
                borderRadius: 2,
                padding: '1.25rem 1.125rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <p className="serif" style={{ fontSize: '1.125rem', marginBottom: '0.25rem', color: 'var(--color-accent)' }}>
                サイズ比較表
              </p>
              <p className="text-[13px]" style={{ color: 'var(--color-muted)' }}>
                寸法・容量・用途を一覧で比較し、用途別の選び方を解説
              </p>
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            <Link href="/products" className="btn-primary">
              商品一覧を見る
            </Link>
            <Link href="/products/engraving" className="btn-outline">
              名入れ方法（焼印・レーザー）
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ご購入について ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2
            className="serif section-title"
            style={{ marginBottom: '3rem' }}
          >
            ご購入について
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1px 1fr',
              gap: '3rem',
            }}
            className="max-md:!grid-cols-1 max-md:!gap-8"
          >
            {/* 無垢の枡 */}
            <div>
              <h3
                className="serif"
                style={{
                  fontWeight: 500,
                  fontSize: '1.15rem',
                  marginBottom: '1rem',
                }}
              >
                無垢の枡
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--color-muted)', marginBottom: '2rem' }}>
                10個から注文可能。<Link href="/products" style={{ textDecoration: 'underline' }}>全7サイズ</Link>対応。<Link href="/products/engraving" style={{ textDecoration: 'underline' }}>名入れ（焼印・レーザー刻印）</Link>にも対応。まとめ買いほどお得です。100個以上のご注文やお見積りはお問い合わせフォームからご相談ください。
              </p>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: 'var(--color-muted)', marginBottom: '2rem' }}>
                1個からの名入れ・記念品をご希望の方は{' '}
                <Link href="/original" style={{ textDecoration: 'underline' }}>
                  オーダーメイドの記念品
                </Link>
                、企業ロゴ・社名を刻む場合は{' '}
                <Link href="/logo" style={{ textDecoration: 'underline' }}>
                  ロゴ入れ
                </Link>
                {' '}をご覧ください。
              </p>
              <Link href="/custom" className="btn-primary">
                お見積り・ご相談
              </Link>
            </div>

            {/* Vertical separator */}
            <div
              style={{ background: 'var(--color-border)' }}
              className="max-md:!hidden"
            />

            {/* Horizontal separator for mobile */}
            <div
              className="md:!hidden"
              style={{ height: 1, background: 'var(--color-border)' }}
            />

            {/* オリジナル枡 */}
            <div>
              <h3
                className="serif"
                style={{
                  fontWeight: 500,
                  fontSize: '1.15rem',
                  marginBottom: '1rem',
                }}
              >
                オリジナル枡
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
                個人のお客様・1個からご相談可能
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--color-muted)', marginBottom: '2rem' }}>
                名前・日付・メッセージ・手書きの文字・写真を、国産ヒノキの枡に刻みます。デザインデータは不要。入れたい文章を送っていただければ、書体やレイアウトはこちらでお作りし、ご注文前に仕上がりイメージをお送りします。
              </p>
              <Link href="/original" className="btn-accent">
                オリジナル枡を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== よくあるご質問 ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
        <div data-speakable style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2
            className="serif section-title"
            style={{ marginBottom: '2.5rem' }}
          >
            よくあるご質問
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {displayedFaqItems.map((item) => (
              <details
                key={item.q}
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  padding: '1.25rem 0',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {item.q}
                  <span style={{ color: 'var(--color-muted)', fontSize: '1.1rem', marginLeft: '1rem', flexShrink: 0 }}>+</span>
                </summary>
                <p
                  style={{
                    marginTop: '0.75rem',
                    fontSize: '0.9rem',
                    lineHeight: 2,
                    color: 'var(--color-muted)',
                  }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/faq" className="btn-outline">
              質問をすべて見る
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA お問い合わせ ===== */}
      <section
        style={{
          padding: 'clamp(4rem, 10vw, 7rem) 1.5rem',
          background: '#2C2420',
          color: '#FAFAF7',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
              fontWeight: 400,
              marginBottom: '1rem',
              letterSpacing: '0.06em',
            }}
          >
            お見積り・ご相談
          </h2>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: '#A09A92', marginBottom: '2.5rem' }}>
            入れたい文章と個数の目安だけで構いません。
            <br />
            お見積りと一緒に、仕上がりイメージを無料でお送りします。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="#quote"
              className="btn-primary"
              style={{ background: '#FAFAF7', color: '#2C2420' }}
            >
              30秒でかんたん見積り
            </Link>
            <Link
              href="/custom"
              className="btn-outline"
              style={{ color: '#FAFAF7', borderColor: '#5A504A' }}
            >
              詳しく書いて相談する
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
