import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { careGuide, faqItems } from '@/lib/masu-data'
import { BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡のお手入れ方法 — 長持ちさせる3つのポイント',
  description:
    '枡（ます）のお手入れ方法を詳しく解説。使用後の洗い方、保管方法、カビ・ヤニの対処法、洗剤の選び方まで。ヒノキ枡を長く美しく使い続けるための3つのポイントをまとめました。',
  keywords: [
    '枡 お手入れ',
    '枡 洗い方',
    '枡 カビ',
    '枡 ヤニ',
    '枡 手入れ',
    '枡 保管',
    '枡 洗剤',
    '枡 乾燥',
    'ヒノキ枡 お手入れ',
    '木枡 洗い方',
  ].join(','),
  openGraph: {
    title: '枡のお手入れ方法 — 長持ちさせる3つのポイント',
    description:
      '枡の洗い方、保管方法、カビ・ヤニの対処法を詳しく解説。ヒノキ枡を長く美しく使い続けるための完全ガイド。',
    url: `${baseUrl}/care`,
    type: 'article',
    siteName: siteConfig.name,
    locale: 'ja_JP',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: `${baseUrl}/care` },
}

const breadcrumbItems = [
  { name: 'ホーム', href: baseUrl },
  { name: '枡のお手入れ方法', href: `${baseUrl}/care` },
]

const careFaqItems = faqItems.filter((item) => item.category === 'お手入れ')

const howToSteps = [
  {
    name: '使用後すぐに水洗いする',
    text: '枡の内側と飲み口を水でさっと洗い流します。外側はあまり濡らさないようにしましょう。',
  },
  {
    name: '底を上にして自然乾燥させる',
    text: '軽く水を切り、底を上にして風通しの良い場所で自然乾燥させます。食洗機や乾燥機は使用しないでください。',
  },
  {
    name: '湿気の少ない暗所で保管する',
    text: '高温多湿な場所や直射日光を避け、湿気の少ない暗所で保管します。',
  },
]

export default function CarePage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <HowToJsonLd
        name="枡のお手入れ方法"
        description="ヒノキ枡を長持ちさせるための正しいお手入れ方法。使用後の洗い方から保管方法、カビ・ヤニの対処法まで詳しく解説します。"
        steps={howToSteps}
      />
      <FAQJsonLd items={careFaqItems} />

      {/* Breadcrumb */}
      <nav aria-label="パンくずリスト" className="max-w-4xl mx-auto px-6 pt-8 text-[11px] text-[var(--color-muted)]">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-[var(--foreground)] transition-colors">ホーム</Link></li>
          <li>/</li>
          <li className="text-[var(--foreground)]">枡のお手入れ方法</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <p className="section-label">Care Guide</p>
        <h1 className="section-title mt-4">枡のお手入れ方法</h1>
        <p className="mt-6 text-sm text-[var(--color-muted)] leading-[2] max-w-2xl mx-auto">
          ヒノキの枡は正しくお手入れすれば、何年も美しく使い続けることができます。<br />
          3つのポイントを押さえて、枡を長持ちさせましょう。
        </p>
      </section>

      {/* Quick Answer — 3つのポイント */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-8 rounded">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)] mb-4">3つのポイント</p>
          <ol className="space-y-3">
            {careGuide.points.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-[2] text-[var(--foreground)]">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center text-[10px] font-medium mt-0.5">
                  {i + 1}
                </span>
                {point}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* Detailed Sections */}
      <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

        {/* ご使用前 */}
        <section>
          <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif' }}>
            ご使用前
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              {careGuide.sections[0].content}
            </p>
            <p>
              ヒノキに含まれる「ヒノキチオール」や「フィトンチッド」は天然の抗菌・防カビ成分です。これらの成分がヒノキ枡に殺菌作用をもたらしているため、新品の枡を特別に消毒する必要はありません。ヒノキが古くから神社仏閣の建材として重用されてきた理由のひとつが、この優れた抗菌性にあります。
            </p>
            <p>
              初めて使う際にヒノキの香りが強く感じられる場合は、枡に水を入れて数分間なじませた後に捨て、乾燥させてからお使いいただくと、香りが穏やかになります。ただし、この香りこそがヒノキ枡の魅力でもありますので、お好みに合わせて調整してください。
            </p>
          </div>
        </section>

        {/* ご使用後 */}
        <section>
          <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif' }}>
            ご使用後 — すぐ水洗い、すぐ自然乾燥
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              {careGuide.sections[1].content}
            </p>
            <p>
              お手入れの中で最も大切なのが「使用後すぐに洗う」ことです。日本酒や調味料などの成分が木に染み込んだまま放置すると、カビやシミ、臭いの原因になります。使い終わったらなるべく早く、以下の手順でお手入れしてください。
            </p>
            <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded my-6">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)] mb-4">手順</p>
              <ol className="space-y-3 text-sm leading-[2]">
                <li className="flex gap-3">
                  <span className="text-[var(--color-muted)] flex-shrink-0">1.</span>
                  枡の内側と飲み口（角の部分）に流水をかけ、指先でやさしくこすり洗いします。
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-muted)] flex-shrink-0">2.</span>
                  外側はなるべく濡らさないようにします。外側が濡れると乾燥に時間がかかり、反りや割れの原因になることがあります。
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-muted)] flex-shrink-0">3.</span>
                  軽く水を切ったら、底を上にして風通しの良い場所に置き、自然乾燥させます。
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-muted)] flex-shrink-0">4.</span>
                  完全に乾くまで、他の食器と重ねず、風が当たる状態を保ちましょう。
                </li>
              </ol>
            </div>
            <p>
              水に長時間浸すことは厳禁です。木が過度に水分を吸収すると膨張・収縮を繰り返し、接合部の緩みや割れにつながります。「さっと洗って、すぐ乾かす」が枡のお手入れの鉄則です。
            </p>
          </div>
        </section>

        {/* 保管方法 */}
        <section>
          <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif' }}>
            保管方法
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              {careGuide.sections[2].content}
            </p>
            <p>
              木は呼吸する素材です。湿度が高い場所に長期間置くとカビが発生しやすくなり、逆に極度に乾燥した場所やエアコンの風が直接当たる場所では、木が急速に水分を失って割れや反りが生じることがあります。
            </p>
            <p>
              理想的な保管場所は、直射日光が当たらず、風通しの良い棚の中です。食器棚に収納する場合は、通気が確保されるようにしまい込みすぎないことがポイントです。購入時のヒノキ削り節（緩衝材）を一緒に保管すると、適度に湿度を調整してくれる効果も期待できます。
            </p>
            <p>
              長期間使わない場合は、新聞紙や和紙でふんわりと包んで保管するのもおすすめです。ビニール袋での密封は湿気がこもるため避けてください。
            </p>
          </div>
        </section>

        {/* 洗剤について */}
        <section>
          <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif' }}>
            洗剤について
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              {careGuide.sections[3].content}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
                <p className="text-xs font-medium tracking-wide mb-3">無加工の枡</p>
                <p className="text-xs leading-[2] text-[var(--color-muted)]">
                  食器用洗剤（界面活性剤入り）は使わないでください。洗剤の成分が木に染み込み、香りや風味に影響を与えることがあります。汚れが気になる場合は、塩をひとつまみ内側に振りかけて指先でこすり洗いするか、重曹を水に溶かしてやさしく洗います。
                </p>
              </div>
              <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
                <p className="text-xs font-medium tracking-wide mb-3">ウレタン加工の枡</p>
                <p className="text-xs leading-[2] text-[var(--color-muted)]">
                  ウレタン塗装が施された枡は、木の表面にコーティングがされているため、中性洗剤とスポンジのやさしい面を使って洗えます。ただし、硬いたわしやクレンザーはコーティングを傷つけるため避けてください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ヤニ対処 */}
        <section>
          <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif' }}>
            ヤニ（ベタつき）の対処法
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              {careGuide.sections[4].content}
            </p>
            <p>
              ヤニとは、木に含まれる天然の樹脂成分のことです。ヒノキをはじめとする針葉樹には樹脂が多く含まれており、気温の上昇や経年変化によって木の表面にベタベタとした樹脂が滲み出してくることがあります。これは天然木ならではの現象であり、品質上の問題ではありません。
            </p>
            <p>
              ヤニが出た場合は、エタノール（消毒用アルコール）を布やキッチンペーパーに含ませて、ベタつく部分を丁寧に拭き取ってください。エタノールは樹脂を溶かす性質があるため、効果的にヤニを除去できます。市販の消毒用エタノール（濃度70〜80%）で十分です。
            </p>
            <p>
              特に夏場や暖房の効いた部屋ではヤニが出やすくなります。保管場所の温度が急激に変化しない環境を選ぶことで、ヤニの発生をある程度抑えることができます。
            </p>
          </div>
        </section>

        {/* 注意事項 */}
        <section>
          <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif' }}>
            注意事項
          </h2>
          <ul className="space-y-3">
            {careGuide.cautions.map((caution, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-[2] text-[var(--foreground)]">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-muted)] mt-2.5" />
                {caution}
              </li>
            ))}
            <li className="flex items-start gap-3 text-sm leading-[2] text-[var(--foreground)]">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-muted)] mt-2.5" />
              たわしやクレンザーなど硬い素材でのこすり洗いは、木肌を傷つけるためお控えください
            </li>
            <li className="flex items-start gap-3 text-sm leading-[2] text-[var(--foreground)]">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-muted)] mt-2.5" />
              直射日光の下での乾燥は急激な水分蒸発により反りや割れの原因になります
            </li>
            <li className="flex items-start gap-3 text-sm leading-[2] text-[var(--foreground)]">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-muted)] mt-2.5" />
              漂白剤の使用は変色の原因になるためお控えください
            </li>
          </ul>
        </section>

        {/* ヒノキ削り節の活用法 */}
        <section>
          <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif' }}>
            ヒノキ削り節の活用法
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              枡の梱包に使われているヒノキの削り節（かんな屑）は、捨てずに活用できます。天然ヒノキの香りと抗菌成分を暮らしに取り入れる、3つの活用法をご紹介します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
              <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
                <p className="text-xs font-medium tracking-wide mb-3">プチヒノキ風呂</p>
                <p className="text-xs leading-[2] text-[var(--color-muted)]">
                  ヒノキ削り節を不織布の袋やお茶パックに入れ、お風呂に浮かべるだけ。自宅で手軽にヒノキ風呂の香りを楽しめます。フィトンチッドの効果でリラックスタイムがさらに豊かに。
                </p>
              </div>
              <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
                <p className="text-xs font-medium tracking-wide mb-3">天然の芳香剤</p>
                <p className="text-xs leading-[2] text-[var(--color-muted)]">
                  小皿や小瓶にヒノキ削り節を入れて玄関、トイレ、寝室に置けば、天然の芳香剤として活躍します。合成香料にはない、森林のような穏やかな香りが空間を包みます。
                </p>
              </div>
              <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
                <p className="text-xs font-medium tracking-wide mb-3">天然の防虫剤</p>
                <p className="text-xs leading-[2] text-[var(--color-muted)]">
                  ヒノキの香り成分には防虫効果があります。不織布袋に入れてクローゼットやタンスの引き出しに入れれば、衣類の防虫にも。香りが薄くなったら表面を軽くやすりがけすると復活します。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="divider max-w-4xl mx-auto" />

      {/* FAQ */}
      {careFaqItems.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-20">
          <p className="section-label">FAQ</p>
          <h2 className="text-2xl font-light mt-4 mb-10" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif' }}>
            お手入れに関するよくある質問
          </h2>
          <div className="space-y-6">
            {careFaqItems.map((item, i) => (
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
          正しいお手入れで、ヒノキ枡を一生の道具に。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products" className="btn-primary">
            商品一覧を見る
          </Link>
          <Link href="/guide" className="btn-outline">
            枡の選び方ガイド
          </Link>
        </div>
      </section>
    </>
  )
}
