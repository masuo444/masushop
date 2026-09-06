import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'
import OrderMadeForm from '@/components/forms/OrderMadeForm'
import Differentiators from '@/components/ui/Differentiators'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'オーダーメイドの記念品・名入れギフトを1個から',
  description:
    '退職祝い、還暦祝い、周年記念、開店祝い、結婚祝いに。名前・日付・メッセージを刻んだオーダーメイドの記念品を1個からお作りします。デザインデータは不要で、入れたい文章を送るだけで書体・レイアウトの制作までお引き受け。国産ヒノキの器に刻む、世界に一つの贈り物です。',
  keywords:
    'オーダーメイド 記念品,名入れ ギフト,名入れ 記念品,オリジナル 記念品,記念品 オーダーメイド,名入れ プレゼント 1個から,オーダーメイド プレゼント,世界に一つ プレゼント,デザイン お任せ 名入れ,データなし 名入れ,退職祝い 記念品,還暦祝い 記念品,周年記念品,開店祝い ギフト,名入れ ギフト おしゃれ,和風 記念品',
  alternates: { canonical: `${baseUrl}/order-made` },
  openGraph: {
    title: 'オーダーメイドの記念品・名入れギフトを1個から',
    description:
      '名前・日付・メッセージを刻んだオーダーメイドの記念品を1個から。デザインデータ不要、入れたい文章を送るだけで制作します。',
    type: 'website',
    url: `${baseUrl}/order-made`,
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const scenes = [
  {
    scene: '退職祝い・送別',
    desc: '在籍年数と部署名、送る側の連名。「お疲れさまでした」の一文を添えて。デスクに置いても邪魔にならず、花束のように枯れません。',
  },
  {
    scene: '還暦・長寿のお祝い',
    desc: '生年月日と名前を刻んで。お酒が好きな方なら、そのまま酒器として毎日使えます。使うたびに贈った人を思い出してもらえる贈り物です。',
  },
  {
    scene: '周年記念・創業記念',
    desc: '社名ロゴと「創業50周年」の文字。取引先への配布と社員への記念品を同じデザインで揃えられます。数量が増えるほど単価は下がります。',
  },
  {
    scene: '開店祝い・開業祝い',
    desc: '屋号を刻んだ一点もの。「益す＝増す」に通じる縁起物なので、商売の門出を祝う理由がきちんと立ちます。店頭に置いても様になります。',
  },
  {
    scene: '結婚祝い・引き出物',
    desc: 'ふたりの名前と日付を入れたペア。指輪や食器とは違う、和の記念の形です。ゲストへの引き出物として同じデザインで数を揃えることもできます。',
  },
  {
    scene: '表彰・社内アワード',
    desc: '受賞者の名前と受賞名を1個ずつ変えて刻めます。レーザー刻印なら版が不要なので、全員違う内容でも追加の手間はかかりません。',
  },
  {
    scene: '海外の方への贈り物',
    desc: '英語などのメッセージも刻印できます。日本製の伝統工芸品として、言葉と一緒に想いが伝わります。海外発送にも対応しています。',
  },
  {
    scene: 'まだ決まっていない',
    desc: '「何を贈るか決まっていない」段階のご相談で構いません。贈る相手とご予算、シーンをお聞かせいただければ、こちらからご提案します。',
  },
]

const designSteps = [
  {
    step: '01',
    title: '入れたい言葉を送る',
    desc: 'お名前、日付、メッセージ。それだけで構いません。整った文章になっていなくても大丈夫です。決まっていなければ、贈るシーンからこちらで言葉の候補をご提案します。',
  },
  {
    step: '02',
    title: 'こちらで書体とレイアウトを組む',
    desc: '面の大きさと木目を見ながら、書体・文字の大きさ・配置を組みます。デザインソフトを触る必要も、デザイナーを探す必要もありません。',
  },
  {
    step: '03',
    title: '仕上がりのイメージを確認する',
    desc: '刻む前に完成イメージをお送りします。「もう少し小さく」「この行だけ書体を変えたい」といった修正は何度でも無料です。',
  },
  {
    step: '04',
    title: '納得してから製作',
    desc: 'ご確認いただいてから刻印に入るので、届いてから「思っていたのと違う」ということが起きません。目安は約2〜3週間です。',
  },
]

const engravableItems = [
  '名前・日付・メッセージ',
  '企業ロゴ・社名・屋号',
  '手書きの文字・イラスト',
  '写真・似顔絵',
  '英語・多言語のメッセージ',
  '家紋・QRコード',
]

const faqItems = [
  {
    q: 'オーダーメイドの記念品を1個だけ頼めますか？',
    a: 'はい、名入れをする一点ものは1個からご相談を承ります。「1個だけ作ってくれるところが見つからない」という理由でご相談いただくことがよくあります。無地のものをまとめて購入される場合は10個からの受注です。',
  },
  {
    q: 'デザインのデータがありません。それでも頼めますか？',
    a: 'はい、そのままお任せいただけます。入れたい文章・お名前・日付をお送りいただければ、書体選び・レイアウト・配置の調整までこちらで行います。デザインソフトを触る必要も、デザイナーを探す必要もありません。仕上がりのイメージをお送りしてご確認いただいてから製作します。',
  },
  {
    q: '何を刻むか決まっていないのですが、相談できますか？',
    a: 'はい。「還暦のお祝いに贈りたい」「退職される方へ」といった贈るシーンをお聞かせいただければ、言葉の候補からご提案します。何を贈るか自体が決まっていない段階のご相談でも構いません。',
  },
  {
    q: '記念品として何を作ってもらえるのですか？',
    a: '国産ヒノキの枡（ます）に名入れをした記念品をお作りしています。枡は約1300年前から日本で使われてきた木の器で、「益す＝増す」に通じる縁起物として、祝い事の贈り物に選ばれてきました。日本酒の酒器としても、小物入れやペン立てとしても日常的に使えます。',
  },
  {
    q: '名入れはどうやって刻むのですか？',
    a: '約400度の銅版を押す焼印と、細部まで再現できるレーザー刻印の2通りです。写真や手書きの文字、1個ずつ違う内容を刻む場合はレーザー刻印、同じデザインを大量に入れる場合は焼印が向いています。内容と数量をお伺いして、適した方をご提案します。',
  },
  {
    q: '手書きの文字や写真も入れられますか？',
    a: 'はい。手書きの文字・イラスト・写真・似顔絵をスキャン、またはスマートフォンで撮影した画像をお送りいただければ、データ化して刻印します。お子さまが書いた字や、思い出のある筆跡をそのまま残せます。',
  },
  {
    q: '費用はいくらかかりますか？',
    a: 'サイズ・数量・刻む内容・刻印方法によって変わるため、お見積りでご案内しています。ご相談・お見積りは無料で、その後にしつこい営業をすることはありません。「予算感だけ知りたい」というご相談も歓迎します。',
  },
  {
    q: 'どのくらいで届きますか？',
    a: '名入れをする場合は約3週間、無地の場合は約2週間、300個以上の大口注文は約4週間が目安です。デザインのご確認にかかる期間によって前後します。お急ぎの場合はご希望の日付をお知らせください。',
  },
]

export default function OrderMadePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: 'オーダーメイドの記念品・名入れギフト', href: `${baseUrl}/order-made` },
        ]}
      />
      <FAQJsonLd items={faqItems} />
      <SpeakableJsonLd url={`${baseUrl}/order-made`} cssSelectors={['[data-speakable]']} />
      <HowToJsonLd
        name="メッセージを送るだけでオーダーメイドの記念品を作る方法"
        description="入れたい言葉を送るところから、書体・レイアウトの制作、仕上がりの確認、製作まで。デザインデータは不要です。"
        steps={designSteps.map((f) => ({ name: f.title, text: f.desc }))}
      />

      <main className="min-h-screen bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumb
            items={[{ label: 'ホーム', href: '/' }, { label: 'オーダーメイドの記念品' }]}
          />
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-16 text-center">
          <p className="text-[11px] tracking-[0.2em] text-[var(--color-accent)] mb-4">
            ORDER MADE
          </p>
          <h1
            className="serif text-3xl md:text-4xl font-light leading-relaxed mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            贈る言葉を送るだけで、
            <br />
            記念品になります。
          </h1>
          <p
            data-speakable
            className="text-sm md:text-[15px] leading-[2] max-w-2xl mx-auto mb-8"
            style={{ color: 'var(--color-muted)' }}
          >
            退職祝い、還暦祝い、周年記念、開店祝い、結婚祝い。
            名前・日付・メッセージを刻んだオーダーメイドの記念品を
            <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>1個から</strong>
            お作りします。
            <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>
              デザインデータは要りません。
            </strong>
            入れたい文章を送っていただければ、書体もレイアウトもこちらで組みます。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/custom" className="btn-primary">
              相談してみる
            </Link>
            <Link href="/order" className="btn-outline">
              依頼方法・納期を見る
            </Link>
          </div>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        <Differentiators heading="他で頼みにくいところを、引き受けます" />

        <div className="divider max-w-4xl mx-auto" />

        {/* シーン別 */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-4 text-center">こんな場面で選ばれています</h2>
          <p
            className="text-[13px] text-center mb-10 leading-[1.9]"
            style={{ color: 'var(--color-muted)' }}
          >
            贈る相手とシーンが決まっていれば、あとはこちらでご提案できます。
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {scenes.map((item) => (
              <div
                key={item.scene}
                className="rounded-sm p-6"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <h3 className="serif text-lg mb-3">{item.scene}</h3>
                <p className="text-sm leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* デザイン制作の流れ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-4 text-center">
            デザインは、こちらで起こします
          </h2>
          <p
            data-speakable
            className="text-[13px] text-center mb-10 leading-[1.9] max-w-2xl mx-auto"
            style={{ color: 'var(--color-muted)' }}
          >
            名入れの依頼で一番の壁になるのが「デザインデータの用意」です。
            当店はそこを引き受けます。入れたい言葉を送るだけで、あとは仕上がりを確認するだけです。
          </p>
          <ol className="space-y-6">
            {designSteps.map((item) => (
              <li key={item.step} className="flex gap-5">
                <span
                  className="serif text-lg shrink-0 pt-0.5"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {item.step}
                </span>
                <div>
                  <h3 className="text-sm font-medium mb-2">{item.title}</h3>
                  <p className="text-sm leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* 何に刻むのか = 枡の紹介 */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-4 text-center">刻むのは、枡（ます）です</h2>
          <div className="grid gap-8 md:grid-cols-2 md:items-center mt-10">
            <Image
              src="/images/works/ishiwa-ashiyu-front.jpg"
              alt="名入れをした国産ヒノキの枡 — オーダーメイド記念品の仕上がり例"
              width={1448}
              height={1086}
              className="w-full rounded-sm"
            />
            <div>
              <p
                data-speakable
                className="text-sm leading-[2] mb-4"
                style={{ color: 'var(--color-muted)' }}
              >
                枡（ます）は、約1300年前から日本で使われてきた木の器です。
                「益す＝増す」に通じることから縁起物とされ、祝い事の贈り物として選ばれてきました。
                当店では国産ヒノキの枡に、職人の手で名入れをします。
              </p>
              <p className="text-sm leading-[2] mb-6" style={{ color: 'var(--color-muted)' }}>
                日本酒の酒器としてはもちろん、小物入れやペン立てとしても使えます。
                飾って終わりの記念品と違い、日常で手に取ってもらえるのが選ばれている理由です。
                サイズは54mlの小さなものから1800mlの大きなものまで7種類あります。
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <Link
                  href="/products/sizes"
                  className="text-[13px] underline underline-offset-4"
                  style={{ color: 'var(--color-accent)' }}
                >
                  サイズを比較する →
                </Link>
                <Link
                  href="/history"
                  className="text-[13px] underline underline-offset-4"
                  style={{ color: 'var(--color-accent)' }}
                >
                  枡の歴史を知る →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-sm font-medium mb-4 text-center">刻めるもの</h3>
            <ul className="flex flex-wrap justify-center gap-x-3 gap-y-3">
              {engravableItems.map((item) => (
                <li
                  key={item}
                  className="rounded-sm px-4 py-2 text-[13px]"
                  style={{
                    background: 'var(--color-subtle)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-muted)',
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* 関連ページ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-10 text-center">目的別のご案内</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                title: '一点ものを贈りたい',
                desc: '1個からのオリジナル枡。手書きの文字や写真の刻印にも対応します。',
                href: '/original',
              },
              {
                title: '企業ロゴを入れたい',
                desc: '社名・屋号の刻印。ロゴデータが無くても、名刺の写真から起こせます。',
                href: '/logo',
              },
              {
                title: 'まとまった数が必要',
                desc: 'ノベルティ・周年記念品・式典用。数量に応じた割引と請求書払いに対応。',
                href: '/business',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm p-6 block transition-opacity hover:opacity-80"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <h3 className="serif text-base mb-3">{item.title}</h3>
                <p className="text-sm leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-10 text-center">よくある質問</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div
                key={item.q}
                className="pb-6"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <h3 className="text-sm font-medium mb-3">{item.q}</h3>
                <p
                  data-speakable
                  className="text-sm leading-[1.9]"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="form" className="max-w-2xl mx-auto px-6 py-16">
          <h2 className="section-title mb-4 text-center">ご相談・お見積り</h2>
          <p
            className="text-[13px] text-center mb-10 leading-[1.9]"
            style={{ color: 'var(--color-muted)' }}
          >
            贈る相手とシーン、ご予算だけで構いません。何を贈るか、何を刻むかが決まっていなくても、こちらからご提案します。ご相談・お見積りは無料です。
          </p>
          <OrderMadeForm formType="order-made" />
        </section>
      </main>
    </>
  )
}
