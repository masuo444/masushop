import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'
import OrderMadeForm from '@/components/forms/OrderMadeForm'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'オリジナル枡を1個から｜文章を送るだけでデザイン制作',
  description:
    'オリジナル枡を1個からご相談いただけます。入れたい文章やメッセージを送るだけで、書体・レイアウトのデザイン制作からお引き受け。デザインデータは不要です。名入れ・写真・手書き文字・外国語にも対応。国産ヒノキの枡に刻んで、世界に一つの贈り物や記念品に。',
  keywords:
    'オリジナル枡,オリジナル枡 1個,オリジナル枡 作成,オリジナル枡 制作,オリジナルデザイン 枡,オーダーメイド 枡,枡 名入れ 1個,枡 一点もの,枡 プレゼント 名入れ,世界に一つ 枡,特注 枡,枡 記念品 1個',
  alternates: { canonical: `${baseUrl}/original` },
  openGraph: {
    title: 'オリジナル枡を1個から｜文章を送るだけでデザイン制作',
    description:
      '文章やメッセージを送るだけで、デザイン制作から名入れまでお任せ。オリジナル枡を1個からご相談いただけます。',
    type: 'website',
    url: `${baseUrl}/original`,
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const differences = [
  {
    title: 'デザインデータは要りません',
    desc: '入れたい文章やメッセージを送っていただくだけ。書体・大きさ・配置はこちらで組んで、仕上がりのイメージをお送りします。画像ソフトを触る必要はありません。',
  },
  {
    title: '国産ヒノキの枡に刻みます',
    desc: '印刷用の既製品ではなく、日本酒の酒器として使われてきた国産ヒノキの枡。手に取ったときの香りと木目が、贈り物としての価値を決めます。',
  },
  {
    title: '相談しながら決められます',
    desc: '「還暦のお祝いにしたい」「英語で入れたい」だけで大丈夫。サイズも刻み方も、用途をお聞きしてからご提案します。納得いただいてから製作に入ります。',
  },
]

const scenes = [
  {
    title: '大切な人への贈り物',
    desc: '名前と日付を刻んだ枡は、その人だけのものになります。誕生日、記念日、還暦、退職。「おめでとう」を形にして残せます。',
  },
  {
    title: '海外の友人へのプレゼント',
    desc: '英語やポルトガル語などのメッセージも刻印できます。日本の伝統工芸品として、言葉と一緒に想いが伝わります。',
  },
  {
    title: 'プロポーズ・結婚の記念に',
    desc: '「益す＝増す」の縁起物。ふたりの名前と日付を入れたペアの枡は、指輪とは違う形の記念になります。',
  },
  {
    title: '手書きの文字をそのまま',
    desc: 'お子さまの字、故人の筆跡、自分で描いたイラスト。撮影した画像からデータ化して、そのまま枡に刻めます。',
  },
  {
    title: 'お店・施設の一点もの',
    desc: '屋号を入れた看板枡、カウンターに置く特別な一客。数は少なくても、こだわった一点をお作りします。',
  },
  {
    title: 'まだ形になっていない相談',
    desc: '「こんなことできますか？」の段階で構いません。用途をお聞きして、サイズも仕上げも一緒に決めていきます。',
  },
]

const capabilities = [
  {
    category: '刻めるもの',
    items: [
      '名前・日付・メッセージ（文章を送るだけ）',
      '写真・似顔絵',
      '手書きの文字・イラスト',
      '英語・多言語のメッセージ',
      'ロゴ・家紋・QRコード',
    ],
  },
  {
    category: '選べる仕様',
    items: [
      '全7サイズ（54ml〜1,800ml）',
      '国産ヒノキ（日本製）',
      '1面〜4面への刻印',
      '蓋つき（三勺枡・一合枡）',
      '食品衛生法対応コーティング',
    ],
  },
  {
    category: '仕上げ・お届け',
    items: [
      'クリアケース・白箱（一合枡）',
      'ヒノキの削り節で梱包',
      '納期の目安は約2〜3週間',
      '海外発送に対応',
      'ご相談・お見積りは無料',
    ],
  },
]

const designPoints = [
  {
    title: '文章を送るだけでOK',
    desc: '入れたい言葉、お名前、日付。それだけお送りください。デザインデータをご用意いただく必要はありません。',
  },
  {
    title: '書体もレイアウトもお任せ',
    desc: '枡の面の大きさと木目を見ながら、書体・文字の大きさ・配置を組みます。仕上がりのイメージをお送りします。',
  },
  {
    title: '納得いくまで調整',
    desc: '「もう少し小さく」「この行だけ書体を変えたい」。ご確認いただいてから製作に入るので、仕上がりで驚くことはありません。',
  },
]

const flow = [
  {
    step: '01',
    title: 'ご相談',
    desc: '下のフォームから、入れたい文章や用途をお知らせください。デザインデータは不要です。決まっていない部分は空欄で構いません。',
  },
  {
    step: '02',
    title: 'ご提案・お見積り',
    desc: '通常1〜2営業日以内にご返信します。サイズと刻印方法のおすすめ、金額と納期をお伝えします。',
  },
  {
    step: '03',
    title: 'デザイン制作・ご確認',
    desc: 'いただいた文章から、書体・レイアウトをこちらで作成します。仕上がりのイメージをお送りし、納得いただけるまで調整します。',
  },
  {
    step: '04',
    title: '製作',
    desc: '国産ヒノキから、職人の手で一つひとつ仕上げます。目安は約2〜3週間です。',
  },
  {
    step: '05',
    title: '検品・お届け',
    desc: '一点ずつ検品し、ヒノキの削り節を緩衝材にして梱包してお届けします。海外発送も承ります。',
  },
]

const faqItems = [
  {
    q: 'オリジナル枡とは、どんなものが作れますか？',
    a: '国産ヒノキの枡に、お名前・日付・メッセージ・手書きの文字・写真・ロゴなどを刻んだ、世界に一つの枡です。贈り物、結婚やプロポーズの記念、還暦や退職のお祝い、お店の看板枡など、用途に合わせて1個からお作りします。',
  },
  {
    q: 'デザインのデータを用意できないのですが、頼めますか？',
    a: 'はい、そのままお任せいただけます。入れたい文章やメッセージ、お名前と日付をお送りいただければ、書体選び・レイアウト・配置の調整までこちらで行います。仕上がりのイメージをお送りしてご確認いただいてから製作に入りますので、デザインの知識は必要ありません。',
  },
  {
    q: '文章の内容から一緒に考えてもらえますか？',
    a: 'はい。「還暦のお祝いに贈りたい」「お店の開店記念に置きたい」といった用途をお聞かせいただければ、言葉の候補からご提案します。決まった文章がなくてもご相談ください。',
  },
  {
    q: '本当に1個だけでも注文できますか？',
    a: 'はい、オリジナル枡は1個からご相談を承ります。無地の枡をまとめて購入される場合（10個から）とは別の扱いで、内容をお伺いしてお見積りをお出しします。',
  },
  {
    q: '1個だけ作る場合、焼印とレーザー刻印どちらがいいですか？',
    a: '一点ものの場合はレーザー刻印をおすすめすることが多いです。写真や細かい文字、手書きの線までそのまま再現できます。焼印は約400度の銅版を押す伝統技法で、味わいのある焦げ茶の仕上がりになりますが、専用の版を製作するため一点ものには向かない場合があります。ご相談内容をお聞きして、どちらが合うかご提案します。',
  },
  {
    q: '手書きの文字やイラストも入れられますか？',
    a: 'はい。手書きの文字やイラストをスキャン、またはスマートフォンで撮影した画像をお送りいただければ、データ化して刻印いたします。お子さまが書いた字や、思い出のある筆跡をそのまま残せます。',
  },
  {
    q: '英語や日本語以外のメッセージも刻印できますか？',
    a: 'はい、対応しています。ローマ字のお名前や英文メッセージのほか、他言語の文字も画像データとして刻印可能です。海外の方への贈り物としてご利用いただいています。',
  },
  {
    q: '納期はどのくらいかかりますか？',
    a: '通常2〜3週間程度で製作・発送いたします。お急ぎの場合も可能な限り対応いたしますので、ご希望の日付をフォームにご記入ください。',
  },
  {
    q: '写真を刻印することはできますか？',
    a: 'レーザー刻印なら濃淡の表現ができるため、写真や似顔絵の刻印にも対応できます。仕上がりのイメージは事前にお送りしてご確認いただきます。',
  },
  {
    q: '海外へ送ってもらえますか？',
    a: 'はい、海外発送に対応しています。アジア・北米・ヨーロッパなど世界各地への発送実績がございます。',
  },
  {
    q: '見積りだけお願いすることはできますか？',
    a: 'もちろんです。ご相談・お見積りは無料で、その後にしつこい営業をすることはありません。「できるかどうかだけ知りたい」というご相談も歓迎します。',
  },
]

export default function OriginalPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: 'オリジナル枡', href: `${baseUrl}/original` },
        ]}
      />
      <FAQJsonLd items={faqItems} />
      <SpeakableJsonLd
        url={`${baseUrl}/original`}
        cssSelectors={['[data-speakable]']}
      />
      <HowToJsonLd
        name="オリジナル枡を1個から作る方法"
        description="入れたい文章やメッセージを送るだけで、デザイン制作から名入れ・製作まで。オリジナル枡が完成するまでの流れ。"
        steps={flow.map((f) => ({ name: f.title, text: f.desc }))}
      />

      <main className="min-h-screen bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumb
            items={[{ label: 'ホーム', href: '/' }, { label: 'オリジナル枡' }]}
          />
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-16 text-center">
          <p className="text-[11px] tracking-[0.2em] text-[var(--color-accent)] mb-4">
            ORIGINAL MASU
          </p>
          <h1
            className="serif text-3xl md:text-4xl font-light leading-relaxed mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            オリジナル枡を、1個から。
            <br />
            デザインはこちらで。
          </h1>
          <p
            className="text-[15px] leading-[2] max-w-2xl mx-auto"
            style={{ color: 'var(--color-muted)' }}
          >
            入れたい文章やメッセージを送っていただければ、デザインの制作からお引き受けします。
            書体もレイアウトもお任せください。国産ヒノキの枡に刻んで、
            一個のご依頼からお作りします。
          </p>
          <div className="mt-10">
            <Link
              href="#form"
              className="inline-block px-8 py-3 text-sm text-white rounded-sm"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              無料で相談する
            </Link>
            <p
              className="text-[11px] mt-4"
              style={{ color: 'var(--color-muted)' }}
            >
              1個からOK ／ デザイン制作までお任せ ／ ご相談・お見積り無料
            </p>
          </div>
        </section>

        {/* 定義（AI・検索向けの要点） */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <div
            data-speakable
            className="rounded-sm border border-[var(--color-border)] p-6"
          >
            <p
              className="text-[13px] leading-[2]"
              style={{ color: 'var(--color-muted)' }}
            >
              <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>
                オリジナル枡とは
              </strong>
              、名前・日付・メッセージ・ロゴ・写真などを木製の枡に刻んだ、世界に一つの枡のことです。
              枡の専門店MASU-STOREでは、国産ヒノキのオリジナル枡を
              <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>1個からご相談</strong>
              いただけます。デザインデータは不要で、入れたい文章を送るだけで書体・レイアウトの制作から対応します。
              納期の目安は約2〜3週間、海外発送にも対応しています。
            </p>
          </div>
        </section>

        {/* Sample */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <h2
            className="serif text-xl font-medium text-center mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            刻印の仕上がりサンプル
          </h2>
          <p
            className="text-[13px] text-center mb-10 leading-[1.9]"
            style={{ color: 'var(--color-muted)' }}
          >
            レーザー刻印の仕上がり例です。文字・ロゴ・イラストも、この精度で木目とともに刻めます。
            企業ロゴ・社名を入れる場合は{' '}
            <Link href="/logo" style={{ textDecoration: 'underline' }}>
              ロゴ入れのページ
            </Link>
            、頼み方や納期は{' '}
            <Link href="/order" style={{ textDecoration: 'underline' }}>
              依頼方法のページ
            </Link>
            {' '}にまとめています。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Image
              src="/images/works/ishiwa-ashiyu-front.jpg"
              alt="レーザー刻印を施した一合枡のサンプル — 正面"
              width={1448}
              height={1086}
              className="w-full rounded-sm"
            />
            <Image
              src="/images/works/ishiwa-ashiyu-detail.jpg"
              alt="レーザー刻印の彫りの質感 — 細部まで木目とともに再現"
              width={1536}
              height={1024}
              className="w-full rounded-sm"
            />
            <Image
              src="/images/works/ishiwa-ashiyu-hand.jpg"
              alt="手のひらに載る一合枡のサイズ感"
              width={1448}
              height={1086}
              className="w-full rounded-sm"
            />
          </div>
          <p
            className="text-[12px] mt-4 text-center"
            style={{ color: 'var(--color-muted)' }}
          >
            サンプル：一合枡・レーザー刻印
          </p>
        </section>

        {/* Differences */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2
              className="serif text-xl font-medium text-center mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              MASU-STOREのオリジナル枡、3つの違い
            </h2>
            <p
              className="text-[13px] text-center mb-12 leading-[1.9]"
              style={{ color: 'var(--color-muted)' }}
            >
              「自分でデータを作ってアップロードする」方式ではありません。
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {differences.map((item, i) => (
                <div
                  key={item.title}
                  className="bg-[var(--background)] p-6 rounded-sm"
                >
                  <p
                    className="serif text-[13px] mb-3"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    0{i + 1}
                  </p>
                  <h3
                    className="serif text-base font-medium mb-2"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[13px] leading-[1.9]"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scenes */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2
            className="serif text-xl font-medium text-center mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            こんなご相談をいただいています
          </h2>
          <p
            className="text-[13px] text-center mb-12 leading-[1.9]"
            style={{ color: 'var(--color-muted)' }}
          >
            数は一つでも、込める意味は一つひとつ違います。
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            {scenes.map((item) => (
              <div
                key={item.title}
                className="border border-[var(--color-border)] p-6 rounded-sm"
              >
                <h3
                  className="serif text-base font-medium mb-2"
                  style={{ color: 'var(--foreground)' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[13px] leading-[1.9]"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Design */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2
              className="serif text-xl font-medium text-center mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              デザインは、こちらでお作りします
            </h2>
            <p
              className="text-[13px] text-center mb-12 leading-[1.9]"
              style={{ color: 'var(--color-muted)' }}
            >
              「こんな言葉を入れたい」だけ決まっていれば大丈夫です。
              <br className="hidden sm:block" />
              デザインの知識も、データの用意も必要ありません。
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {designPoints.map((item) => (
                <div
                  key={item.title}
                  className="bg-[var(--background)] p-6 rounded-sm"
                >
                  <h3
                    className="serif text-base font-medium mb-2"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[13px] leading-[1.9]"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-[var(--background)] rounded-sm p-6 text-center">
              <p
                className="text-[13px] leading-[2]"
                style={{ color: 'var(--color-muted)' }}
              >
                お値段は、枡のサイズ・刻む内容・デザインの作り込みによって変わります。
                <br className="hidden sm:block" />
                ご相談内容をお聞きしたうえで、デザイン制作を含めたお見積りをお出しします。
                <br className="hidden sm:block" />
                <span style={{ color: 'var(--foreground)' }}>
                  ご相談とお見積りは無料です。
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2
            className="serif text-xl font-medium text-center mb-12"
            style={{ color: 'var(--foreground)' }}
          >
            できること
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {capabilities.map((group) => (
              <div
                key={group.category}
                className="border border-[var(--color-border)] p-6 rounded-sm"
              >
                <h3
                  className="text-[14px] font-medium mb-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-[13px] flex items-start gap-2"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      <span className="text-[var(--color-accent)]">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Flow */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2
              className="serif text-xl font-medium text-center mb-12"
              style={{ color: 'var(--foreground)' }}
            >
              ご相談から完成まで
            </h2>
            <div className="space-y-8">
              {flow.map((item) => (
                <div key={item.step} className="flex gap-6">
                  <span
                    className="serif text-[13px] pt-0.5 shrink-0"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <h3
                      className="text-[14px] font-medium mb-1.5"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[13px] leading-[1.9]"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="form" className="py-20">
          <div className="max-w-2xl mx-auto px-6">
            <h2
              className="serif text-xl font-medium text-center mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              オリジナル枡のご相談
            </h2>
            <p
              className="text-[13px] text-center mb-10 leading-[1.9]"
              style={{ color: 'var(--color-muted)' }}
            >
              決まっていない項目は空欄のままで構いません。
              <br />
              「こんなことできますか？」だけでもお送りください。
            </p>
            <OrderMadeForm />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[var(--color-subtle)] py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2
              className="serif text-xl font-medium text-center mb-12"
              style={{ color: 'var(--foreground)' }}
            >
              よくあるご質問
            </h2>
            <div className="space-y-6">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group bg-[var(--background)] rounded-sm"
                >
                  <summary
                    className="cursor-pointer p-5 text-[14px] font-medium list-none flex items-center justify-between gap-4"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {item.q}
                    <span className="text-[var(--color-muted)] group-open:rotate-45 transition-transform text-lg shrink-0">
                      +
                    </span>
                  </summary>
                  <p
                    className="px-5 pb-5 text-[13px] leading-[1.9]"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross links */}
        <section className="py-16 text-center">
          <p
            className="text-[13px] mb-6 leading-[1.9]"
            style={{ color: 'var(--color-muted)' }}
          >
            まとまった数のご注文・法人でのご利用をお考えの方はこちらへ。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/business"
              className="inline-block px-8 py-3 text-sm border border-[var(--color-border)] rounded-sm"
              style={{ color: 'var(--foreground)' }}
            >
              法人向けサービス
            </Link>
            <Link
              href="/products"
              className="inline-block px-8 py-3 text-sm border border-[var(--color-border)] rounded-sm"
              style={{ color: 'var(--foreground)' }}
            >
              枡の商品一覧を見る
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
