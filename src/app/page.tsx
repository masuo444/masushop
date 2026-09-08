import Link from 'next/link'
import Image from 'next/image'
import { faqItems } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import ReviewSection from '@/components/ui/ReviewSection'
import Differentiators from '@/components/ui/Differentiators'

const displayedFaqItems = faqItems.slice(0, 5)


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
            padding: 'clamp(2.5rem, 10vw, 8rem) 1.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'center',
          }}
          className="max-md:!grid-cols-1 max-md:!text-center"
        >
          <div>
            <p
              className="serif"
              style={{
                fontSize: 'clamp(2.75rem, 9vw, 6rem)',
                lineHeight: 1,
                marginBottom: '0.75rem',
                letterSpacing: '0.08em',
                color: '#FAFAF7',
              }}
            >
              枡
            </p>
            <h1
              className="serif"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 300,
                lineHeight: 1.5,
                marginBottom: '1.25rem',
                letterSpacing: '0.08em',
              }}
            >
              国産ヒノキ枡の専門店
              <span
                style={{
                  display: 'block',
                  marginTop: '0.5rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '0.625em',
                  letterSpacing: '0.08em',
                  color: '#C8C1B8',
                }}
              >
                周年記念品・ノベルティの名入れ枡
              </span>
            </h1>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 2,
                color: '#C8C1B8',
                maxWidth: 440,
                marginBottom: '1.75rem',
              }}
            >
              企業ロゴ・社名を刻んだ記念品を、10個から。
              <br />
              約1300年使われてきた日本の木の器に、職人の手で刻みます。
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }} className="max-md:!justify-center">
              <Link href="/custom" className="btn-primary" style={{ background: '#FAFAF7', color: '#2C2420' }}>
                無料で見積り・相談する
              </Link>
              <Link
                href="/business"
                className="btn-outline"
                style={{ color: '#FAFAF7', borderColor: '#5A504A' }}
              >
                法人向けのご案内
              </Link>
            </div>

            {/* 条件サマリー */}
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem 1.25rem',
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #4A413B',
                fontSize: '0.8125rem',
                letterSpacing: '0.04em',
                color: '#C8C1B8',
              }}
              className="max-md:!justify-center"
            >
              {['10個から対応', '数量割引あり', 'サンプル製作可', '名入れは1個から'].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
                maxWidth: 480,
                margin: '0 auto',
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== 制作事例 ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 1.5rem' }}>
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
              { label: 'サンプル', value: '製作できます', note: '量産前に実物で仕上がりを確認できます' },
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
            <Link href="/custom" className="btn-accent">
              無料で見積り・相談する
            </Link>
            <Link href="/business" className="btn-outline">
              法人向けの詳細を見る
            </Link>
          </div>
        </div>
      </section>

      <Differentiators />

      {/* ===== お客様の声 ===== */}
      <ReviewSection />

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
                10個から注文可能。全7サイズ対応。名入れ（焼印・レーザー刻印）にも対応。まとめ買いほどお得です。100個以上のご注文やお見積りはお問い合わせフォームからご相談ください。
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
                名前・日付・メッセージ・手書きの文字・写真を、国産ヒノキの枡に刻みます。デザインデータは不要。入れたい文章を送っていただければ、書体やレイアウトはこちらでお作りします。
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
            <Link href="/guide#faq" className="btn-outline">
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
            名入れ枡、法人向け大口注文、オーダーメイドなど、お気軽にご相談ください。
          </p>
          <Link
            href="/custom"
            className="btn-primary"
            style={{ background: '#FAFAF7', color: '#2C2420' }}
          >
            お問い合わせ
          </Link>
        </div>
      </section>
    </>
  )
}
