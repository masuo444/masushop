import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd, HowToJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'Japanese Corporate Gifts — Custom-Engraved Wooden Cups for Business',
  description: 'Stand out with branded hinoki cypress cups from Japan. Custom logo engraving, bulk orders from 10 to 10,000+ units. Perfect for conferences, anniversaries, client gifts, and employee recognition.',
  keywords: 'Japanese corporate gift, branded wooden cup, corporate gift ideas, conference giveaway, Japanese business gift, custom logo gift, bulk corporate gifts, employee recognition gift, client appreciation gift, trade show giveaway',
  alternates: {
    canonical: `${baseUrl}/en/corporate`,
    languages: { ja: `${baseUrl}/business`, en: `${baseUrl}/en/corporate` },
  },
  openGraph: {
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    locale: 'en_US',
  },
}

const useCases = [
  {
    title: 'Conference & Trade Show',
    description: 'Stop people at your booth. A wooden cup is the giveaway nobody throws away.',
  },
  {
    title: 'Company Anniversary',
    description: '10th, 25th, 50th \u2014 mark the milestone with something that lasts.',
  },
  {
    title: 'Client Appreciation',
    description: 'Year-end gifts that say \u201cwe value this relationship.\u201d',
  },
  {
    title: 'Employee Recognition',
    description: 'Onboarding, promotions, retirement. A name-engraved cup they\u2019ll keep.',
  },
  {
    title: 'Product Launch',
    description: 'Create a limited-edition branded cup for your launch event.',
  },
  {
    title: 'Shareholder Gifts',
    description: 'Distinguish your company with Japanese craftsmanship.',
  },
]

const faqData = [
  {
    q: 'What\u2019s the minimum order?',
    a: '10 units for plain cups, 1 unit for samples.',
  },
  {
    q: 'Can each cup have a different design?',
    a: 'Yes, with laser engraving. Branding iron uses one design for all.',
  },
  {
    q: 'Do you handle packaging?',
    a: 'Yes. Individual wrapping, custom boxes, and noshi (Japanese ceremonial wrapping) available.',
  },
]

// Questions a procurement team has to answer internally before signing off.
// Framed as a buyer's checklist rather than self-promotion.
const preOrderChecks = [
  {
    q: 'Is there a plate or setup fee?',
    a: 'Branding irons require a one-time copper plate for the first order. Laser engraving needs no plate, so there is no setup fee. We recommend whichever suits your artwork and quantity.',
  },
  {
    q: 'Do we need to supply artwork files?',
    a: 'No. Send a photo of your logo on a business card, envelope or signage and we will rebuild the artwork. We can also start from plain text. Revisions are free, as many rounds as you need.',
  },
  {
    q: 'Can we approve a physical sample first?',
    a: 'Yes. We produce samples on request so you can check engraving depth and placement on the actual product before we run the full order.',
  },
  {
    q: 'Can each unit carry different text?',
    a: 'Yes, with laser engraving. Individual names for award recipients or per-department variations require no additional plates.',
  },
  {
    q: 'Where are they made?',
    a: 'Japan. We use domestic hinoki cypress and produce everything in-house, from raw timber through to engraving and inspection.',
  },
  {
    q: 'What lead time should we plan for?',
    a: 'Roughly 2 weeks for plain cups, 3 weeks with engraving, and 4 weeks for orders above 300 units. Timelines shift depending on how quickly artwork is approved.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes. We have shipped to Asia, North America and Europe, and can engrave messages in English and other languages.',
  },
]

const steps = [
  { number: '1', title: 'Tell us what you need', description: 'Size, quantity, design \u2014 the basics.' },
  { number: '2', title: 'We create a proof', description: 'Revisions are free.' },
  { number: '3', title: 'Approve a sample', description: 'Optional but recommended.' },
  { number: '4', title: 'We produce, inspect, and ship', description: 'Worldwide delivery.' },
]

export default function EnCorporatePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: baseUrl },
          { name: 'English', href: `${baseUrl}/en` },
          { name: 'Corporate Gifts', href: `${baseUrl}/en/corporate` },
        ]}
      />
      <SpeakableJsonLd url={`${baseUrl}/en/corporate`} cssSelectors={['[data-speakable]', '.section-title']} />
      <FAQJsonLd items={faqData} />
      <HowToJsonLd
        name="How to Order Custom Corporate Masu"
        description="Four steps to branded Japanese wooden cups for your business."
        steps={[
          { name: 'Contact us', text: 'Tell us your size, quantity, and design needs.' },
          { name: 'Approve the proof', text: 'We create a design layout — revisions are free.' },
          { name: 'Review a sample', text: 'Optional: approve a physical sample before production.' },
          { name: 'Production and delivery', text: 'We produce, inspect, and ship worldwide in 2-4 weeks.' },
        ]}
      />

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'English', href: '/en' }, { label: 'Corporate Gifts' }]} />

      {/* Hero */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-accent)', color: '#fff' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
            The Corporate Gift Nobody Forgets
          </h1>
          <p className="text-sm md:text-base leading-relaxed mb-10 opacity-90">
            A branded hinoki cypress cup from Japan. Not another pen. Not another tote bag.
            Something with 1,300 years of craftsmanship behind it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/en/contact"
              className="inline-block px-8 py-3 text-sm font-medium rounded-sm"
              style={{ background: '#fff', color: 'var(--color-accent)' }}
            >
              Get a Quote
            </Link>
            <Link
              href="/en/contact?subject=Sample+Request"
              className="inline-block px-8 py-3 text-sm font-medium rounded-sm border"
              style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
            >
              Request Samples
            </Link>
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="section-title mb-12">Why It Works</h2>

          <div data-speakable className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-medium mb-2">It&apos;s useful</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                People actually drink from it. It sits on their desk. It stays.
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">It&apos;s remarkable</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Wood, not plastic. Japan, not generic. 1,300 years, not mass-produced.
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">It&apos;s personal</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Your logo, burned into hinoki by artisans. Not printed. Not stuck on. Carved in.
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">It starts conversations</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                &ldquo;Where did you get this?&rdquo; is the question every brand wants people to ask.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-title mb-12">Use Cases</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-sm"
                style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
              >
                <p className="font-medium mb-2">{item.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Engraving Methods */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="section-title mb-12">Two Engraving Methods</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div
              className="p-6 rounded-sm"
              style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-2">Yakiin (Branding Iron)</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Traditional. Warm. Best for logos and large runs.
              </p>
            </div>
            <div
              className="p-6 rounded-sm"
              style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-2">Laser</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Precise. Detailed. Best for photos, QR codes, individual names.
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            Both methods work on all 7 sizes. Samples available before you commit.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="section-title mb-12">How It Works</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <p
                  className="text-2xl font-bold mb-3"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {step.number}
                </p>
                <p className="font-medium mb-2 text-sm">{step.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scale */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-6">Scale</h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
            From 10 cups to 10,000+. Whether you&apos;re gifting your team or your entire conference, we&apos;ve got you covered.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            <div
              className="p-5 rounded-sm text-center"
              style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-1">Minimum</p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>10 units</p>
            </div>
            <div
              className="p-5 rounded-sm text-center"
              style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-1">Samples</p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>1&ndash;2 units for evaluation</p>
            </div>
            <div
              className="p-5 rounded-sm text-center"
              style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-1">Turnaround</p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>2&ndash;4 weeks depending on quantity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real work sample */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="section-title mb-4 text-center">Recent Work</h2>
          <p className="lead text-center mb-10">
            Laser engraving on a 180ml cup for Ishiwa Onsen Ashiyu Hiroba, published with their permission.
            Fine logo lines are reproduced together with the wood grain at this level of detail.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { src: '/images/works/ishiwa-ashiyu-front.jpg', alt: 'Laser-engraved hinoki masu cup, front view', w: 1448, h: 1086 },
              { src: '/images/works/ishiwa-ashiyu-detail.jpg', alt: 'Close-up of laser engraving on hinoki wood grain', w: 1536, h: 1024 },
              { src: '/images/works/ishiwa-ashiyu-hand.jpg', alt: 'Hinoki masu cup held in hand, showing scale', w: 1448, h: 1086 },
            ].map((img) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                className="w-full rounded-sm"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pre-order checklist */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-4 text-center">Before You Order</h2>
          <p className="lead text-center mb-10">
            These are the questions procurement teams have to answer internally.
            Here are our terms, laid out so you can compare them against other quotes.
          </p>
          <div className="space-y-6">
            {preOrderChecks.map((item) => (
              <div key={item.q} className="pb-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <h3 className="text-sm font-medium mb-3">{item.q}</h3>
                <p className="text-sm leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/en/contact" className="btn-accent">
              Request a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-8">
            <blockquote
              className="p-6 rounded-sm"
              style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
            >
              <p className="text-sm leading-relaxed mb-3" style={{ fontStyle: 'italic' }}>
                &ldquo;We ordered 100 logo-engraved cups for our 30th anniversary. Clients called them &lsquo;the best corporate gift they&apos;d received.&rsquo;&rdquo;
              </p>
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                &mdash; Manufacturing company
              </p>
            </blockquote>
            <blockquote
              className="p-6 rounded-sm"
              style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
            >
              <p className="text-sm leading-relaxed mb-3" style={{ fontStyle: 'italic' }}>
                &ldquo;The wooden cups were the star of our trade show booth. People stopped to touch them.&rdquo;
              </p>
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                &mdash; Tech company
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-12">Frequently Asked Questions</h2>
          <div className="space-y-0">
            {faqData.map((item, i) => (
              <details
                key={i}
                className="group"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium list-none">
                  <span>{item.q}</span>
                  <span
                    className="ml-4 text-lg transition-transform group-open:rotate-45"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    +
                  </span>
                </summary>
                <p
                  className="pb-5 text-sm leading-relaxed"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-accent)', color: '#fff' }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">
            Let&apos;s Create Something Memorable
          </h2>
          <p className="text-sm mb-10 leading-relaxed opacity-90">
            Tell us about your event, your brand, and your timeline. We&apos;ll handle the rest.
          </p>
          <Link
            href="/en/contact"
            className="inline-block px-8 py-3 text-sm font-medium rounded-sm"
            style={{ background: '#fff', color: 'var(--color-accent)' }}
          >
            Request a Free Quote
          </Link>
        </div>
      </section>

      {/* Language Switcher */}
      <div className="text-center py-12">
        <Link
          href="/business"
          className="text-xs underline"
          style={{ color: 'var(--color-muted)' }}
        >
          日本語版はこちら / View in Japanese
        </Link>
      </div>
    </>
  )
}
