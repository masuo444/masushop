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
          background: '#1A1A1A',
          color: '#FAF8F5',
          padding: 'clamp(4rem, 10vw, 8rem) 1.5rem',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="section-label" style={{ color: 'var(--color-muted)' }}>
            JAPANESE WOODEN MASU
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif-jp), Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 300,
              lineHeight: 1.4,
              marginBottom: '1.5rem',
            }}
          >
            枡（ます）— 国産ヒノキ枡の専門店
          </h1>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              lineHeight: 1.9,
              color: '#B0ADA8',
              maxWidth: 640,
              marginBottom: '2.5rem',
            }}
          >
            1300年の歴史を持つ日本の伝統工芸品。岐阜県大垣市の職人が国産ヒノキで仕上げる枡を、全7サイズ取り揃え。名入れ（焼印・レーザー・シルク）、法人ノベルティ、オーダーメイドに対応しています。
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/guide" className="btn-primary">
              枡の選び方ガイド
            </Link>
            <Link
              href="/products"
              className="btn-outline"
              style={{ color: '#FAF8F5', borderColor: '#555' }}
            >
              商品を見る
            </Link>
          </div>
        </div>
      </section>

      {/* ===== QUICK ANSWER (AIO) ===== */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            background: 'var(--color-subtle)',
            border: '1px solid var(--color-border)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          <p className="section-label">WHAT IS MASU?</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif-jp), Georgia, serif',
              fontSize: '1.25rem',
              fontWeight: 400,
              marginBottom: '0.75rem',
            }}
          >
            枡（ます）とは？
          </h2>
          <p style={{ lineHeight: 1.9, color: 'var(--foreground)' }}>
            枡（ます）は、国産ヒノキ（檜）で作られる日本の伝統的な木製の器です。漢字では「枡」「升」「桝」と表記されますが、いずれも同じものを指します。約1300年前から穀物や液体の計量器として使われ、現在では日本酒の酒器、ギフト、インテリア、企業ノベルティとして幅広く親しまれています。「益す」に通じる縁起物としても知られています。
          </p>
        </div>
      </section>

      {/* ===== SIZE OVERVIEW ===== */}
      <section style={{ padding: '3rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p className="section-label">ALL 7 SIZES</p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif', marginBottom: '2rem' }}>
            枡の全サイズ一覧
          </h2>

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
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
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
                {masuSizes.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 500 }}>{s.name}</td>
                    <td style={{ padding: '0.75rem 0.5rem', color: 'var(--color-muted)' }}>{s.reading}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{s.size}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{s.capacity}</td>
                    <td style={{ padding: '0.75rem 0.5rem', color: 'var(--color-muted)', fontSize: '0.85rem' }}>{s.capacityNote}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem' }}>{s.use}</td>
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
                  border: '1px solid var(--color-border)',
                  padding: '1.25rem',
                  background: 'var(--color-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif', fontWeight: 500, fontSize: '1.1rem' }}>
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

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== USE CASE CARDS ===== */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p className="section-label">USE CASES</p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif', marginBottom: '2rem' }}>
            枡の用途
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {useCases.map((uc) => (
              <Link
                key={uc.title}
                href={uc.href}
                className="block border border-[var(--color-border)] p-8 no-underline text-inherit transition-colors hover:border-[var(--color-accent)]"
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-serif-jp), Georgia, serif',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  {uc.title}
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--color-muted)' }}>
                  {uc.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== SELECTION GUIDE PREVIEW ===== */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p className="section-label">SELECTION GUIDE</p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif', marginBottom: '2rem' }}>
            用途別・選び方ガイド
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {selectionGuide.slice(0, 4).map((item) => (
              <div
                key={item.purpose}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  padding: '1.5rem',
                  background: 'var(--color-subtle)',
                  border: '1px solid var(--color-border)',
                }}
                className="max-sm:!grid-cols-1"
              >
                <div>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                    用途
                  </p>
                  <p style={{ fontWeight: 500 }}>{item.purpose}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                    おすすめ
                  </p>
                  <p style={{ fontWeight: 500, color: 'var(--color-accent)', marginBottom: '0.25rem' }}>{item.recommended}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.7 }}>{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/guide" className="btn-outline">
            選び方ガイドをすべて見る
          </Link>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== WHY BUY FROM US ===== */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p className="section-label">FEATURES</p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif', marginBottom: '2rem' }}>
            当店の特長
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-serif-jp), Georgia, serif',
                    fontWeight: 500,
                    fontSize: '1rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'var(--color-muted)' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== REVIEWS ===== */}
      <ReviewSection />

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== PURCHASE CATEGORIES ===== */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p className="section-label">PURCHASE</p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif', marginBottom: '2rem' }}>
            ご購入について
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Standard masu */}
            <div
              style={{
                padding: '2rem',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-muted)',
                    marginBottom: '0.75rem',
                  }}
                >
                  FOR BUSINESS
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif-jp), Georgia, serif',
                    fontWeight: 500,
                    fontSize: '1.15rem',
                    marginBottom: '1rem',
                  }}
                >
                  無垢の枡（法人・団体・まとめ買い）
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
                  10個から注文可能。全7サイズ対応。名入れ（焼印・レーザー・シルク）にも対応。まとめ買いほどお得に。企業ノベルティ、記念品、イベント用途に最適です。
                </p>
              </div>
              <Link href="/business" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                法人・大口注文
              </Link>
            </div>

            {/* FOMUS original */}
            <div
              style={{
                padding: '2rem',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-muted)',
                    marginBottom: '0.75rem',
                  }}
                >
                  FOR INDIVIDUALS
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif-jp), Georgia, serif',
                    fontWeight: 500,
                    fontSize: '1.15rem',
                    marginBottom: '1rem',
                  }}
                >
                  FOMUS オリジナル枡
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
                  FOMUSロゴ入り枡・オリジナルデザイン枡は1個から購入可能。首飾り枡、枡バッジ、アート枡など、ユニークな製品を取り揃え。個人のお客様もお気軽にどうぞ。
                </p>
              </div>
              <Link href="/products" className="btn-accent" style={{ alignSelf: 'flex-start' }}>
                商品を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== KNOWLEDGE HUB ===== */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p className="section-label">KNOWLEDGE</p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif', marginBottom: '2rem' }}>
            枡を知る
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {knowledgeLinks.map((kl) => (
              <Link
                key={kl.title}
                href={kl.href}
                style={{
                  display: 'block',
                  padding: '1.5rem',
                  background: 'var(--color-subtle)',
                  border: '1px solid var(--color-border)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color 0.3s',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-serif-jp), Georgia, serif',
                    fontWeight: 500,
                    fontSize: '1rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  {kl.title}
                </h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--color-muted)' }}>
                  {kl.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== AI MASU FINDER ===== */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--color-subtle)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p className="section-label">AI MASU FINDER</p>
          <h2
            className="section-title"
            style={{
              fontFamily: 'var(--font-serif-jp), Georgia, serif',
              marginBottom: '1rem',
            }}
          >
            あなたにぴったりの枡は？
          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.8,
              color: 'var(--color-muted)',
              marginBottom: '2rem',
            }}
          >
            用途やこだわりに合わせて、最適な枡サイズを診断します。3つの質問に答えるだけで、あなたにぴったりの枡が見つかります。
          </p>
          <Link href="/finder" className="btn-accent">
            枡診断をはじめる
          </Link>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== FAQ PREVIEW ===== */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p className="section-label">FAQ</p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif', marginBottom: '2rem' }}>
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
                    lineHeight: 1.6,
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {item.q}
                  <span style={{ color: 'var(--color-muted)', fontSize: '1.25rem', marginLeft: '1rem', flexShrink: 0 }}>+</span>
                </summary>
                <p
                  style={{
                    marginTop: '0.75rem',
                    fontSize: '0.9rem',
                    lineHeight: 1.9,
                    color: 'var(--color-muted)',
                  }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/guide#faq" className="btn-outline">
              FAQをすべて見る
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== CTA ===== */}
      <section
        style={{
          padding: '5rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p className="section-label">CONTACT</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif-jp), Georgia, serif',
              fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
              fontWeight: 300,
              marginBottom: '1rem',
            }}
          >
            お見積り・ご相談
          </h2>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--color-muted)', marginBottom: '2rem' }}>
            名入れ枡、法人向け大口注文、オーダーメイドなど、お気軽にご相談ください。
          </p>
          <Link href="/custom" className="btn-accent">
            お問い合わせ
          </Link>
        </div>
      </section>
    </>
  )
}
