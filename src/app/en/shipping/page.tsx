import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'Order Masu from Japan — International Shipping, Engraving & Lead Times',
  description:
    'How to order Japanese masu sake cups from outside Japan. Engraving from one piece, plain masu from ten, 2–3 weeks to make, shipped worldwide from Japan. Quote and an engraving preview before you order.',
  keywords:
    'buy masu japan, order masu online, ship masu worldwide, japanese sake cup international shipping, engraved masu, custom masu order, wholesale masu, masu supplier japan',
  alternates: {
    canonical: `${baseUrl}/en/shipping`,
    languages: { ja: `${baseUrl}/guide`, en: `${baseUrl}/en/shipping` },
  },
  openGraph: {
    title: 'Order Masu from Japan — International Shipping & Engraving',
    description:
      'Engraving from one piece, plain masu from ten, made in 2–3 weeks and shipped worldwide from Japan.',
    url: `${baseUrl}/en/shipping`,
    type: 'article',
    siteName: siteConfig.name,
    locale: 'en_US',
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

const shippingFaq = [
  {
    q: 'Do you ship masu outside Japan?',
    a: 'Yes. We ship worldwide from Japan. Each masu is wrapped in hinoki wood shavings left over from production and packed for international transit. Tell us the destination country and the quantity, and we will quote the shipping with the order.',
  },
  {
    q: 'What is the minimum order?',
    a: 'Engraved masu start at one piece. Plain masu without engraving start at ten pieces. There is no upper limit; for several hundred pieces we plan the production schedule with you.',
  },
  {
    q: 'How long does it take?',
    a: 'Engraved masu are usually made and dispatched within 2–3 weeks. For orders of 100 pieces or more, allow 3–4 weeks. Transit time depends on the destination and the shipping method you choose. If you have a fixed date, tell us and we will work back from it.',
  },
  {
    q: 'Can you engrave in my language?',
    a: 'Yes. We engrave Latin script, Japanese, Arabic and logos. Send us the text or the logo file and we will send back a preview of how it will sit on the masu before you commit to the order.',
  },
  {
    q: 'How do I pay from abroad?',
    a: 'Credit card or bank transfer. Companies can also ask about invoicing. We confirm the payment method with you when we send the quote.',
  },
  {
    q: 'Will I be charged import duties?',
    a: 'Duties and import taxes are set by the country you are shipping to, and they are charged to the receiver on arrival. We cannot calculate them in advance, and they are not included in our quote.',
  },
  {
    q: 'Can I order a sample first?',
    a: 'You can order a single engraved masu as your first piece, which many companies do before placing a larger order. Before you order anything, we send a free quote and a preview image of the finished engraving.',
  },
]

const steps = [
  {
    n: '01',
    title: 'Tell us what you need',
    body: 'Size, quantity, what you want engraved, the country it ships to, and the date you need it by. If some of that is undecided, send what you have.',
  },
  {
    n: '02',
    title: 'We send a quote and a preview',
    body: 'You get the price including shipping, the lead time, and an image showing how your text or logo will look on the masu. Both are free, and nothing is charged until you approve.',
  },
  {
    n: '03',
    title: 'You approve, we make it',
    body: 'Production takes about 2–3 weeks for engraved masu. Every piece is made from Japanese hinoki cypress and engraved in Japan.',
  },
  {
    n: '04',
    title: 'Shipped from Japan',
    body: 'Packed in hinoki shavings and dispatched with tracking. We send you the tracking number when it leaves.',
  },
]

export default function EnShippingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: baseUrl },
          { name: 'English', href: `${baseUrl}/en` },
          { name: 'International Orders', href: `${baseUrl}/en/shipping` },
        ]}
      />
      <SpeakableJsonLd url={`${baseUrl}/en/shipping`} cssSelectors={['[data-speakable]', '.section-title']} />
      <FAQJsonLd items={shippingFaq} />

      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'English', href: '/en' }, { label: 'International Orders' }]}
      />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="section-title mt-4">Ordering Masu from Outside Japan</h1>
        <p
          data-speakable
          className="mt-6 text-sm leading-[2] max-w-2xl mx-auto text-[var(--foreground)]"
        >
          We are a masu specialist in Japan and we ship worldwide. Engraving starts at
          one piece, plain masu at ten. Engraved orders are usually made within 2–3 weeks. Before you
          order, we send a quote and a preview image of the engraving, both free.
        </p>
        <div className="mt-8">
          <Link
            href="/en/contact"
            className="inline-block px-8 py-3 text-sm tracking-wide rounded"
            style={{ background: 'var(--foreground)', color: 'var(--background)' }}
          >
            Request a quote
          </Link>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* At a glance */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="serif text-2xl font-light mb-8">At a glance</h2>
        <div className="border border-[var(--color-border)] rounded overflow-hidden">
          {[
            ['Ships to', 'Worldwide, from Japan'],
            ['Minimum order', 'Engraved: 1 piece · Plain: 10 pieces'],
            ['Production time', 'Engraved: 2–3 weeks · 100+ pieces: 3–4 weeks'],
            ['Engraving', 'Laser engraving and branding iron. Latin script, Japanese, Arabic, logos'],
            ['Material', 'Japanese hinoki cypress, made in Japan'],
            ['Payment', 'Credit card or bank transfer. Invoicing available for companies'],
            ['Before ordering', 'Free quote and a preview image of the engraving'],
            ['Duties', 'Set and charged by the destination country, not included in the quote'],
          ].map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-1 sm:grid-cols-[180px_1fr] border-b border-[var(--color-border)] last:border-b-0"
            >
              <div className="px-5 py-4 text-xs tracking-wide uppercase text-[var(--color-muted)] bg-[var(--color-subtle)]">
                {k}
              </div>
              <div className="px-5 py-4 text-sm leading-[1.9] text-[var(--foreground)]">{v}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-10">How an order works</h2>
        <ol className="space-y-8">
          {steps.map((s) => (
            <li key={s.n} className="grid grid-cols-[48px_1fr] gap-4">
              <span className="text-xs tracking-[0.2em] text-[var(--color-accent)] pt-1">{s.n}</span>
              <div>
                <h3 className="serif text-lg font-light mb-2">{s.title}</h3>
                <p className="text-sm leading-[2.1] text-[var(--foreground)]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* Who orders from abroad */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-8">What people order from abroad</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              t: 'Sake bars and Japanese restaurants',
              b: 'Masu for serving mokkiri, engraved with the restaurant name. Usually the ichigo (180ml) size, with a protective coating so they survive daily washing.',
            },
            {
              t: 'Sake importers and distributors',
              b: 'Masu as part of a gift set or a promotion, engraved with the brewery or brand logo.',
            },
            {
              t: 'Companies and events',
              b: 'Corporate gifts, anniversary pieces and conference giveaways that need to say something about Japan without being generic.',
            },
            {
              t: 'Individuals',
              b: 'A single engraved masu as a wedding, birthday or farewell gift. One piece is a normal order for us.',
            },
          ].map((c) => (
            <div key={c.t} className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
              <h3 className="serif text-base font-light mb-3">{c.t}</h3>
              <p className="text-xs leading-[2] text-[var(--color-muted)]">{c.b}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm leading-[2.1] text-[var(--foreground)]">
          Not sure which size you need? The{' '}
          <Link href="/en/guide" className="underline">size guide</Link> compares every size with what
          fits inside it, and{' '}
          <Link href="/en/sake-cups" className="underline">the masu sake cup page</Link> explains how
          the wood changes the sake.
        </p>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-10">Questions from overseas customers</h2>
        <div className="space-y-8">
          {shippingFaq.map((f) => (
            <div key={f.q} className="border-b border-[var(--color-border)] pb-6 last:border-b-0">
              <h3 className="text-sm font-medium mb-3 text-[var(--foreground)]">{f.q}</h3>
              <p className="text-sm leading-[2.1] text-[var(--color-muted)]">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="serif text-2xl font-light mb-4">Tell us where it is going</h2>
        <p className="text-sm leading-[2] text-[var(--color-muted)] mb-8 max-w-xl mx-auto">
          Send the destination country, the quantity and what you would like engraved. We will come
          back with a price including shipping and a preview of the engraving.
        </p>
        <Link
          href="/en/contact"
          className="inline-block px-8 py-3 text-sm tracking-wide rounded"
          style={{ background: 'var(--foreground)', color: 'var(--background)' }}
        >
          Request a quote
        </Link>
      </section>
    </>
  )
}
