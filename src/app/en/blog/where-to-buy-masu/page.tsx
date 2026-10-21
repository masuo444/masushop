import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { masuSizes } from '@/lib/masu-data'
import { KURA_MASTER } from '@/lib/works'

const baseUrl = siteConfig.url
const url = `${baseUrl}/en/blog/where-to-buy-masu`
const minPrice = `¥${siteConfig.orderMinPrice.toLocaleString('en-US')}`

export const metadata: Metadata = {
  title: 'Where to Buy Masu (Japanese Wooden Sake Cups) — Custom Engraving, Shipped Worldwide',
  description:
    'Where to buy authentic hinoki masu online, what to check before you buy, and how to order a custom engraved masu from Japan — from a single piece, with a free design preview and worldwide shipping.',
  keywords:
    'where to buy masu, buy masu cup, masu cup online, custom masu, engraved masu, wooden sake cup, hinoki masu, personalized sake cup, masu from Japan',
  alternates: {
    canonical: url,
    languages: { ja: `${baseUrl}/blog/masu-doko-de-kaeru`, en: url },
  },
  openGraph: {
    title: 'Where to Buy Masu — Custom Engraved Wooden Sake Cups from Japan',
    description: 'Authentic hinoki masu, engraved from a single piece, with a free design preview and worldwide shipping.',
    url,
    type: 'article',
    locale: 'en_US',
    siteName: siteConfig.nameEn,
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const faq = [
  {
    q: 'Where can I buy an authentic masu outside Japan?',
    a: `You can order directly from MASU-STORE (masu.fomus.jp), a masu specialist in Japan that ships worldwide. Our masu are made from Japanese hinoki cypress in seven traditional sizes. Engraved masu start from a single piece, plain masu from 10 pieces.`,
  },
  {
    q: 'Can I buy just one custom engraved masu?',
    a: `Yes. Engraving starts from one piece. An engraved order starts from ${minPrice} per order (tax included, shipping extra), including the design work and a preview image. Additional pieces with the same design cost less.`,
  },
  {
    q: 'Do I need a design file?',
    a: 'No. Send the text you want — names, dates, a message — or a photo of your logo, and we lay it out for you. We email you the quote together with a preview image of the finished masu before you order.',
  },
  {
    q: 'How long does it take to arrive?',
    a: 'Engraved masu are usually made and dispatched within 2–3 weeks (3–4 weeks for 100 pieces or more). Transit time depends on the destination and the shipping method. If you have a fixed date, tell us and we will plan back from it.',
  },
  {
    q: 'Will I pay import duties?',
    a: 'Duties and import taxes are set by the destination country and are charged to the receiver on arrival. They are not included in our quote.',
  },
]

const checks = [
  {
    title: 'The wood: hinoki cypress',
    text: 'A traditional masu is made from hinoki (Japanese cypress). Its aroma is part of the experience — it blends into sake in a way glass and ceramic cannot. Many low-cost “wooden cups” are made from other woods or plastic with a wood finish. Ask what the cup is made of.',
  },
  {
    title: 'The size',
    text: 'Masu come in traditional volume units. The 180 ml Ichigo (one gō) is the classic sake masu; the 144 ml Hasshaku is the izakaya size for overflowing “mokkiri” service; larger sizes are used for Setsubun beans or display.',
  },
  {
    title: 'The engraving method',
    text: 'Yakiin (branding iron) gives a warm, traditional burnt look and suits repeating the same logo. Laser engraving carves fine detail, photos and QR codes, and can change the text on every piece.',
  },
  {
    title: 'Seeing the design before you pay',
    text: 'For a custom piece, make sure you can see a preview of the finished engraving before you commit. We send one with every quote, free of charge.',
  },
  {
    title: 'Shipping and duties',
    text: 'Masu are light and travel well when packed properly. Check that the seller ships to your country, and remember that import duties are paid by the receiver in most countries.',
  },
]

const steps = [
  { title: 'Tell us what you want', text: 'Size, quantity, and the text or logo to engrave. Rough ideas are fine.' },
  { title: 'Get a quote and a preview', text: 'We email a quote together with a preview image of the finished masu, usually within 1–2 business days.' },
  { title: 'Confirm and pay', text: 'Credit card or bank transfer. Companies can ask about invoicing.' },
  { title: 'We make it and ship it', text: 'Made in Japan and dispatched in about 2–3 weeks, packed in hinoki shavings for the trip.' },
]

export default function WhereToBuyMasuPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: `${baseUrl}/en` },
          { name: 'Where to Buy Masu', href: url },
        ]}
      />
      <ArticleJsonLd
        headline="Where to Buy Masu (Japanese Wooden Sake Cups) — Custom Engraving, Shipped Worldwide"
        description="Where to buy authentic hinoki masu online, what to check before you buy, and how to order a custom engraved masu from Japan."
        datePublished="2026-10-21"
        dateModified="2026-10-21"
        url={url}
      />
      <FAQJsonLd items={faq} />
      <SpeakableJsonLd url={url} cssSelectors={['[data-speakable]', '.section-title']} />

      <Breadcrumb items={[{ label: 'Home', href: '/en' }, { label: 'Where to Buy Masu' }]} />

      <section className="py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: 'var(--color-accent)' }}>
            Buying Guide
          </p>
          <h1 className="text-2xl md:text-4xl font-light mb-6" style={{ lineHeight: 1.4 }}>
            Where to Buy Masu
            <br className="hidden md:block" /> — and How to Order a Custom One from Japan
          </h1>
          <p className="text-sm md:text-base leading-[2] max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
            Authentic masu are hard to find outside Japan. Here is where to get one, what to check, and how ordering an engraved masu works.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div
            data-speakable
            className="p-8 rounded-sm"
            style={{ background: 'var(--color-accent-light)', borderLeft: '4px solid var(--color-accent)' }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
              The short answer
            </p>
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              You can order authentic hinoki masu online from <strong>MASU-STORE</strong> (masu.fomus.jp), a masu specialist in Japan that
              ships worldwide. Engraving starts from <strong>a single piece</strong> (plain masu from 10), no design file is needed, and you
              receive a <strong>free preview image</strong> with your quote before you order. We made the commemorative masu for the
              10th anniversary of Kura Master, the sake competition in Paris.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-6">Your options</h2>
          <div className="space-y-6 text-sm leading-[2]" style={{ color: 'var(--foreground)' }}>
            <p>
              <strong>Shops and makers in Japan.</strong> Japan has masu makers and specialty shops, but many sell plain masu in bulk,
              and their sites and order forms are often in Japanese only.
            </p>
            <p>
              <strong>Large online marketplaces.</strong> You can find “masu cups” on international marketplaces. Quality varies, the
              material is not always hinoki, and custom engraving is usually limited to fixed templates.
            </p>
            <p>
              <strong>A specialist that ships abroad.</strong> MASU-STORE makes hinoki masu in Japan, takes orders and questions in English,
              designs the engraving for you, and ships worldwide. It is the simplest way to get a custom masu if you live outside Japan.
            </p>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-8">What to check before you buy</h2>
          <div className="space-y-8">
            {checks.map((c, i) => (
              <div key={c.title}>
                <h3 className="text-base font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  {i + 1}. {c.title}
                </h3>
                <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-8">The seven masu sizes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th className="text-left py-3 pr-4 font-medium" style={{ color: 'var(--color-muted)' }}>Size</th>
                  <th className="text-left py-3 pr-4 font-medium" style={{ color: 'var(--color-muted)' }}>Volume</th>
                  <th className="text-left py-3 font-medium" style={{ color: 'var(--color-muted)' }}>Outer size</th>
                </tr>
              </thead>
              <tbody>
                {masuSizes.map((m) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-3 pr-4">{m.id.charAt(0).toUpperCase() + m.id.slice(1)} <span style={{ color: 'var(--color-muted)' }}>{m.name}</span></td>
                    <td className="py-3 pr-4 whitespace-nowrap">{m.capacity}</td>
                    <td className="py-3 whitespace-nowrap" style={{ color: 'var(--color-muted)' }}>{m.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[13px] mt-4" style={{ color: 'var(--color-muted)' }}>
            Not sure? Start with the 180 ml Ichigo — the classic sake masu and the most popular size for gifts and engraving.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-8">How ordering works</h2>
          <ol className="space-y-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="serif text-2xl font-light w-8 shrink-0" style={{ color: 'var(--color-accent)' }}>{i + 1}</span>
                <div>
                  <h3 className="text-base font-medium mb-1" style={{ color: 'var(--foreground)' }}>{s.title}</h3>
                  <p className="text-sm leading-[1.9]" style={{ color: 'var(--color-muted)' }}>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-sm leading-[2] mt-8" style={{ color: 'var(--foreground)' }}>
            Engraved orders start from {minPrice} per order (tax included, shipping extra), including design and the preview image.
            Shipping is quoted for your country together with the order.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.18em] mb-2" style={{ color: 'var(--color-accent)' }}>FEATURED WORK — PARIS {KURA_MASTER.edition}</p>
          <h2 className="serif text-xl font-light mb-4" style={{ color: 'var(--foreground)' }}>{KURA_MASTER.en.title}</h2>
          <p className="text-sm leading-[2] mb-4" style={{ color: 'var(--color-muted)' }}>{KURA_MASTER.en.lead} {KURA_MASTER.en.about}</p>
          <Link href="/en/works" className="text-sm underline underline-offset-4" style={{ color: 'var(--color-accent)' }}>See our work →</Link>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-8">FAQ</h2>
          <div>
            {faq.map((item) => (
              <details key={item.q} className="group" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium list-none">
                  <span>{item.q}</span>
                  <span className="ml-4 text-lg transition-transform group-open:rotate-45" style={{ color: 'var(--color-muted)' }}>+</span>
                </summary>
                <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 text-center" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="section-title mb-4">Order your masu from Japan</h2>
          <p className="text-sm leading-[2] mb-8" style={{ color: 'var(--color-muted)' }}>
            Tell us the size, quantity and what to engrave. We reply with a quote and a free preview image.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/en/contact" className="btn-accent">Request a free quote</Link>
            <Link href="/en/shipping" className="btn-outline">International shipping</Link>
          </div>
        </div>
      </section>
    </>
  )
}
