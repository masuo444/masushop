import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'
import OfferBlock from '@/components/ui/OfferBlock'
import QuickQuote from '@/components/forms/QuickQuote'
import { KURA_MASTER } from '@/lib/works'
import { orderMinPriceText } from '@/lib/pricing'

const baseUrl = siteConfig.url
const pageUrl = `${baseUrl}/business/anniversary`

export const metadata: Metadata = {
  title: '周年記念品の選び方｜10周年・50周年・100周年の記念品と名入れの枡',
  description:
    '周年記念品・創立記念品の選び方を、配る相手（社員・取引先・顧客・来賓）、予算の考え方、定番の記念品の比較、10周年〜100周年の考え方、半年前からの準備スケジュールで解説。社名・ロゴ・周年ロゴを刻む名入れのヒノキ枡は1個から、ロゴデータ不要、注文前に仕上がりイメージを無料でお送りします。',
  keywords:
    '周年記念品,周年記念品 おすすめ,創立記念品 社員,創業記念 記念品 取引先,10周年 記念品,20周年 記念品,30周年 記念品,50周年 記念品,100周年 記念品,周年記念 ノベルティ,周年記念品 名入れ,周年記念品 選び方,周年記念品 枡',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '周年記念品の選び方｜10周年・50周年・100周年の記念品と名入れの枡',
    description:
      '配る相手・予算・定番の比較・準備スケジュールまで。社名とロゴを刻む名入れのヒノキ枡は1個から、仕上がりイメージは無料。',
    type: 'website',
    url: pageUrl,
    images: [
      {
        url: `${baseUrl}${KURA_MASTER.image.src}`,
        width: KURA_MASTER.image.width,
        height: KURA_MASTER.image.height,
        alt: KURA_MASTER.ja.imageAlt,
      },
    ],
  },
}

// ── 配る相手 ──
const recipients = [
  {
    who: '社員',
    point: '「これまでの感謝」と「これからも一緒に」を伝える品。全員に同じものを配るのが基本で、勤続年数や役職で差をつけない方が揉めません。家族にも見せたくなるもの、自宅で使えるものが喜ばれやすい傾向があります。',
  },
  {
    who: '取引先',
    point: '「長年のお引き立てへの御礼」を伝える品。社名入りでも嫌味にならない上品さと、相手の社内で配りやすい・置きやすいことが大切です。受け取りに規定がある会社もあるため、高価すぎない品が無難です。',
  },
  {
    who: '顧客・会員',
    point: '来店客や会員への感謝として配る品。数が多くなりやすいので、単価と配りやすさのバランスを考えます。店舗のロゴや周年の年号が入っていると、思い出として残りやすくなります。',
  },
  {
    who: '来賓（式典・祝賀会）',
    point: '周年式典や祝賀会に来ていただいた方への引き出物。持ち帰りやすい大きさ・重さで、その場の記憶と結びつくものが向いています。乾杯に使った器をそのまま持ち帰ってもらう方法もあります。',
  },
]

// ── 定番の比較 ──
const comparison = [
  ['カタログギフト', '相手が好きなものを選べる。好みを外さない', '会社の印象は残りにくい。周年らしさが出しにくい'],
  ['名入れ文具（ボールペンなど）', '単価を抑えやすく、数が多くても配りやすい', '日常品に埋もれやすく、記念品としての特別感は出しにくい'],
  ['名入れタオル', '実用的で、数量が多いときの定番', '使い込むと消耗する。記念として手元に残りにくい'],
  ['食品・お菓子', '誰にでも渡しやすく、配る場面を選ばない', '食べたら残らない。日持ち・アレルギーへの配慮が必要'],
  ['記念誌・社史', '会社の歩みをきちんと伝えられる', '制作に時間と費用がかかる。読まれずに保管されることも'],
  ['名入れの木製品（枡など）', '社名・ロゴ・年号が長く手元に残る。縁起や素材の話で印象に残る', '名入れの製作に3週間ほどかかる。早めの手配が必要'],
]

// ── 年数別の考え方 ──
const milestones = [
  {
    year: '10周年',
    idea: '会社として一つの形ができた節目。創業メンバーや初期からの取引先への感謝を前面に。ロゴや周年ロゴを入れて、親しみのある記念品にする会社が多い時期です。',
    words: '「10th Anniversary」「感謝」「これからも共に」',
  },
  {
    year: '20〜30周年',
    idea: '事業が地域や業界に根づいた節目。社員の世代交代が進む時期でもあり、社員向けと取引先向けを分けて考えると選びやすくなります。',
    words: '「創業30周年」「感謝 1996-2026」',
  },
  {
    year: '50周年',
    idea: '半世紀の重み。式典や祝賀会を開く会社も多く、来賓への引き出物と社員への記念品を同時に用意することが増えます。品格と、長く残ることを重視します。',
    words: '「創業五十周年」「半世紀の感謝を込めて」',
  },
  {
    year: '100周年',
    idea: '一世紀の節目。会社の歴史そのものを伝える記念品が向いています。家紋や創業当時の屋号、創業年からの年号を入れるなど、歴史を感じさせる意匠が映えます。',
    words: '「創業百周年」「百年感謝」「1927-2027」',
  },
]

// ── 準備スケジュール ──
const schedule = [
  ['半年前', '周年の方針を決める', '誰に・何を伝えるか、式典や祝賀会を開くか、予算の枠を決めます。周年ロゴを作るならこの時期から'],
  ['4〜3か月前', '記念品の候補を絞る', '配る相手ごとに人数を出し、候補を2〜3つに絞って見積りを取ります。社内稟議もこの時期に'],
  ['3〜2か月前', '文言・デザインを決める', '社名・ロゴ・周年の年号・メッセージを決め、仕上がりイメージで確認します'],
  ['2〜1か月前', '発注・製作', '名入れの記念品は製作に約3週間、100個以上は3〜4週間が目安です。のし・個別包装・配送先もここで確定'],
  ['2週間前〜当日', '納品・検品・配布準備', '数量と刻印内容を確認し、配布の段取り（手渡し・同封・発送）を整えます'],
]

const faqItems = [
  {
    q: '周年記念品の枡は何個から注文できますか？',
    a: '名入れの枡は1個から承ります（無地の枡は10個から）。来賓用に数個だけ、社員全員分と取引先分をまとめて、といったご注文にも対応します。数量が増えるほど1個あたりの単価は下がります。',
  },
  {
    q: 'ロゴのデザインデータがなくても依頼できますか？',
    a: 'はい。名刺・封筒・看板などロゴが載っているものの写真を送っていただければ、こちらで刻印用に起こします。周年ロゴがまだ決まっていない場合も、社名と年号の文章だけで仕上がりイメージをお作りします。',
  },
  {
    q: '注文前に仕上がりを確認できますか？',
    a: 'はい。お見積りと一緒に、仕上がりイメージ（レイアウト画像）を無料でお送りします。社内で回覧・稟議に回してから、ご注文を判断していただけます。',
  },
  {
    q: '請求書払いはできますか？',
    a: 'はい。法人のお客様は請求書払い（月末締め翌月末払い）に対応しています。クレジットカード・銀行振込もご利用いただけます。',
  },
  {
    q: '納期はどのくらいですか？',
    a: '名入れの枡は約3週間、100個以上は3〜4週間が目安です。仕上がりの確認と配送を含め、お渡しの約4週間前（100個以上は約5週間前）までのご相談をおすすめします。お急ぎの場合もまずはご相談ください。',
  },
  {
    q: 'のしや個別包装には対応していますか？',
    a: 'はい、個別包装・化粧箱・のしに対応しています。取引先に配る分と社員に配る分で包装を分けたい場合も、ご相談の際にお知らせください。',
  },
  {
    q: '社員用と取引先用で、入れる内容を変えられますか？',
    a: 'はい。たとえば社員用には「感謝」と周年の年号、取引先用には社名とロゴ、といったように内容を分けられます。レーザー刻印なら版が不要なので、1個ずつ社員の名前を入れることもできます。',
  },
  {
    q: '何周年から記念品を配るのが一般的ですか？',
    a: '決まりはありませんが、一般に10周年・20周年・30周年・50周年・100周年など、区切りのよい年に記念品を用意する会社が多いようです。5周年や創業記念日に毎年用意する会社もあります。',
  },
  {
    q: '費用の目安を教えてください。',
    a: `サイズ・数量・名入れの内容によって変わるため、お見積りでご案内しています。名入れのご注文は1回につき ${orderMinPriceText}が目安で、デザイン作成と仕上がりイメージを含みます。`,
  },
]

export default function AnniversaryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '法人のお客様', href: `${baseUrl}/business` },
          { name: '周年記念品', href: pageUrl },
        ]}
      />
      <FAQJsonLd items={faqItems} />
      <HowToJsonLd
        name="周年記念品の準備スケジュール"
        description="周年の半年前から当日までに、記念品を用意する手順の目安。"
        steps={schedule.map(([when, name, text]) => ({ name: `${when}：${name}`, text }))}
      />
      <SpeakableJsonLd url={pageUrl} cssSelectors={['[data-speakable]', 'h1']} />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: '法人のお客様', href: '/business' },
              { label: '周年記念品' },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-12 text-center">
          <p className="text-[11px] tracking-[0.2em] text-[var(--color-accent)] mb-4">ANNIVERSARY GIFT</p>
          <h1
            className="serif text-3xl md:text-4xl font-light leading-relaxed mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            周年記念品の選び方
          </h1>
          <p className="text-[15px] leading-[2] max-w-2xl mx-auto" style={{ color: 'var(--color-muted)' }}>
            10周年、30周年、50周年、100周年——会社の節目に、何を、誰に、いつまでに用意するか。
            記念品選びで迷うところを順に整理しました。
          </p>
        </section>

        {/* 結論 */}
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div
            className="p-7 rounded-sm"
            style={{ background: 'var(--color-accent-light)', borderLeft: '4px solid var(--color-accent)' }}
          >
            <p className="text-[11px] tracking-[0.18em] mb-3" style={{ color: 'var(--color-accent)' }}>まとめ</p>
            <p data-speakable className="text-[15px] leading-[2]" style={{ color: 'var(--foreground)' }}>
              周年記念品は、まず「誰に配るか（社員・取引先・顧客・来賓）」を決め、相手ごとに人数と予算の枠を出してから選ぶと迷いません。
              記念として長く残したいなら、社名・ロゴ・周年の年号を刻んだ名入れの品が向いています。
              名入れの記念品は製作に3週間ほどかかるため、お渡しの2か月前には内容を決め、遅くとも約4週間前（100個以上は約5週間前）までに発注するのが目安です。
            </p>
          </div>
        </section>

        {/* 条件 */}
        <OfferBlock variant="business" trackId="anniversary" className="pb-16" />

        {/* 誰に配るか */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="serif text-xl font-medium text-center mb-4" style={{ color: 'var(--foreground)' }}>
              まず決めること：誰に配るか
            </h2>
            <p className="text-[14px] leading-[2] text-center max-w-2xl mx-auto mb-12" style={{ color: 'var(--color-muted)' }}>
              同じ周年記念品でも、相手によって伝えたいことと選ぶべき品が変わります。配る相手を先に分けておくと、数量・予算・入れる文言が自然に決まります。
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {recipients.map((r) => (
                <div key={r.who} className="bg-[var(--background)] p-6 rounded-sm">
                  <h3 className="serif text-base font-medium mb-3" style={{ color: 'var(--foreground)' }}>
                    {r.who}へ
                  </h3>
                  <p className="text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                    {r.point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 予算 */}
        <section className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="serif text-xl font-medium mb-6" style={{ color: 'var(--foreground)' }}>
            予算の考え方
          </h2>
          <div className="space-y-4 text-[14px] leading-[2]" style={{ color: 'var(--foreground)' }}>
            <p>
              周年記念品の予算に決まった相場はありません。会社の規模、配る人数、式典を開くかどうかで大きく変わります。
              「1個いくらが普通か」を探すより、<strong>周年事業全体の予算の中で、記念品に使える総額を決め、配る相手ごとの人数で割る</strong>方が、社内で説明しやすくなります。
            </p>
            <p>
              社員・取引先・来賓で品物や包装を分ける場合は、相手ごとに枠を分けておくと調整が楽です。
              数量が多いほど1個あたりの単価は下がりやすいので、配る相手をまとめて同じ品にする方法もあります。
            </p>
          </div>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* 定番の比較 */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="serif text-xl font-medium text-center mb-4" style={{ color: 'var(--foreground)' }}>
            周年記念品の定番を比較
          </h2>
          <p className="text-[14px] leading-[2] text-center max-w-2xl mx-auto mb-10" style={{ color: 'var(--color-muted)' }}>
            どれが正解というより、「何を優先するか」で選びます。会社の印象を長く残したいのか、好みを外さないことを優先するのかで向き不向きが分かれます。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] min-w-[560px]" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['記念品', '向いている点', '気をつけたい点'].map((h) => (
                    <th
                      key={h}
                      className="text-left p-3 border-b-2 border-[var(--color-border)] font-medium"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className="p-3 border-b border-[var(--color-border)] leading-[1.8] align-top"
                        style={{ color: i === 0 ? 'var(--foreground)' : 'var(--color-muted)', fontWeight: i === 0 ? 500 : 400 }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 年数別 */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
              10周年・30周年・50周年・100周年の考え方
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {milestones.map((m) => (
                <div key={m.year} className="bg-[var(--background)] p-6 rounded-sm">
                  <h3 className="serif text-lg font-light mb-3 text-[var(--color-accent)]">{m.year}</h3>
                  <p className="text-[13px] leading-[1.9] mb-4" style={{ color: 'var(--foreground)' }}>
                    {m.idea}
                  </p>
                  <p className="text-[12px] leading-[1.8]" style={{ color: 'var(--color-muted)' }}>
                    入れる言葉の例：{m.words}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-[13px] mt-10">
              <Link href="/blog/shunen-mongon-rei" className="underline underline-offset-4" style={{ color: 'var(--color-accent)' }}>
                周年記念品に入れる文言の例をもっと見る →
              </Link>
            </p>
          </div>
        </section>

        {/* スケジュール */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="serif text-xl font-medium text-center mb-4" style={{ color: 'var(--foreground)' }}>
            準備スケジュール（半年前から逆算）
          </h2>
          <p className="text-[14px] leading-[2] text-center max-w-2xl mx-auto mb-10" style={{ color: 'var(--color-muted)' }}>
            周年記念品は、文言や周年ロゴの決定、社内の承認に思った以上に時間がかかります。式典や祝賀会を開く場合は、会場の手配と並行して進めます。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] min-w-[560px]" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['時期', 'やること', '内容'].map((h) => (
                    <th
                      key={h}
                      className="text-left p-3 border-b-2 border-[var(--color-border)] font-medium"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row[0]}>
                    <td className="p-3 border-b border-[var(--color-border)] whitespace-nowrap align-top text-[var(--color-accent)]">
                      {row[0]}
                    </td>
                    <td className="p-3 border-b border-[var(--color-border)] align-top font-medium" style={{ color: 'var(--foreground)' }}>
                      {row[1]}
                    </td>
                    <td className="p-3 border-b border-[var(--color-border)] leading-[1.8] align-top" style={{ color: 'var(--color-muted)' }}>
                      {row[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[13px] mt-6" style={{ color: 'var(--color-muted)' }}>
            周年式典や祝賀会の企画・演出については
            <Link href="/blog/shunen-event-kikaku" className="underline underline-offset-4 mx-1" style={{ color: 'var(--color-accent)' }}>
              周年記念イベントの企画と演出
            </Link>
            、行事ごとの相談時期は
            <Link href="/calendar" className="underline underline-offset-4 mx-1" style={{ color: 'var(--color-accent)' }}>
              記念品の行事カレンダー
            </Link>
            にまとめています。
          </p>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* 文言・ロゴ・配り方 */}
        <section className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="serif text-xl font-medium mb-6" style={{ color: 'var(--foreground)' }}>
            周年ロゴ・文言の決め方
          </h2>
          <ul className="space-y-4 text-[14px] leading-[2]" style={{ color: 'var(--foreground)' }}>
            <li>
              <strong>要素は3つまでに絞る。</strong> 社名（またはロゴ）・周年の年号・一言のメッセージ。入れたいものが多いときは、面を分けて刻むと読みやすく仕上がります。
            </li>
            <li>
              <strong>年号の書き方を統一する。</strong> 「30th Anniversary」「創業三十周年」「1996-2026」など、案内状や式典の看板と表記をそろえると、記念品が周年事業の一部として伝わります。
            </li>
            <li>
              <strong>周年ロゴがあれば使う。</strong> 周年ロゴを作る場合は、小さく刻んでも潰れない線の太さかどうかも確認しておくと安心です。
            </li>
            <li>
              <strong>社員向けは「感謝」、取引先向けは「御礼」。</strong> 同じ品でも、相手によって言葉を変えると気持ちが伝わります。
            </li>
          </ul>

          <h2 className="serif text-xl font-medium mt-16 mb-6" style={{ color: 'var(--foreground)' }}>
            配り方・のし・個別包装
          </h2>
          <ul className="space-y-4 text-[14px] leading-[2]" style={{ color: 'var(--foreground)' }}>
            <li>
              <strong>のしの表書き</strong>は、一般に「記念品」「御礼」「創立○周年記念」などが使われます。会社や地域の慣習がある場合はそれに合わせます。
            </li>
            <li>
              <strong>社員への配布</strong>は、式典や朝礼などで手渡すと記念の意味が伝わりやすくなります。在宅勤務や拠点が多い場合は、発送の手配も早めに。
            </li>
            <li>
              <strong>取引先への配布</strong>は、挨拶回りで手渡すか、挨拶状を添えて発送します。年末年始の挨拶と時期を合わせる会社もあります。
            </li>
            <li>
              <strong>個別包装</strong>にしておくと、受付での配布や発送がスムーズです。
            </li>
          </ul>
        </section>

        {/* 名入れのヒノキ枡 */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-[11px] tracking-[0.18em] text-center mb-3 text-[var(--color-accent)]">OUR PROPOSAL</p>
            <h2 className="serif text-xl md:text-2xl font-light text-center mb-6" style={{ color: 'var(--foreground)' }}>
              記念として残すなら、名入れのヒノキ枡
            </h2>
            <p className="text-[14px] leading-[2] text-center max-w-2xl mx-auto mb-12" style={{ color: 'var(--color-muted)' }}>
              枡は「益す」に通じ、「益々のご発展を」という願いを込めて昔から祝いの場で使われてきた縁起物です。
              国産ヒノキの枡に、社名・ロゴ・周年ロゴ・創業年から周年までの年号を刻み、手元に長く残る記念品にします。
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: '社名・ロゴ・年号を刻める',
                  desc: '社名、企業ロゴ、周年ロゴ、「1996-2026」のような年号、メッセージを、枡の1面から4面まで自由にレイアウトします。',
                },
                {
                  title: '焼印とレーザー刻印を使い分け',
                  desc: '焼印は銅版で押す伝統の技法で、温かみのある風合い。同じ柄をまとめて作るのに向きます（初回は版の製作が必要）。レーザー刻印は版が不要で、細かな線や1個ずつ違う名前にも対応します。',
                },
                {
                  title: 'ロゴデータがなくても大丈夫',
                  desc: '名刺や看板、パンフレットの写真からロゴを起こして刻印します。文章を送っていただくだけで、書体とレイアウトはこちらで組みます。',
                },
                {
                  title: '仕上がりイメージは無料。稟議にも回せる',
                  desc: 'ご注文の前に、お見積りと一緒に仕上がりイメージをお送りします。社内で回覧・承認を取ってからご注文いただけます。',
                },
                {
                  title: '1個から大口まで',
                  desc: '名入れは1個から。来賓用の数個から、社員全員分・取引先分の大口まで、数量に応じてお見積りします。',
                },
                {
                  title: '請求書払い・納期のご相談',
                  desc: '法人のお客様は請求書払い（月末締め翌月末払い）に対応。名入れは約3週間、100個以上は3〜4週間が目安です。',
                },
              ].map((item) => (
                <div key={item.title} className="bg-[var(--background)] p-6 rounded-sm">
                  <h3 className="serif text-base font-medium mb-3" style={{ color: 'var(--foreground)' }}>
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-[13px] mt-10" style={{ color: 'var(--color-muted)' }}>
              酒器としてはもちろん、ペン立てや小物入れとしてデスクにも置けるので、お酒を飲まない方にもお渡しできます。
            </p>
          </div>
        </section>

        {/* 実績 */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
            周年記念枡の実績
          </h2>
          <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
            <Image
              src={KURA_MASTER.image.src}
              alt={KURA_MASTER.ja.imageAlt}
              width={KURA_MASTER.image.width}
              height={KURA_MASTER.image.height}
              sizes="(max-width: 768px) 100vw, 280px"
              className="w-full max-w-[280px] mx-auto rounded-sm"
            />
            <div>
              <p className="text-[11px] tracking-[0.18em] mb-2 text-[var(--color-accent)]">
                PARIS — {KURA_MASTER.edition}
              </p>
              <h3 className="serif text-lg font-light mb-4" style={{ color: 'var(--foreground)' }}>
                {KURA_MASTER.ja.title}
              </h3>
              <p className="text-[14px] leading-[2] mb-3" style={{ color: 'var(--foreground)' }}>
                {KURA_MASTER.ja.lead}
                {KURA_MASTER.ja.use}
              </p>
              <p className="text-[13px] leading-[1.9] mb-6" style={{ color: 'var(--color-muted)' }}>
                {KURA_MASTER.ja.detail}
              </p>
              <p className="text-[13px] leading-[1.9] mb-6" style={{ color: 'var(--color-muted)' }}>
                このほかにも、大手化学メーカー、大手ホテル、カフェなど、業種を問わず多くの企業・店舗からご注文をいただいています。
              </p>
              <Link href="/works" className="text-[13px] underline underline-offset-4" style={{ color: 'var(--color-accent)' }}>
                制作実績を見る →
              </Link>
            </div>
          </div>
        </section>

        {/* ご注文の流れ */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
              ご注文の流れ
            </h2>
            <div className="grid sm:grid-cols-5 gap-6">
              {[
                { step: '01', title: 'ご相談', desc: '配る相手・数量・入れたい内容・お渡しの日をお知らせください' },
                { step: '02', title: '見積り＋仕上がりイメージ', desc: '仕上がりイメージを無料でお送りします' },
                { step: '03', title: '社内確認・ご注文', desc: 'イメージと金額を社内で確認してからご判断' },
                { step: '04', title: '製作', desc: '名入れは約3週間、100個以上は3〜4週間' },
                { step: '05', title: '検品・納品', desc: '検品のうえ梱包してお届け' },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <span className="text-[11px] text-[var(--color-accent)]">{s.step}</span>
                  <p className="serif text-sm font-medium mt-1 mb-2" style={{ color: 'var(--foreground)' }}>
                    {s.title}
                  </p>
                  <p className="text-[12px] leading-[1.7]" style={{ color: 'var(--color-muted)' }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="serif text-xl font-medium text-center mb-12" style={{ color: 'var(--foreground)' }}>
            周年記念品のよくあるご質問
          </h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details key={item.q} className="group bg-[var(--color-subtle)] rounded-sm">
                <summary
                  className="cursor-pointer p-5 text-[14px] font-medium list-none flex items-center justify-between"
                  style={{ color: 'var(--foreground)' }}
                >
                  {item.q}
                  <span className="ml-4 text-[var(--color-muted)] group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <p className="px-5 pb-5 text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 見積り */}
        <QuickQuote
          id="offer-quote"
          formType="quick-quote-anniversary"
          heading="周年記念品を相談する"
          lead="用途・サイズ・個数を選んで連絡先を入れるだけ。周年の年号や社名、お渡しの日が分かる範囲で構いません。通常1〜2営業日以内に、お見積りと仕上がりイメージをお送りします。"
          className="bg-[var(--color-subtle)]"
        />

        {/* 関連 */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-[13px] leading-[2]" style={{ color: 'var(--color-muted)' }}>
            周年式典や鏡開きの手配は
            <Link href="/business/ceremony" className="underline underline-offset-4 mx-1" style={{ color: 'var(--color-accent)' }}>
              式典・鏡開きの枡
            </Link>
            、法人のご注文全般は
            <Link href="/business" className="underline underline-offset-4 mx-1" style={{ color: 'var(--color-accent)' }}>
              法人のお客様
            </Link>
            をご覧ください。
          </p>
        </section>
      </main>
    </>
  )
}
