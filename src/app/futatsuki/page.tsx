import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { masuSizes } from '@/lib/masu-data'
import { orderMinPriceText } from '@/lib/pricing'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'
import QuickQuote from '@/components/forms/QuickQuote'

const baseUrl = siteConfig.url

/**
 * 蓋付き枡。1個から買う人は FOMUS SHOP（shop.fomus.jp）へ送り、名入れ・まとめ買いはこのサイトで受ける。
 * 価格・在庫は FOMUS SHOP 側が正。値上げなどで変わったら FOMUS_SHOP の price をそろえる。
 * utm_source=masu-store を付けて、FOMUS SHOP の GA4 でこのページからの注文数を見られるようにしている。
 */
const utm = 'utm_source=masu-store&utm_medium=referral&utm_campaign=futatsuki'
const FOMUS_SHOP = [
  {
    sizeId: 'sanjaku',
    label: '蓋付き枡（ミニ）',
    price: 2200,
    url: `https://shop.fomus.jp/shop/masu-lid-mini?${utm}`,
    use: 'リング・ピアス・お守り・お香など、手のひらに収まる小さなものに',
  },
  {
    sizeId: 'ichigo',
    label: '蓋付き枡（一合）',
    price: 3300,
    url: `https://shop.fomus.jp/shop/masu-lid-ichigo?${utm}`,
    use: '印鑑・キーホルダー・小さな贈り物を入れるギフトボックスに',
  },
]
const lidSizes = FOMUS_SHOP.map((p) => ({ ...p, size: masuSizes.find((m) => m.id === p.sizeId)! }))

const title = '蓋付き枡｜国産ヒノキの小物入れ・ギフトボックス（1個から購入・名入れ対応）'
const description =
  '国産ヒノキの枡に蓋を付けた、木の小箱。アクセサリー入れ・指輪やお守りの保管・お香入れ・ギフトボックスに。サイズはミニ（三勺枡）と一合枡の2種類で、1個からお買い求めいただけます。名前やロゴを入れた蓋付き枡、10個以上のまとめ買いもご相談ください。'

export const metadata: Metadata = {
  title,
  description,
  keywords:
    '蓋付き枡,枡 蓋付き,枡 蓋,ふた付き 枡,ヒノキ 小物入れ,檜 小箱,木箱 小物入れ,木製 小箱 ギフト,アクセサリーケース 木製,指輪 ケース 木,お香入れ,和風 ギフトボックス,名入れ 木箱',
  alternates: {
    canonical: `${baseUrl}/futatsuki`,
    languages: { ja: `${baseUrl}/futatsuki`, en: `${baseUrl}/en/lidded-masu` },
  },
  openGraph: {
    title,
    description: '国産ヒノキの枡に蓋を付けた木の小箱。小物入れ・ギフトボックスに。1個から購入、名入れも対応。',
    url: `${baseUrl}/futatsuki`,
    images: [{ url: `${baseUrl}/images/lid/lid-open.jpg`, width: 1024, height: 1024 }],
  },
}

const uses = [
  ['アクセサリー入れ', 'リングやピアスなど、なくしやすい小さなものの定位置に。蓋があるので、ほこりをかぶりません。'],
  ['お守り・お香入れ', '神棚や玄関まわりに置いても違和感のない、白木の佇まいです。'],
  ['ギフトボックス', '小さな贈り物を入れて渡せば、箱そのものが記念品として残ります。'],
  ['デスクの小物入れ', 'クリップ・印鑑・USBメモリなど、散らかりがちなものをまとめて。'],
]

const faq = [
  {
    q: '蓋付き枡は1個から買えますか？',
    a: '買えます。無地の蓋付き枡は、当店を運営する FOMUS の公式オンラインショップ（FOMUS SHOP）で1個からお買い求めいただけます。ミニは2,200円、一合は3,300円（いずれも税込）です。',
  },
  {
    q: '蓋付きにできるのはどのサイズですか？',
    a: '三勺枡（ミニ・外寸56×56×39mm）と一合枡（外寸85×85×56mm）の2サイズです。そのほかのサイズには蓋をご用意していません。',
  },
  {
    q: '蓋付き枡に名前やロゴを入れられますか？',
    a: `入れられます。焼印またはレーザー刻印で、お名前・日付・社名・ロゴなどを刻めます。名入れは1個からご相談いただけ、1回のご注文につき${orderMinPriceText}が目安です（デザイン作成と仕上がりイメージを含みます）。入れたい文章を送っていただくだけで、仕上がりイメージを無料でお送りします。`,
  },
  {
    q: '10個以上まとめて注文できますか？',
    a: '承ります。記念品・ノベルティ・引き出物など、数量に応じてお見積りします。法人・団体のお客様は請求書払いにも対応しています。',
  },
  {
    q: '蓋付き枡で日本酒を飲めますか？',
    a: '枡の部分は通常の三勺枡・一合枡と同じつくりなので、酒器としても使えます。ただし蓋付き枡は小物入れやギフトボックスとしてお使いいただくのがおすすめです。',
  },
  {
    q: 'お手入れはどうすればいいですか？',
    a: '小物入れとして使う場合は、乾いた布で拭く程度で十分です。湿気の多い場所と直射日光を避けて置くと、白木の色と香りが長持ちします。',
  },
]

const th = { color: 'var(--color-muted)' }

export default function FutatsukiPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '蓋付き枡', href: `${baseUrl}/futatsuki` },
        ]}
      />
      <FAQJsonLd items={faq} />
      <SpeakableJsonLd url={`${baseUrl}/futatsuki`} cssSelectors={['[data-speakable]', '.section-title']} />

      <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '蓋付き枡' }]} />

      {/* 1. Hero */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-5xl mx-auto px-6 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-[11px] tracking-[0.2em] mb-4" style={{ color: 'var(--color-accent)' }}>
              MASU WITH LID
            </p>
            <h1 className="section-title mb-6">蓋付き枡 — ヒノキの小箱</h1>
            <p data-speakable className="lead">
              国産ヒノキの枡に、同じヒノキの蓋を付けました。
              お酒を注ぐ器としてではなく、<strong>アクセサリー入れやギフトボックスとして使える木の小箱</strong>です。
              サイズはミニ（三勺枡）と一合枡の2種類。<strong>無地なら1個から</strong>お買い求めいただけ、名前やロゴを入れた蓋付き枡もお作りします。
            </p>
          </div>
          <Image
            src="/images/lid/lid-open.jpg"
            alt="蓋を外した国産ヒノキの蓋付き枡"
            width={1024}
            height={1024}
            priority
            sizes="(max-width: 768px) 100vw, 480px"
            className="w-full rounded-sm"
          />
        </div>
      </section>

      {/* 2. 買う */}
      <section className="max-w-4xl mx-auto px-6 py-14 md:py-16" aria-labelledby="buy-title">
        <h2 id="buy-title" className="section-title mb-4 text-center">無地の蓋付き枡を1個から買う</h2>
        <p className="lead text-center mb-10">
          無地の蓋付き枡は、MASU-STORE を運営する FOMUS の公式オンラインショップでお買い求めいただけます。
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {lidSizes.map((p) => (
            <article
              key={p.sizeId}
              className="rounded-sm p-6 flex flex-col"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <h3 className="serif text-xl mb-1">{p.label}</h3>
              <p className="text-xs mb-4" style={th}>
                {p.size.name}（外寸 {p.size.size}）
              </p>
              <p className="text-sm leading-[1.9] mb-6 flex-1" style={th}>{p.use}</p>
              <p className="serif text-2xl mb-4">
                ¥{p.price.toLocaleString()}
                <span className="text-xs ml-1" style={th}>税込</span>
              </p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener"
                className="btn-accent text-center"
              >
                FOMUS SHOP で購入する
              </a>
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs text-center" style={th}>
          ※ FOMUS SHOP（shop.fomus.jp）の商品ページが別のタブで開きます。送料は国内1,000円〜で、在庫とあわせて商品ページでご確認いただけます。
        </p>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* 3. 使い方 */}
      <section className="max-w-4xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-8">蓋付き枡の使い方</h2>
        <div className="grid gap-8 md:grid-cols-[1fr_300px] items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            {uses.map(([t, d]) => (
              <div key={t} className="rounded-sm p-5" style={{ background: 'var(--color-subtle)' }}>
                <h3 className="text-sm font-medium mb-2">{t}</h3>
                <p className="text-[13px] leading-[1.9]" style={th}>{d}</p>
              </div>
            ))}
          </div>
          <Image
            src="/images/lid/lid-closed.jpg"
            alt="蓋を閉めた国産ヒノキの蓋付き枡"
            width={1024}
            height={1024}
            sizes="(max-width: 768px) 100vw, 300px"
            className="w-full rounded-sm"
          />
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* 4. 名入れ・まとめ買い */}
      <section className="py-14 md:py-16" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-6">名入れ・まとめ買いは MASU-STORE で</h2>
          <p className="text-sm leading-[2] mb-6">
            名前や日付、社名・ロゴを入れた蓋付き枡は、MASU-STORE でお作りします。
            蓋をした小箱のまま贈れるので、結婚や出産の記念品、周年記念・ノベルティにも向いています。
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['1個から名入れ', `記念品やプレゼントに、1個から名入れできます。1回のご注文につき${orderMinPriceText}が目安です`],
              ['データ不要', '入れたい文章を送るだけ。ご注文前に、お見積りと一緒に仕上がりイメージを無料でお送りします'],
              ['10個以上のまとめ買い', '無地・名入れとも、数量に応じてお見積りします。法人・団体は請求書払いにも対応します'],
              ['海外発送', '海外へのお届けにも対応しています'],
            ].map(([t, d]) => (
              <div key={t} className="rounded-sm p-5" style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}>
                <h3 className="text-sm font-medium mb-2">{t}</h3>
                <p className="text-[13px] leading-[1.9]" style={th}>{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/original" className="btn-accent">1個から名入れを相談する</Link>
            <Link href="/custom" className="btn-outline">法人・まとめ買いの見積り</Link>
          </div>
        </div>
      </section>

      {/* 5. サイズ */}
      <section className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-6">サイズの選び方</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <caption className="sr-only">蓋付き枡のサイズ</caption>
            <thead>
              <tr style={{ background: 'var(--color-subtle)', borderBottom: '2px solid var(--color-border)' }}>
                {['サイズ', '外寸', '容量', '向いているもの'].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-left font-medium whitespace-nowrap" style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lidSizes.map((p) => (
                <tr key={p.sizeId} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="px-4 py-4 font-medium whitespace-nowrap">
                    <Link href={`/products/${p.sizeId}`} className="hover:underline" style={{ color: 'var(--color-accent)' }}>
                      {p.sizeId === 'sanjaku' ? 'ミニ（三勺枡）' : '一合枡'}
                    </Link>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap" style={th}>{p.size.size}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.size.capacity}</td>
                  <td className="px-4 py-4 text-xs leading-relaxed" style={th}>{p.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-[2]" style={th}>
          蓋を付けられるのは、この2サイズだけです。ほかのサイズは
          <Link href="/products/sizes" className="underline mx-1" style={{ color: 'var(--color-accent)' }}>枡のサイズ一覧</Link>
          で比べられます。
        </p>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* 6. FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-8">蓋付き枡のよくある質問</h2>
        {faq.map((item) => (
          <details key={item.q} className="group" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium list-none">
              <span>{item.q}</span>
              <span className="ml-4 text-lg transition-transform group-open:rotate-45" style={th}>+</span>
            </summary>
            <p className="pb-5 text-sm leading-relaxed" style={th}>{item.a}</p>
          </details>
        ))}
      </section>

      {/* 7. 見積り */}
      <QuickQuote
        id="offer-quote"
        formType="quick-quote-futatsuki"
        heading="名入れの蓋付き枡を相談する"
        lead="用途・サイズ・個数を選んで連絡先を入れるだけ。1個の記念品から、法人のまとめ買いまで。通常1〜2営業日以内に、お見積りと仕上がりイメージをお送りします。"
        className="bg-[var(--color-subtle)]"
      />
    </>
  )
}
