import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'Unique Japanese Gifts — Handcrafted Wooden Cups with Custom Engraving',
  description:
    "Give a gift that carries 1,300 years of meaning. Handcrafted hinoki wooden cups with custom engraving — for weddings, birthdays, corporate events, and anyone who loves Japan.",
  keywords:
    'Japanese gift ideas, unique Japanese gift, Japanese wedding gift, Japanese corporate gift, personalized Japanese gift, Japanese souvenir, gift from Japan, Japanese craft gift, engraved wooden cup',
  alternates: {
    canonical: `${baseUrl}/en/gifts`,
    languages: { ja: `${baseUrl}/gift`, en: `${baseUrl}/en/gifts` },
  },
  openGraph: {
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
    locale: 'en_US',
  },
}

const breadcrumbItems = [
  { name: 'Home', href: baseUrl },
  { name: 'English', href: `${baseUrl}/en` },
  { name: 'Gifts', href: `${baseUrl}/en/gifts` },
]

const occasions = [
  {
    title: 'Weddings',
    desc: '"May your happiness increase." Engrave names and the date. A pair of masu is the traditional gift — one for each partner, a shared wish for a prosperous life together.',
  },
  {
    title: 'Birthdays & Anniversaries',
    desc: 'A personalized cup they\'ll use for years. Better than flowers, more meaningful than gadgets. Every sip becomes a reminder of the person who gave it.',
  },
  {
    title: 'Corporate Milestones',
    desc: 'Company logo on hinoki wood. 10th anniversary, IPO celebration, client appreciation. A gift that says your brand values craftsmanship and tradition.',
  },
  {
    title: 'Housewarming',
    desc: 'A touch of Japan for any kitchen or bar shelf. Lightweight, beautiful, and immediately useful. The hinoki aroma fills the room the moment they open the box.',
  },
  {
    title: 'For the Sake Lover',
    desc: 'The upgrade from glass they didn\'t know they needed. Once they taste sake from hinoki, there\'s no going back. The perfect gift for someone who has everything.',
  },
  {
    title: 'Farewell & Thank You',
    desc: 'In Japan, masu are given when you wish someone continued success. "Masu" means "to increase" — a farewell gift that carries a wish for more of everything good.',
  },
]

const testimonials = [
  'My American friend said it was the most unique gift he\'d ever received.',
  'We engraved our company logo on 100 cups for our anniversary — clients loved them.',
  'The hinoki aroma was the first thing they noticed when they opened the box.',
]

const faqItems = [
  {
    q: 'Can you ship gifts directly to someone?',
    a: 'Yes, we can ship to any address worldwide. Simply provide the recipient\'s address when you place your order, and we\'ll handle the rest. Gift messaging is available at no extra charge.',
  },
  {
    q: 'Do you offer gift wrapping?',
    a: 'Yes, individual packaging and gift wrapping are available. Each masu can be wrapped in traditional Japanese-style packaging that matches the premium nature of the gift.',
  },
  {
    q: 'How long does custom engraving take?',
    a: 'Approximately 2-3 weeks from design approval to shipment. Rush orders are available for time-sensitive occasions — contact us and we\'ll do our best to accommodate your timeline.',
  },
  {
    q: 'What can be engraved on a masu?',
    a: 'Almost anything. Names, dates, messages, company logos, illustrations, photographs, QR codes, and custom designs. We offer two methods: Yakiin (traditional branding iron) for a warm, classic look, and laser engraving for fine detail and photographic reproduction.',
  },
]

export default function GiftsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SpeakableJsonLd
        url={`${baseUrl}/en/gifts`}
        cssSelectors={['[data-speakable]', '.section-title']}
      />
      <FAQJsonLd items={faqItems} />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-4xl mx-auto px-6 pt-8 text-[11px]"
        style={{ color: 'var(--color-muted)' }}
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/en" className="hover:text-[var(--foreground)] transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li style={{ color: 'var(--foreground)' }}>Gifts</li>
        </ol>
      </nav>

      {/* ===== HERO ===== */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <p
          className="text-[10px] tracking-[0.5em] uppercase mb-6"
          style={{ color: 'var(--color-accent)' }}
        >
          Meaningful Gifts from Japan
        </p>
        <h1 className="section-title mt-4" style={{ lineHeight: 1.5 }}>
          A Gift That Carries 1,300 Years of Meaning
        </h1>
        <p
          className="mt-6 text-sm leading-[2] max-w-2xl mx-auto"
          style={{ color: 'var(--color-muted)' }}
        >
          In Japanese, &ldquo;masu&rdquo; means &ldquo;to increase.&rdquo; Every masu is a wish
          — for more happiness, more prosperity, more of everything good.
        </p>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ===== Why Masu Make Unforgettable Gifts ===== */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-10">Why Masu Make Unforgettable Gifts</h2>
        <div
          data-speakable
          className="p-8 rounded-sm mb-10"
          style={{
            background: 'var(--color-accent-light)',
            borderLeft: '4px solid var(--color-accent)',
          }}
        >
          <p className="text-sm leading-[2.2]" style={{ color: 'var(--foreground)' }}>
            They&rsquo;re not just cups. They&rsquo;re symbols.
            &ldquo;Masu&rdquo; = &ldquo;increase / prosper&rdquo; in Japanese. Each one is
            handcrafted from hinoki cypress by artisans in Gifu, Japan. They can be personalized
            with names, dates, logos, and messages. Small, lightweight, easy to ship anywhere.
            Useful <em>and</em> beautiful — people actually use them, not just display them.
          </p>
        </div>

        <div className="space-y-4 text-sm leading-[2.2]" style={{ color: 'var(--foreground)' }}>
          <p>
            Most gifts end up in a drawer. A masu ends up on the bar shelf, the kitchen counter,
            the desk. It gets used. And every time the recipient pours a drink, arranges flowers,
            or simply catches a hint of hinoki, they think of the person who gave it to them.
          </p>
          <p>
            That&rsquo;s what separates a masu from a souvenir. It&rsquo;s a gift that becomes
            part of someone&rsquo;s daily life.
          </p>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ===== For Every Occasion ===== */}
      <section
        className="py-16 md:py-20"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="serif section-title mb-12">For Every Occasion</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {occasions.map((item, i) => (
              <div
                key={item.title}
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  background: 'var(--background)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'baseline',
                    marginBottom: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'var(--color-accent)',
                      letterSpacing: '0.05em',
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="serif"
                    style={{ fontWeight: 500, fontSize: '1.1rem' }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.9,
                    color: 'var(--color-muted)',
                    paddingLeft: '2.25rem',
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Make It Personal ===== */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-10">Make It Personal</h2>
        <p className="text-sm leading-[2.2] mb-8" style={{ color: 'var(--foreground)' }}>
          From initials to illustrations, company logos to QR codes — every masu can be uniquely
          yours.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div
            className="p-6 rounded-sm"
            style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
          >
            <p className="font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
              Yakiin (Branding Iron)
            </p>
            <p className="text-sm font-medium mb-2">Traditional Warmth</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              A heated copper plate (~400&deg;C) pressed into the wood. Creates a warm,
              burnt-brown impression with a handcrafted feel. Ideal for logos, company names, and
              large orders.
            </p>
          </div>
          <div
            className="p-6 rounded-sm"
            style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
          >
            <p className="font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
              Laser Engraving
            </p>
            <p className="text-sm font-medium mb-2">Modern Precision</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              High-precision laser carving that reproduces photographs, fine text, gradients, and
              intricate designs. Each piece can have a unique design. Perfect for personalized
              gifts.
            </p>
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ===== What Recipients Say ===== */}
      <section
        className="py-16 md:py-20"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="serif section-title mb-12">What Recipients Say</h2>
          <div className="space-y-6">
            {testimonials.map((quote, i) => (
              <div
                key={i}
                className="p-6 rounded-sm"
                style={{
                  background: 'var(--background)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <p
                  className="serif text-sm leading-[2] italic"
                  style={{ color: 'var(--foreground)' }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== From One Cup to Ten Thousand ===== */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-10">From One Cup to Ten Thousand</h2>
        <div data-speakable className="space-y-4">
          <div
            className="flex items-center gap-4 p-4 rounded-sm"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <span
              className="text-xs font-medium flex-shrink-0"
              style={{ color: 'var(--color-accent)', minWidth: '6rem' }}
            >
              Personal Gifts
            </span>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              1 &ndash; 10 cups
            </p>
          </div>
          <div
            className="flex items-center gap-4 p-4 rounded-sm"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <span
              className="text-xs font-medium flex-shrink-0"
              style={{ color: 'var(--color-accent)', minWidth: '6rem' }}
            >
              Wedding Favors
            </span>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              30 &ndash; 200 cups
            </p>
          </div>
          <div
            className="flex items-center gap-4 p-4 rounded-sm"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <span
              className="text-xs font-medium flex-shrink-0"
              style={{ color: 'var(--color-accent)', minWidth: '6rem' }}
            >
              Corporate Gifts
            </span>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              100 &ndash; 10,000+ cups
            </p>
          </div>
        </div>
        <p
          className="text-sm leading-[2] mt-8"
          style={{ color: 'var(--color-muted)' }}
        >
          Whatever the quantity, we handle everything — design, engraving, packaging, worldwide
          shipping.
        </p>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ===== FAQ ===== */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-12">Frequently Asked Questions</h2>
        <div className="space-y-0">
          {faqItems.map((item, i) => (
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
      </section>

      {/* ===== CTA ===== */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-accent)', color: '#fff' }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-light mb-4" style={{ lineHeight: 1.5 }}>
            Tell Us About Your Gift
          </h2>
          <p className="text-sm mb-8 leading-[2]" style={{ opacity: 0.85 }}>
            We&rsquo;ll make it perfect. Custom engraving, gift wrapping, worldwide shipping.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/en/contact"
              className="inline-block px-8 py-4 text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ background: '#fff', color: 'var(--color-accent)' }}
            >
              Start Your Order
            </Link>
            <Link
              href="/en/sake-cups"
              className="inline-block px-8 py-4 text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#fff' }}
            >
              Sake Cup Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Language switcher */}
      <section className="py-8 text-center">
        <Link href="/gift" className="text-xs underline" style={{ color: 'var(--color-muted)' }}>
          日本語版はこちら
        </Link>
      </section>
    </>
  )
}
