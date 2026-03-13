import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd, HowToJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'How to Choose a Japanese Sake Cup — Size & Style Guide',
  description: 'Find your perfect sake cup. From intimate sipping cups to grand ceremony vessels, our guide helps you choose the right handcrafted hinoki masu for any occasion.',
  keywords: 'sake cup guide, how to choose sake cup, best sake cup, sake cup sizes, Japanese sake set, wooden sake cup guide, sake gift guide, sake accessories guide',
  alternates: {
    canonical: `${baseUrl}/en/guide`,
    languages: { ja: `${baseUrl}/guide`, en: `${baseUrl}/en/guide` },
  },
  openGraph: {
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    locale: 'en_US',
  },
}

const moments = [
  {
    moment: 'Your nightly ritual',
    size: 'Ichigo',
    kanji: '一合',
    capacity: '180 ml',
    dimensions: '85 x 85 x 56 mm',
    line: 'One pour, one cup, one quiet moment.',
  },
  {
    moment: 'A special evening',
    size: 'Goshaku',
    kanji: '五勺',
    capacity: '100 ml',
    dimensions: '64 x 64 x 38 mm',
    line: 'Smaller pour, bigger flavor. For your best bottle.',
  },
  {
    moment: 'The izakaya experience',
    size: 'Hachigo',
    kanji: '八勺',
    capacity: '144 ml',
    dimensions: '73 x 73 x 43 mm',
    line: 'For mokkiri-style overflow. Bring the bar home.',
  },
  {
    moment: 'A meaningful gift',
    size: 'Ichigo + engraving',
    kanji: '一合',
    capacity: '180 ml',
    dimensions: '85 x 85 x 56 mm',
    line: 'Name, date, or message. Fits in any gift box.',
  },
  {
    moment: 'Your desk or shelf',
    size: 'Sanjaku or Nigohan',
    kanji: '三勺 / 二合半',
    capacity: '54 ml / 450 ml',
    dimensions: '56 x 56 x 32 mm / 106 x 106 x 62 mm',
    line: 'Jewelry holder, pen cup, or just beautiful.',
  },
  {
    moment: 'A Japanese celebration',
    size: 'Gogo or Issho',
    kanji: '五合 / 一升',
    capacity: '900 ml / 1,800 ml',
    dimensions: '130 x 130 x 73 mm / 171 x 171 x 93 mm',
    line: 'Gogo for Setsubun. Issho for ceremonies.',
  },
]

const sizeData = [
  { name: 'Sanjaku', kanji: '三勺', reading: 'さんしゃく', dimensions: '56 x 56 x 32 mm', capacity: '54 ml', bestFor: 'Tasting, decor, small gifts' },
  { name: 'Goshaku', kanji: '五勺', reading: 'ごしゃく', dimensions: '64 x 64 x 38 mm', capacity: '100 ml', bestFor: 'Special sake, ceremonial toasts' },
  { name: 'Hachigo', kanji: '八勺', reading: 'はちごう', dimensions: '73 x 73 x 43 mm', capacity: '144 ml', bestFor: 'Casual sake, mokkiri overflow' },
  { name: 'Ichigo', kanji: '一合', reading: 'いちごう', dimensions: '85 x 85 x 56 mm', capacity: '180 ml', bestFor: 'Daily sake, gifts, engraving' },
  { name: 'Nigohan', kanji: '二合半', reading: 'にごうはん', dimensions: '106 x 106 x 62 mm', capacity: '450 ml', bestFor: 'Display, desk accessory' },
  { name: 'Gogo', kanji: '五合', reading: 'ごごう', dimensions: '130 x 130 x 73 mm', capacity: '900 ml', bestFor: 'Setsubun, events' },
  { name: 'Issho', kanji: '一升', reading: 'いっしょう', dimensions: '171 x 171 x 93 mm', capacity: '1,800 ml', bestFor: 'Kagami-biraki, ceremonies' },
]

const faqData = [
  {
    q: 'What size masu should I use for sake?',
    a: 'The Ichigo (180 ml) is the standard. It holds exactly one "go" — the traditional Japanese serving of sake.',
  },
  {
    q: 'What is the most popular size?',
    a: 'The Ichigo (180 ml) — it works for everything. Sake, gifts, daily use.',
  },
  {
    q: 'Can I use a masu for hot drinks?',
    a: 'Masu are best for cold or room-temperature sake. For hot drinks, let the liquid cool slightly first, or choose a coated masu for added durability.',
  },
  {
    q: 'What wood is masu made from?',
    a: 'Japanese hinoki cypress — prized for its grain, natural antibacterial properties, and elegant fragrance. Used in shrines and temples for over 1,300 years.',
  },
]

export default function EnGuidePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: baseUrl },
          { name: 'English', href: `${baseUrl}/en` },
          { name: 'Sake Cup Guide', href: `${baseUrl}/en/guide` },
        ]}
      />
      <SpeakableJsonLd url={`${baseUrl}/en/guide`} cssSelectors={['[data-speakable]', '.section-title']} />
      <FAQJsonLd items={faqData} />
      <HowToJsonLd
        name="How to Choose a Japanese Sake Cup"
        description="Find the perfect masu for sake, gifts, or display."
        steps={[
          { name: 'Decide your purpose', text: 'Sake drinking, gifting, decoration, or corporate use.' },
          { name: 'Choose your size', text: 'Ichigo (180ml) for sake, Goshaku (100ml) for gifts, Gogo (900ml) for ceremonies.' },
          { name: 'Select engraving', text: 'Yakiin branding iron for logos, laser for detailed designs, or plain.' },
          { name: 'Add options', text: 'Food-safe coating for durability, lid for Sanjaku or Ichigo sizes.' },
        ]}
      />

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'English', href: '/en' }, { label: 'Sake Cup Guide' }]} />

      {/* Hero */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="section-title mb-6">Find Your Perfect Masu</h1>
          <p style={{ color: 'var(--color-muted)' }} className="text-sm leading-relaxed">
            Seven sizes. One question: how will you use it?
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div
            data-speakable
            className="p-8 rounded-sm"
            style={{ background: 'var(--color-accent-light)', borderLeft: '4px solid var(--color-accent)' }}
          >
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
              Short answer
            </p>
            <p className="text-sm leading-relaxed">
              For sake: Ichigo (180 ml). For gifts: Goshaku or Ichigo with engraving. For home decor: Sanjaku.
              Not sure? Start with an Ichigo &mdash; it&apos;s the one everyone loves.
            </p>
          </div>
        </div>
      </section>

      {/* By Moment */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-title mb-12">By Moment</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moments.map((item) => (
              <div
                key={item.moment}
                className="p-6 rounded-sm"
                style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
              >
                <p className="text-xs font-medium mb-3" style={{ color: 'var(--color-accent)' }}>
                  {item.moment}
                </p>
                <p className="font-medium mb-1">
                  {item.kanji} {item.size}
                </p>
                <p className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>
                  {item.capacity} &middot; {item.dimensions}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {item.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Seven Sizes */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-title mb-12">All Seven Sizes at a Glance</h2>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th className="text-left py-4 px-3 font-medium" style={{ color: 'var(--color-muted)' }}>
                    Name
                  </th>
                  <th className="text-left py-4 px-3 font-medium" style={{ color: 'var(--color-muted)' }}>
                    Dimensions
                  </th>
                  <th className="text-left py-4 px-3 font-medium" style={{ color: 'var(--color-muted)' }}>
                    Capacity
                  </th>
                  <th className="text-left py-4 px-3 font-medium" style={{ color: 'var(--color-muted)' }}>
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((s) => (
                  <tr key={s.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-4 px-3 font-medium">
                      {s.kanji} {s.name}
                      <span
                        className="block text-xs mt-0.5"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {s.reading}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-xs">{s.dimensions}</td>
                    <td className="py-4 px-3">{s.capacity}</td>
                    <td className="py-4 px-3 text-xs" style={{ color: 'var(--color-muted)' }}>
                      {s.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {sizeData.map((s) => (
              <div
                key={s.name}
                className="p-5 rounded-sm"
                style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <p className="font-medium">{s.kanji} {s.name}</p>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      {s.reading}
                    </p>
                  </div>
                  <p className="text-sm font-medium">{s.capacity}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span style={{ color: 'var(--color-muted)' }}>Dimensions: </span>
                    {s.dimensions}
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-muted)' }}>Best for: </span>
                    {s.bestFor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="section-title mb-12">Add-Ons</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div
              className="p-6 rounded-sm"
              style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-2">Engraving</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Yakiin (branding iron) for warmth. Laser for precision. Names, logos, messages, QR codes.
              </p>
            </div>
            <div
              className="p-6 rounded-sm"
              style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-2">Coating</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Water-resistant, food-safe urethane. Preserves the grain, protects from stains.
              </p>
            </div>
            <div
              className="p-6 rounded-sm"
              style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-2">Lid</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Available for Sanjaku and Ichigo. Turns your masu into a keepsake box.
              </p>
            </div>
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

      {/* Still Not Sure? */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="section-title mb-6">Still Not Sure?</h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
            Tell us what it&apos;s for. We&apos;ll recommend the perfect size.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/en/contact" className="btn-accent">
              Get a Recommendation
            </Link>
            <Link href="/en/faq" className="btn-outline">
              More Questions
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="section-title mb-6">Ready to Choose?</h2>
          <p className="text-sm mb-10 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            Browse all sizes, add engraving, and make it yours.
          </p>
          <Link href="/products" className="btn-accent">
            View Products
          </Link>
        </div>
      </section>

      {/* Language Switcher */}
      <div className="text-center pb-12">
        <Link
          href="/guide"
          className="text-xs underline"
          style={{ color: 'var(--color-muted)' }}
        >
          日本語版はこちら / View in Japanese
        </Link>
      </div>
    </>
  )
}
