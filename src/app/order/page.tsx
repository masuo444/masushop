import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡の依頼方法｜注文の流れ・最小ロット・納期・支払い',
  description:
    '枡を依頼するときの流れをまとめました。名入れは1個から、無地の枡は10個から。ご依頼時に伝える情報、サイズ・数量の決め方、納期の目安、お支払い方法、海外発送まで。すべてお見積り制で、ご相談・お見積りは無料です。',
  keywords:
    '枡 依頼,枡 注文,枡 注文方法,枡 オーダー,枡 発注,枡 頼み方,枡 見積り,枡 最小ロット,枡 何個から,枡 納期,オリジナル枡 依頼,名入れ枡 注文',
  alternates: { canonical: `${baseUrl}/order` },
  openGraph: {
    title: '枡の依頼方法｜注文の流れ・最小ロット・納期・支払い',
    description:
      '枡を依頼するときの流れ。名入れは1個から、無地は10個から。伝える情報・納期の目安・お支払い方法まとめ。',
    type: 'website',
    url: `${baseUrl}/order`,
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const routes = [
  {
    case: '何を贈るか、まだ決まっていない',
    min: '相談から',
    detail:
      '贈る相手とシーン、ご予算だけお聞かせいただければ、こちらからご提案します。退職祝い・還暦祝い・周年記念・開店祝いなど、記念品としての使われ方をまとめています。',
    href: '/order-made',
    linkLabel: 'オーダーメイド記念品のページへ',
  },
  {
    case: '1個だけ、名入れして贈りたい',
    min: '1個から',
    detail:
      '名前・日付・メッセージを刻んだ一点もの。デザインデータは不要で、入れたい文章を送るだけで書体とレイアウトはこちらで組みます。',
    href: '/original',
    linkLabel: 'オリジナル枡のページへ',
  },
  {
    case: '企業ロゴ・社名を入れたい',
    min: 'レーザー刻印は1個から',
    detail:
      'ロゴの線の細さと数量から、焼印とレーザー刻印のどちらが適しているかをご提案します。ロゴデータが無くても、名刺や看板の写真から起こせます。',
    href: '/logo',
    linkLabel: 'ロゴ入れのページへ',
  },
  {
    case: '無地の枡をまとめて買いたい',
    min: '10個から',
    detail:
      '名入れなしの無垢の枡。飲食店での使用、イベントでの配布、インテリア用途など。サイズと数量をお知らせください。',
    href: '/products',
    linkLabel: '全7サイズを見る',
  },
  {
    case: 'ノベルティ・記念品として大量に',
    min: '数量に応じて割引',
    detail:
      '展示会ノベルティ、周年記念品、株主優待、式典の振る舞い枡など。数量が増えるほど単価は下がります。請求書払いにも対応します。',
    href: '/business',
    linkLabel: '法人向けのページへ',
  },
]

const infoToSend = [
  {
    title: 'サイズ',
    desc: '決まっていなければ用途をお伝えください。日本酒なら一合枡、豆まきなら五合枡、といった具合にご提案します。全7サイズあります。',
    href: '/products/sizes',
    linkLabel: 'サイズ比較を見る',
  },
  {
    title: '数量',
    desc: '名入れは1個から、無地は10個から承ります。「10個か50個で迷っている」といった幅のあるご相談でも構いません。',
  },
  {
    title: '刻む内容',
    desc: '入れたい文章・お名前・日付・ロゴなど。デザインデータは不要です。文章だけお送りいただければ、書体とレイアウトはこちらで組みます。',
    href: '/products/engraving',
    linkLabel: '焼印とレーザーの違い',
  },
  {
    title: '用途',
    desc: '贈り物、記念品、店舗での使用など。用途が分かると、サイズも刻印方法も的確にご提案できます。',
  },
  {
    title: 'ご希望の納期',
    desc: '「この日までに手元に欲しい」という日付があればお知らせください。お急ぎの場合も可能な限り対応します。',
  },
  {
    title: 'オプションの希望',
    desc: 'コーティング、蓋、一合枡のクリアケース・白箱など。分からなければ、用途に合わせてご提案します。',
    href: '/coating',
    linkLabel: 'コーティングの詳細',
  },
]

const leadTimes = [
  { type: '無地枡（名入れなし）', lead: '約2週間' },
  { type: '焼印入りの枡', lead: '約3週間' },
  { type: 'レーザー刻印入りの枡', lead: '約3週間' },
  { type: '大口注文（300個以上）', lead: '約4週間' },
]

const flow = [
  {
    step: '01',
    title: 'お見積りフォームから相談する',
    desc: 'サイズ・数量・刻む内容・用途・ご希望の納期をお送りください。決まっていない項目は空欄で構いません。ご相談・お見積りは無料です。',
  },
  {
    step: '02',
    title: 'ご提案とお見積りを受け取る',
    desc: '通常1〜2営業日以内にご返信します。サイズと刻印方法のおすすめ、金額と納期をお伝えします。',
  },
  {
    step: '03',
    title: 'レイアウトを確認する',
    desc: '刻む内容から書体・大きさ・配置を組んで、仕上がりのイメージをお送りします。修正は何度でも無料です。',
  },
  {
    step: '04',
    title: '製作',
    desc: '国産ヒノキから職人の手で仕上げ、刻印します。焼印の場合は初回に専用の銅版を製作します。',
  },
  {
    step: '05',
    title: '検品・お届け',
    desc: '一つずつ検品し、ヒノキの削り節を緩衝材にして梱包してお届けします。海外発送にも対応しています。',
  },
]

const faqItems = [
  {
    q: '枡はどうやって依頼すればいいですか？',
    a: 'お見積りフォームから、サイズ・数量・刻む内容・用途・ご希望の納期をお送りください。すべてお見積り制のため、フォームからのご相談が入口になります。決まっていない項目は空欄で構いません。通常1〜2営業日以内に、ご提案とお見積りをご返信します。ご相談・お見積りは無料です。',
  },
  {
    q: '枡は何個から依頼できますか？',
    a: '名入れをするオリジナル枡は1個からご相談を承ります。無地の無垢枡をそのまま購入される場合は10個からの受注です。企業ノベルティなどの大口注文にも対応しており、数量が増えるほど単価はお安くなります。',
  },
  {
    q: '依頼するときに何を伝えればいいですか？',
    a: 'サイズ・数量・刻む内容・用途・ご希望の納期の5つをお伝えいただけると、そのままお見積りをお出しできます。ただし決まっていない項目があっても構いません。用途だけお聞かせいただければ、サイズも刻印方法もこちらからご提案します。',
  },
  {
    q: 'デザインのデータがなくても依頼できますか？',
    a: 'はい。入れたい文章やメッセージ、お名前と日付をお送りいただければ、書体選び・レイアウト・配置の調整までこちらで行います。企業ロゴの場合も、名刺・封筒・看板などロゴが載っているものを撮影して送っていただければ、そこからデータを起こします。',
  },
  {
    q: '依頼してからどのくらいで届きますか？',
    a: '無地枡は約2週間、焼印・レーザー刻印を入れる場合は約3週間、300個以上の大口注文は約4週間が目安です。デザインのご確認にかかる期間によって前後します。お急ぎの場合はご希望の日付をお知らせください。',
  },
  {
    q: '見積りだけ頼むことはできますか？',
    a: 'もちろんです。ご相談・お見積りは無料で、その後にしつこい営業をすることはありません。「できるかどうかだけ知りたい」「予算感を知りたい」というご相談も歓迎します。',
  },
  {
    q: '支払い方法は何が使えますか？',
    a: 'クレジットカードと銀行振込に対応しています。法人のお客様には請求書払い（月末締め翌月末払い）もご相談いただけます。お見積りの際にご希望のお支払い方法をお知らせください。',
  },
  {
    q: '海外に送ってもらえますか？',
    a: 'はい、海外発送に対応しています。アジア・北米・ヨーロッパなど世界各地への発送実績があります。英語などのメッセージを刻印しての発送も可能です。',
  },
  {
    q: 'サンプルを見てから決められますか？',
    a: 'ご希望に応じて実物サンプルを製作し、量産前に仕上がりをご確認いただけます。大口注文をご検討の場合はフォームにその旨をご記入ください。',
  },
]

export default function OrderPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '枡の依頼方法', href: `${baseUrl}/order` },
        ]}
      />
      <FAQJsonLd items={faqItems} />
      <SpeakableJsonLd url={`${baseUrl}/order`} cssSelectors={['[data-speakable]']} />
      <HowToJsonLd
        name="枡を依頼する手順"
        description="枡をお見積りから受け取るまでの手順。相談、見積り、レイアウト確認、製作、お届けの5ステップ。"
        steps={flow.map((f) => ({ name: f.title, text: f.desc }))}
      />

      <main className="min-h-screen bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '枡の依頼方法' }]} />
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-16 text-center">
          <p className="text-[11px] tracking-[0.2em] text-[var(--color-accent)] mb-4">
            HOW TO ORDER
          </p>
          <h1
            className="serif text-3xl md:text-4xl font-light leading-relaxed mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            枡の依頼方法。
          </h1>
          <p
            data-speakable
            className="text-sm md:text-[15px] leading-[2] max-w-2xl mx-auto mb-8"
            style={{ color: 'var(--color-muted)' }}
          >
            枡はすべてお見積り制です。サイズ・数量・刻む内容・用途・ご希望の納期をフォームからお送りいただき、
            ご提案とお見積りをご返信するところから始まります。
            <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>名入れは1個から</strong>、
            <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>無地の枡は10個から</strong>
            承ります。決まっていない項目があっても、用途だけお聞かせいただければご提案します。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/custom" className="btn-primary">
              お見積り・ご相談フォームへ
            </Link>
          </div>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* ケース別の入口 */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-4 text-center">ご依頼のケース別に</h2>
          <p
            className="text-[13px] text-center mb-10 leading-[1.9]"
            style={{ color: 'var(--color-muted)' }}
          >
            どのケースでもお見積りフォームが窓口です。ケースごとの詳しい説明は各ページにまとめています。
          </p>

          <div className="space-y-4">
            {routes.map((item) => (
              <div
                key={item.case}
                className="rounded-sm p-6"
                style={{
                  background: 'var(--color-subtle)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="serif text-lg">{item.case}</h3>
                  <p
                    className="text-[12px] font-medium"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {item.min}
                  </p>
                </div>
                <p
                  className="text-sm leading-[1.9] mb-4"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {item.detail}
                </p>
                <Link
                  href={item.href}
                  className="text-[13px] underline underline-offset-4"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {item.linkLabel}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* 伝える情報 */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-4 text-center">ご依頼時にお伝えいただく情報</h2>
          <p
            data-speakable
            className="text-[13px] text-center mb-10 leading-[1.9]"
            style={{ color: 'var(--color-muted)' }}
          >
            この6つが揃うとそのままお見積りをお出しできます。決まっていない項目は空欄で構いません。
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {infoToSend.map((item) => (
              <div
                key={item.title}
                className="rounded-sm p-6"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <h3 className="text-sm font-medium mb-3">{item.title}</h3>
                <p
                  className="text-sm leading-[1.9]"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {item.desc}
                </p>
                {item.href && (
                  <Link
                    href={item.href}
                    className="mt-3 inline-block text-[13px] underline underline-offset-4"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {item.linkLabel}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* 流れ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-10 text-center">ご依頼から到着までの流れ</h2>
          <ol className="space-y-6">
            {flow.map((item) => (
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

        {/* 納期・支払い */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-10 text-center">納期とお支払い</h2>

          <h3 className="text-sm font-medium mb-4">納期の目安</h3>
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th
                    className="text-left py-3 px-3 font-medium"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    ご注文の内容
                  </th>
                  <th
                    className="text-right py-3 px-3 font-medium"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    納期の目安
                  </th>
                </tr>
              </thead>
              <tbody>
                {leadTimes.map((row) => (
                  <tr key={row.type} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-3 px-3">{row.type}</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">{row.lead}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] leading-[1.9] mb-10" style={{ color: 'var(--color-muted)' }}>
            ※ デザインのご確認にかかる期間によって前後します。お急ぎの場合は、ご希望の日付をフォームにご記入ください。
          </p>

          <h3 className="text-sm font-medium mb-4">お支払い方法</h3>
          <ul className="space-y-3">
            {[
              'クレジットカード',
              '銀行振込',
              '請求書払い（法人のお客様・月末締め翌月末払い）',
            ].map((item) => (
              <li
                key={item}
                className="text-sm leading-[1.9] pl-4"
                style={{ color: 'var(--color-muted)', borderLeft: '2px solid var(--color-accent)' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-10 text-center">依頼についてのよくある質問</h2>
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

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="serif text-2xl font-light mb-4">まずはご相談ください</h2>
          <p className="text-sm leading-[1.9] mb-8" style={{ color: 'var(--color-muted)' }}>
            決まっていない項目があっても構いません。用途だけお聞かせいただければ、
            サイズも刻印方法もこちらからご提案します。ご相談・お見積りは無料です。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/custom" className="btn-primary">
              お見積り・ご相談フォームへ
            </Link>
            <Link href="/faq" className="btn-outline">
              よくある質問を見る
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
