import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡ギフトガイド — お祝い・記念品にぴったりの枡の選び方',
  description:
    '枡（ます）は「益す＝増す」に通じる縁起物。結婚祝い、出産祝い、還暦祝い、企業記念品に最適な枡ギフトの選び方を、シーン別にご紹介します。名入れ対応、1個からOK。',
  keywords:
    '枡 ギフト,枡 プレゼント,枡 結婚祝い,枡 お祝い,枡 記念品,枡 引き出物,枡 出産祝い,枡 還暦祝い,枡 父の日,枡 母の日,枡 海外 ギフト,枡 企業 記念品,名入れ枡 ギフト,枡 贈り物,枡 お返し',
  alternates: { canonical: `${baseUrl}/gift`, languages: { ja: `${baseUrl}/gift`, en: `${baseUrl}/en/gifts` } },
}

const giftScenes = [
  {
    scene: '結婚祝い',
    recommend: 'ペア五勺枡',
    size: '五勺枡×2',
    engraving: '名前+日付',
    budget: '3,000〜5,000円',
    desc: '「ますます幸せに」の縁起を込めて。夫婦の名前と挙式日を刻印したペア枡は、世界にひとつだけの特別な贈り物。実用性もあり、記念日に日本酒を酌み交わす楽しみも。',
  },
  {
    scene: '出産祝い',
    recommend: '名入れ一合枡',
    size: '一合枡',
    engraving: '赤ちゃんの名前',
    budget: '2,000〜3,000円',
    desc: '赤ちゃんの名前と生年月日を刻んだ一合枡。成長の記念品として長く飾れます。お食い初めや初節句のお祝いの席で、ご両親の乾杯用にも。',
  },
  {
    scene: '還暦祝い',
    recommend: '名入れ一合枡',
    size: '一合枡',
    engraving: '名前+メッセージ',
    budget: '2,000〜4,000円',
    desc: '「ますますお元気で」の思いを込めて。名前と感謝のメッセージを刻印した一合枡は、日本酒好きなお父さん・お母さんへの贈り物にぴったり。',
  },
  {
    scene: '父の日・母の日',
    recommend: '一合枡',
    size: '一合枡',
    engraving: 'メッセージ',
    budget: '1,500〜3,000円',
    desc: '「いつもありがとう」の一言を枡に刻んで。ヒノキの香りに包まれながら晩酌を楽しむ、そんな特別な時間を贈りましょう。',
  },
  {
    scene: '海外の方へ',
    recommend: '名入れ一合枡',
    size: '一合枡',
    engraving: 'ローマ字名',
    budget: '2,000〜3,000円',
    desc: '日本の伝統工芸品として外国の方に大変喜ばれます。名前をローマ字で刻印するサービスも。軽くてかさばらず、お土産としても持ち帰りやすいのが魅力です。',
  },
  {
    scene: '企業記念品',
    recommend: 'ロゴ入り一合枡',
    size: '一合枡',
    engraving: '社名+ロゴ',
    budget: '1,000〜2,000円/個',
    desc: '周年記念、顧客感謝ギフト、展示会配布に。社名やロゴを焼印・レーザーで刻印。10個から注文可能。まとめ買いほどお得。日本の伝統工芸品だからこそ企業の品格を高めます。',
  },
  {
    scene: '引き出物',
    recommend: '名入れ五勺枡',
    size: '五勺枡',
    engraving: '両家名+日付',
    budget: '1,500〜2,500円',
    desc: '結婚式の引き出物に。コンパクトな五勺枡に両家の名前と挙式日を刻印。ゲストへの感謝と「ますますの幸せ」を伝える、縁起の良い引き出物です。',
  },
]

const giftReasons = [
  {
    title: '「益す」の縁起',
    desc: '枡（ます）は「益す」＝「増す」に通じ、「ますます繁栄する」「ますます幸せに」という意味を持つ縁起物です。古来より祝いの席で日本酒を枡で飲む習慣があるのも、この縁起担ぎに由来します。結婚祝い、開店祝い、昇進祝いなど、あらゆるお祝いのシーンにふさわしい贈り物です。',
  },
  {
    title: 'ヒノキの香り',
    desc: '国産ヒノキ（檜）の清々しい香りは、受け取った瞬間から心地よい印象を与えます。ヒノキに含まれるフィトンチッドには天然の抗菌・リラックス効果があり、実用品としてだけでなく、香りそのものがギフトの価値を高めます。',
  },
  {
    title: '実用性の高さ',
    desc: '枡は日本酒の酒器としてはもちろん、小物入れ、ペン立て、アクセサリー入れ、プランターカバーなど、日常のさまざまなシーンで活用できます。「飾って終わり」にならない実用的なギフトだからこそ、贈った後も長く使ってもらえます。',
  },
  {
    title: '名入れでオンリーワン',
    desc: '焼印・レーザー刻印の2つの方法で、名前・日付・メッセージ・ロゴなどを刻印できます。名入れをすることで世界にひとつだけの特別なギフトに仕上がります。手書きのイラストやオリジナルデザインにも対応可能です。',
  },
  {
    title: '日本の伝統工芸品としての価値',
    desc: '枡は約1300年の歴史を持つ日本の伝統工芸品。岐阜県大垣市の職人が一つひとつ丁寧に仕上げています。大量生産の工業製品にはない「手仕事の温もり」が、ギフトとしての特別感を演出します。海外の方への贈り物としても日本文化を伝える逸品です。',
  },
]

const giftFaqItems = [
  {
    q: '枡ギフトは何個から注文できますか？',
    a: '名入れ枡・FOMUSオリジナル枡は1個からご注文いただけます。結婚祝いのペア枡（2個セット）やご家族分のセットなど、少量でもお気軽にご相談ください。企業記念品など大口注文は10個から対応しており、まとめ買いほどお得な価格でご案内可能です。',
  },
  {
    q: '名入れの納期はどのくらいですか？',
    a: '名入れ枡は通常2〜3週間程度で製作・発送いたします。結婚式の引き出物など大口注文の場合は3〜4週間程度を目安としています。お急ぎの場合も可能な限り対応いたしますので、お気軽にご相談ください。',
  },
  {
    q: '枡ギフトに熨斗（のし）は付けられますか？',
    a: 'はい、ご要望に応じて熨斗やギフト包装に対応しております。「御結婚御祝」「御出産御祝」「御祝」「御礼」など、用途に合わせた表書きをお選びいただけます。詳しくはお問い合わせ時にお申し付けください。',
  },
  {
    q: '名入れのデザインはどうやって決めますか？',
    a: 'お名前・日付・メッセージなどご希望の内容をお伝えいただければ、当店でレイアウトをご提案いたします。手書きのイラストやオリジナルデザインのデータ入稿にも対応しています。デザイン確定後に製作を開始しますので、仕上がりイメージを事前にご確認いただけます。',
  },
  {
    q: '枡はどんなお祝いのシーンに使えますか？',
    a: '結婚祝い、出産祝い、還暦祝い、退職祝い、新築祝い、開店祝い、父の日・母の日、敬老の日、海外の方へのお土産、企業の周年記念品、引き出物など、幅広いシーンでご利用いただいています。「益す＝増す」の縁起を持つ枡は、あらゆるお祝いにふさわしい贈り物です。',
  },
  {
    q: '枡ギフトの予算はどのくらいですか？',
    a: '名入れ枡1個あたりの目安は、五勺枡で1,500〜2,500円、一合枡で2,000〜3,000円程度です（名入れ加工費込み）。ペア枡セットは3,000〜5,000円程度。企業記念品など大口注文の場合は数量に応じた価格でご案内いたします。',
  },
]

export default function GiftPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '枡ギフトガイド', href: `${baseUrl}/gift` },
        ]}
      />
      <FAQJsonLd
        items={giftFaqItems.map((item) => ({ q: item.q, a: item.a }))}
      />
      <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: 'ギフトガイド' }]} />

      {/* ===== HERO ===== */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="section-title mb-6">枡ギフトガイド</h1>
          <p style={{ color: 'var(--color-muted)' }} className="text-sm leading-relaxed">
            お祝い・記念品にぴったりの枡の選び方を、シーン別にご紹介します
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pt-12">
        <div
          data-speakable
          className="rounded-sm p-6"
          style={{ background: 'var(--color-accent-light)', borderLeft: '4px solid var(--color-accent)' }}
        >
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-accent)' }}>ひとことで言うと</p>
          <p className="text-sm leading-[2]">
            枡は「益す（ますます繁栄する）」に通じる縁起物。結婚祝い・父の日・記念日など、どんなシーンにも喜ばれる日本の伝統ギフトです。名入れで世界に一つだけの贈り物にできます。
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-8">
        <Image
          src="/images/generated/gift-masu.jpg"
          alt="名入れ枡のギフト"
          width={800}
          height={500}
          style={{ width: '100%', height: 'auto' }}
          className="rounded-sm"
        />
      </div>

      {/* ===== QUICK ANSWER (AIO) ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="p-8 rounded-sm"
            style={{ background: 'var(--color-accent-light)', borderLeft: '4px solid var(--color-accent)' }}
          >
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
              まず結論
            </p>
            <p className="text-sm leading-relaxed">
              枡がギフトに選ばれる理由は「益す（ますます繁栄する）」に通じる縁起物だからです。結婚祝いには名入れ五勺枡ペア、企業記念品には名入れ一合枡がおすすめです。
            </p>
          </div>
        </div>
      </section>

      {/* ===== なぜ枡がギフトに最適なのか ===== */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="serif section-title mb-12">
            なぜ枡がギフトに最適なのか — 5つの理由
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {giftReasons.map((reason, i) => (
              <div
                key={reason.title}
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  background: 'var(--background)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'var(--color-accent)',
                      letterSpacing: '0.05em',
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="serif"
                    style={{
                      fontWeight: 500,
                      fontSize: '1.1rem',
                    }}
                  >
                    {reason.title}
                  </h3>
                </div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--color-muted)', paddingLeft: '2.25rem' }}>
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== シーン別おすすめ枡ギフト ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="serif section-title mb-12">
            シーン別おすすめ枡ギフト
          </h2>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto mb-8">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  {['シーン', 'おすすめ', 'サイズ', '名入れ', '予算目安'].map((h) => (
                    <th
                      key={h}
                      className="text-left py-4 px-4 font-medium"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {giftScenes.map((item) => (
                  <tr key={item.scene} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-4 px-4 font-medium whitespace-nowrap">{item.scene}</td>
                    <td className="py-4 px-4" style={{ color: 'var(--color-accent)' }}>
                      {item.recommend}
                    </td>
                    <td className="py-4 px-4">{item.size}</td>
                    <td className="py-4 px-4">{item.engraving}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{item.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4 mb-8">
            {giftScenes.map((item) => (
              <div
                key={item.scene}
                className="p-5 rounded-sm"
                style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
              >
                <p className="font-medium mb-2">{item.scene}</p>
                <p className="text-sm mb-1" style={{ color: 'var(--color-accent)' }}>
                  {item.recommend}（{item.size}）
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span style={{ color: 'var(--color-muted)' }}>名入れ：</span>
                    {item.engraving}
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-muted)' }}>予算：</span>
                    {item.budget}
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <Image
              src="/images/generated/wedding-masu.jpg"
              alt="結婚祝いのペア枡"
              width={800}
              height={500}
              style={{ width: '100%', height: 'auto' }}
              className="rounded-sm"
            />
          </div>

          {/* Scene detail cards (desktop) */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {giftScenes.map((item) => (
              <div
                key={item.scene}
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <h3
                    className="serif"
                    style={{
                      fontWeight: 500,
                      fontSize: '1.05rem',
                    }}
                  >
                    {item.scene}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{item.budget}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
                  {item.recommend}（{item.size}）— {item.engraving}
                </p>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'var(--color-muted)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== 名入れ方法の選び方 ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="serif section-title mb-12">
            名入れ方法の選び方
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
            枡の名入れには2つの方法があり、それぞれ仕上がりや特徴が異なります。ギフトの用途に合わせてお選びください。
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div
              className="p-6 rounded-sm"
              style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
                焼印（やきいん）
              </p>
              <p className="text-sm font-medium mb-2">伝統的な味わい</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                約400度の銅版を木に押し付ける伝統技法。焦げ茶色の温かみある仕上がりで、和の雰囲気を大切にしたいギフトにおすすめ。大量生産にも向いています。
              </p>
            </div>
            <div
              className="p-6 rounded-sm"
              style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
                レーザー刻印
              </p>
              <p className="text-sm font-medium mb-2">繊細で高精度</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                細密なデザインや写真、QRコードも再現可能。濃淡表現ができるため、似顔絵やイラストを刻みたいギフトに最適。少量〜中量向き。
              </p>
            </div>
          </div>
          <Link href="/guide" className="btn-outline">
            選び方ガイドで詳しく見る
          </Link>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="serif section-title mb-12">
            枡ギフトに関するよくある質問
          </h2>
          <div className="space-y-0">
            {giftFaqItems.map((item, i) => (
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

      {/* ===== CTA ===== */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="serif section-title mb-6">
            枡ギフトのご相談はお気軽に
          </h2>
          <p className="text-sm mb-10 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            名入れ内容のご相談、デザインのご提案、お見積りなど、お気軽にお問い合わせください。1個からオーダー可能です。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/custom" className="btn-accent">
              ギフトの相談をする
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
