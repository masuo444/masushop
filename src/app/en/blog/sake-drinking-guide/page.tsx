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
  title: 'How to Drink Sake Like the Japanese — A Complete Guide | MASU-STORE',
  description:
    'Learn the authentic ways to enjoy sake: temperature (hot, cold, room temp), cups (wood vs glass vs ceramic), pouring etiquette, mokkiri overflow style, and classic food pairings.',
  keywords:
    'how to drink sake, sake drinking guide, sake etiquette, sake temperature, sake cups, mokkiri, sake food pairing, Japanese drinking culture, warm sake, cold sake, sake serving',
  alternates: {
    canonical: `${baseUrl}/en/blog/sake-drinking-guide`,
    languages: { ja: `${baseUrl}/blog`, en: `${baseUrl}/en/blog/sake-drinking-guide` },
  },
  openGraph: {
    title: 'How to Drink Sake Like the Japanese — A Complete Guide',
    description:
      'Temperature, cups, etiquette, mokkiri style, and food pairings. Everything you need to enjoy sake the authentic way.',
    url: `${baseUrl}/en/blog/sake-drinking-guide`,
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
    q: 'What temperature should sake be served at?',
    a: 'It depends on the type. Light, floral sake (ginjo, daiginjo) is best chilled at 5-10\u00B0C. Rich, full-bodied sake (junmai, honjozo) shines warm at 40-55\u00B0C. Room temperature (15-20\u00B0C) works well for most styles and reveals the true character without masking any notes.',
  },
  {
    q: 'Do you sip sake or take shots?',
    a: 'Sake is always sipped, never taken as a shot. Japanese drinking culture values savoring each sip. Small cups encourage slow, mindful drinking. The purpose is connection and appreciation, not volume.',
  },
  {
    q: 'What is the best cup for drinking sake?',
    a: 'It depends on the experience you want. Glass lets you appreciate clarity and color. Ceramic retains heat for warm sake. Hinoki wood (masu) adds a subtle cypress aroma that has defined the Japanese sake experience for over 1,000 years. For the most traditional experience, many connoisseurs prefer a wooden masu.',
  },
  {
    q: 'What is mokkiri style sake?',
    a: 'Mokkiri is a Japanese bar tradition where a small glass is placed inside a wooden masu, and sake is poured until it overflows from the glass into the masu below. The overflow signals the house\'s generosity. You sip from the glass first, then enjoy the hinoki-scented sake from the masu.',
  },
]

export default function SakeDrinkingGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Drink Sake Like the Japanese — A Complete Guide',
    description:
      'Learn the authentic ways to enjoy sake: temperature, cups, etiquette, mokkiri style, and food pairings.',
    datePublished: '2025-06-01',
    dateModified: '2026-03-13',
    author: { '@type': 'Organization', name: siteConfig.nameEn },
    publisher: { '@type': 'Organization', name: siteConfig.nameEn },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/en/blog/sake-drinking-guide`,
    },
    inLanguage: 'en',
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: baseUrl },
          { name: 'English', href: `${baseUrl}/en` },
          { name: 'How to Drink Sake', href: `${baseUrl}/en/blog/sake-drinking-guide` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SpeakableJsonLd
        url={`${baseUrl}/en/blog/sake-drinking-guide`}
        cssSelectors={['[data-speakable]', '.section-title']}
      />
      <FAQJsonLd items={faqData} />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/en' },
          { label: 'How to Drink Sake' },
        ]}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-6"
            style={{ color: 'var(--color-accent)' }}
          >
            Sake Guide
          </p>
          <h1
            className="text-2xl md:text-4xl font-light mb-6"
            style={{ lineHeight: 1.4, letterSpacing: '-0.01em' }}
          >
            How to Drink Sake Like the Japanese
          </h1>
          <p
            className="text-sm md:text-base leading-[2] max-w-xl mx-auto"
            style={{ color: 'var(--color-muted)' }}
          >
            Temperature, vessels, etiquette, and the rituals that turn a simple drink into an experience worth remembering.
          </p>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Quick Answer Box */}
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
              The Short Answer
            </p>
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              Sake can be enjoyed hot (40&ndash;55&deg;C), chilled (5&ndash;10&deg;C), or at room temperature.
              The Japanese drink from small cups made of wood, ceramic, or glass &mdash; each material
              changes the flavor. Pour for others, never yourself. Say &ldquo;Kampai&rdquo; before the first sip.
              And above all: sip slowly. Sake is not a shot &mdash; it is a conversation.
            </p>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Temperature */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Temperature
          </p>
          <h2
            className="section-title mb-6"
            style={{ fontSize: '1.5rem', fontWeight: 300 }}
          >
            The Same Bottle, Three Different Experiences
          </h2>
          <p
            className="text-sm md:text-base leading-[2] mb-10 max-w-3xl"
            style={{ color: 'var(--color-muted)' }}
          >
            In Japan, sake temperature is not an afterthought &mdash; it is a deliberate choice that
            transforms the character of the drink entirely. A single bottle can reveal different
            personalities at different temperatures.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div
              className="p-6 md:p-8 rounded-sm"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                Atsukan &middot; Hot
              </p>
              <p className="font-medium mb-3">40&ndash;55&deg;C</p>
              <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
                Warms the body and opens up rich, savory flavors. Best for junmai and honjozo styles.
                Traditionally heated in a tokkuri flask placed in hot water &mdash; never microwaved.
                The aroma rises with the steam, filling the room before the first sip. In winter,
                hot sake in a wooden masu is one of Japan&rsquo;s great simple pleasures.
              </p>
            </div>
            <div
              className="p-6 md:p-8 rounded-sm"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                Jo-on &middot; Room Temperature
              </p>
              <p className="font-medium mb-3">15&ndash;20&deg;C</p>
              <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
                The purist&rsquo;s choice. Room temperature reveals the true character of sake without
                masking any notes. This is how brewers taste their own creations. If you want to
                understand a sake honestly, drink it at jo-on. Every imperfection and every virtue
                will be present.
              </p>
            </div>
            <div
              className="p-6 md:p-8 rounded-sm"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                Reishu &middot; Chilled
              </p>
              <p className="font-medium mb-3">5&ndash;10&deg;C</p>
              <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
                Crisp, refreshing, and clean. Chilling brightens floral and fruity notes in daiginjo
                and ginjo styles. Perfect for summer evenings or pairing with sashimi. Serve in a glass
                to see the clarity, or in a hinoki wood cup to add a layer of natural forest aroma.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Vessels */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Vessels
          </p>
          <h2
            className="section-title mb-6"
            style={{ fontSize: '1.5rem', fontWeight: 300 }}
          >
            Why the Cup Matters More Than You Think
          </h2>
          <p
            data-speakable
            className="text-sm md:text-base leading-[2] mb-10 max-w-3xl"
            style={{ color: 'var(--foreground)' }}
          >
            In the West, sake is often served in whatever is handy. In Japan, the vessel is part
            of the experience. Glass shows clarity without altering flavor. Ceramic retains heat
            for warm sake. Wood &mdash; specifically hinoki cypress &mdash; adds a subtle, natural
            aroma that has defined Japanese sake culture for over a thousand years. The traditional
            wooden vessel is called a <strong>masu</strong>, a square box originally used to measure rice.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div
              className="p-6 md:p-8 rounded-sm"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-2">Glass (Guinomi)</p>
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                Neutral &middot; Visual
              </p>
              <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
                Lets you see the clarity and color of premium ginjo sake. Clean, modern, no flavor
                addition. The choice when you want the sake to speak entirely for itself.
              </p>
            </div>
            <div
              className="p-6 md:p-8 rounded-sm"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-2">Ceramic (Ochoko)</p>
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                Heat Retention &middot; Tactile
              </p>
              <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
                The classic choice for hot sake. Thick walls keep warmth longer. Each handmade piece
                is unique &mdash; the texture, the weight, the glaze. Pottery adds a tactile
                dimension that mass-produced glass cannot match.
              </p>
            </div>
            <div
              className="p-6 md:p-8 rounded-sm"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <p className="font-medium mb-2">Wood (Masu)</p>
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                Aromatic &middot; Traditional
              </p>
              <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
                The connoisseur&rsquo;s choice. Hinoki cypress infuses sake with a subtle, natural
                fragrance that elevates the entire experience. The wood grain feels alive in your
                hands. For over 1,300 years, the masu has been the vessel of celebration in Japan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Pouring Etiquette */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Etiquette
          </p>
          <h2
            className="section-title mb-6"
            style={{ fontSize: '1.5rem', fontWeight: 300 }}
          >
            The Unspoken Rules of Sake
          </h2>
          <p
            className="text-sm md:text-base leading-[2] mb-10 max-w-3xl"
            style={{ color: 'var(--color-muted)' }}
          >
            Japanese drinking culture is built on connection, not consumption. These small gestures
            carry centuries of meaning.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 md:p-8 rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
              <p className="font-medium mb-3">Pour for others, never yourself</p>
              <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
                The most important rule. Hold the bottle or tokkuri with both hands and pour for your
                companions. They will pour for you in return. This mutual care is the foundation of
                Japanese hospitality &mdash; <em>omotenashi</em>.
              </p>
            </div>
            <div className="p-6 md:p-8 rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
              <p className="font-medium mb-3">Receive with both hands</p>
              <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
                When someone pours for you, lift your cup with both hands as a sign of respect and
                gratitude. A small bow of the head completes the gesture. This applies whether you
                are using a glass, ceramic ochoko, or wooden masu.
              </p>
            </div>
            <div className="p-6 md:p-8 rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
              <p className="font-medium mb-3">Kampai before the first sip</p>
              <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
                Never drink before the group toast. Raise your cup, make eye contact, say
                &ldquo;Kampai!&rdquo; (cheers), and drink together. In formal settings, hold your
                cup slightly lower than your senior&rsquo;s as a sign of deference.
              </p>
            </div>
            <div className="p-6 md:p-8 rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
              <p className="font-medium mb-3">Watch the cups around you</p>
              <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
                An empty cup is an invitation to pour. Keeping your companions&rsquo; cups filled
                shows attentiveness &mdash; a quality deeply valued in Japanese culture. If you
                do not want more, leave your cup slightly full.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Mokkiri */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Ritual
          </p>
          <h2
            className="section-title mb-6"
            style={{ fontSize: '1.5rem', fontWeight: 300 }}
          >
            The Mokkiri Overflow
          </h2>
          <div data-speakable className="space-y-6">
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              Walk into any izakaya in Japan and order sake. Watch what happens: the bartender places
              a small glass inside a wooden masu, then pours until the sake overflows from the glass
              into the cup below. This is <strong>mokkiri</strong> &mdash; a generous, theatrical
              ritual that signals the house&rsquo;s hospitality.
            </p>
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              The overflow is intentional. It says: &ldquo;We give you more than you paid for.&rdquo;
              The guest sips from the glass first, then pours the remaining sake from the masu and
              drinks that too. Some drink directly from the masu&rsquo;s corner &mdash; the
              hinoki-scented sake from the wood is considered the best part.
            </p>
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              At home, you can recreate mokkiri with any masu and a small glass. It turns an ordinary
              Tuesday evening into something memorable &mdash; a small act of generosity toward yourself.
            </p>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Food Pairings */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Pairing
          </p>
          <h2
            className="section-title mb-6"
            style={{ fontSize: '1.5rem', fontWeight: 300 }}
          >
            What to Eat with Sake
          </h2>
          <p
            className="text-sm md:text-base leading-[2] mb-10 max-w-3xl"
            style={{ color: 'var(--color-muted)' }}
          >
            Sake is called &ldquo;the drink that does not fight food.&rdquo; Its mild umami
            and clean finish complement almost anything, but certain pairings are classics for a reason.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                name: 'Sashimi',
                desc: 'Raw fish and chilled sake are inseparable in Japan. The clean finish of sake cleanses the palate between bites. Try it with a ginjo served in glass.',
              },
              {
                name: 'Grilled Fish (Yakizakana)',
                desc: 'Salt, fat, and warmth in perfect balance. This is the quintessential izakaya pairing. Best with warm sake in a wooden masu.',
              },
              {
                name: 'Tofu (Hiyayakko)',
                desc: 'Cold tofu with sake brings out subtle soy flavors. Simple, elegant, and deeply satisfying. The minimalism of Japanese cuisine at its finest.',
              },
              {
                name: 'Edamame',
                desc: 'The most casual pairing. Salted soybeans and cold sake on a summer evening. No recipe, no technique, no pretension required.',
              },
            ].map((pair) => (
              <div
                key={pair.name}
                className="p-6 md:p-8 rounded-sm"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <p className="font-medium mb-2">{pair.name}</p>
                <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
                  {pair.desc}
                </p>
              </div>
            ))}
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
            The Vessel Matters
          </p>
          <h2
            className="text-2xl md:text-3xl font-light mb-6"
            style={{ lineHeight: 1.5 }}
          >
            Experience Sake the Way
            <br className="hidden md:block" />
            It Was Meant to Be Enjoyed
          </h2>
          <p className="text-sm mb-10 leading-[2]" style={{ opacity: 0.8 }}>
            Handcrafted hinoki masu from Japan. The cup that has defined sake culture for 1,300 years.
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
