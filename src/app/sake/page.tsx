import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { masuSizes, faqItems } from '@/lib/masu-data'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡と日本酒 — もっきりの作法と楽しみ方',
  description:
    '枡で日本酒を飲むとなぜ美味しいのか。ヒノキチオールやフィトンチッドの科学的根拠、もっきり（盛り切り）の作法とマナー、サイズ別の選び方、枡の塩の伝統まで詳しく解説します。',
  keywords: [
    '枡 日本酒',
    'もっきり',
    '枡酒',
    '枡 飲み方',
    'もっきり 作法',
    '枡 日本酒 なぜ美味しい',
    '枡 ヒノキ 香り',
    '八勺枡 もっきり',
    '枡で飲む',
    '枡の塩',
  ].join(','),
  openGraph: {
    title: '枡と日本酒 — もっきりの作法と楽しみ方',
    description:
      'ヒノキの香りが日本酒の味わいを引き立てる理由、もっきりの正しい作法、サイズ別の選び方を詳しく解説。',
    url: `${baseUrl}/sake`,
    type: 'article',
    siteName: siteConfig.name,
    locale: 'ja_JP',
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: `${baseUrl}/sake`, languages: { ja: `${baseUrl}/sake`, en: `${baseUrl}/en/sake-cups` } },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '枡と日本酒 — もっきりの作法と楽しみ方',
  description:
    '枡で日本酒を飲むとなぜ美味しいのか。ヒノキの香り成分による科学的根拠、もっきりの作法、枡の塩の伝統まで解説。',
  author: { '@type': 'Organization', name: siteConfig.name },
  publisher: { '@type': 'Organization', name: siteConfig.name },
  mainEntityOfPage: `${baseUrl}/sake`,
}

const breadcrumbItems = [
  { name: 'ホーム', href: baseUrl },
  { name: '枡と日本酒', href: `${baseUrl}/sake` },
]

const sakeFaqItems = faqItems.filter(
  (item) =>
    item.category === '文化' ||
    item.category === '素材' ||
    item.q.includes('日本酒') ||
    item.q.includes('もっきり')
)

// Sizes relevant to sake drinking
const sakeSizes = masuSizes.filter((s) =>
  ['goshaku', 'hasshaku', 'ichigo'].includes(s.id)
)

export default function SakePage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SpeakableJsonLd url={`${baseUrl}/sake`} cssSelectors={['[data-speakable]', '.section-title']} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <FAQJsonLd items={sakeFaqItems} />

      {/* Breadcrumb */}
      <nav aria-label="パンくずリスト" className="max-w-4xl mx-auto px-6 pt-8 text-[11px] text-[var(--color-muted)]">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-[var(--foreground)] transition-colors">ホーム</Link></li>
          <li>/</li>
          <li className="text-[var(--foreground)]">枡と日本酒</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="section-title mt-4">枡と日本酒 — ヒノキの香りで味わう一杯</h1>
        <p className="mt-6 text-sm text-[var(--color-muted)] leading-[2] max-w-2xl mx-auto">
          ヒノキの枡に注がれた日本酒は、グラスでは味わえない特別な美味しさを持っています。<br />
          その理由、もっきりの作法、枡酒の楽しみ方を解説します。
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-8">
        <Image
          src="/images/generated/mokkiri.jpg"
          alt="もっきり — グラスから枡に溢れる日本酒"
          width={800}
          height={500}
          style={{ width: '100%', height: 'auto' }}
          className="rounded"
        />
      </div>

      {/* Quick Answer */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div data-speakable className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-8 rounded">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)] mb-3">なぜ枡で飲むと美味しいのか</p>
          <p className="text-sm leading-[2.2] text-[var(--foreground)]">
            ヒノキ枡には「ヒノキチオール」と「フィトンチッド」という天然の芳香成分が含まれています。枡に日本酒を注ぐと、ヒノキの爽やかな香りが日本酒の風味と調和し、グラスでは味わえない独特のまろやかさと奥行きが生まれます。木肌から微かに溶け出す成分が日本酒に優しいまろやかさを加えるため、同じ銘柄でも枡で飲むと味わいが変わるのです。
          </p>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* なぜ美味しいのか — 科学的根拠 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-8">
          なぜ枡で飲むと美味しいのか
        </h2>
        <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
          <p>
            枡で日本酒を飲んだとき、多くの人が「いつもより美味しい」と感じます。これは単なる雰囲気の効果ではなく、ヒノキの成分による科学的な裏付けがあります。
          </p>
          <p>
            ヒノキに含まれる代表的な香り成分が「ヒノキチオール」と「フィトンチッド」です。ヒノキチオールは強い抗菌作用を持つ成分で、歯磨き粉や化粧品にも使われています。フィトンチッドは植物が自らを守るために放出する揮発性物質で、森林浴のリラックス効果の正体とされています。
          </p>
          <p>
            枡に日本酒を注ぐと、液体の温度とアルコールの作用でこれらの香り成分が枡の木肌から揮発します。日本酒のフルーティーな吟醸香やまろやかな米の旨味に、ヒノキの清涼感のある香りが加わることで、複雑で奥行きのある味わいが生まれるのです。
          </p>
          <p>
            さらに、枡の木肌が持つ微細な凹凸にも注目すべき効果があります。日本酒が木肌に触れることで、ごくわずかに空気が含まれ、酒が「開く」状態になります。ワインをデキャンタージュするのと似た原理で、香りが立ちやすくなり、味わいがまろやかに感じられるのです。
          </p>
          <p>
            また、木の器で飲むという行為そのものが、五感を通じた体験を豊かにします。手に伝わる木のぬくもり、唇に触れる角の感触、目に映る木目の美しさ——こうした感覚的な要素が相まって、枡で飲む日本酒を特別な体験にしています。
          </p>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* もっきりの文化 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-8">
          もっきり（盛り切り）の文化
        </h2>
        <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
          <h3 className="text-base font-medium mt-8 mb-4">もっきりとは何か</h3>
          <p>
            「もっきり」は「盛り切り」が語源とされる日本酒の提供スタイルです。居酒屋や日本酒バーで、枡の中にグラスを置き、グラスから溢れるまで日本酒を注ぎます。グラスの中の日本酒だけでなく、枡に溜まった日本酒も楽しめるため、「お得感」と「見た目の華やかさ」を兼ね備えた演出として日本酒ファンに愛されています。
          </p>
          <p>
            もっきりの「盛り切り」という言葉には、「器に盛れるだけ盛る」「惜しみなく注ぐ」という意味が込められています。お客様に対する気前の良さ、もてなしの心を表現する日本らしい提供方法です。
          </p>

          <h3 className="text-base font-medium mt-8 mb-4">グラスを枡に置く作法</h3>
          <p>
            もっきりでは、まず枡の中央にグラスを置きます。次に、一升瓶やとっくりから日本酒をグラスに注ぎ始めます。グラスの縁まで来たらそのまま注ぎ続け、日本酒がグラスから溢れて枡に落ちていくまで注ぎます。この「溢れる瞬間」がもっきりの醍醐味です。
          </p>
          <p>
            お店によって注ぎ方のスタイルは様々です。ゆっくりと溢れさせるお店もあれば、勢いよく注いでグラスの表面張力ぎりぎりまで盛る「てんこ盛り」スタイルのお店もあります。いずれの場合も、お店の方のサービス精神の表れとして楽しみましょう。
          </p>

          <h3 className="text-base font-medium mt-8 mb-4">八勺枡がよく使われる理由</h3>
          <p>
            もっきりに最もよく使われるのは八勺枡（76×76×51mm、容量144ml）です。この理由はサイズ感の絶妙さにあります。八勺枡は、一般的なグラス（5〜7オンス）を中に置いたときにちょうど良い余白があり、溢れた日本酒を受け止めつつも、テーブルの上で扱いやすいサイズです。
          </p>
          <p>
            一合枡（85×85×56mm）を使うお店もありますが、やや大きいため、グラスとの間に隙間ができすぎたり、持ち上げたときの安定感に欠けることがあります。八勺枡は、グラスとの一体感とテーブル上での収まりの良さから、もっきりの定番として定着しています。
          </p>

          <h3 className="text-base font-medium mt-8 mb-4">もっきりの楽しみ方・マナー</h3>
          <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded my-6">
            <ol className="space-y-3 text-sm leading-[2]">
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] flex-shrink-0">1.</span>
                まずはグラスに口をつけ、表面張力で盛り上がった部分をすすります。こぼさないように、テーブルに置いたまま屈んで飲む方も多いです。
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] flex-shrink-0">2.</span>
                グラスの液面が下がったら、グラスを持ち上げて普通に飲みます。
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] flex-shrink-0">3.</span>
                グラスの日本酒を飲み終えたら、枡に溜まった日本酒を楽しみます。枡を手に取り、角から直接飲みます。
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] flex-shrink-0">4.</span>
                枡の日本酒にはヒノキの香りが移っているため、グラスとは異なる味わいを楽しめます。この「二度美味しい」体験がもっきりの魅力です。
              </li>
            </ol>
          </div>
          <p>
            厳格なマナーやルールがあるわけではありません。お店の雰囲気や自分のスタイルに合わせて、自由に楽しんでください。大切なのは日本酒とヒノキの香りが織りなす一杯を堪能することです。
          </p>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* 枡酒の歴史 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-8">
          枡酒の歴史
        </h2>
        <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
          <p>
            枡が「酒器」として広く認知されるようになったのは、意外にも比較的最近のことです。昭和30年代（1955年〜1964年）、テレビの普及とともに居酒屋や料亭で日本酒を枡に注いで飲む映像が全国に広まりました。
          </p>
          <p>
            それ以前の枡は、あくまで米や穀物を量る計量器であり、酒器として日常的に使われていたわけではありませんでした。しかし、1959年（昭和34年）の計量法施行で尺貫法が商取引から姿を消すと、枡の用途は大きく転換します。計量器としての需要が消滅する一方で、「粋な酒の飲み方」としての枡酒が人気を博し、枡は第二の人生を歩み始めたのです。
          </p>
          <p>
            昭和の高度経済成長期には、接待や宴会の文化とともに枡酒の需要が拡大しました。正月の祝い酒を枡で飲む習慣、結婚式での鏡開き後に枡で乾杯するスタイルなど、「枡＝祝い事・めでたい席の器」というイメージが確立されていきました。
          </p>
          <p>
            近年では、日本酒ブームの世界的な広がりとともに、海外でも枡酒が注目されています。日本を訪れる外国人観光客にとって、枡で日本酒を飲む体験は日本文化を象徴する「ここでしかできない体験」として人気を集めています。
          </p>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* サイズ別おすすめ */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-8">
          日本酒用途のサイズ別おすすめ
        </h2>
        <p className="text-sm leading-[2.2] text-[var(--foreground)] mb-8">
          日本酒を枡で楽しむなら、五勺枡・八勺枡・一合枡の3サイズが候補になります。飲むシーンや好みに合わせてお選びください。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sakeSizes.map((size) => (
            <div key={size.id} className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
              <p className="serif text-lg font-light mb-1">
                {size.name}
              </p>
              <p className="text-[10px] tracking-wide text-[var(--color-muted)] mb-4">
                {size.reading} / {size.capacity}
              </p>
              <p className="text-xs leading-[2] text-[var(--color-muted)] mb-3">
                外寸: {size.size}
              </p>
              <p className="text-xs leading-[2] text-[var(--foreground)]">
                {size.id === 'goshaku' && '少量をゆっくり味わいたい方に。おちょこより大きく、ぐい呑み感覚で使える粋なサイズ。繊細な吟醸酒や大吟醸酒を少しずつ楽しむのに最適です。'}
                {size.id === 'hasshaku' && 'もっきりの定番サイズ。居酒屋でグラスの下に敷いて溢れさせるスタイルにぴったり。直接飲む場合も、程よい量で一杯を楽しめます。'}
                {size.id === 'ichigo' && '日本酒一合（180ml）がぴったり入る最も定番のサイズ。自宅で晩酌を楽しむ方、名入れギフトとして贈る方に最も選ばれています。'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* 枡で日本酒を飲む手順 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-8">
          枡で日本酒を飲む手順
        </h2>
        <div className="mb-8">
          <Image
            src="/images/generated/sake-masu.jpg"
            alt="枡で日本酒を楽しむ"
            width={800}
            height={500}
            style={{ width: '100%', height: 'auto' }}
            className="rounded"
          />
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-base font-medium mb-3">1. 新品の枡の準備</h3>
            <p className="text-sm leading-[2.2] text-[var(--foreground)]">
              新品のヒノキ枡はそのまま使えますが、ヒノキの香りが非常に強い場合があります。香りが強すぎると感じる場合は、枡に水を入れて5〜10分ほど置き、水を捨てて乾燥させてからお使いください。香りが少し穏やかになります。逆に、ヒノキの強い香りを楽しみたい方は、新品の状態でそのまま使うのがおすすめです。
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium mb-3">2. 注ぎ方</h3>
            <p className="text-sm leading-[2.2] text-[var(--foreground)]">
              日本酒を枡に注ぐ際は、枡の内壁に沿わせるようにゆっくりと注ぎます。勢いよく注ぐと泡立ちが生じ、日本酒本来の繊細な香りが飛んでしまうことがあります。七分目から八分目まで注ぐのが美しいとされますが、お好みで調整してください。
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium mb-3">3. 飲み口 — 角を使う</h3>
            <p className="text-sm leading-[2.2] text-[var(--foreground)]">
              枡で日本酒を飲むときは、四隅の角の部分に口をつけて飲みます。角から飲むことで日本酒が細く流れ込み、口当たりがなめらかになります。また、辺の部分（平らな面）から飲もうとすると液体が広がってこぼれやすいため、角から飲むのが枡の正しい飲み方です。どの角を使うかは自由ですが、木目が美しく見える向きを手前にして持つと、所作も美しく見えます。
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium mb-3">4. 塩を縁に置く伝統 — 枡の塩</h3>
            <div className="my-6">
              <Image
                src="/images/generated/masu-salt.jpg"
                alt="枡の角に塩を盛って日本酒を楽しむ"
                width={800}
                height={500}
                style={{ width: '100%', height: 'auto' }}
                className="rounded"
              />
            </div>
            <p className="text-sm leading-[2.2] text-[var(--foreground)]">
              枡の角に少量の塩を盛って日本酒を飲む「枡の塩」という伝統的な楽しみ方があります。塩をひとなめしてから日本酒を口に含むと、塩の効果で日本酒の甘みや旨味がより鮮明に感じられます。これは料理の味付けにおける塩の役割と同じ原理です。
            </p>
            <p className="text-sm leading-[2.2] text-[var(--foreground)] mt-3">
              使う塩は粗塩（あらじお）がおすすめです。精製塩よりもミネラルが豊富で、味に丸みがあるため日本酒との相性が良いとされています。枡の角にほんの少し（ひとつまみの半分程度）盛り、日本酒を一口飲むごとに少しずつ舐めながら楽しみます。
            </p>
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* FAQ */}
      {sakeFaqItems.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="serif text-2xl font-light mt-4 mb-10">
            枡と日本酒に関するよくある質問
          </h2>
          <div className="space-y-6">
            {sakeFaqItems.map((item, i) => (
              <details key={i} className="group border border-[var(--color-border)] rounded">
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer text-sm font-medium text-[var(--foreground)] hover:bg-[var(--color-subtle)] transition-colors">
                  <span>{item.q}</span>
                  <span className="flex-shrink-0 text-[var(--color-muted)] text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-sm leading-[2.2] text-[var(--color-muted)]">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      <div className="divider max-w-4xl mx-auto" />

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-sm text-[var(--color-muted)] leading-[2] mb-8">
          ヒノキの香りとともに、日本酒をもっと豊かに楽しみませんか。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products" className="btn-primary">
            商品一覧を見る
          </Link>
          <Link href="/care" className="btn-outline">
            枡のお手入れ方法
          </Link>
        </div>
      </section>
    </>
  )
}
