import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { masuSizes } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '法人のお客様 — 枡のノベルティ・記念品・OEM | 大口注文・数量割引対応',
  description:
    '法人向け枡のノベルティ・記念品・OEM製作。企業ロゴ・社名の名入れ対応。全7サイズの国産ヒノキ枡に焼印・レーザー刻印加工。1個からのサンプル、10個〜10,000個以上の大口注文に数量割引で対応。納期2〜4週間。',
  keywords:
    '枡 ノベルティ,枡 OEM,枡 企業ギフト,枡 記念品 法人,枡 卸,枡 名入れ 法人,枡 周年記念,枡 株主優待,枡 大口注文,枡 数量割引,枡 サンプル',
  alternates: { canonical: `${baseUrl}/business`, languages: { ja: `${baseUrl}/business`, en: `${baseUrl}/en/corporate` } },
}

// ── 数量別単価テーブル（税別） ──
const volumePricing = [
  { size: '三勺枡', capacity: '54ml', p10: 500, p50: 475, p100: 450, p300: 425 },
  { size: '五勺枡', capacity: '100ml', p10: 600, p50: 570, p100: 540, p300: 510 },
  { size: '八勺枡', capacity: '144ml', p10: 700, p50: 665, p100: 630, p300: 595 },
  { size: '一合枡', capacity: '180ml', p10: 800, p50: 760, p100: 720, p300: 680 },
  { size: '二合半枡', capacity: '450ml', p10: 1200, p50: 1140, p100: 1080, p300: 1020 },
  { size: '五合枡', capacity: '900ml', p10: 1800, p50: 1710, p100: 1620, p300: 1530 },
  { size: '一升枡', capacity: '1800ml', p10: 2500, p50: 2375, p100: 2250, p300: 2125 },
]

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
    company: '株式会社テクノス',
    person: 'N.様',
    product: '一合枡（焼印入り）× 100個',
    purpose: '創業30周年の記念品',
    quote:
      '焼印の仕上がりが非常に美しく、取引先に配ったところ大変好評でした。納期も相談に乗っていただき、スムーズに準備できました。',
    result: '取引先との関係強化に貢献。翌年の周年イベントでもリピート注文。',
    rating: 5,
  },
  {
    company: '合同会社クラフトラボ',
    person: 'W.様',
    product: '一合枡（レーザー刻印）× 200個',
    purpose: '展示会の来場者向けノベルティ',
    quote:
      '木製品は珍しいので足を止めてくれる方が多く、ブースの集客にも貢献してくれました。QRコードもレーザーできれいに刻印できました。',
    result: 'ブース来場者数が前年比130%に。名刺交換数も大幅増加。',
    rating: 4,
  },
  {
    company: 'NPO法人まちづくり協議会',
    person: 'K.様',
    product: '一合枡（レーザー刻印）× 50個',
    purpose: '地域イベントの記念品',
    quote:
      '地域の祭りで振る舞い酒用として注文しました。ロゴをレーザー刻印で入れていただき、参加者にそのまま記念品としてお持ち帰りいただきました。',
    result: '参加者満足度が大幅向上。SNSでの投稿も多数。',
    rating: 5,
  },
]

// ── ご注文の流れ ──
const orderSteps = [
  {
    step: 1,
    title: 'お問い合わせ・お見積り',
    desc: 'サイズ・数量・加工方法・ご希望納期をお伝えください。即日〜翌営業日にお見積りをお返しします。',
    detail: 'フォーム・メールどちらでも対応',
  },
  {
    step: 2,
    title: 'デザイン確認',
    desc: 'ロゴデータやデザインを元にレイアウトをご提案。修正は何度でも無料です。',
    detail: 'AI・PDF・JPG・PNG対応',
  },
  {
    step: 3,
    title: 'サンプル確認（任意）',
    desc: 'ご希望に応じて実物サンプルを製作。量産前に仕上がりをご確認いただけます。',
    detail: 'サンプル代は量産時に差し引き',
  },
  {
    step: 4,
    title: '量産・製作',
    desc: '国産ヒノキで一つずつ丁寧に製作。進捗はメールでご報告します。',
    detail: '全品検品・品質管理済み',
  },
  {
    step: 5,
    title: '検品・納品',
    desc: '一つひとつ検品し、丁寧に梱包してお届け。個別包装や熨斗対応も可能です。',
    detail: '全国配送・海外発送対応',
  },
]

// ── 選ばれる理由 ──
const whyFomus = [
  {
    num: '01',
    title: '岐阜県大垣市の自社工場で一貫製造',
    desc: '日本有数のヒノキの産地に近い大垣市で、木材の仕入れから加工・検品まで一貫管理。中間マージンがないため、品質を保ちながら適正価格でご提供できます。',
  },
  {
    num: '02',
    title: '10個から10,000個超まで柔軟に対応',
    desc: '小ロットの試作から大規模イベント用の大量注文まで、自社工場だからこそ柔軟に対応。数量に応じた割引でまとめ買いほどお得になります。',
  },
  {
    num: '03',
    title: '焼印・レーザー刻印の2種類の名入れ',
    desc: '伝統的な焼印と高精度なレーザー刻印を使い分け。ロゴ・社名・QRコード・写真まで、あらゆるデザインに対応します。',
  },
  {
    num: '04',
    title: 'デザイン修正は何度でも無料',
    desc: '「イメージと違った」をなくすため、ご納得いただけるまでデザイン調整を承ります。初めてのご注文でも安心です。',
  },
  {
    num: '05',
    title: '特殊コーティングで実用性アップ',
    desc: '食品衛生法基準適合のコーティングオプションで、水・油・汚れをブロック。飲食店での業務用途やギフトにも安心してお使いいただけます。',
  },
  {
    num: '06',
    title: '請求書払い・暗号資産決済にも対応',
    desc: '法人のお客様には請求書払い（月末締め翌月末払い）をご用意。JPYC（暗号資産）決済にも対応し、お支払い方法を柔軟に選べます。',
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
    a: '無垢の枡は10個から、名入れ枡・FOMUSオリジナル枡は1個からご注文いただけます。まとめ買いほどお得です。',
  },
  {
    q: '納期はどのくらいですか？',
    a: '無地枡は約2週間、名入れ枡は約3週間、300個以上の大口注文は約4週間が目安です。お急ぎの場合もご相談ください。',
  },
  {
    q: 'サンプル作成は可能ですか？',
    a: 'はい、可能です。実物サンプルを1〜2個製作いたします。サンプル代は量産ご注文時に差し引かせていただきます。',
  },
  {
    q: '見積りは無料ですか？',
    a: 'はい、お見積りは無料です。数量・サイズ・加工方法をお伝えいただければ、即日〜翌営業日にお見積りをお出しします。',
  },
  {
    q: 'デザインデータがなくても注文できますか？',
    a: 'はい、手書きのラフやイメージ写真からデータを作成することも可能です。お気軽にご相談ください。',
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
            枡で、企業の想いを届ける
          </h1>
          <p className="text-sm leading-[2] mb-10" style={{ opacity: 0.85 }}>
            国産ヒノキの枡に、企業ロゴや社名を刻印。
            <br className="hidden md:block" />
            ノベルティ・記念品・OEMとして、10個から10,000個超まで対応します。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/custom"
              className="inline-block px-8 py-4 text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ background: '#fff', color: 'var(--color-accent)' }}
            >
              無料お見積り
            </Link>
            <a
              href="#sample"
              className="inline-block px-8 py-4 text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#fff' }}
            >
              サンプルを依頼
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

      {/* ━━━ FOMUSが選ばれる理由 ━━━ */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-center mb-4" style={{ color: 'var(--color-accent)' }}>
            Why FOMUS
          </p>
          <h2 className="section-title text-center mb-16">FOMUSが選ばれる6つの理由</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyFomus.map((item) => (
              <div key={item.num} className="relative">
                <span
                  className="block text-[2.5rem] font-light leading-none mb-3"
                  style={{ color: 'var(--color-border)' }}
                >
                  {item.num}
                </span>
                <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  {item.title}
                </h3>
                <p className="text-xs leading-[2]" style={{ color: 'var(--color-muted)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-5xl" />

      {/* ━━━ 数量別価格表 ━━━ */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-center mb-4" style={{ color: 'var(--color-accent)' }}>
            Volume Pricing
          </p>
          <h2 className="section-title text-center mb-4">数量別価格表</h2>
          <p className="text-xs text-center mb-12 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            まとめ買いほどお得に。500個以上は個別にお見積りいたします。
            <br />
            表示価格は枡本体の税別単価です。名入れ・コーティング等のオプションは別途。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th className="text-left py-3 pr-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    サイズ
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    10〜49個
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    50〜99個
                  </th>
                  <th
                    className="text-center py-3 px-3 text-xs font-medium rounded-t-sm"
                    style={{ color: 'var(--color-accent)', background: 'var(--color-accent-light)' }}
                  >
                    100〜299個
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    300〜499個
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                    500個〜
                  </th>
                </tr>
              </thead>
              <tbody>
                {volumePricing.map((row) => (
                  <tr key={row.size} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-3 pr-3">
                      <span className="text-xs font-medium">{row.size}</span>
                      <span className="text-[10px] ml-1" style={{ color: 'var(--color-muted)' }}>
                        {row.capacity}
                      </span>
                    </td>
                    <td className="text-center py-3 px-3 text-xs">&yen;{row.p10.toLocaleString()}</td>
                    <td className="text-center py-3 px-3 text-xs">&yen;{row.p50.toLocaleString()}</td>
                    <td
                      className="text-center py-3 px-3 text-xs font-medium"
                      style={{ color: 'var(--color-accent)', background: 'var(--color-accent-light)' }}
                    >
                      &yen;{row.p100.toLocaleString()}
                    </td>
                    <td className="text-center py-3 px-3 text-xs">&yen;{row.p300.toLocaleString()}</td>
                    <td className="text-center py-3 px-3 text-xs" style={{ color: 'var(--color-muted)' }}>
                      別途見積
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-1">
            {[
              '焼印：単価に含む（初回版代 ¥13,000 別途）',
              'レーザー刻印：+¥150/個',
              'コーティング：+¥800/個',
              '蓋オプション：三勺枡 +¥800/個、一合枡 +¥1,000/個',
            ].map((note) => (
              <p key={note} className="text-[11px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                ※ {note}
              </p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Link href="/custom" className="btn-accent">
              この数量でお見積り
            </Link>
            <Link href="/business/catalog" className="btn-outline">
              PDFカタログを見る
            </Link>
          </div>
        </div>
      </section>

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

      {/* ━━━ 名入れ加工の比較 ━━━ */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-center mb-4" style={{ color: 'var(--color-accent)' }}>
            Engraving
          </p>
          <h2 className="section-title text-center mb-16">名入れ加工 — 2つの方法</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 焼印 */}
            <div
              className="rounded-sm overflow-hidden"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <Image
                src="/images/generated/yakiin.jpg"
                alt="焼印の仕上がり"
                width={800}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
              <div className="p-6">
                <h3 className="text-base font-medium mb-4">焼印</h3>
                <div className="space-y-3">
                  {[
                    { label: '仕上がり', val: '焦げ茶色の温かみある印字' },
                    { label: '向いている用途', val: 'ロゴ・社名・シンプルなデザイン' },
                    { label: '費用', val: '版代 ¥13,000（初回のみ）/ 印字代は単価に含む' },
                    { label: 'ロット', val: '1個〜' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3 text-xs">
                      <span className="shrink-0 w-24 font-medium" style={{ color: 'var(--color-muted)' }}>
                        {item.label}
                      </span>
                      <span>{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* レーザー */}
            <div
              className="rounded-sm overflow-hidden"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <Image
                src="/images/generated/laser-engraving.jpg"
                alt="レーザー刻印の精密な仕上がり"
                width={800}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
              <div className="p-6">
                <h3 className="text-base font-medium mb-4">レーザー刻印</h3>
                <div className="space-y-3">
                  {[
                    { label: '仕上がり', val: '繊細な彫刻。グラデーション・写真も表現可' },
                    { label: '向いている用途', val: '細かいデザイン・QRコード・個別名入れ' },
                    { label: '費用', val: '¥150/個（版代不要）' },
                    { label: 'ロット', val: '1個〜（個別に異なるデザインも可）' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3 text-xs">
                      <span className="shrink-0 w-24 font-medium" style={{ color: 'var(--color-muted)' }}>
                        {item.label}
                      </span>
                      <span>{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* ━━━ サンプル依頼 ━━━ */}
      <section id="sample" className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
            Sample
          </p>
          <h2 className="section-title mb-6">まずはサンプルでお試しください</h2>
          <p className="text-sm leading-[2] mb-4" style={{ color: 'var(--color-muted)' }}>
            「実物を見てから決めたい」という方に。
            <br />
            1〜2個のサンプルを実際に製作し、素材感・名入れの仕上がりをご確認いただけます。
          </p>

          <div
            className="rounded-sm p-8 mb-8 text-left"
            style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
          >
            <div className="space-y-4">
              {[
                { label: 'サンプル数量', val: '1〜2個' },
                { label: 'サンプル代', val: '実費（量産ご注文時に差し引き）' },
                { label: '納期', val: '約1〜2週間' },
                { label: '対応加工', val: '無地・焼印・レーザー刻印すべて対応' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 text-sm">
                  <span className="shrink-0 w-28 font-medium text-xs" style={{ color: 'var(--color-muted)' }}>
                    {item.label}
                  </span>
                  <span className="text-xs">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <Link href="/custom?type=sample" className="btn-accent">
            サンプルを依頼する
          </Link>
        </div>
      </section>

      <div className="divider mx-auto max-w-5xl" />

      {/* ━━━ ご注文の流れ ━━━ */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-center mb-4" style={{ color: 'var(--color-accent)' }}>
            Flow
          </p>
          <h2 className="section-title text-center mb-16">ご注文の流れ</h2>

          <div className="space-y-0">
            {orderSteps.map((s, i) => (
              <div
                key={s.step}
                className="relative pb-10"
                style={{
                  borderLeft: i < orderSteps.length - 1 ? '1px solid var(--color-border)' : 'none',
                  marginLeft: '15px',
                  paddingLeft: '32px',
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
                  <p className="text-sm mb-1" style={{ color: 'var(--color-muted)' }}>
                    {s.desc}
                  </p>
                  <p className="text-[10px]" style={{ color: 'var(--color-accent)' }}>
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ コーティング訴求 ━━━ */}
      <section
        className="py-16 md:py-20"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="rounded-sm p-8 md:p-10 flex flex-col md:flex-row gap-6 md:items-center"
            style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
          >
            <div className="md:flex-1">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
                Option
              </p>
              <h3 className="text-base font-medium mb-2">特殊コーティング加工</h3>
              <p className="text-xs leading-[2]" style={{ color: 'var(--color-muted)' }}>
                水・油・汚れを弾く特殊コーティング。食品衛生法基準適合で、飲食店での業務利用にも安心。
                飲み物を入れる枡にも使え、お手入れも楽になります。
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 shrink-0">
              <p className="text-xl font-light" style={{ color: 'var(--color-accent)' }}>
                +&yen;800<span className="text-xs font-normal">/個</span>
              </p>
              <Link
                href="/coating"
                className="text-xs underline"
                style={{ color: 'var(--color-accent)' }}
              >
                コーティングについて詳しく
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ JPYC決済 ━━━ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="rounded-sm p-6 flex flex-col sm:flex-row gap-4 sm:items-center"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-1">JPYC（暗号資産）決済対応</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                JPYC（日本円ステーブルコイン / Polygon）での決済に対応。クレジットカード手数料を抑えたお支払いが可能です。
              </p>
            </div>
            <Link
              href="/custom"
              className="text-xs shrink-0 underline"
              style={{ color: 'var(--color-accent)' }}
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

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

      {/* ━━━ CTA ━━━ */}
      <section
        className="py-24 md:py-32 text-center"
        style={{ background: 'var(--color-accent)', color: '#fff' }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-2xl md:text-3xl font-light mb-4"
            style={{ lineHeight: 1.5 }}
          >
            まずはお気軽にご相談ください
          </h2>
          <p className="text-sm mb-10 leading-[2]" style={{ opacity: 0.85 }}>
            枡のサイズ・数量・デザインなど、どんなことでもお問い合わせいただけます。
            <br className="hidden md:block" />
            専門スタッフが最適なプランをご提案いたします。お見積りは無料です。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/custom"
              className="inline-block px-10 py-4 text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ background: '#fff', color: 'var(--color-accent)' }}
            >
              無料お見積り・ご相談
            </Link>
            <a
              href="#sample"
              className="inline-block px-10 py-4 text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#fff' }}
            >
              サンプルを依頼
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
