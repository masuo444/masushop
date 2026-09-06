import Link from 'next/link'
import Image from 'next/image'
import { selectionGuide, faqItems } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import ReviewSection from '@/components/ui/ReviewSection'
import Differentiators from '@/components/ui/Differentiators'

const displayedFaqItems = faqItems.slice(0, 5)


const useCases = [
  {
    title: '日本酒・もっきり',
    desc: 'ヒノキの香りが日本酒を引き立てる。一合枡で注ぐ正統派から、グラスを枡に入れて溢れさせる「もっきり」スタイルまで。',
    href: '/sake',
    image: '/images/generated/mokkiri.jpg',
  },
  {
    title: 'ギフト・お祝い',
    desc: '「益す＝増す」の縁起物。結婚祝い、出産祝い、還暦祝いに名入れ枡を。ペア枡も人気です。',
    href: '/guide',
    image: '/images/generated/gift-masu.jpg',
  },
  {
    title: '企業ノベルティ',
    desc: '社名・ロゴを刻印した記念品。周年記念、顧客ギフト、展示会配布に。10個から対応。まとめ買いで割引あり。',
    href: '/business',
    image: '/images/generated/corporate-masu.jpg',
  },
  {
    title: '節分・鏡開き',
    desc: '節分の豆まきには五合枡、鏡開きの乾杯には一合枡。日本の行事に欠かせない存在です。',
    href: '/history',
    image: '/images/generated/setsubun-masu.jpg',
  },
  {
    title: 'インテリア',
    desc: 'ペン立て、小物入れ、プランターカバー。ヒノキの温もりが空間に和の趣を加えます。',
    href: '/products',
    image: '/images/generated/interior-masu.jpg',
  },
  {
    title: '海外ギフト',
    desc: '日本の伝統工芸品として外国の方に喜ばれます。名前をローマ字で刻印するサービスも。',
    href: '/guide',
    image: '/images/generated/wedding-masu.jpg',
  },
]

const features = [
  { title: '全7サイズ取り揃え', desc: '三勺枡（54ml）から一升枡（1800ml）まで、用途に合った枡が必ず見つかります。' },
  { title: '名入れ2種対応', desc: '焼印（伝統技法・味わいある焦げ茶の仕上がり）・レーザー刻印（写真・QRコード対応）。' },
  { title: '法人・大口注文対応', desc: '無垢枡10個から、オリジナル枡1個から注文可能。まとめ買いほどお得に。100個以上は数量割引をご案内。' },
  { title: '選べるお支払い方法', desc: 'クレジットカード・銀行振込に対応。法人のお客様には請求書払い（月末締め翌月末払い）もご用意しています。' },
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
                周年記念品・ノベルティ・OEMの名入れ枡
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
              企業ロゴ・社名を刻んだ記念品を、10個から10,000個超まで。
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
              {['10個〜10,000個超', '数量割引あり', 'サンプル製作可', '名入れは1個から'].map((item) => (
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
              { label: '対応数量', value: '10個〜10,000個超', note: '数量に応じた割引をご案内します' },
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

      {/* ===== 枡とは (AIO) ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
        <div
          data-speakable
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
            <p style={{ lineHeight: 2, color: 'var(--foreground)', marginBottom: '0.75rem' }}>
              枡（ます）とは、約1300年前から日本で使われてきた木製の計量器です。国産ヒノキで作られ、「益す（ますます繁栄する）」に通じる縁起物として、日本酒の酒器・ギフト・節分の豆まき・鏡開きなど幅広い用途で親しまれています。
            </p>
            <p style={{ lineHeight: 2, color: 'var(--foreground)' }}>
              漢字では「枡」「升」「桝」と表記されますが、いずれも同じものを指します。現在ではインテリアや企業ノベルティとしても人気があります。
            </p>
          </div>
        </div>
      </section>

      {/* ===== フォトギャラリー ===== */}
      <section style={{ padding: '0 1.5rem' }}>
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem',
          }}
          className="max-sm:!grid-cols-2"
        >
          {[
            { src: '/images/masu-front.jpg', alt: '国産ヒノキ枡 正面' },
            { src: '/images/masu-angle.jpg', alt: '国産ヒノキ枡 斜め' },
            { src: '/images/masu-top.jpg', alt: '国産ヒノキ枡 上から' },
          ].map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={400}
              height={400}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          ))}
        </div>
      </section>


      <Differentiators />

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
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              background: 'var(--color-subtle)',
              textDecoration: 'none',
              color: 'inherit',
              marginBottom: '2rem',
              overflow: 'hidden',
            }}
            className="max-md:!grid-cols-1"
          >
            <Image
              src={useCases[0].image}
              alt={useCases[0].title}
              width={500}
              height={400}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
              <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--color-muted)' }}>
                {useCases[0].desc}
              </p>
              <span style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-accent)' }}>
                詳しく見る →
              </span>
            </div>
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
                  textDecoration: 'none',
                  color: 'inherit',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={uc.image}
                  alt={uc.title}
                  width={400}
                  height={250}
                  style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '1.25rem 0' }}>
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 選び方ガイド ===== */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
        <div data-speakable style={{ maxWidth: 860, margin: '0 auto' }}>
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

      {/* ===== オーダーメイド ===== */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
          background: 'var(--color-subtle)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: 'var(--color-accent)',
              marginBottom: '1rem',
            }}
          >
            ORIGINAL
          </p>
          <h2 className="serif section-title" style={{ marginBottom: '1.5rem' }}>
            オリジナル枡を、一個から
          </h2>
          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: 2,
              color: 'var(--color-muted)',
              marginBottom: '2.5rem',
            }}
          >
            入れたい文章やメッセージを送るだけで、デザインはこちらでお作りします。
            名前、日付、手書きの文字、写真、外国語のメッセージ。
            贈り物にも、記念にも。1個からご相談いただけます。
          </p>
          <Link href="/original" className="btn-accent">
            オリジナル枡を見る
          </Link>
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
                10個から注文可能。全7サイズ対応。名入れ（焼印・レーザー刻印）にも対応。まとめ買いほどお得です。100個以上のご注文やお見積りはお問い合わせフォームからご相談ください。
              </p>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: 'var(--color-muted)', marginBottom: '2rem' }}>
                何を贈るか決まっていない段階なら{' '}
                <Link href="/order-made" style={{ textDecoration: 'underline' }}>
                  オーダーメイドの記念品
                </Link>
                、1個だけの一点ものをご希望の方は{' '}
                <Link href="/original" style={{ textDecoration: 'underline' }}>
                  オリジナル枡
                </Link>
                、企業ロゴ・社名を刻む場合は{' '}
                <Link href="/logo" style={{ textDecoration: 'underline' }}>
                  ロゴ入れ
                </Link>
                {' '}をご覧ください。頼み方・最小ロット・納期は{' '}
                <Link href="/order" style={{ textDecoration: 'underline' }}>
                  依頼方法のページ
                </Link>
                {' '}にまとめています。
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
