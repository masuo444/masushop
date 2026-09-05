import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡にロゴを入れる｜企業ロゴ・社名の名入れ（焼印・レーザー刻印）',
  description:
    '国産ヒノキの枡に企業ロゴ・社名を刻印します。焼印とレーザー刻印の2通りに対応し、ロゴの線の細さや数量から適した方をご提案。ロゴデータがなくても、名刺やパンフレットの画像から起こせます。ノベルティ・周年記念品・店舗の看板枡に。1個からご相談いただけます。',
  keywords:
    '枡 ロゴ,枡 ロゴ入れ,枡 社名入れ,企業ロゴ 枡,枡 名入れ ロゴ,ロゴ入り 枡,枡 焼印 ロゴ,枡 レーザー刻印 ロゴ,木製 ノベルティ ロゴ,ロゴ入り ノベルティ,枡 オリジナル ロゴ,店舗 枡 屋号',
  alternates: { canonical: `${baseUrl}/logo` },
  openGraph: {
    title: '枡にロゴを入れる｜企業ロゴ・社名の名入れ（焼印・レーザー刻印）',
    description:
      '国産ヒノキの枡に企業ロゴ・社名を刻印。焼印とレーザー刻印から、ロゴの形と数量に合う方をご提案します。ロゴデータがなくても対応可能です。',
    type: 'website',
    url: `${baseUrl}/logo`,
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const methodComparison = [
  {
    label: 'ロゴの再現',
    yakiin: 'ベタ面や太い線に強い。細い線が潰れることがある',
    laser: '細い線・小さな文字まで再現。濃淡の表現も可能',
  },
  {
    label: '色味',
    yakiin: '焦げ茶の一色。木目に馴染む伝統的な風合い',
    laser: '彫りの深さで濃淡がつく。写真やグラデーションも可',
  },
  {
    label: '版の要否',
    yakiin: '専用の銅版を初回に製作します',
    laser: '版は不要。1個ずつ違う内容も刻めます',
  },
  {
    label: '向いている数量',
    yakiin: '同じロゴを大量に入れる場合',
    laser: '少量、または1個ずつ内容が変わる場合',
  },
  {
    label: '向いているロゴ',
    yakiin: 'シンボルマーク・社名ロゴなど、形がはっきりしたもの',
    laser: '細部の多いロゴ、写真やQRコードを併せたいもの',
  },
]

const dataCases = [
  {
    title: 'ロゴデータをお持ちの場合',
    desc: 'そのままお送りください。枡の面の大きさと木目を見ながら、位置と大きさを組んでレイアウトをご提案します。修正は何度でも無料です。',
  },
  {
    title: 'ロゴデータが見つからない場合',
    desc: '名刺・封筒・看板・パンフレットなど、ロゴが載っているものを撮影して送っていただければ、そこからデータを起こして刻印します。',
  },
  {
    title: 'ロゴがまだ無い場合',
    desc: '屋号や店名の文字だけでもお作りできます。書体の候補からご提案し、枡に合う組み方に整えます。',
  },
  {
    title: 'ロゴに文字を添えたい場合',
    desc: '「創業50周年」「開店記念」などの一文や日付、QRコードを一緒に刻めます。面を分けて複数の要素を配置することも可能です。',
  },
]

const useCases = [
  {
    title: '展示会・イベントのノベルティ',
    desc: '企業ロゴを刻んだ枡は、配布後もデスクに残ります。小物入れやペン立てとして使われるぶん、社名が目に触れる時間が長く続きます。',
    href: '/business/novelty',
    linkLabel: 'ノベルティの詳細',
  },
  {
    title: '周年記念品・社内表彰',
    desc: '社名ロゴと「◯周年」を刻んだ記念枡。「益す＝増す」の縁起物なので、節目の贈り物として理由の立つ品になります。',
    href: '/business/anniversary',
    linkLabel: '周年記念品の詳細',
  },
  {
    title: '飲食店・酒蔵の店舗枡',
    desc: '屋号を刻んだ枡を、もっきりの提供や店頭のディスプレイに。同じロゴで揃えると、店の設えとして統一感が出ます。',
    href: '/business/oem',
    linkLabel: 'OEM・自社ブランドの詳細',
  },
  {
    title: '式典・鏡開きの振る舞い枡',
    desc: '主催者のロゴを入れた枡を参加者にそのままお持ち帰りいただけます。当日の乾杯と記念品を1つで兼ねられます。',
    href: '/business/ceremony',
    linkLabel: '式典・鏡開きの詳細',
  },
]

const flow = [
  {
    step: '01',
    title: 'ロゴと用途をお知らせください',
    desc: 'お見積りフォームから、ロゴデータ（お持ちでなければロゴが載ったものの写真）、サイズ、数量、ご希望の納期をお送りください。',
  },
  {
    step: '02',
    title: '刻印方法のご提案とお見積り',
    desc: 'ロゴの線の細さと数量を見て、焼印とレーザー刻印のどちらが適しているかをご提案します。あわせて金額と納期をお伝えします。',
  },
  {
    step: '03',
    title: 'レイアウトのご確認',
    desc: '枡のどの面に、どの大きさで入れるかを組んでお送りします。修正は何度でも無料です。納得いただいてから製作に入ります。',
  },
  {
    step: '04',
    title: '製作',
    desc: '国産ヒノキの枡に刻印します。焼印の場合は初回に専用の銅版を製作します。目安は約2〜3週間、100個以上の大口注文では3〜4週間程度です。',
  },
  {
    step: '05',
    title: '検品・お届け',
    desc: '一つずつ検品し、ヒノキの削り節を緩衝材にして梱包してお届けします。海外発送にも対応しています。',
  },
]

const faqItems = [
  {
    q: '枡に企業ロゴを入れられますか？',
    a: 'はい、対応しています。国産ヒノキの枡に、企業ロゴ・社名・屋号を焼印またはレーザー刻印で刻みます。焼印は約400度の銅版を押す伝統技法で、レーザー刻印は版が不要で細かいデザインまで再現できます。ロゴの形と数量をお伺いして、適した方をご提案します。',
  },
  {
    q: 'ロゴのデータがないのですが、依頼できますか？',
    a: 'はい。名刺・封筒・看板・パンフレットなど、ロゴが載っているものをスキャンまたはスマートフォンで撮影してお送りいただければ、そこからデータを起こして刻印します。ロゴがまだ無い場合も、屋号や店名の文字から書体をご提案してお作りできます。',
  },
  {
    q: 'ロゴ入れは焼印とレーザー刻印のどちらがいいですか？',
    a: 'ロゴの線の細さと数量で決まります。同じロゴを大量に入れる場合や、形がはっきりしたシンボルマークの場合は焼印が向いています。細部の多いロゴ、少量、1個ずつ内容が変わる場合、写真やQRコードを併せたい場合はレーザー刻印が向いています。判断に迷う場合はロゴをお送りいただければご提案します。',
  },
  {
    q: 'ロゴ入りの枡は何個から作れますか？',
    a: 'レーザー刻印なら1個からご相談を承ります。焼印は初回に専用の銅版を製作するため、まとまった数量でのご注文に向いています。数量が決まっていない段階のご相談でも構いません。',
  },
  {
    q: 'ロゴは枡のどの面に入りますか？',
    a: '枡の外側の面に、1面から4面まで刻印できます。1面だけに大きく入れる、正面にロゴ・側面に社名や日付を分けて入れる、といった配置も可能です。枡の面の大きさに合わせてレイアウトを組み、ご確認いただいてから製作します。',
  },
  {
    q: 'ロゴと一緒に周年や日付の文字も入れられますか？',
    a: 'はい。「創業50周年」「開店記念」といった一文、日付、QRコードなどをロゴと組み合わせて刻めます。要素が多い場合は面を分けて配置することもできます。',
  },
  {
    q: 'ロゴ入れの費用はいくらですか？',
    a: '枡のサイズ・数量・刻印方法・ロゴの内容によって変わるため、お見積りでご案内しています。ご相談・お見積りは無料です。サイズと数量、ロゴをお知らせいただければ金額と納期をお送りします。',
  },
  {
    q: 'ロゴ入りの枡はどのくらいで届きますか？',
    a: '通常は約2〜3週間、100個以上の大口注文では約3〜4週間が目安です。焼印の場合は初回に銅版を製作するぶんお時間をいただきます。ご希望の納期がある場合はフォームにご記入ください。',
  },
]

export default function LogoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '枡へのロゴ入れ', href: `${baseUrl}/logo` },
        ]}
      />
      <FAQJsonLd items={faqItems} />
      <SpeakableJsonLd url={`${baseUrl}/logo`} cssSelectors={['[data-speakable]']} />
      <HowToJsonLd
        name="枡に企業ロゴを入れる方法"
        description="国産ヒノキの枡に企業ロゴ・社名を刻印する流れ。ロゴデータの送付から刻印方法の選定、レイアウト確認、製作、お届けまで。"
        steps={flow.map((f) => ({ name: f.title, text: f.desc }))}
      />

      <main className="min-h-screen bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '枡へのロゴ入れ' }]} />
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-16 text-center">
          <p className="text-[11px] tracking-[0.2em] text-[var(--color-accent)] mb-4">
            LOGO ENGRAVING
          </p>
          <h1
            className="serif text-3xl md:text-4xl font-light leading-relaxed mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            枡に、ロゴを刻む。
          </h1>
          <p
            data-speakable
            className="text-sm md:text-[15px] leading-[2] max-w-2xl mx-auto mb-8"
            style={{ color: 'var(--color-muted)' }}
          >
            国産ヒノキの枡に、企業ロゴ・社名・屋号を刻印します。刻み方は、約400度の銅版を押す
            <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>焼印</strong>
            と、細部まで再現できる
            <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>レーザー刻印</strong>
            の2通り。ロゴの形と数量をお伺いして、適した方をご提案します。
            ロゴデータがお手元になくても、名刺やパンフレットの画像から起こせます。
          </p>
          <p className="text-[13px] mb-8" style={{ color: 'var(--color-muted)' }}>
            レーザー刻印なら1個から ／ データ制作込み ／ ご相談・お見積り無料
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/custom" className="btn-primary">
              ロゴ入れを相談する
            </Link>
            <Link href="/products/engraving" className="btn-outline">
              焼印とレーザーの比較
            </Link>
          </div>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* 刻印方法の比較 */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-4 text-center">ロゴの入れ方は2通り</h2>
          <p
            className="text-[13px] text-center mb-10 leading-[1.9]"
            style={{ color: 'var(--color-muted)' }}
          >
            どちらが良いかは、ロゴの線の細さと数量で決まります。迷う場合はロゴをお送りいただければご提案します。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th
                    className="text-left py-4 px-3 font-medium"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    比較項目
                  </th>
                  <th className="text-left py-4 px-3 font-medium">焼印</th>
                  <th className="text-left py-4 px-3 font-medium">レーザー刻印</th>
                </tr>
              </thead>
              <tbody>
                {methodComparison.map((row) => (
                  <tr key={row.label} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td
                      className="py-4 px-3 font-medium whitespace-nowrap"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {row.label}
                    </td>
                    <td className="py-4 px-3 leading-[1.8]">{row.yakiin}</td>
                    <td className="py-4 px-3 leading-[1.8]">{row.laser}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* 仕上がりサンプル */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-4 text-center">刻印の仕上がりサンプル</h2>
          <p
            className="text-[13px] text-center mb-10 leading-[1.9]"
            style={{ color: 'var(--color-muted)' }}
          >
            レーザー刻印の仕上がり例です。ロゴの線も、この精度で木目とともに刻めます。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Image
              src="/images/works/ishiwa-ashiyu-front.jpg"
              alt="レーザー刻印でロゴを入れた一合枡のサンプル — 正面"
              width={1448}
              height={1086}
              className="w-full rounded-sm"
            />
            <Image
              src="/images/works/ishiwa-ashiyu-detail.jpg"
              alt="レーザー刻印の彫りの質感 — ロゴの線が木目とともに再現される"
              width={1536}
              height={1024}
              className="w-full rounded-sm"
            />
            <Image
              src="/images/works/ishiwa-ashiyu-hand.jpg"
              alt="ロゴを刻んだ一合枡を手のひらに載せたサイズ感"
              width={1448}
              height={1086}
              className="w-full rounded-sm"
            />
          </div>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* ロゴデータについて */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-4 text-center">ロゴデータについて</h2>
          <p
            data-speakable
            className="text-[13px] text-center mb-10 leading-[1.9]"
            style={{ color: 'var(--color-muted)' }}
          >
            ロゴデータが手元に無くてもご依頼いただけます。ロゴが載っているものを撮影して送るだけで、こちらでデータを起こします。
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {dataCases.map((item) => (
              <div
                key={item.title}
                className="rounded-sm p-6"
                style={{
                  background: 'var(--color-subtle)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3 className="text-sm font-medium mb-3">{item.title}</h3>
                <p className="text-sm leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="divider max-w-4xl mx-auto" />

        {/* 用途 */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-10 text-center">ロゴ入り枡の使われ方</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {useCases.map((item) => (
              <div
                key={item.title}
                className="rounded-sm p-6"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <h3 className="serif text-lg mb-3">{item.title}</h3>
                <p
                  className="text-sm leading-[1.9] mb-4"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {item.desc}
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

        {/* 流れ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-10 text-center">ご依頼の流れ</h2>
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

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-title mb-10 text-center">ロゴ入れのよくある質問</h2>
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
          <h2 className="serif text-2xl font-light mb-4">ロゴをお送りください</h2>
          <p className="text-sm leading-[1.9] mb-8" style={{ color: 'var(--color-muted)' }}>
            ロゴと、サイズ・数量・ご希望の納期をお知らせいただければ、
            刻印方法のご提案とお見積りをお送りします。
            ロゴデータが無い場合は、ロゴが載っているものの写真で構いません。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/custom" className="btn-primary">
              ロゴ入れを相談する
            </Link>
            <Link href="/business" className="btn-outline">
              法人向けのご案内
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
