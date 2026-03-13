import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import {
  BreadcrumbJsonLd,
  SpeakableJsonLd,
} from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '7 Unique Japanese Gift Ideas That Actually Mean Something | MASU-STORE',
  description:
    'Discover 7 meaningful Japanese gifts with real cultural significance: hinoki masu cups, furoshiki wrapping cloth, sensu fans, sake sets, incense, chopsticks, and Japanese tea. Perfect for weddings, birthdays, and corporate gifts.',
  keywords:
    'Japanese gift ideas, unique Japanese gifts, Japanese wedding gift, Japanese corporate gift, meaningful Japanese gifts, masu gift, furoshiki, Japanese incense, Japanese tea gift, Japanese chopsticks gift',
  alternates: {
    canonical: `${baseUrl}/en/blog/japanese-gift-ideas`,
    languages: { ja: `${baseUrl}/blog`, en: `${baseUrl}/en/blog/japanese-gift-ideas` },
  },
  openGraph: {
    title: '7 Unique Japanese Gift Ideas That Actually Mean Something',
    description:
      'Beyond the ordinary: 7 Japanese gifts that carry centuries of cultural meaning. From hinoki wood cups to handmade incense.',
    url: `${baseUrl}/en/blog/japanese-gift-ideas`,
    type: 'article',
    publishedTime: '2025-06-01',
    modifiedTime: '2026-03-13',
    siteName: siteConfig.nameEn,
    locale: 'en_US',
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

const gifts = [
  {
    number: '01',
    name: 'Masu — Hinoki Cypress Sake Cup',
    tagline: 'A wish for prosperity, in your hands',
    description:
      'A masu is a square wooden cup handcrafted from Japanese hinoki (cypress). Originally a rice-measuring tool dating back to the 8th century, the masu became Japan\'s iconic sake vessel and ceremonial object. What makes it extraordinary as a gift is the wordplay: in Japanese, "masu" (枡) sounds identical to the verb "to increase" — as in, may your happiness increase, may your fortune grow.',
    significance:
      'For centuries, masu have been given at weddings, business openings, and milestones as a tangible wish for prosperity. Unlike generic gifts that get forgotten, a masu sits on a desk, holds a pen, catches the light. Every time someone asks about it, the story begins again.',
    detail:
      'Each masu can be personalized with traditional branding-iron engraving (yakiin) or precision laser carving — your initials, a company logo, a meaningful date. Made from natural hinoki wood, it also infuses sake with a subtle forest aroma that glass and ceramic cannot provide.',
    occasions: 'Weddings, business gifts, housewarming, milestone celebrations',
  },
  {
    number: '02',
    name: 'Furoshiki — Wrapping Cloth',
    tagline: 'The gift that wraps the gift',
    description:
      'A furoshiki is a square cloth used for wrapping, carrying, and presenting objects. Dating back to the Nara period (710-794 AD), furoshiki were originally used in public bathhouses to bundle clothes. Today, they are Japan\'s most elegant answer to wrapping paper — reusable, beautiful, and zero waste.',
    significance:
      'In Japanese gift-giving culture, presentation matters as much as the gift itself. A furoshiki wrapping elevates any object into a considered gesture. The recipient keeps the cloth and uses it again — the wrapping becomes part of the gift.',
    detail:
      'Available in cotton, silk, and linen, from traditional indigo patterns to contemporary designs. A 70cm square wraps a wine bottle beautifully. A 50cm square is perfect for a book or small box.',
    occasions: 'Any occasion — it enhances whatever it wraps',
  },
  {
    number: '03',
    name: 'Sensu — Folding Fan',
    tagline: 'Centuries of craft in a single fold',
    description:
      'The sensu (folding fan) was invented in Japan during the Heian period (794-1185) and later spread to Europe via trade routes. Unlike the fixed Chinese fan, the Japanese innovation of folding made it portable, practical, and endlessly elegant.',
    significance:
      'In Japan, a sensu is far more than a tool for cooling. It symbolizes expanding fortune — the fan opens outward like a spreading horizon. It is used in tea ceremony, traditional dance, and formal greetings. A high-quality sensu from Kyoto is a lifetime possession.',
    detail:
      'Look for fans made with Japanese washi paper and bamboo ribs. Kyoto (Kyo-sensu) and Nagoya are the traditional production centers. Designs range from minimalist monochrome to elaborate hand-painted scenes.',
    occasions: 'Summer gifts, business gifts, cultural appreciation',
  },
  {
    number: '04',
    name: 'Sake Set — Tokkuri and Ochoko',
    tagline: 'The ritual, complete',
    description:
      'A sake set consists of a tokkuri (pouring flask) and ochoko (small cups), typically in ceramic. Together, they create the complete framework for the Japanese sake ritual — heating, pouring for others, and sipping in good company.',
    significance:
      'Sake drinking in Japan is fundamentally about connection. The small cups mean frequent pouring, and pouring for others (never yourself) is an act of care. A sake set is not just tableware — it is an invitation to slow down and be present with the people around you.',
    detail:
      'Regional ceramic styles (Arita, Bizen, Mashiko) each bring distinct character. Pair a ceramic sake set with a wooden masu for the full Japanese drinking experience — ceramic for warm sake, masu for room temperature.',
    occasions: 'Dinner parties, couples, anyone who enjoys sake or wine',
  },
  {
    number: '05',
    name: 'Koh — Japanese Incense',
    tagline: 'A moment of stillness',
    description:
      'Japanese incense (koh) is fundamentally different from what the West typically encounters. Rooted in the kodo ("way of incense") tradition that parallels tea ceremony and flower arranging, Japanese incense is subtle, refined, and designed for contemplation rather than room-filling fragrance.',
    significance:
      'Kodo is one of Japan\'s three classical arts of refinement, alongside chado (tea) and kado (flowers). Burning incense has been a meditative practice in Japan since the 6th century. The act of "listening" to incense (monkoh) — not smelling, but listening — speaks to the depth of attention the Japanese bring to sensory experience.',
    detail:
      'Look for brands like Shoyeido (Kyoto, since 1705) or Nippon Kodo. Aloeswood (jinko) and sandalwood (byakudan) are the traditional base materials. A box of premium incense sticks is lightweight and ships easily.',
    occasions: 'Housewarmings, sympathy gifts, meditation practitioners, anyone who values quiet',
  },
  {
    number: '06',
    name: 'Hashi — Chopsticks',
    tagline: 'Daily objects, elevated',
    description:
      'Japanese chopsticks (hashi) are shorter and more pointed than Chinese or Korean styles, designed for the delicate work of picking apart fish and handling small, precise bites. Premium Japanese chopsticks are made from lacquered wood, ironwood, or bamboo, often by artisans who have spent decades perfecting a single shape.',
    significance:
      'In Japan, chopsticks are deeply personal — each family member has their own pair. Giving someone a beautiful pair of chopsticks says: "I see you as an individual." Lacquered chopsticks from Wajima (Ishikawa Prefecture) or Tsugaru (Aomori) are considered heirloom objects.',
    detail:
      'The best chopsticks feel balanced in the hand, with tips precise enough to pick up a single grain of rice. Look for natural lacquer (urushi) finishes and wooden presentation boxes. Pairs are often sold as matching sets for couples.',
    occasions: 'Wedding gifts, housewarmings, couples, anyone who cooks',
  },
  {
    number: '07',
    name: 'Nihoncha — Japanese Tea',
    tagline: 'The taste of seasons',
    description:
      'Japan produces some of the world\'s finest green teas: matcha (stone-ground), sencha (steamed leaf), gyokuro (shade-grown), and hojicha (roasted). Each has a distinct character shaped by region, season, and the farmer\'s craft.',
    significance:
      'Tea is woven into the fabric of Japanese daily life. The tea ceremony (chado) elevates a simple cup into a philosophical practice — "one lifetime, one meeting" (ichigo ichie). Even casual daily tea drinking in Japan carries an awareness of season, quality, and gratitude.',
    detail:
      'For gifts, look for first-flush (shincha) teas harvested in spring, or curated sets from specific regions — Uji (Kyoto), Shizuoka, or Kagoshima. Matcha from Uji is considered the gold standard. Pair tea with a masu for a distinctly Japanese gift set.',
    occasions: 'Thank-you gifts, health-conscious recipients, tea enthusiasts, anyone',
  },
]

export default function JapaneseGiftIdeasPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '7 Unique Japanese Gift Ideas That Actually Mean Something',
    description:
      'Discover 7 meaningful Japanese gifts with real cultural significance, from hinoki masu cups to handmade incense.',
    datePublished: '2025-06-01',
    dateModified: '2026-03-13',
    author: { '@type': 'Organization', name: siteConfig.nameEn },
    publisher: { '@type': 'Organization', name: siteConfig.nameEn },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/en/blog/japanese-gift-ideas`,
    },
    inLanguage: 'en',
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: baseUrl },
          { name: 'English', href: `${baseUrl}/en` },
          { name: '7 Japanese Gift Ideas', href: `${baseUrl}/en/blog/japanese-gift-ideas` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SpeakableJsonLd
        url={`${baseUrl}/en/blog/japanese-gift-ideas`}
        cssSelectors={['[data-speakable]', '.section-title']}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/en' },
          { label: '7 Japanese Gift Ideas' },
        ]}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-6"
            style={{ color: 'var(--color-accent)' }}
          >
            Gift Guide
          </p>
          <h1
            className="text-2xl md:text-4xl font-light mb-6"
            style={{ lineHeight: 1.4, letterSpacing: '-0.01em' }}
          >
            7 Unique Japanese Gift Ideas
            <br className="hidden md:block" />
            That Actually Mean Something
          </h1>
          <p
            className="text-sm md:text-base leading-[2] max-w-xl mx-auto"
            style={{ color: 'var(--color-muted)' }}
          >
            Beyond the ordinary. Each of these gifts carries centuries of cultural significance &mdash;
            a story the recipient will remember long after the wrapping is gone.
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
              The List
            </p>
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              The seven most meaningful Japanese gifts are: a <strong>masu</strong> (hinoki wood sake cup
              symbolizing prosperity), <strong>furoshiki</strong> (reusable wrapping cloth),{' '}
              <strong>sensu</strong> (folding fan symbolizing expanding fortune),{' '}
              a <strong>sake set</strong> (tokkuri and ochoko for shared ritual),{' '}
              <strong>Japanese incense</strong> (koh, for contemplation),{' '}
              <strong>chopsticks</strong> (personal, artisan-crafted), and{' '}
              <strong>Japanese tea</strong> (seasonal, regional). Each carries genuine cultural weight
              and a story worth telling.
            </p>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Gift Items */}
      {gifts.map((gift, i) => (
        <div key={gift.number}>
          <section className="py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-6">
              <div className="flex items-baseline gap-4 mb-6">
                <span
                  className="text-3xl md:text-4xl font-extralight"
                  style={{ color: 'var(--color-accent)', opacity: 0.5 }}
                >
                  {gift.number}
                </span>
                <div>
                  <h2
                    className="text-lg md:text-xl font-medium"
                    style={{ color: 'var(--foreground)', lineHeight: 1.4 }}
                  >
                    {gift.name}
                  </h2>
                  <p
                    className="text-sm mt-1"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {gift.tagline}
                  </p>
                </div>
              </div>

              <div className="space-y-5 ml-0 md:ml-16">
                <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
                  {gift.description}
                </p>

                <div
                  className="p-6 rounded-sm"
                  style={{ borderLeft: '3px solid var(--color-accent)', background: 'var(--color-accent-light)' }}
                >
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-2"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Cultural Significance
                  </p>
                  <p className="text-sm leading-[2]" style={{ color: 'var(--foreground)' }}>
                    {gift.significance}
                  </p>
                </div>

                <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
                  {gift.detail}
                </p>

                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  <span className="font-medium" style={{ color: 'var(--foreground)' }}>
                    Best for:
                  </span>{' '}
                  {gift.occasions}
                </p>
              </div>
            </div>
          </section>
          {i < gifts.length - 1 && <div className="divider mx-auto max-w-3xl" />}
        </div>
      ))}

      <div className="divider mx-auto max-w-3xl" />

      {/* Closing */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            The Thread
          </p>
          <h2
            className="section-title mb-6"
            style={{ fontSize: '1.5rem', fontWeight: 300 }}
          >
            What Makes a Japanese Gift Different
          </h2>
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              The common thread in every item on this list is <em>meaning</em>. Japanese gift culture
              is built on the principle that a gift should carry a story, a wish, or a connection to
              something larger than the object itself. A masu is not just a cup &mdash; it is a wish
              for increasing happiness. A furoshiki is not just cloth &mdash; it is respect for the
              act of giving. Incense is not just fragrance &mdash; it is an invitation to be still.
            </p>
            <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
              When you give a Japanese gift, you give a conversation. The recipient will ask what
              it is, where it comes from, what it means. And in that moment, the gift comes alive.
            </p>
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
            Ships Worldwide from Japan
          </p>
          <h2
            className="text-2xl md:text-3xl font-light mb-6"
            style={{ lineHeight: 1.5 }}
          >
            Give a Gift That
            <br className="hidden md:block" />
            Carries 1,300 Years of Meaning
          </h2>
          <p className="text-sm mb-10 leading-[2]" style={{ opacity: 0.8 }}>
            Handcrafted hinoki masu with optional personalized engraving. Corporate orders, wedding
            favors, and individual gifts. We will help you find the right one.
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
