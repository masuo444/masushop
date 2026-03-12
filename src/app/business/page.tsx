import type { Metadata } from 'next'
import Link from 'next/link'
import { masuSizes } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '法人のお客様 — 枡のノベルティ・記念品・OEM | 大口注文対応',
  description:
    '法人向け枡のノベルティ・記念品・OEM製作。企業ロゴ・社名の名入れ対応。全7サイズの国産ヒノキ枡に焼印・レーザー・シルクプリント加工。1個からのサンプル、100個以上の大口注文に対応。',
  keywords:
    '枡 ノベルティ,枡 OEM,枡 企業ギフト,枡 記念品 法人,枡 卸,枡 名入れ 法人,枡 周年記念,枡 株主優待',
  alternates: { canonical: `${baseUrl}/business` },
}

const businessFaq = [
  {
    q: '最小注文数はいくつですか？',
    a: '無垢の枡は10個から、FOMUSオリジナル枡・名入れ枡は1個からご注文いただけます。まとめ買いほどお得です。',
  },
  {
    q: '納期はどのくらいですか？',
    a: '名入れ枡は通常2〜3週間程度です。大口注文（100個以上）の場合は3〜4週間程度を目安としています。お急ぎの場合はご相談ください。',
  },
  {
    q: '見積りは無料ですか？',
    a: 'はい、お見積りは無料です。数量・サイズ・加工方法をお伝えいただければ、お見積りをお出しします。',
  },
  {
    q: 'サンプル作成は可能ですか？',
    a: 'はい、可能です。サンプル作成は有料となりますが、量産前に仕上がりをご確認いただけます。',
  },
  {
    q: '領収書・請求書は発行できますか？',
    a: 'はい、対応しています。法人のお客様には請求書払い（月末締め翌月末払い）もご相談いただけます。',
  },
  {
    q: '海外発送は対応していますか？',
    a: 'はい、海外発送にも対応しています。アジア・北米・ヨーロッパなど世界各地への発送実績がございます。',
  },
]

const orderSteps = [
  { step: 1, title: 'お問い合わせ', desc: '枡のサイズ・数量・加工方法・ご希望納期をお伝えください。' },
  { step: 2, title: 'デザイン確認', desc: 'ロゴデータやデザインを元にレイアウトをご提案します。' },
  { step: 3, title: 'サンプル作成', desc: 'ご希望に応じてサンプルを製作。仕上がりをご確認いただけます。' },
  { step: 4, title: '量産', desc: 'サンプル確認後、量産に入ります。国産ヒノキで一つずつ丁寧に製作。' },
  { step: 5, title: '検品・出荷', desc: '一つひとつ検品し、丁寧に梱包してお届けします。' },
]

const useCases = [
  {
    title: '周年記念品',
    desc: '10周年、50周年など節目のお祝いに。「益々繁栄」の縁起物として喜ばれます。',
  },
  {
    title: '株主優待・株主総会の記念品',
    desc: '株主様への感謝を込めた特別な記念品に。企業ロゴ入りで特別感を演出。',
  },
  {
    title: '展示会・イベントのノベルティ',
    desc: 'ブースへの集客効果抜群。実用的で印象に残るノベルティとして。',
  },
  {
    title: '顧客向けギフト',
    desc: '年末年始のご挨拶、お中元・お歳暮に。日本の伝統工芸品で感謝を伝えます。',
  },
  {
    title: '社員への記念品',
    desc: '入社式、永年勤続表彰、退職記念に。名前・日付入りで特別な一品に。',
  },
  {
    title: '飲食店のオリジナル酒器',
    desc: '店名入りの枡で日本酒を提供。お客様の記憶に残るおもてなしを。',
  },
  {
    title: '結婚式場の引き出物',
    desc: '式場提携のオリジナル引き出物として。新郎新婦の名前・挙式日を刻印。',
  },
  {
    title: 'インバウンド向け日本土産',
    desc: 'ホテル・観光施設のオリジナル土産品に。日本の伝統を感じられる特別なお土産。',
  },
]

export default function BusinessPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '法人のお客様', href: `${baseUrl}/business` },
        ]}
      />
      <FAQJsonLd
        items={businessFaq.map((item) => ({
          q: item.q,
          a: item.a,
        }))}
      />

      {/* Hero */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-accent)', color: '#fff' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ opacity: 0.7 }}
          >
            For Business
          </p>
          <h1
            className="text-3xl md:text-4xl font-light mb-6"
            style={{ lineHeight: 1.4 }}
          >
            法人のお客様へ
            <br />
            枡のノベルティ・記念品
          </h1>
          <p className="text-sm leading-relaxed" style={{ opacity: 0.85 }}>
            1個サンプルから10,000個以上の大口注文まで。
            <br className="hidden md:block" />
            企業ロゴ・社名の名入れ対応。
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="p-8 rounded-sm"
            style={{
              background: 'var(--color-accent-light)',
              borderLeft: '4px solid var(--color-accent)',
            }}
          >
            <p className="text-sm leading-relaxed">
              当店では法人向け枡のノベルティ・記念品・OEMを承っています。全7サイズの国産ヒノキ枡に焼印・レーザー・シルクプリントで企業ロゴを入れることが可能。1個からのサンプル作成、100個以上の大口注文に対応。
            </p>
          </div>
        </div>
      </section>

      {/* 用途別ご提案 */}
      <section
        id="novelty"
        className="py-16 md:py-20"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-title mb-12">用途別ご提案</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="p-6 rounded-sm"
                style={{
                  background: 'var(--background)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3 className="text-sm font-medium mb-3">{uc.title}</h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {uc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 名入れ加工3種の詳細比較 */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-title mb-12">名入れ加工3種の詳細比較</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 焼印 */}
            <div
              className="p-6 rounded-sm"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <h3 className="text-lg font-medium mb-4">焼印</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    特徴
                  </p>
                  <p>約400度の銅版を木に押し付ける伝統技法。味わい深い焦げ茶色の仕上がり。</p>
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    仕上がり
                  </p>
                  <p>白黒（焦げ茶色）のみ。温かみのある自然な印字。</p>
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    最小ロット
                  </p>
                  <p>1個〜（版代別途）</p>
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    向いている用途
                  </p>
                  <p>大量ノベルティ、企業ロゴ、社名印字、シンプルなデザイン</p>
                </div>
              </div>
            </div>

            {/* レーザー */}
            <div
              className="p-6 rounded-sm"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <h3 className="text-lg font-medium mb-4">レーザー刻印</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    特徴
                  </p>
                  <p>レーザーで木を彫刻。濃淡表現・写真再現が可能な高精度加工。</p>
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    仕上がり
                  </p>
                  <p>白黒の繊細な彫刻。グラデーションや写真も表現可能。</p>
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    最小ロット
                  </p>
                  <p>1個〜（版代不要）</p>
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    向いている用途
                  </p>
                  <p>細かいデザイン、写真入り、QRコード、個別名入れ</p>
                </div>
              </div>
            </div>

            {/* シルクプリント */}
            <div
              className="p-6 rounded-sm"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <h3 className="text-lg font-medium mb-4">シルクプリント</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    特徴
                  </p>
                  <p>唯一フルカラーに対応。鮮やかなインクで木肌にプリント。</p>
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    仕上がり
                  </p>
                  <p>フルカラー対応。企業カラーやカラフルなロゴを忠実に再現。</p>
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    最小ロット
                  </p>
                  <p>1個〜（版代別途）</p>
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    向いている用途
                  </p>
                  <p>カラーロゴ、ブランドカラー再現、イラスト入り記念品</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OEM・大口注文 */}
      <section
        id="oem"
        className="py-16 md:py-20"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-12">OEM・大口注文</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="p-6 rounded-sm"
              style={{
                background: 'var(--background)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p className="text-2xl font-light mb-2">10個〜</p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                無垢枡の最小注文数。まとめ買いほどお得に。
              </p>
            </div>
            <div
              className="p-6 rounded-sm"
              style={{
                background: 'var(--background)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p className="text-2xl font-light mb-2">100個以上</p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                数量割引あり。まとまった数量でお得にご注文いただけます。
              </p>
            </div>
            <div
              className="p-6 rounded-sm"
              style={{
                background: 'var(--background)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p className="text-2xl font-light mb-2">500個以上</p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                個別見積りで柔軟に対応。大規模イベントやキャンペーンに。
              </p>
            </div>
            <div
              className="p-6 rounded-sm"
              style={{
                background: 'var(--background)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p className="text-2xl font-light mb-2">特注サイズ</p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                変形枡・特注サイズのご相談も承ります。お気軽にお問い合わせください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ご注文の流れ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-12">ご注文の流れ</h2>
          <div className="space-y-0">
            {orderSteps.map((s, i) => (
              <div
                key={s.step}
                className="flex gap-6 pb-8"
                style={{
                  borderLeft: i < orderSteps.length - 1 ? '1px solid var(--color-border)' : 'none',
                  marginLeft: '15px',
                  paddingLeft: '24px',
                  position: 'relative',
                }}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium shrink-0"
                  style={{
                    background: 'var(--color-accent)',
                    color: '#fff',
                    position: 'absolute',
                    left: '-16px',
                    top: 0,
                  }}
                >
                  {s.step}
                </div>
                <div>
                  <p className="font-medium mb-1">{s.title}</p>
                  <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JPYC決済対応 */}
      <section
        className="py-16 md:py-20"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-6">JPYC（暗号資産）決済対応</h2>
          <div
            className="p-8 rounded-sm"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              法人のお客様にはJPYC（日本円ステーブルコイン / Polygon）決済もご利用いただけます。
              クレジットカード決済手数料を抑えた決済が可能です。大口注文との組み合わせで、
              よりお得にご注文いただけます。詳しくはお問い合わせください。
            </p>
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-12">よくある質問（法人向け）</h2>
          <div className="space-y-0">
            {businessFaq.map((item, i) => (
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

      {/* Big CTA */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-accent)', color: '#fff' }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-2xl md:text-3xl font-light mb-4"
            style={{ lineHeight: 1.4 }}
          >
            お見積り無料相談
          </h2>
          <p className="text-sm mb-10 leading-relaxed" style={{ opacity: 0.85 }}>
            枡のサイズ・数量・加工方法など、どんなご相談でもお気軽にお問い合わせください。
            <br className="hidden md:block" />
            専門スタッフが最適なプランをご提案いたします。
          </p>
          <Link
            href="/custom"
            className="inline-block px-10 py-4 text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
            style={{ background: '#fff', color: 'var(--color-accent)' }}
          >
            お見積り・ご相談はこちら
          </Link>
        </div>
      </section>
    </>
  )
}
