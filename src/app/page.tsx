import Link from 'next/link'
import { masuSizes, selectionGuide, faqItems } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'
import ReviewSection from '@/components/ui/ReviewSection'

const displayedFaqItems = faqItems.slice(0, 5)

const useCases = [
  {
    title: '日本酒・もっきり',
    desc: 'ヒノキの香りが日本酒を引き立てる。一合枡で注ぐ正統派から、グラスを枡に入れて溢れさせる「もっきり」スタイルまで。',
    href: '/sake',
  },
  {
    title: 'ギフト・お祝い',
    desc: '「益す＝増す」の縁起物。結婚祝い、出産祝い、還暦祝いに名入れ枡を。ペア枡も人気です。',
    href: '/guide',
  },
  {
    title: '企業ノベルティ',
    desc: '社名・ロゴを刻印した記念品。周年記念、顧客ギフト、展示会配布に。10個から対応。まとめ買いで割引あり。',
    href: '/business',
  },
  {
    title: '節分・鏡開き',
    desc: '節分の豆まきには五合枡、鏡開きの乾杯には一合枡。日本の行事に欠かせない存在です。',
    href: '/history',
  },
  {
    title: 'インテリア',
    desc: 'ペン立て、小物入れ、プランターカバー。ヒノキの温もりが空間に和の趣を加えます。',
    href: '/products',
  },
  {
    title: '海外ギフト',
    desc: '日本の伝統工芸品として外国の方に喜ばれます。名前をローマ字で刻印するサービスも。',
    href: '/guide',
  },
]

const features = [
  { title: '全7サイズ取り揃え', desc: '三勺枡（54ml）から一升枡（1800ml）まで、用途に合った枡が必ず見つかります。' },
  { title: '名入れ3種対応', desc: '焼印（伝統技法）・レーザー刻印（写真表現可）・シルクプリント（カラー対応）。' },
  { title: '法人・大口注文対応', desc: '無垢枡10個から、オリジナル枡1個から注文可能。まとめ買いほどお得に。100個以上は数量割引をご案内。' },
  { title: 'JPYC暗号資産決済対応', desc: 'クレジットカードに加え、JPYC（日本円ステーブルコイン）でのお支払いが可能です。' },
]

const knowledgeLinks = [
  { title: '枡の歴史1300年', desc: '大化の改新から現代まで、計量器としての枡の歴史を辿る。', href: '/history' },
  { title: 'お手入れ方法', desc: '長く使うための洗い方・乾かし方・保管方法を解説。', href: '/care' },
  { title: '枡と日本酒', desc: 'もっきり、枡酒、塩枡。枡で日本酒を楽しむ文化。', href: '/sake' },
  { title: '選び方ガイド', desc: '用途別・サイズ別の選び方を分かりやすく解説。', href: '/guide' },
]

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

      {/* ===== HERO ===== */}
      <section
        style={{
          background: '#2C2420',
          color: '#FAFAF7',
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            padding: 'clamp(5rem, 12vw, 10rem) 1.5rem',
            textAlign: 'center',
          }}
        >
          <p
            className="serif"
            style={{
              fontSize: 'clamp(5rem, 12vw, 8rem)',
              lineHeight: 1,
              marginBottom: '1.5rem',
              letterSpacing: '0.08em',
              color: '#FAFAF7',
            }}
          >
            枡
          </p>
          <h1
            className="serif"
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.75rem)',
              fontWeight: 300,
              lineHeight: 1.6,
              marginBottom: '1.25rem',
              letterSpacing: '0.1em',
            }}
          >
            国産ヒノキ枡の専門店
          </h1>
          <p
            style={{
              fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
              lineHeight: 2,
              color: '#A09A92',
              maxWidth: 540,
              margin: '0 auto 3rem',
            }}
          >
            約1300年の歴史を持つ日本の木の器。
            <br />
            岐阜県大垣市の職人が、国産ヒノキで一つひとつ仕上げます。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn-primary" style={{ background: '#FAFAF7', color: '#2C2420' }}>
              商品を見る
            </Link>
            <Link
              href="/guide"
              className="btn-outline"
              style={{ color: '#FAFAF7', borderColor: '#5A504A' }}
            >
              選び方ガイド
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 枡とは (AIO) ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
        <div
          style={{
            maxWidth: 860,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'start',
          }}
          className="max-md:!grid-cols-1"
        >
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 400,
              letterSpacing: '0.08em',
              lineHeight: 1.5,
            }}
          >
            枡とは
          </h2>
          <div
            style={{
              borderLeft: '4px solid var(--color-accent)',
              paddingLeft: 'clamp(1.25rem, 2vw, 2rem)',
            }}
          >
            <p style={{ lineHeight: 2, color: 'var(--foreground)' }}>
              枡（ます）は、国産ヒノキ（檜）で作られる日本の伝統的な木製の器です。漢字では「枡」「升」「桝」と表記されますが、いずれも同じものを指します。約1300年前から穀物や液体の計量器として使われ、現在では日本酒の酒器、ギフト、インテリア、企業ノベルティとして幅広く親しまれています。「益す」に通じる縁起物としても知られています。
            </p>
          </div>
        </div>
      </section>

      {/* ===== サイズ一覧 ===== */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2
            className="serif section-title"
            style={{ marginBottom: '0.75rem' }}
          >
            枡の全サイズ一覧
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '2.5rem', lineHeight: 1.8 }}>
            三勺から一升まで、全7サイズを取り揃えています。
          </p>

          {/* Desktop table */}
          <div className="hidden md:block" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  {['サイズ名', '読み方', '外寸', '容量', '目安', 'おすすめ用途'].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem 0.5rem',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        color: 'var(--color-muted)',
                        fontWeight: 400,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {masuSizes.map((s, i) => (
                  <tr
                    key={s.id}
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                      background: i % 2 === 1 ? 'var(--color-subtle)' : 'transparent',
                    }}
                  >
                    <td className="serif" style={{ padding: '0.85rem 0.5rem', fontWeight: 500 }}>{s.name}</td>
                    <td style={{ padding: '0.85rem 0.5rem', color: 'var(--color-muted)' }}>{s.reading}</td>
                    <td style={{ padding: '0.85rem 0.5rem' }}>{s.size}</td>
                    <td style={{ padding: '0.85rem 0.5rem' }}>{s.capacity}</td>
                    <td style={{ padding: '0.85rem 0.5rem', color: 'var(--color-muted)', fontSize: '0.85rem' }}>{s.capacityNote}</td>
                    <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.85rem' }}>{s.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {masuSizes.map((s) => (
              <div
                key={s.id}
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <h3 className="serif" style={{ fontWeight: 500, fontSize: '1.1rem' }}>
                    {s.name}
                  </h3>
                  <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>{s.reading}</span>
                </div>
                <p style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--color-muted)' }}>外寸</span> {s.size}
                </p>
                <p style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--color-muted)' }}>容量</span> {s.capacity}（{s.capacityNote}）
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{s.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 枡の用途 ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2
            className="serif section-title"
            style={{ marginBottom: '2.5rem' }}
          >
            枡の用途
          </h2>

          {/* Featured item */}
          <Link
            href={useCases[0].href}
            style={{
              display: 'block',
              background: 'var(--color-subtle)',
              padding: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '2rem',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'background 0.4s',
            }}
          >
            <h3
              className="serif"
              style={{
                fontWeight: 500,
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                marginBottom: '0.75rem',
              }}
            >
              {useCases[0].title}
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--color-muted)', maxWidth: 640 }}>
              {useCases[0].desc}
            </p>
            <span style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-accent)' }}>
              詳しく見る →
            </span>
          </Link>

          {/* Remaining items in 2-col grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
            }}
            className="max-sm:!grid-cols-1"
          >
            {useCases.slice(1).map((uc) => (
              <Link
                key={uc.title}
                href={uc.href}
                style={{
                  display: 'block',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid var(--color-border)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <h3
                  className="serif"
                  style={{
                    fontWeight: 500,
                    fontSize: '1.05rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  {uc.title}
                </h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'var(--color-muted)' }}>
                  {uc.desc}
                </p>
                <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--color-accent)' }}>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 選び方ガイド ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2
            className="serif section-title"
            style={{ marginBottom: '2.5rem' }}
          >
            用途別・選び方ガイド
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {selectionGuide.slice(0, 4).map((item) => (
              <div
                key={item.purpose}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.5fr',
                  gap: '2rem',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid var(--color-border)',
                  alignItems: 'start',
                }}
                className="max-sm:!grid-cols-1 max-sm:!gap-2"
              >
                <p style={{ fontWeight: 500, fontSize: '0.95rem' }}>{item.purpose}</p>
                <div>
                  <p style={{ fontWeight: 500, color: 'var(--color-accent)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                    {item.recommended}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.8 }}>
                    {item.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/guide" className="btn-outline">
              選び方ガイドをすべて見る
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 当店の特長 ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2
            className="serif section-title"
            style={{ marginBottom: '3rem' }}
          >
            当店の特長
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {features.map((f, i) => (
              <div
                key={f.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3rem 1fr',
                  gap: '1.5rem',
                  alignItems: 'start',
                }}
              >
                <span
                  className="serif"
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 300,
                    color: 'var(--color-accent)',
                    lineHeight: 1.3,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className="serif"
                    style={{
                      fontWeight: 500,
                      fontSize: '1.05rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--color-muted)' }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
                法人・団体・まとめ買い
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--color-muted)', marginBottom: '2rem' }}>
                10個から注文可能。全7サイズ対応。名入れ（焼印・レーザー・シルク）にも対応。まとめ買いほどお得に。企業ノベルティ、記念品、イベント用途に最適です。
              </p>
              <Link href="/business" className="btn-primary">
                法人・大口注文
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

            {/* FOMUSオリジナル枡 */}
            <div>
              <h3
                className="serif"
                style={{
                  fontWeight: 500,
                  fontSize: '1.15rem',
                  marginBottom: '1rem',
                }}
              >
                FOMUSオリジナル枡
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
                個人のお客様・1個から購入可能
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--color-muted)', marginBottom: '2rem' }}>
                FOMUSロゴ入り枡・オリジナルデザイン枡は1個から購入可能。首飾り枡、枡バッジ、アート枡など、ユニークな製品を取り揃え。個人のお客様もお気軽にどうぞ。
              </p>
              <Link href="/products" className="btn-accent">
                商品を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 枡を知る ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2
            className="serif section-title"
            style={{ marginBottom: '2.5rem' }}
          >
            枡を知る
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {knowledgeLinks.map((kl, i) => (
              <Link
                key={kl.title}
                href={kl.href}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: '2rem',
                  padding: '1.5rem 0',
                  borderBottom: i < knowledgeLinks.length - 1 ? '1px solid var(--color-border)' : 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                  alignItems: 'baseline',
                  transition: 'color 0.3s',
                }}
                className="max-sm:!grid-cols-1 max-sm:!gap-1"
              >
                <h3
                  className="serif"
                  style={{
                    fontWeight: 500,
                    fontSize: '1rem',
                  }}
                >
                  {kl.title}
                </h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'var(--color-muted)' }}>
                  {kl.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 枡診断 ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 1.5rem', background: 'var(--color-accent-light)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2
            className="serif section-title"
            style={{ marginBottom: '1rem' }}
          >
            あなたに合う枡を見つける
          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.9,
              color: 'var(--color-muted)',
              marginBottom: '2.5rem',
            }}
          >
            用途やこだわりに合わせて、最適な枡サイズを診断します。3つの質問に答えるだけで、あなたにぴったりの枡が見つかります。
          </p>
          <Link href="/finder" className="btn-accent">
            枡診断をはじめる
          </Link>
        </div>
      </section>

      {/* ===== よくあるご質問 ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
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
