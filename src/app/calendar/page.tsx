import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, ItemListJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'
import QuickQuote from '@/components/forms/QuickQuote'
import { CALENDAR_PERIOD, calendarEvents, consultBy } from '@/lib/event-calendar'
import { orderMinPriceText } from '@/lib/pricing'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '記念品・贈り物の行事カレンダー｜いつまでに頼めば間に合う？（名入れの逆算）',
  description: `お歳暮・お年賀・鏡開き・節分・卒業・送別・母の日・父の日・敬老の日・周年記念まで、記念品や贈り物が必要な行事を月ごとに整理。名入れの記念品を「いつまでに相談すれば間に合うか」を行事ごとに逆算しました（${CALENDAR_PERIOD}）。`,
  keywords:
    '記念品 いつまでに,名入れ 納期 逆算,行事 カレンダー 贈り物,お年賀 いつから,鏡開き いつ,卒業記念品 いつまでに,送別会 プレゼント いつまでに,周年記念品 準備 時期',
  alternates: { canonical: `${baseUrl}/calendar` },
  openGraph: {
    title: '記念品・贈り物の行事カレンダー｜いつまでに頼めば間に合う？',
    description: '行事ごとに、名入れの記念品を相談すべき時期を逆算。お歳暮・鏡開き・卒業・送別・周年記念まで。',
    url: `${baseUrl}/calendar`,
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const faq = [
  {
    q: '名入れの記念品は、いつまでに頼めば間に合いますか？',
    a: '名入れの製作は約3週間が目安です。仕上がりイメージの確認や配送の余裕を見て、渡したい日の約4週間前までのご相談をおすすめします。100個以上の大口は製作に3〜4週間かかるため、約5週間前が目安です。',
  },
  {
    q: '急ぎの場合はどうすればいいですか？',
    a: 'まずは渡したい日をお知らせください。数量や名入れの内容によっては対応できる場合があります。間に合わない場合も、その旨を正直にお伝えします。',
  },
  {
    q: '年末年始や年度末は混みますか？',
    a: '節分の前（12月〜1月）は枡の繁忙期で、節分用のご注文は12月上旬までにお願いしています。お歳暮・お年賀・新年会と重なる12月、卒業・送別・異動の2〜3月もご相談が集中しやすいため、目安より早めのご相談をおすすめします。',
  },
  {
    q: '1個だけでも頼めますか？',
    a: `はい。名入れは1個から承ります。名入れのご注文は1回につき ${orderMinPriceText}が目安で、デザイン作成と仕上がりイメージを含みます。無地の枡は10個からです。`,
  },
]

export default function CalendarPage() {
  const upcoming = calendarEvents
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '記念品の行事カレンダー', href: `${baseUrl}/calendar` },
        ]}
      />
      <FAQJsonLd items={faq} />
      <ItemListJsonLd
        name="記念品・贈り物が必要な行事"
        items={upcoming.map((e, i) => ({ name: `${e.name}（${e.when}）`, url: `${baseUrl}${e.href}`, position: i + 1 }))}
      />
      <SpeakableJsonLd url={`${baseUrl}/calendar`} cssSelectors={['[data-speakable]', '.section-title']} />

      <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '記念品の行事カレンダー' }]} />

      <section className="py-16 md:py-20 text-center" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.2em] mb-4" style={{ color: 'var(--color-accent)' }}>CALENDAR</p>
          <h1 className="section-title mb-6">記念品・贈り物の行事カレンダー</h1>
          <p data-speakable className="lead">
            名入れの記念品は、製作に約3週間かかります。仕上がりの確認と配送を含めると、渡したい日の<strong>約4週間前</strong>（100個以上なら約5週間前）までの相談が目安です。
            行事ごとに「いつまでに相談すれば間に合うか」を逆算しました（{CALENDAR_PERIOD}）。
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-8 text-center">行事と、相談の目安</h2>
        <div className="overflow-x-auto table-cards-wrap">
          <table className="w-full text-sm table-cards" style={{ borderCollapse: 'collapse' }}>
            <caption className="sr-only">記念品・贈り物が必要な行事と、名入れの記念品を相談する時期の目安</caption>
            <thead>
              <tr style={{ background: 'var(--color-subtle)', borderBottom: '2px solid var(--color-border)' }}>
                {['時期', '行事', '使われ方', '相談の目安', '大口（100個〜）'].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {upcoming.map((e) => {
                const by = consultBy(e)
                const year = e.date.slice(0, 4)
                return (
                  <tr key={e.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="px-4 py-4 whitespace-nowrap" data-label="時期">{year}年 {e.when}</td>
                    <td className="px-4 py-4 font-medium" data-label="行事">
                      {e.name}
                      <Link href={e.href} className="block text-xs font-normal mt-1 underline underline-offset-4" style={{ color: 'var(--color-accent)' }}>
                        {e.linkLabel} →
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }} data-label="使われ方">{e.use}</td>
                    <td className="px-4 py-4 whitespace-nowrap" data-label="相談の目安">
                      {e.orderBy ? <strong>{by.normal}までに注文</strong> : `${by.normal}ごろまで`}
                      {e.orderBy && <span className="block text-[11px] whitespace-normal mt-1" style={{ color: 'var(--color-accent)' }}>{e.orderBy.note}</span>}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap" style={{ color: 'var(--color-muted)' }} data-label="大口（100個〜）">{e.orderBy ? `${by.large}までに注文` : `${by.large}ごろまで`}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          ※ 行事の日付は一般的な目安です（お年賀の時期や鏡開きの日は地域によって異なります）。相談の目安は、行事の日の約4週間前（大口は約5週間前）として計算しています。節分は枡の繁忙期のため、例外として12月上旬がご注文の締め切りです。
        </p>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      <section className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-6">間に合わせるための3つのコツ</h2>
        <ol className="space-y-5 text-sm leading-[2]">
          <li><strong>1. 入れる文章は、決まっていなくても先に相談する。</strong> 「社名と年号くらい」で構いません。仕上がりイメージを見ながら決めた方が早く進みます。</li>
          <li><strong>2. 人数分の名前を入れるなら、名簿の確認に時間を見る。</strong> 卒業・送別・表彰などで1個ずつ名前を変える場合、誤字の確認に数日かかります。</li>
          <li><strong>3. 繁忙期は早めに。</strong> 節分の前（12月〜1月）は枡の繁忙期で、節分用のご注文は12月上旬が締め切りです。2〜3月（卒業・送別）も相談が集中するため、目安より1〜2週間早いと安心です。</li>
        </ol>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-14 md:pb-16">
        <h2 className="section-title mb-8">よくある質問</h2>
        {faq.map((item) => (
          <details key={item.q} className="group" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium list-none">
              <span>{item.q}</span>
              <span className="ml-4 text-lg transition-transform group-open:rotate-45" style={{ color: 'var(--color-muted)' }}>+</span>
            </summary>
            <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.a}</p>
          </details>
        ))}
      </section>

      <QuickQuote
        id="offer-quote"
        formType="quick-quote-calendar"
        heading="渡したい日から、逆算して相談する"
        lead="用途・サイズ・個数を選んで連絡先を入れるだけ。ご要望欄に渡したい日を書いていただければ、間に合うかどうかも含めてお返事します。"
        className="bg-[var(--color-subtle)]"
      />
    </>
  )
}
