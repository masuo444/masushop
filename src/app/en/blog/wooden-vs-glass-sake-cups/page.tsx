import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import {
  BreadcrumbJsonLd,
  FAQJsonLd,
  SpeakableJsonLd,
} from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'Wooden vs Glass vs Ceramic Sake Cups — Which Is Best? | MASU-STORE',
  description:
    'Compare wooden (masu), glass, and ceramic sake cups. Learn how each material affects flavor, temperature, and the overall sake experience. Find the best cup for your style.',
  keywords:
    'sake cup types, wooden sake cup, best sake cup, glass sake cup, ceramic sake cup, masu sake cup, ochoko, guinomi, sake cup comparison, sake cup material, hinoki sake cup',
  alternates: {
    canonical: `${baseUrl}/en/blog/wooden-vs-glass-sake-cups`,
    languages: { ja: `${baseUrl}/blog`, en: `${baseUrl}/en/blog/wooden-vs-glass-sake-cups` },
  },
  openGraph: {
    title: 'Wooden vs Glass vs Ceramic Sake Cups — Which Is Best?',
    description:
      'A detailed comparison of wooden, glass, and ceramic sake cups. How each material changes flavor, temperature, and experience.',
    url: `${baseUrl}/en/blog/wooden-vs-glass-sake-cups`,
    type: 'article',
    publishedTime: '2025-06-01',
    modifiedTime: '2026-03-13',
    siteName: siteConfig.nameEn,
    locale: 'en_US',
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

const faqData = [
  {
    q: 'Does a wooden sake cup change the taste of sake?',
    a: 'Yes. Hinoki (Japanese cypress) wood naturally infuses sake with a subtle, forest-like aroma from phytoncide compounds. This is the same scent used in Japanese forest bathing (shinrin-yoku). The flavor becomes rounder and softer compared to glass or ceramic.',
  },
  {
    q: 'Are wooden sake cups safe to drink from?',
    a: 'Absolutely. Traditional masu are made from natural, untreated hinoki wood with food-safe adhesive. Hinoki has natural antibacterial properties. Optional food-grade coatings are available for enhanced durability.',
  },
  {
    q: 'Can you drink hot sake from a wooden cup?',
    a: 'Yes, but wooden cups are best suited for room temperature or chilled sake. Hot sake is traditionally served in ceramic ochoko, which retains heat better. That said, warm (not boiling) sake in a masu is a wonderful winter experience.',
  },
]

export default function WoodenVsGlassSakeCupsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Wooden vs Glass vs Ceramic Sake Cups — Which Is Best?',
    description:
      'Compare wooden (masu), glass, and ceramic sake cups. Learn how each material affects flavor, temperature, and the overall sake experience.',
    datePublished: '2025-06-01',
    dateModified: '2026-03-13',
    author: { '@type': 'Organization', name: siteConfig.nameEn },
    publisher: { '@type': 'Organization', name: siteConfig.nameEn },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/en/blog/wooden-vs-glass-sake-cups`,
    },
    inLanguage: 'en',
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: baseUrl },
          { name: 'English', href: `${baseUrl}/en` },
          { name: 'Wooden vs Glass vs Ceramic Sake Cups', href: `${baseUrl}/en/blog/wooden-vs-glass-sake-cups` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SpeakableJsonLd
        url={`${baseUrl}/en/blog/wooden-vs-glass-sake-cups`}
        cssSelectors={['[data-speakable]', '.section-title']}
      />
      <FAQJsonLd items={faqData} />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/en' },
          { label: 'Sake Cup Comparison' },
        ]}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-6"
            style={{ color: 'var(--color-accent)' }}
          >
            Sake Vessels
          </p>
          <h1
            className="text-2xl md:text-4xl font-light mb-6"
            style={{ lineHeight: 1.4, letterSpacing: '-0.01em' }}
          >
            Wooden vs Glass vs Ceramic Sake Cups
          </h1>
          <p
            className="text-sm md:text-base leading-[2] max-w-xl mx-auto"
            style={{ color: 'var(--color-muted)' }}
          >
            The vessel is half the experience. Here is how each material shapes your sake &mdash; and when to reach for each one.
          </p>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Speakable Summary */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div
            data-speakable
            className="p-8 rounded-sm"
            style={{
              background: 'var(--color-accent-light)',
              borderLeft: '4px solid var(--color-accent)',
            }}
          >
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ color: 'var(--color-accent)' }}
            >
              Quick Comparison
            </p>
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              <strong>Wood (masu)</strong> adds a subtle hinoki cypress aroma that enhances flavor &mdash;
              the most traditional choice, ideal for room-temperature and chilled sake.{' '}
              <strong>Glass</strong> is flavor-neutral and lets you appreciate clarity and color &mdash;
              best for premium chilled ginjo.{' '}
              <strong>Ceramic (ochoko)</strong> retains heat and adds a tactile quality &mdash;
              the classic choice for warm sake. Each material creates a genuinely different sake experience.
            </p>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Comparison Table */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Side by Side
          </p>
          <h2
            className="section-title mb-10"
            style={{ fontSize: '1.5rem', fontWeight: 300 }}
          >
            At a Glance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['', 'Wood (Masu)', 'Glass (Guinomi)', 'Ceramic (Ochoko)'].map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-4 text-left font-medium"
                      style={{
                        borderBottom: '2px solid var(--color-border)',
                        color: 'var(--foreground)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Flavor effect', 'Adds hinoki aroma', 'Neutral', 'Neutral'],
                  ['Best temperature', 'Room temp / chilled', 'Chilled', 'Warm / hot'],
                  ['Heat retention', 'Low', 'Low', 'High'],
                  ['Visual appeal', 'Natural wood grain', 'Crystal clear', 'Handmade glaze'],
                  ['Tactile quality', 'Warm, organic', 'Smooth, cool', 'Textured, weighty'],
                  ['Tradition', '1,300+ years', 'Modern', '400+ years'],
                  ['Durability', 'Decades with care', 'Fragile', 'Very durable'],
                  ['Ideal for', 'Ceremonies, daily ritual', 'Tasting, visual appreciation', 'Izakaya, winter drinking'],
                ].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="px-4 py-3"
                        style={{
                          borderBottom: '1px solid var(--color-border)',
                          color: j === 0 ? 'var(--foreground)' : 'var(--color-muted)',
                          fontWeight: j === 0 ? 500 : 400,
                          whiteSpace: j === 0 ? 'nowrap' : undefined,
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Deep Dive: Wood */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Wood
          </p>
          <h2
            className="section-title mb-6"
            style={{ fontSize: '1.5rem', fontWeight: 300 }}
          >
            The Masu &mdash; When Wood Becomes Flavor
          </h2>
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              A masu is a square wooden cup, traditionally made from Japanese hinoki cypress. Originally
              a rice-measuring tool dating back to the 8th century, it evolved into the preferred
              vessel for sake at celebrations, ceremonies, and daily life.
            </p>
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              What makes a masu unique among sake vessels is that it is the only cup that
              actively changes the flavor of what you drink. Hinoki contains <strong>phytoncide</strong>,
              a natural compound that creates a delicate woody aroma &mdash; the same scent that
              fills Japan&rsquo;s ancient cypress forests. Pour sake into a masu, lift it to your lips,
              and that forest meets you before the liquid does.
            </p>
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              Japanese scientists have linked phytoncide to the calming effects of forest bathing
              (<em>shinrin-yoku</em>). Drinking from a masu is, in a very real sense, a small
              act of forest bathing.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
              <p className="font-medium mb-3" style={{ color: 'var(--color-accent)' }}>Pros</p>
              <ul className="space-y-2">
                {[
                  'Adds a unique hinoki aroma to sake',
                  'Beautiful natural grain, each piece unique',
                  'Lightweight and nearly unbreakable',
                  'Cultural significance as a symbol of prosperity',
                  'Can be personalized with engraving',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-sm leading-[1.8] pl-4"
                    style={{ color: 'var(--color-muted)', borderLeft: '2px solid var(--color-accent)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
              <p className="font-medium mb-3" style={{ color: 'var(--foreground)' }}>Cons</p>
              <ul className="space-y-2">
                {[
                  'Not ideal for very hot sake',
                  'Requires hand washing (no dishwasher)',
                  'Wood aroma may overwhelm very delicate sake',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-sm leading-[1.8] pl-4"
                    style={{ color: 'var(--color-muted)', borderLeft: '2px solid var(--color-border)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Deep Dive: Glass */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Glass
          </p>
          <h2
            className="section-title mb-6"
            style={{ fontSize: '1.5rem', fontWeight: 300 }}
          >
            The Guinomi &mdash; Pure, Clean, Transparent
          </h2>
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              Glass sake cups are the modern choice. They add nothing and take nothing away. What you
              taste is the sake itself, unaltered by the vessel. For premium daiginjo and ginjo styles
              &mdash; where brewers have spent months developing subtle floral and fruity notes &mdash;
              glass ensures those delicate aromas reach you exactly as intended.
            </p>
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              Glass also lets you see the sake. Color ranges from crystal clear to pale gold to light
              amber, and each shade tells a story about the brewing process, the rice, and the age. If
              you are learning about sake, glass is an excellent teacher.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
              <p className="font-medium mb-3" style={{ color: 'var(--color-accent)' }}>Pros</p>
              <ul className="space-y-2">
                {[
                  'Completely flavor-neutral',
                  'Shows clarity, color, and viscosity',
                  'Easy to clean (dishwasher safe)',
                  'Widely available in many styles',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-sm leading-[1.8] pl-4"
                    style={{ color: 'var(--color-muted)', borderLeft: '2px solid var(--color-accent)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
              <p className="font-medium mb-3" style={{ color: 'var(--foreground)' }}>Cons</p>
              <ul className="space-y-2">
                {[
                  'Fragile and breakable',
                  'Poor heat retention for warm sake',
                  'No flavor enhancement',
                  'Less tactile character than wood or ceramic',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-sm leading-[1.8] pl-4"
                    style={{ color: 'var(--color-muted)', borderLeft: '2px solid var(--color-border)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Deep Dive: Ceramic */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Ceramic
          </p>
          <h2
            className="section-title mb-6"
            style={{ fontSize: '1.5rem', fontWeight: 300 }}
          >
            The Ochoko &mdash; Warmth in Your Hands
          </h2>
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              Ceramic ochoko cups are the backbone of izakaya culture. Their thick walls hold heat
              beautifully, making them the natural choice for warm and hot sake. In winter, wrapping
              your hands around a ceramic cup filled with atsukan (hot sake) is one of Japan&rsquo;s
              most comforting rituals.
            </p>
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              Each handmade ceramic cup is unique &mdash; the glaze, the texture, the weight, the
              slight imperfections that make it human. Collecting ochoko from different Japanese pottery
              regions (Arita, Bizen, Mashiko) is a pursuit in itself, connecting sake drinking to
              Japan&rsquo;s deep ceramic tradition.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
              <p className="font-medium mb-3" style={{ color: 'var(--color-accent)' }}>Pros</p>
              <ul className="space-y-2">
                {[
                  'Excellent heat retention',
                  'Handmade character and texture',
                  'Very durable',
                  'Hundreds of regional styles to collect',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-sm leading-[1.8] pl-4"
                    style={{ color: 'var(--color-muted)', borderLeft: '2px solid var(--color-accent)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
              <p className="font-medium mb-3" style={{ color: 'var(--foreground)' }}>Cons</p>
              <ul className="space-y-2">
                {[
                  'No flavor enhancement',
                  'Cannot see the sake clearly',
                  'Heavy compared to wood or glass',
                  'Can chip or crack with impact',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-sm leading-[1.8] pl-4"
                    style={{ color: 'var(--color-muted)', borderLeft: '2px solid var(--color-border)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* When to Use Each */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Recommendation
          </p>
          <h2
            className="section-title mb-10"
            style={{ fontSize: '1.5rem', fontWeight: 300 }}
          >
            When to Reach for Each
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 md:p-8 rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                Choose Wood When
              </p>
              <ul className="space-y-3">
                {[
                  'You want the sake enhanced, not just contained',
                  'You are celebrating something meaningful',
                  'You want a vessel that connects you to 1,300 years of tradition',
                  'You are giving a gift that needs to carry cultural weight',
                  'You want to try the mokkiri overflow ritual',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-sm leading-[1.8]"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 md:p-8 rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                Choose Glass When
              </p>
              <ul className="space-y-3">
                {[
                  'You are tasting or comparing different sake',
                  'You want to appreciate the visual qualities',
                  'You are serving a premium, delicate ginjo',
                  'You prefer a modern, minimal aesthetic',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-sm leading-[1.8]"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 md:p-8 rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                Choose Ceramic When
              </p>
              <ul className="space-y-3">
                {[
                  'You are drinking warm or hot sake',
                  'You value the handmade, tactile experience',
                  'You want a cup that keeps its warmth',
                  'You are collecting regional Japanese pottery',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-sm leading-[1.8]"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Questions
          </p>
          <h2
            className="section-title mb-12"
            style={{ fontSize: '1.5rem', fontWeight: 300 }}
          >
            Frequently Asked
          </h2>
          <div className="space-y-0">
            {faqData.map((item, i) => (
              <details
                key={i}
                className="group"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <summary className="flex items-center justify-between py-6 cursor-pointer text-sm font-medium list-none">
                  <span>{item.q}</span>
                  <span
                    className="ml-4 text-lg transition-transform group-open:rotate-45 flex-shrink-0"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    +
                  </span>
                </summary>
                <p
                  className="pb-6 text-sm leading-[2]"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* CTA */}
      <section
        className="py-24 md:py-32 text-center"
        style={{ background: 'var(--color-accent)', color: '#fff' }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-6"
            style={{ opacity: 0.7 }}
          >
            Handcrafted in Japan
          </p>
          <h2
            className="text-2xl md:text-3xl font-light mb-6"
            style={{ lineHeight: 1.5 }}
          >
            Ready to Try Sake
            <br className="hidden md:block" />
            in a Hinoki Wood Cup?
          </h2>
          <p className="text-sm mb-10 leading-[2]" style={{ opacity: 0.8 }}>
            Handcrafted masu from Japanese hinoki cypress. Custom engraving available. Ships worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/contact"
              className="inline-block px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ background: '#fff', color: 'var(--color-accent)' }}
            >
              Request a Quote
            </Link>
            <Link
              href="/en/guide"
              className="inline-block px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#fff' }}
            >
              Browse Our Range
            </Link>
          </div>
        </div>
      </section>

      {/* Language switcher */}
      <div className="text-center py-10">
        <Link
          href="/blog"
          className="text-xs underline transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-muted)' }}
        >
          日本語版はこちら / View in Japanese
        </Link>
      </div>
    </>
  )
}
