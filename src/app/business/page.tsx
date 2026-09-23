import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'
import QuickQuote from '@/components/forms/QuickQuote'
import OrderFlow from '@/components/ui/OrderFlow'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '法人のお客様 — 枡のノベルティ・記念品 | 大口注文・数量割引対応',
  description:
    '法人向け枡のノベルティ・記念品の製作。企業ロゴ・社名の名入れ対応。全7サイズの国産ヒノキ枡に焼印・レーザー刻印加工。ロゴや文章を送るだけでデザインはお任せ。ご注文前に見積りと仕上がりイメージを無料でお送りします。10個から数量割引・請求書払い対応。納期2〜4週間。',
  keywords:
    '枡 ノベルティ,枡 自社ブランド,枡 企業ギフト,枡 記念品 法人,枡 卸,枡 名入れ 法人,枡 周年記念,枡 株主優待,枡 大口注文,枡 数量割引,枡 請求書払い',
  alternates: { canonical: `${baseUrl}/business`, languages: { ja: `${baseUrl}/business`, en: `${baseUrl}/en/corporate` } },
  openGraph: {
    title: '法人のお客様 — 枡のノベルティ・記念品',
    description: '法人向け枡のノベルティ・記念品の製作。企業ロゴ・社名の名入れ対応。ご注文前に見積りと仕上がりイメージを無料でお送りします。10個から数量割引・請求書払い対応。',
    type: 'website',
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

// ── 数量別単価テーブル（税別） ──

// ── 納期 ──
const deliveryTimelines = [
  { type: '無地枡（名入れなし）', lead: '約2週間', note: '在庫状況により短縮可能な場合あり' },
  { type: '焼印入り枡', lead: '約3週間', note: '初回は版の製作に+3〜5営業日' },
  { type: 'レーザー刻印入り枡', lead: '約3週間', note: 'データ確認後の着手' },
  { type: '大口注文（300個以上）', lead: '約4週間', note: '数量・時期により変動。要ご相談' },
]

// ── 導入事例 ──
const caseStudies = [
  {
    company: '法人のお客様',
    person: 'N.様',
    product: '一合枡（焼印入り）× 100個',
    purpose: '創業30周年の記念品',
    quote:
      '焼印の仕上がりが非常に美しく、取引先に配ったところ大変好評でした。納期も相談に乗っていただき、スムーズに準備できました。',
    result: '取引先との関係強化に貢献。翌年の周年イベントでもリピート注文。',
    rating: 5,
  },
  {
    company: '法人のお客様',
    person: 'W.様',
    product: '一合枡（レーザー刻印）× 200個',
    purpose: '展示会の来場者向けノベルティ',
    quote:
      '木製品は珍しいので足を止めてくれる方が多く、ブースの集客にも貢献してくれました。QRコードもレーザーできれいに刻印できました。',
    result: 'ブース来場者数が前年比130%に。名刺交換数も大幅増加。',
    rating: 4,
  },
  {
    company: '地域団体のお客様',
    person: 'K.様',
    product: '一合枡（レーザー刻印）× 50個',
    purpose: '地域イベントの記念品',
    quote:
      '地域の祭りで振る舞い酒用として注文しました。ロゴをレーザー刻印で入れていただき、参加者にそのまま記念品としてお持ち帰りいただきました。',
    result: '参加者満足度が大幅向上。SNSでの投稿も多数。',
    rating: 5,
  },
]

// ── 選ばれる理由 ──
// 相見積もりの場面で、購買担当が社内を通すために必要になる確認事項。
// 自社の宣伝ではなく「発注前に確認すべきこと」として並べ、当店の回答を添える。
const preOrderChecks = [
  {
    q: '版代はかかりますか？',
    a: '焼印は初回に専用の銅版を製作します。レーザー刻印は版が不要なので、版代はかかりません。同じロゴを大量に入れるか、少量かで適した方をご提案します。',
  },
  {
    q: 'ロゴやデザインのデータが必要ですか？',
    a: '不要です。ロゴが載っている名刺・封筒・看板の写真をお送りいただければ、こちらでデータを起こします。入れたい文章だけの状態からでもレイアウトを組み、ご注文前にお見積りと一緒に仕上がりイメージを無料でお送りします。',
  },
  {
    q: '発注前に仕上がりを確認できますか？',
    a: 'はい。ご注文を決める前に、お見積りと一緒に仕上がりイメージ（レイアウト画像）を無料でお送りします。刻印の位置や大きさをイメージで確認してからご注文を判断いただけるので、社内で回覧してから決めることもできます。',
  },
  {
    q: '1個ずつ違う内容を刻めますか？',
    a: 'レーザー刻印なら可能です。受賞者名を1個ずつ変える社内表彰や、部署ごとに名入れを変える記念品にも、追加の版を作らずに対応できます。',
  },
  {
    q: '産地はどこですか？',
    a: '国産ヒノキ（檜）を使い、日本国内で製作しています。建築材の端材を活用しており、原材料から加工まで国内で完結します。',
  },
  {
    q: '納期はどのくらい見ておけばいいですか？',
    a: '無地枡は約2週間、焼印・レーザー刻印を入れる場合は約3週間、300個以上の大口注文は約4週間が目安です。デザイン確認にかかる期間で前後します。',
  },
  {
    q: '支払い方法は何が使えますか？',
    a: 'クレジットカードと銀行振込に対応しています。法人のお客様には請求書払い（月末締め翌月末払い）もご相談いただけます。お見積りの際にご希望のお支払い方法をお知らせください。',
  },
  {
    q: '海外の拠点へ送れますか？',
    a: '対応しています。アジア・北米・ヨーロッパへの発送実績があります。英語などのメッセージを刻印しての発送も可能です。',
  },
]

// ── 用途別提案 ──
const useCases = [
  {
    title: '周年記念品',
    desc: '10周年、50周年など節目のお祝いに。「益々繁栄」の縁起物として喜ばれます。',
    sizes: '一合枡が人気',
  },
  {
    title: '株主優待・株主総会',
    desc: '株主様への感謝を込めた特別な記念品に。企業ロゴ入りで特別感を演出。',
    sizes: '五勺枡・一合枡',
  },
  {
    title: '展示会・イベントのノベルティ',
    desc: 'ブースへの集客効果抜群。実用的で印象に残るノベルティとして。',
    sizes: '三勺枡・一合枡',
  },
  {
    title: '顧客向けギフト',
    desc: '年末年始のご挨拶、お中元・お歳暮に。日本の伝統工芸品で感謝を伝えます。',
    sizes: '一合枡 + コーティング',
  },
  {
    title: '社員への記念品',
    desc: '入社式、永年勤続表彰、退職記念に。名前・日付入りで特別な一品に。',
    sizes: '一合枡 + 名入れ',
  },
  {
    title: '飲食店のオリジナル酒器',
    desc: '店名入りの枡で日本酒を提供。お客様の記憶に残るおもてなしを。',
    sizes: '八勺枡・一合枡',
  },
  {
    title: '結婚式場の引き出物',
    desc: '式場提携のオリジナル引き出物として。新郎新婦の名前・挙式日を刻印。',
    sizes: '五勺枡・一合枡',
  },
  {
    title: 'インバウンド向け日本土産',
    desc: 'ホテル・観光施設のオリジナル土産品に。日本の伝統を感じられるお土産。',
    sizes: '三勺枡・一合枡',
  },
]

// ── FAQ ──
const businessFaq = [
  {
    q: '最小注文数はいくつですか？',
    a: '無垢の枡は10個から、名入れのオリジナル枡は1個からご相談いただけます。まとめ買いほどお得です。',
  },
  {
    q: '納期はどのくらいですか？',
    a: '無地枡は約2週間、名入れ枡は約3週間、300個以上の大口注文は約4週間が目安です。お急ぎの場合もご相談ください。',
  },
  {
    q: '注文前に仕上がりを確認できますか？',
    a: 'はい。ご注文を決める前に、お見積りと一緒に仕上がりイメージ（レイアウト画像）を無料でお送りします。イメージを見てからご注文を判断いただけます。',
  },
  {
    q: '見積りは無料ですか？',
    a: 'はい、お見積りは無料です。数量・サイズ・加工方法をお伝えいただければ、即日〜翌営業日にお見積りをお出しします。',
  },
  {
    q: 'デザインデータがなくても注文できますか？',
    a: 'はい、手書きのラフやイメージ写真からデータを作成することも可能です。入れたい文章だけでもレイアウトを組み、仕上がりイメージをお送りします。お気軽にご相談ください。',
  },
  {
    q: '領収書・請求書は発行できますか？',
    a: 'はい、対応しています。法人のお客様には請求書払い（月末締め翌月末払い）もご相談いただけます。',
  },
  {
    q: '個別包装や熨斗は対応していますか？',
    a: 'はい、個別包装・熨斗（のし）・手提げ袋の同梱に対応しています。ギフト用途の場合はお申し付けください。',
  },
  {
    q: '海外発送は対応していますか？',
    a: 'はい、海外発送にも対応しています。アジア・北米・ヨーロッパなど世界各地への発送実績がございます。',
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
      <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '法人のお客様' }]} />

      {/* ━━━ Hero ━━━ */}
      <section
        className="py-24 md:py-32 text-center"
        style={{ background: 'var(--color-accent)', color: '#fff' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-8"
            style={{ opacity: 0.6 }}
          >
            For Business
          </p>
          <h1
            className="text-3xl md:text-[2.5rem] font-light mb-6"
            style={{ lineHeight: 1.5 }}
          >
            ロゴと文章を送るだけ。
            <br className="hidden md:block" />
            名入れ枡をまるごとお任せ。
          </h1>
          <p className="text-sm leading-[2] mb-3" style={{ opacity: 0.9 }}>
            国産ヒノキの枡に、企業ロゴや社名を刻印。デザインから仕上がり確認までこちらで進めます。
            <br className="hidden md:block" />
            ご注文前に、お見積りと仕上がりイメージを無料でお送りします。
          </p>
          <p className="text-[13px] mb-10" style={{ opacity: 0.8 }}>
            10個から・数量割引あり・請求書払い（月末締め翌月末払い）可
          </p>
          <p className="text-[13px] mb-8" style={{ opacity: 0.75 }}>
            <Link href="/logo" className="underline underline-offset-4">
              ロゴ入れの詳細
            </Link>
            {' ／ '}
            <Link href="/products/engraving" className="underline underline-offset-4">
              焼印とレーザーの比較
            </Link>
            {' ／ '}
            <Link href="/coating" className="underline underline-offset-4">
              コーティング
            </Link>
            {' ／ '}
            <Link href="/original" className="underline underline-offset-4">
              1個からの記念品
            </Link>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="#quote"
              className="inline-block px-8 py-4 text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ background: '#fff', color: 'var(--color-accent)' }}
            >
              無料で見積りを依頼
            </Link>
            <a
              href="#flow"
              className="inline-block px-8 py-4 text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#fff' }}
            >
              ご依頼の流れを見る
            </a>
          </div>
        </div>
      </section>

      {/* ━━━ 数字で見る実績 ━━━ */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '70年+', label: '枡づくりの実績' },
              { num: '全7サイズ', label: '国産ヒノキ枡' },
              { num: '10個〜', label: '小ロット対応' },
              { num: '2週間〜', label: '最短納期' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-light mb-1" style={{ color: 'var(--color-accent)' }}>
                  {stat.num}
                </p>
                <p className="text-[11px]" style={{ color: 'var(--color-muted)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 発注前チェックリスト ━━━ */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-center mb-4" style={{ color: 'var(--color-accent)' }}>
            BEFORE YOU ORDER
          </p>
          <h2 className="section-title text-center mb-4">発注前に確認しておきたい8項目</h2>
          <p className="lead text-center mb-12">
            記念品やノベルティは、社内で稟議を通す段階で必ず聞かれる点が決まっています。
            相見積もりのときにそのまま比較できるよう、当店の条件を並べました。
          </p>

          <div className="space-y-6">
            {preOrderChecks.map((item) => (
              <div key={item.q} className="pb-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <h3 className="text-sm font-medium mb-3">{item.q}</h3>
                <p className="text-sm leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="#quote" className="btn-accent">
              条件を伝えて見積りを依頼する
            </Link>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-5xl" />

      {/* ━━━ 導入事例 ━━━ */}
      <section
        id="cases"
        className="py-20 md:py-28"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-center mb-4" style={{ color: 'var(--color-accent)' }}>
            Case Studies
          </p>
          <h2 className="section-title text-center mb-16">導入事例</h2>

          <div className="space-y-8">
            {caseStudies.map((cs, i) => (
              <div
                key={i}
                className="rounded-sm overflow-hidden"
                style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
              >
                <div className="p-8 md:p-10">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
                    <div>
                      <p className="text-xs mb-1" style={{ color: 'var(--color-accent)' }}>
                        {cs.purpose}
                      </p>
                      <h3 className="text-base font-medium">{cs.company}</h3>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      {cs.product}
                    </p>
                  </div>

                  {/* Quote */}
                  <div
                    className="rounded-sm p-6 mb-6"
                    style={{ background: 'var(--color-subtle)', borderLeft: '3px solid var(--color-accent)' }}
                  >
                    <p className="text-sm leading-[2] italic" style={{ color: 'var(--foreground)' }}>
                      &ldquo;{cs.quote}&rdquo;
                    </p>
                    <p className="text-xs mt-3" style={{ color: 'var(--color-muted)' }}>
                      — {cs.person}
                    </p>
                  </div>

                  {/* Result */}
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-medium shrink-0 mt-[1px]" style={{ color: 'var(--color-accent)' }}>
                      成果：
                    </span>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground)' }}>
                      {cs.result}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-center mt-8" style={{ color: 'var(--color-muted)' }}>
            他のお客様の声は{' '}
            <Link href="/reviews" className="underline" style={{ color: 'var(--color-accent)' }}>
              レビューページ
            </Link>{' '}
            でもご覧いただけます。
          </p>
        </div>
      </section>

      {/* ━━━ 用途別提案 ━━━ */}
      <section id="novelty" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-center mb-4" style={{ color: 'var(--color-accent)' }}>
            Use Cases
          </p>
          <h2 className="section-title text-center mb-16">用途別ご提案</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="p-6 rounded-sm"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <h3 className="text-sm font-medium mb-2">{uc.title}</h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--color-muted)' }}>
                  {uc.desc}
                </p>
                <p className="text-[10px] font-medium" style={{ color: 'var(--color-accent)' }}>
                  {uc.sizes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-5xl" />

      {/* ━━━ 納期 ━━━ */}
      <section
        className="py-20 md:py-28"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-center mb-4" style={{ color: 'var(--color-accent)' }}>
            Delivery
          </p>
          <h2 className="section-title text-center mb-12">納期の目安</h2>

          <div className="space-y-4">
            {deliveryTimelines.map((d) => (
              <div
                key={d.type}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 p-5 rounded-sm"
                style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
              >
                <span className="text-sm font-medium sm:w-1/3">{d.type}</span>
                <span
                  className="text-lg font-light sm:w-1/4 sm:text-center"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {d.lead}
                </span>
                <span className="text-xs sm:w-5/12 sm:text-right" style={{ color: 'var(--color-muted)' }}>
                  {d.note}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-center mt-6 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            お急ぎの場合も可能な限り対応いたします。まずはお問い合わせください。
          </p>
        </div>
      </section>

      {/* ━━━ 注文前に仕上がりイメージ ━━━ */}
      <section id="mockup" className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
            Before You Order
          </p>
          <h2 className="section-title mb-6">ご注文前に、仕上がりイメージを無料でお送りします</h2>
          <p className="text-sm leading-[2] mb-8" style={{ color: 'var(--color-muted)' }}>
            「刻印がどう見えるか、決める前に確認したい」という方に。
            <br />
            お見積りと一緒に、枡の面に合わせて組んだ仕上がりイメージ（レイアウト画像）をお送りします。
            <br />
            イメージと金額を見てからご注文を判断いただけるので、社内で回覧してから決めることもできます。
          </p>

          <div
            className="rounded-sm p-8 mb-8 text-left"
            style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
          >
            <div className="space-y-4">
              {[
                { label: '費用', val: '無料（お見積りと一緒にお送りします）' },
                { label: 'お送りするもの', val: '仕上がりイメージ（レイアウト画像）と金額・納期の目安' },
                { label: 'ご用意いただくもの', val: 'ロゴデータ、または入れたい文章だけで構いません' },
                { label: '対応加工', val: '無地・焼印・レーザー刻印すべて対応' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 text-sm">
                  <span className="shrink-0 w-32 font-medium text-xs" style={{ color: 'var(--color-muted)' }}>
                    {item.label}
                  </span>
                  <span className="text-xs">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <Link href="#quote" className="btn-accent">
            見積りと仕上がりイメージを依頼する
          </Link>
        </div>
      </section>

      {/* ━━━ ご依頼の流れ ━━━ */}
      <OrderFlow heading="ご依頼の流れ" />

      {/* ━━━ FAQ ━━━ */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-center mb-4" style={{ color: 'var(--color-accent)' }}>
            FAQ
          </p>
          <h2 className="section-title text-center mb-12">よくある質問</h2>

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

      {/* ━━━ かんたん見積り依頼 ━━━ */}
      <QuickQuote
        formType="business"
        heading="かんたん見積り依頼"
        lead="用途・サイズ・数量・加工を選んで送るだけ。1〜2営業日以内に、お見積りと仕上がりイメージをお送りします。希望納期や分納などの詳細は、お問い合わせフォームからもご相談いただけます。"
      />
    </>
  )
}
