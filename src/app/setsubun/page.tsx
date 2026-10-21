import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { masuSizes } from '@/lib/masu-data'
import { orderMinPriceText } from '@/lib/pricing'
import { BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'
import OfferBlock from '@/components/ui/OfferBlock'
import QuickQuote from '@/components/forms/QuickQuote'

const baseUrl = siteConfig.url

/**
 * 節分の年ごとの情報。URL に年は入れず（毎年同じページを育てる）、ここだけを毎年秋（10月ごろ）に翌年分へ更新する。
 * 相談の目安は行事カレンダー（src/lib/event-calendar.ts）と同じ計算（通常4週間前・大口5週間前）。
 */
const SETSUBUN = {
  year: 2027,
  date: '2027-02-03',
  dateLabel: '2027年2月3日（水）',
  ehou: '北北西やや北',
  consultBy: '1月6日ごろ',
  consultByLarge: '12月30日ごろ',
}

export const metadata: Metadata = {
  title: `節分の枡｜豆まきの枡の選び方・サイズ・作法（${SETSUBUN.year}年は2月3日）`,
  description: `${SETSUBUN.year}年の節分は${SETSUBUN.dateLabel}。豆まきに枡を使う理由、家庭は五合枡・子どもは五勺枡や三勺枡・寺社や大きな行事は一升枡というサイズの選び方、豆まきの正しいやり方と作法、地域による違い、節分後の使い方まで。園・店舗・企業・寺社の節分行事向けの名入れ枡も1個から。`,
  keywords:
    '節分 枡,豆まき 枡,節分 豆入れ,節分 ます,節分 枡 サイズ,節分 2027,豆まき やり方,節分 豆まき 作法,節分 イベント 枡 名入れ,五合枡 節分,一升枡 節分,福豆 枡',
  alternates: { canonical: `${baseUrl}/setsubun` },
  openGraph: {
    title: `節分の枡｜豆まきの枡の選び方・サイズ・作法（${SETSUBUN.year}年は2月3日）`,
    description: '豆まきに枡を使う理由、サイズの選び方、豆まきのやり方と作法。節分行事向けの名入れ枡も1個から。',
    url: `${baseUrl}/setsubun`,
    images: [{ url: `${baseUrl}/images/generated/setsubun-masu.jpg`, width: 700, height: 700 }],
  },
}

// 節分で使うサイズ（八勺枡は節分ではあまり使わないため除く）
const setsubunUse: Record<string, string> = {
  sanjaku: '小さな子どもの「自分の枡」。手のひらに収まり、少しずつ豆をまける',
  goshaku: '子ども用・少人数の家庭用。軽くて持ちやすい',
  ichigo: '大人ひとり分の豆まき用。節分のあとは酒器や小物入れに',
  nigohan: '二人〜少人数の家庭の豆入れ。普段は卓上の小物入れに',
  gogo: '家庭の豆まきの定番。家族全員分の福豆が入り、お供えにも向く',
  issho: '寺社の節分祭・園や店舗の行事など、大勢の豆を用意する場に',
}
const sizes = masuSizes.filter((m) => m.id in setsubunUse)

const steps = [
  { name: '福豆を用意する', text: '炒った大豆（福豆）を用意します。生の大豆は、まいたあとに芽が出ると縁起がよくないとされ、炒った豆を使うのが一般的です。地域によっては殻付きの落花生を使います。' },
  { name: '枡に入れてお供えする', text: '福豆を枡に入れ、神棚や家の中の高い場所に供えておきます。家庭によっては、豆まきの日の朝から供えておくこともあります。' },
  { name: '夜、奥の部屋からまく', text: '鬼は夜に来るとされるため、豆まきは日が暮れてから行うのが一般的です。家の奥の部屋から玄関に向かって、順にまいていきます。' },
  { name: '「鬼は外」「福は内」と唱える', text: '窓や戸を開けて「鬼は外」と外へまき、鬼が戻らないようすぐに閉めてから「福は内」と部屋の中へまきます。' },
  { name: '年の数だけ豆を食べる', text: '豆まきのあと、自分の年の数（地域や家庭によっては年の数より1つ多く）の福豆を食べ、一年の無病息災を願います。' },
]

const faq = [
  {
    q: `${SETSUBUN.year}年の節分はいつですか？`,
    a: `${SETSUBUN.year}年の節分は${SETSUBUN.dateLabel}です。節分は立春の前日にあたるため、年によって2月2日や2月4日になることもあります。${SETSUBUN.year}年の恵方は${SETSUBUN.ehou}です。`,
  },
  {
    q: 'なぜ節分の豆は枡に入れるのですか？',
    a: '枡は米や穀物を量る道具として神事にも使われてきた器で、「枡（ます）」が「増す」「益す」に通じることから、福が増すようにという願いを込めて福豆を入れると言われています。',
  },
  {
    q: '節分に使う枡は、どのサイズがいいですか？',
    a: '家庭の豆まきには、家族全員分の福豆が入る五合枡（900ml）が定番です。小さな子どもには手に収まる五勺枡（100ml）や三勺枡（54ml）、寺社の節分祭や園・店舗の行事など大勢の豆を用意する場には一升枡（1,800ml）が向いています。',
  },
  {
    q: '豆まきの豆は大豆と落花生、どちらが正しいですか？',
    a: '炒った大豆を使うのが一般的ですが、北海道・東北・九州の一部などでは殻付きの落花生をまく地域もあります。落花生は拾いやすく、殻をむいて食べられるのが利点です。地域や家庭の習慣で選んで構いません。',
  },
  {
    q: '豆まきは何時ごろにするものですか？',
    a: '鬼は夜にやってくるとされるため、日が暮れてからの豆まきが一般的です。家族がそろう夕食の前後に行う家庭が多いようです。',
  },
  {
    q: '節分が終わったあと、枡はどうすればいいですか？',
    a: '軽くすすいで陰干しすれば、翌年の節分まで繰り返し使えます。ふだんは小物入れや卓上のトレイとして、大人が使う一合枡なら酒器としても使えます。',
  },
  {
    q: '子どもの名前を入れた枡は作れますか？',
    a: '作れます。名入れは1個から承り、レーザー刻印なら兄弟姉妹で1個ずつ違う名前を入れられます。毎年の節分に使う「自分の枡」として、成長の記念にもなります。',
  },
  {
    q: '保育園・寺社・店舗の節分行事用に、まとめて注文できますか？',
    a: '承ります。園名・寺社名・店名や年号を入れた名入れの枡を、数量に応じてお見積りします。請求書払いにも対応しています。100個以上の場合は製作に3〜4週間かかるため、早めのご相談をおすすめします。',
  },
  {
    q: `節分に間に合わせるには、いつまでに注文すればいいですか？`,
    a: `名入れの製作は約3週間が目安です。仕上がりの確認と配送を含め、${SETSUBUN.year}年の節分（2月3日）に間に合わせるなら${SETSUBUN.consultBy}まで、100個以上なら${SETSUBUN.consultByLarge}までのご相談が目安です。年末年始を挟むため、12月中旬までのご相談が安心です。`,
  },
  {
    q: '豆も一緒に買えますか？',
    a: '当店は枡のみの取り扱いです。福豆はスーパーや食料品店などでお求めください。',
  },
]

const regional = [
  ['一般的', '「鬼は外、福は内」', '最も広く知られた掛け声'],
  ['鬼を祀る・鬼にゆかりのある地域や寺社', '「鬼は内」「鬼も内」など', '鬼を追い払わずに迎え入れる考え方。群馬県の鬼石地区や奈良県吉野の金峯山寺などで知られる'],
  ['成田山新勝寺（千葉県）など', '「福は内」のみ', '不動明王の前では鬼も改心するとされ、「鬼は外」を唱えないとされる'],
  ['北海道・東北・九州の一部など', '落花生をまく', '雪の上でも見つけやすく、殻があるので拾って食べやすい'],
]

const th = { color: 'var(--color-muted)' }

export default function SetsubunPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '節分の枡', href: `${baseUrl}/setsubun` },
        ]}
      />
      <FAQJsonLd items={faq} />
      <HowToJsonLd
        name="枡を使った節分の豆まきのやり方"
        description="福豆を枡に入れてお供えし、夜に家の奥から「鬼は外」「福は内」とまき、年の数だけ豆を食べる、一般的な豆まきの手順。"
        steps={steps}
      />
      <SpeakableJsonLd url={`${baseUrl}/setsubun`} cssSelectors={['[data-speakable]', '.section-title']} />

      <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '節分の枡' }]} />

      {/* 1. Hero */}
      <section className="py-16 md:py-20 text-center" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.2em] mb-4" style={{ color: 'var(--color-accent)' }}>
            SETSUBUN {SETSUBUN.year}
          </p>
          <h1 className="section-title mb-6">節分の枡 — 豆まきの枡の選び方と作法</h1>
          <p data-speakable className="lead">
            {SETSUBUN.year}年の節分は<strong>{SETSUBUN.dateLabel}</strong>です。
            豆まきの福豆を枡に入れるのは、枡が神事にも使われてきた器であり、「枡（ます）」が「増す・益す」に通じて福が増すようにという願いが込められているためです。
            サイズは、家庭の豆まきなら家族全員分が入る<strong>五合枡（900ml）</strong>、小さな子どもには手に収まる<strong>五勺枡・三勺枡</strong>、
            寺社の節分祭や園・店舗の行事のように大勢の豆を用意する場には<strong>一升枡（1,800ml）</strong>が定番です。
          </p>
        </div>
      </section>

      {/* 2. 頼める条件 */}
      <OfferBlock trackId="setsubun" className="-mt-4 md:-mt-8 relative" />

      {/* 3. 今年の基本 */}
      <section className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-6">{SETSUBUN.year}年の節分の基本</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <tbody>
              {[
                ['日付', `${SETSUBUN.dateLabel}（立春の前日）`],
                ['恵方', `${SETSUBUN.ehou}（恵方巻を食べるときに向く方角）`],
                ['豆まきの時間', '日が暮れてからが一般的（鬼は夜に来るとされるため）'],
                ['まく豆', '炒った大豆（福豆）。地域によっては殻付きの落花生'],
                ['掛け声', '「鬼は外、福は内」が一般的。地域や寺社によって異なる'],
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <th scope="row" className="py-3 pr-4 text-left font-medium whitespace-nowrap align-top" style={th}>{k}</th>
                  <td className="py-3">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed" style={th}>
          ※ 節分の日付は立春の日に合わせて年ごとに決まり、2月2日や2月4日になる年もあります。
        </p>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* 4. なぜ枡で */}
      <section className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-6">なぜ枡で豆をまくのか</h2>
        <div className="grid gap-8 md:grid-cols-[1fr_280px] items-start">
          <div className="space-y-4 text-sm leading-[2.1]">
            <p>
              <strong>神事に使われてきた器だから。</strong>
              枡は米や穀物を量る道具として暮らしに欠かせないものであると同時に、神棚へのお供えなど神事にも使われてきました。そうした器に入れた福豆には、邪気を払う力が宿ると考えられてきました。
            </p>
            <p>
              <strong>「増す・益す」に通じる縁起物だから。</strong>
              「枡（ます）」は「増す」「益す」と同じ音を持ち、福が増す、ますます繁盛するという願いを込められます。福豆を枡に入れてまくことには、邪気を払うことと福を招くこと、二つの意味が重なっています。
            </p>
            <p>
              <strong>豆そのものにも意味がある。</strong>
              穀物には霊力が宿ると考えられ、大豆は「魔目（まめ）＝鬼の目を打つ」「魔滅（まめ）＝魔を滅する」という語呂合わせでも、邪気払いに用いられてきたと言われます。
            </p>
          </div>
          <Image
            src="/images/generated/setsubun-masu.jpg"
            alt="福豆を入れたヒノキの枡"
            width={700}
            height={700}
            sizes="(max-width: 768px) 100vw, 280px"
            className="w-full rounded-sm"
          />
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* 5. サイズ */}
      <section className="max-w-4xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-4 text-center">節分の枡 — サイズの選び方</h2>
        <p className="lead text-center mb-8">
          迷ったら、家庭の豆入れは五合枡、子ども用は五勺枡。大勢に豆を配る行事は一升枡が目安です。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <caption className="sr-only">節分に使う枡のサイズと使い方</caption>
            <thead>
              <tr style={{ background: 'var(--color-subtle)', borderBottom: '2px solid var(--color-border)' }}>
                {['サイズ', '容量', '外寸', '節分での使い方'].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-left font-medium whitespace-nowrap" style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="px-4 py-4 font-medium whitespace-nowrap">
                    <Link href={`/products/${m.id}`} className="hover:underline" style={{ color: 'var(--color-accent)' }}>{m.name}</Link>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{m.capacity}</td>
                  <td className="px-4 py-4 whitespace-nowrap" style={th}>{m.size}</td>
                  <td className="px-4 py-4 text-xs leading-relaxed" style={th}>{setsubunUse[m.id]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm leading-[2]" style={th}>
          昔ながらのやり方では、五合枡に家族全員分の福豆を入れて供え、豆まきのときに各自が一合枡や五勺枡に取り分けてまきます。
          全サイズの寸法は<Link href="/products/sizes" className="underline mx-1" style={{ color: 'var(--color-accent)' }}>枡のサイズ一覧</Link>で比べられます。
        </p>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* 6. やり方 */}
      <section className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-8">豆まきのやり方と作法</h2>
        <ol className="space-y-6">
          {steps.map((s, i) => (
            <li key={s.name} className="flex gap-5">
              <span className="serif text-2xl font-light w-8 shrink-0" style={{ color: 'var(--color-accent)' }}>{i + 1}</span>
              <div>
                <h3 className="text-base font-medium mb-1">{s.name}</h3>
                <p className="text-sm leading-[1.9]" style={th}>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 rounded-sm p-6" style={{ background: 'var(--color-subtle)' }}>
          <h3 className="text-sm font-medium mb-3">枡を使うときの所作</h3>
          <ul className="space-y-2 text-sm leading-[1.9]" style={th}>
            <li>・枡は左手で胸の高さに持ち、右手で豆をつかんでまくのが美しい所作とされます。</li>
            <li>・豆は上から投げつけず、種をまくように下手で優しくまきます。</li>
            <li>・伝統的には家長や、その年の年男・年女がまく役とされますが、今は家族みんなでまく家庭が多いでしょう。</li>
            <li>・食べ物を入れる器なので、使う前に水で軽くすすぎ、よく乾かしておきます。</li>
          </ul>
        </div>

        <h3 className="text-base font-medium mt-12 mb-4">地域による違い</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                {['地域・場所', '掛け声・豆', '考え方'].map((h) => (
                  <th key={h} scope="col" className="py-3 pr-4 text-left font-medium" style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {regional.map((r) => (
                <tr key={r[0]} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="py-3 pr-4 align-top">{r[0]}</td>
                  <td className="py-3 pr-4 align-top whitespace-nowrap">{r[1]}</td>
                  <td className="py-3 align-top text-xs leading-relaxed" style={th}>{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs" style={th}>※ 一般に伝えられている例です。詳しくは各地域・各寺社の案内をご確認ください。</p>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* 7. 家族・子ども */}
      <section className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-6">家族・子どもと楽しむ節分</h2>
        <ul className="space-y-4 text-sm leading-[2]">
          <li><strong>名前入りの「自分の枡」を用意する。</strong> 手に収まる五勺枡や三勺枡に子どもの名前を入れておくと、毎年の節分に同じ枡を使え、成長の記念にもなります。兄弟姉妹で1個ずつ違う名前も入れられます。</li>
          <li><strong>なぜ豆をまくのかを話す。</strong> 「福が増す」枡の意味や、豆を年の数だけ食べる理由を話すと、行事の意味が伝わります。</li>
          <li><strong>年の数を数える。</strong> 家族それぞれの年の数だけ豆を数えるのは、小さな子どもの数遊びにもなります。</li>
          <li><strong>小さな子どもには注意を。</strong> 炒り豆は小さな子どもが喉に詰まらせるおそれがあるため、食べさせ方には十分気をつけ、拾い残しのないよう片付けましょう。</li>
        </ul>
      </section>

      {/* 8. 団体の行事 */}
      <section className="py-14 md:py-16" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-6">園・学校・店舗・企業・寺社の節分行事に</h2>
          <p className="text-sm leading-[2] mb-6">
            節分祭や園の豆まき、店舗や企業の季節の催しに、名前を入れた枡を用意するところが増えています。
            豆を配ったあとは参加者が持ち帰れるので、行事の記念として長く手元に残ります。
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['名入れの内容', '園名・寺社名・店名・社名、年号や「福は内」などの言葉。ロゴや社紋はデータが無くても写真から起こして刻印します'],
              ['数量', '名入れは1個から。大勢に配る行事の大口も、数量に応じてお見積りします'],
              ['1個ずつ違う名前', 'レーザー刻印なら、園児や参加者の名前を1個ずつ変えて入れられます（版代はかかりません）'],
              ['お支払い', 'クレジットカード・銀行振込のほか、法人・団体は請求書払いにも対応します'],
            ].map(([t, d]) => (
              <div key={t} className="rounded-sm p-5" style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}>
                <h3 className="text-sm font-medium mb-2">{t}</h3>
                <p className="text-[13px] leading-[1.9]" style={th}>{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm">
            <Link href="/blog/setsubun-event-kikaku" className="underline underline-offset-4" style={{ color: 'var(--color-accent)' }}>
              節分イベントの企画（保育園・幼稚園・店舗・企業・寺社）を読む →
            </Link>
          </p>
        </div>
      </section>

      {/* 9. 間に合わせる */}
      <section className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-6">節分に間に合わせるには</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <tbody>
              {[
                ['名入れの製作期間', '約3週間（100個以上は3〜4週間）'],
                [`${SETSUBUN.year}年の節分に間に合わせる相談の目安`, `${SETSUBUN.consultBy}まで`],
                ['100個以上の場合', `${SETSUBUN.consultByLarge}まで`],
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <th scope="row" className="py-3 pr-4 text-left font-medium align-top" style={th}>{k}</th>
                  <td className="py-3 whitespace-nowrap">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-[2]" style={th}>
          節分の前は年末年始を挟むため、実際には<strong style={{ color: 'var(--foreground)' }}>12月中旬までのご相談</strong>が安心です。
          ほかの行事の目安は<Link href="/calendar" className="underline mx-1" style={{ color: 'var(--color-accent)' }}>記念品の行事カレンダー</Link>にまとめています。
        </p>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* 10. 節分後 */}
      <section className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-6">節分のあとの使い方とお手入れ</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-base font-medium mb-3">一年を通して使う</h3>
            <ul className="space-y-2 text-sm leading-[1.9]" style={th}>
              <li>・小物入れ・ペン立て・鍵の置き場所に</li>
              <li>・卓上のナッツやお菓子入れに</li>
              <li>・多肉植物や季節の小物を飾る台に</li>
              <li>・大人用の一合枡は、日本酒の酒器として</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-medium mb-3">翌年まで長持ちさせる</h3>
            <ul className="space-y-2 text-sm leading-[1.9]" style={th}>
              <li>・豆くずを払い、水で軽くすすぐ（洗剤は基本不要）</li>
              <li>・水気を拭き取り、風通しのよい日陰で乾かす</li>
              <li>・直射日光と湿気を避けて保管する</li>
              <li>・しまい込む場合は、ときどき出して風を通す</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 text-sm" style={th}>
          詳しくは<Link href="/care" className="underline mx-1" style={{ color: 'var(--color-accent)' }}>枡のお手入れ</Link>をご覧ください。
        </p>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* 11. FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-8">節分の枡のよくある質問</h2>
        {faq.map((item) => (
          <details key={item.q} className="group" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium list-none">
              <span>{item.q}</span>
              <span className="ml-4 text-lg transition-transform group-open:rotate-45" style={th}>+</span>
            </summary>
            <p className="pb-5 text-sm leading-relaxed" style={th}>{item.a}</p>
          </details>
        ))}
        <p className="mt-8 text-[13px]" style={th}>名入れのご注文は1回につき {orderMinPriceText}が目安です（デザイン作成と仕上がりイメージを含みます）。</p>
      </section>

      {/* 12. 見積り */}
      <QuickQuote
        id="offer-quote"
        formType="quick-quote-setsubun"
        heading="節分の枡を相談する"
        lead="用途・サイズ・個数を選んで連絡先を入れるだけ。家族の名前入りの1個から、園・寺社・店舗の行事の大口まで。通常1〜2営業日以内に、お見積りと仕上がりイメージをお送りします。"
        className="bg-[var(--color-subtle)]"
      />
    </>
  )
}
