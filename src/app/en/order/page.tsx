import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { jsonLd } from '@/lib/json-ld'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { euProducts, SHIP_COUNTRIES, SHIPPING_EUR } from '@/lib/eu-order-products'

const baseUrl = siteConfig.url
const pageUrl = `${baseUrl}/en/order`

const products = euProducts

const orderFaq = [
  {
    q: 'Where can I buy a Japanese wooden sake cup (masu) in Europe?',
    a: 'You can order handcrafted hinoki masu online on this page. They are made in Ogaki, Japan, and shipped by EMS express mail to EU countries, Switzerland and Norway for a flat €45 per order.',
  },
  {
    q: 'How much does a masu cost?',
    a: 'A plain Ichigo masu (180 ml) costs €15.20 and a Sanjaku mini masu (54 ml) costs €12.10. Shipping to Europe is €45 per order. Engraved masu and large orders are quoted individually.',
  },
  {
    q: 'What size masu should I choose for sake?',
    a: 'The Ichigo masu (85 × 85 × 56 mm, 180 ml) is the standard sake cup in Japan and holds exactly one gō of sake. The Sanjaku mini masu (56 × 56 × 39 mm, 54 ml) is for small tastings or as a decorative object.',
  },
  {
    q: 'How long does shipping from Japan to Europe take?',
    a: 'We ship within 2 business days after payment. EMS (Japan Post express mail) usually arrives in Europe in about 5 to 10 days, with tracking.',
  },
  {
    q: 'Do I have to pay import tax or customs fees?',
    a: 'Yes. The price includes only the masu and shipping. Import VAT, customs duties and handling fees charged in your country on delivery are paid by the recipient.',
  },
  {
    q: 'Can I return or exchange a masu?',
    a: 'Yes. You can return unused masu within 14 days of delivery. Please contact us first at contact@fomus.jp. Return shipping costs are paid by the customer. If your masu arrives damaged or defective, contact us with photos and we will arrange a replacement or refund at no cost to you.',
  },
  {
    q: 'What is a masu made of?',
    a: 'Our masu are made of Japanese hinoki cypress, joined with a traditional interlocking technique without nails or screws. Hinoki gives sake a gentle, fresh wood aroma.',
  },
  {
    q: 'Can I get my logo or name engraved on a masu?',
    a: 'Yes. We offer traditional branding-iron (yakiin) and laser engraving for logos, names and dates. Please request a quote through our contact page.',
  },
]

export const metadata: Metadata = {
  title: 'Buy Japanese Wooden Sake Cups (Masu) Online – Shipped to Europe',
  description:
    'Buy handcrafted Japanese hinoki masu (wooden sake cups) online. Ichigo 180 ml €15.20, Sanjaku mini 54 ml €12.10. Made in Ogaki, Japan. EMS shipping €45 to the EU, Switzerland and Norway.',
  keywords:
    'buy masu online, buy masu europe, japanese wooden sake cup, hinoki sake cup, masu sake cup buy, wooden sake box, sake masu shop',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Buy Japanese Wooden Sake Cups (Masu) Online | MASU-STORE',
    description: 'Handcrafted hinoki masu from Ogaki, Japan. Order online and get them shipped by EMS to Europe.',
    url: pageUrl,
    type: 'website',
    siteName: siteConfig.name,
    locale: 'en_US',
    images: [{ url: `${baseUrl}/images/reasons/hinoki-masu.webp`, width: 900, height: 600 }],
  },
  twitter: { card: 'summary_large_image' },
}

const shippingDetails = {
  '@type': 'OfferShippingDetails',
  shippingRate: { '@type': 'MonetaryAmount', value: SHIPPING_EUR, currency: 'EUR' },
  shippingDestination: [{ '@type': 'DefinedRegion', addressCountry: SHIP_COUNTRIES }],
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 2, unitCode: 'DAY' },
    transitTime: { '@type': 'QuantitativeValue', minValue: 5, maxValue: 10, unitCode: 'DAY' },
  },
}

const returnPolicy = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: SHIP_COUNTRIES,
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 14,
  returnMethod: 'https://schema.org/ReturnByMail',
  returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
}

const productJsonLd = {
  '@context': 'https://schema.org',
  '@graph': products.map((p) => ({
    '@type': 'Product',
    '@id': `${pageUrl}#${p.id}`,
    name: p.schemaName,
    alternateName: p.alt,
    description: `Handcrafted Japanese hinoki cypress masu, ${p.size.join(' × ')} mm, holds ${p.ml} ml. Plain, no engraving. Made in Ogaki, Japan.`,
    image: `${baseUrl}${p.image}`,
    sku: `MASU-${p.id.toUpperCase()}-PLAIN`,
    material: 'Japanese hinoki cypress',
    countryOfOrigin: 'JP',
    brand: { '@type': 'Brand', name: 'MASU-STORE' },
    width: { '@type': 'QuantitativeValue', value: p.size[0], unitCode: 'MMT' },
    depth: { '@type': 'QuantitativeValue', value: p.size[1], unitCode: 'MMT' },
    height: { '@type': 'QuantitativeValue', value: p.size[2], unitCode: 'MMT' },
    offers: {
      '@type': 'Offer',
      url: pageUrl,
      price: p.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'MASU-STORE', url: `${baseUrl}/en` },
      eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 1, maxValue: p.max },
      shippingDetails,
      hasMerchantReturnPolicy: returnPolicy,
    },
  })),
}

export default function EnOrderPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: baseUrl },
          { name: 'English', href: `${baseUrl}/en` },
          { name: 'Buy Online', href: pageUrl },
        ]}
      />
      <SpeakableJsonLd url={pageUrl} cssSelectors={['[data-speakable]', '.section-title']} />
      <FAQJsonLd items={orderFaq} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(productJsonLd) }} />

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'English', href: '/en' }, { label: 'Buy Online' }]} />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <p className="text-[11px] tracking-[0.32em] uppercase text-[var(--color-accent)]">Order online · Ships from Japan</p>
        <h1 className="section-title mt-4">Buy Japanese Wooden Sake Cups (Masu) Online</h1>
        <p className="mt-6 text-sm leading-[2] max-w-2xl mx-auto text-[var(--color-muted)]">
          Handcrafted hinoki masu from Ogaki, Japan — the town that makes about 80% of Japan&apos;s masu.
          Choose your size, pay securely by card, and we ship by EMS express mail within 2 business days.
        </p>
      </section>

      {/* Quick answer */}
      <section className="max-w-4xl mx-auto px-6">
        <p
          data-speakable
          className="border border-[var(--color-border)] bg-white rounded px-5 py-4 text-sm leading-[2] text-[var(--color-muted)]"
        >
          <strong className="text-[var(--foreground)]">In short:</strong> MASU-STORE sells plain Japanese hinoki masu
          online — the Ichigo masu (180 ml, 85 × 85 × 56 mm) for €15.20 and the Sanjaku mini masu (54 ml, 56 × 56 × 39 mm)
          for €12.10. Shipping by EMS to EU countries, Switzerland and Norway costs €45 per order and usually takes 5–10 days.
        </p>
      </section>

      {/* Products */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <article key={p.id} id={p.id} className="scroll-mt-24 bg-white border border-[var(--color-border)] rounded overflow-hidden flex flex-col">
              <Image
                src={p.image}
                alt={p.imageAlt}
                width={900}
                height={600}
                className="w-full h-auto aspect-[3/2] object-cover bg-[var(--color-subtle)]"
              />
              <div className="p-6 flex flex-col flex-1">
                <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent)]">{p.tag}</p>
                <h2 className="serif text-2xl font-light mt-1">
                  {p.name}
                  <span className="ml-2 text-sm text-[var(--color-muted)]">{p.ja}</span>
                </h2>
                <p className="text-xs text-[var(--color-muted)] mt-1">
                  {p.ml} ml · {p.size.join(' × ')} mm · Plain
                </p>
                <p className="text-sm leading-[1.9] mt-3 mb-5 flex-1">{p.desc}</p>
                <p className="flex items-baseline gap-2">
                  <span className="text-2xl">€{p.price}</span>
                  <span className="text-xs text-[var(--color-muted)]">per cup</span>
                </p>
                <p className="text-xs text-[var(--color-muted)] mt-1 mb-4">
                  1–{p.max} cups per order · + €45 EMS shipping
                </p>
                <a
                  href={p.stripe}
                  target="_blank"
                  rel="noopener"
                  className="block text-center px-6 py-3 text-xs tracking-[0.18em] uppercase rounded"
                  style={{ background: 'var(--foreground)', color: 'var(--background)' }}
                >
                  Buy now
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* Shipping, payment & returns */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="serif text-2xl font-light mb-8">Shipping, payment &amp; returns</h2>
        <div className="border border-[var(--color-border)] rounded overflow-hidden">
          {[
            ['Shipping', '€45 per order by EMS (Japan Post express mail) with tracking. Usually arrives in 5–10 days. We ship within 2 business days after payment.'],
            ['Ships to', 'EU countries, Switzerland and Norway. For other countries, please request a quote.'],
            ['Payment', 'Credit card via Stripe. Enter your shipping address and phone number on the payment page.'],
            ['Returns', 'Unused items can be returned within 14 days of delivery (contact us first). Return shipping is paid by the customer. Damaged or defective items are replaced or refunded free of charge.'],
            ['Import taxes', 'Import VAT, customs duties and handling fees charged in your country on delivery are paid by the recipient. By completing the payment, you agree to these conditions.'],
          ].map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-1 sm:grid-cols-[160px_1fr] border-b border-[var(--color-border)] last:border-b-0"
            >
              <div className="px-5 py-4 text-xs tracking-wide uppercase text-[var(--color-muted)] bg-[var(--color-subtle)]">{k}</div>
              <div className="px-5 py-4 text-sm leading-[1.9] text-[var(--foreground)]">{v}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="serif text-2xl font-light mb-10">Frequently asked questions</h2>
        <div className="space-y-8">
          {orderFaq.map((f) => (
            <div key={f.q} className="border-b border-[var(--color-border)] pb-6 last:border-b-0">
              <h3 className="text-sm font-medium mb-3 text-[var(--foreground)]">{f.q}</h3>
              <p className="text-sm leading-[2.1] text-[var(--color-muted)]">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-[var(--color-muted)]">Prices and shipping last updated: November 2026.</p>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="serif text-2xl font-light mb-4">Larger orders, engraving or other sizes?</h2>
        <p className="text-sm leading-[2] text-[var(--color-muted)] mb-8 max-w-xl mx-auto">
          For more than the quantities above, custom engraving (logo, name, date), lidded masu, or other sizes,
          we will send you a personal quote. See also{' '}
          <Link href="/en/shipping" className="underline">international orders</Link> and the{' '}
          <Link href="/en/guide" className="underline">size guide</Link>.
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
