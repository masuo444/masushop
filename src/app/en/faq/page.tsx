import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'FAQ — Japanese Wooden Sake Cups & Custom Engraving',
  description: 'Answers to common questions about Japanese wooden sake cups: sizes, materials, care, custom engraving, bulk orders, and international shipping.',
  keywords: 'sake cup FAQ, wooden cup questions, Japanese sake cup guide, custom engraving FAQ, bulk sake cups, sake cup care, sake cup sizes',
  alternates: {
    canonical: `${baseUrl}/en/faq`,
    languages: { ja: `${baseUrl}/faq`, en: `${baseUrl}/en/faq` },
  },
  openGraph: {
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
    locale: 'en_US',
  },
}

const faqCategories = [
  {
    id: 'about',
    title: 'About Masu',
    items: [
      {
        q: 'What is a masu?',
        a: 'A masu (枡) is a traditional Japanese wooden box with over 1,300 years of history. Originally used to measure rice and grains, masu are handcrafted from hinoki (Japanese cypress) and are now used for drinking sake, as gifts, and in ceremonies. The word "masu" is a homophone for "increase" or "prosper" in Japanese, making it a symbol of good fortune.',
      },
      {
        q: 'What is masu made of?',
        a: 'Authentic masu are made from hinoki (檜, Japanese cypress), a wood prized for its natural antibacterial properties due to compounds like hinokitiol. Hinoki contains phytoncide, which produces a calming, forest-like aroma. This aroma is one of the signature pleasures of drinking sake from a masu.',
      },
      {
        q: 'Why is masu square?',
        a: 'The square shape comes from the arale-gumi (あられ組) joint technique, where four side panels are interlocked with precisely cut notches. This traditional woodworking method creates a watertight, sturdy box without nails or adhesives. The square form is also practical — masu are stackable, easy to measure with, and the corners serve as a natural drinking spout.',
      },
      {
        q: 'What do the kanji 枡, 升, and 桝 mean?',
        a: 'All three kanji are read "masu" and refer to the same object. 枡 is the most common for the wooden vessel — it is a Japanese-made kanji (kokuji) combining "wood" (木) and "measure" (升). 升 is the oldest form, originally from China, and is also used as a unit of volume (1 shō = 1,800ml). 桝 is used in architecture (e.g., drainage boxes) and in Japanese family names.',
      },
    ],
  },
  {
    id: 'sizes',
    title: 'Sizes',
    items: [
      {
        q: 'What sizes do masu come in?',
        a: 'Masu come in 7 traditional sizes: Sanjaku (54ml), Goshaku (100ml), Hasshaku (144ml), Ichigo (180ml), Nigohan (450ml), Gogo (900ml), and Issho (1,800ml). Each size is named after traditional Japanese volume units based on the "gō" (合 = 180ml) system.',
      },
      {
        q: 'What is the most popular masu size?',
        a: 'The Ichigo (一合枡, 180ml / 1 gō) is the most popular masu size. It holds exactly one gō of sake, making it the standard sake masu. It is the most common choice for gifts, corporate novelties, engraved keepsakes, and everyday use.',
      },
      {
        q: 'What size masu should I use for sake?',
        a: 'The Ichigo (180ml) is the standard sake masu, holding one full serving. The Goshaku (100ml) is ideal for sipping sake slowly or tasting different varieties. The Hasshaku (144ml) is the size most commonly used for mokkiri-style serving in izakayas, where sake overflows from a glass placed inside the masu.',
      },
      {
        q: 'What size masu is used for Setsubun?',
        a: 'The Gogo (五合枡, 900ml) is the most common masu size used for Setsubun bean throwing. It holds enough roasted soybeans for the entire household and is easy to hold while scattering beans. Larger Setsubun events at temples and shrines sometimes use the Issho (1,800ml) masu.',
      },
    ],
  },
  {
    id: 'sake',
    title: 'Sake & Drinking',
    items: [
      {
        q: 'How do you drink sake from a masu?',
        a: 'Pour sake directly into the masu and drink from one of the corners. The square shape creates a natural spout that controls the flow. As you sip, the hinoki aroma blends with the sake, enhancing the flavor in a way that glass or ceramic cannot replicate. Rinse the masu with water promptly after use.',
      },
      {
        q: 'What is mokkiri?',
        a: 'Mokkiri (盛り切り, "filled to the brim") is a generous sake-serving style popular in Japanese izakayas. A glass is placed inside a masu, and sake is poured until it overflows from the glass into the masu. The overflowing sake symbolizes abundance and hospitality. Guests drink from the glass first, then enjoy the sake that has collected in the masu. Hasshaku (144ml) and Ichigo (180ml) masu are commonly used.',
      },
      {
        q: 'Does the wood affect the taste of sake?',
        a: 'Yes. Hinoki wood releases a subtle, refreshing aroma that blends with the sake, creating a flavor profile unique to masu. The phytoncide and hinokitiol compounds in the wood add a gentle, forest-like note to the sake. This is why many sake enthusiasts prefer drinking from a wooden masu over glass — it adds a layer of sensory experience that enhances the sake.',
      },
    ],
  },
  {
    id: 'care',
    title: 'Care',
    items: [
      {
        q: 'How do you clean a masu?',
        a: 'Rinse the inside and rim with water immediately after use. Avoid getting the outside too wet. Air dry upside down in a well-ventilated area. For stubborn stains on uncoated masu, gently scrub with a pinch of salt or baking soda dissolved in water. Never use dish soap on uncoated masu, as it can soak into the wood.',
      },
      {
        q: 'How long does a masu last?',
        a: 'With proper care, a masu can last for many years. The hinoki wood darkens beautifully over time, developing a rich patina that many owners appreciate. The key to longevity is rinsing promptly after use, air drying upside down, and storing in a cool, dry place away from direct sunlight.',
      },
      {
        q: 'Can I use a dishwasher to clean my masu?',
        a: 'No. High heat and prolonged water exposure from dishwashers cause the wood to crack, warp, and lose its shape. Masu should always be hand-rinsed with water and air dried naturally. Avoid soaking in water for extended periods as well.',
      },
    ],
  },
  {
    id: 'custom',
    title: 'Custom & Ordering',
    items: [
      {
        q: 'Can I get custom engraving on a masu?',
        a: 'Yes. Two engraving methods are available: Yakiin (branding iron) presses a heated copper plate (~400°C) onto the wood for a warm, traditional burnt-brown look — ideal for logos and bulk orders. Laser engraving uses precision lasers to carve fine details, photographs, QR codes, and gradients. Both methods are available on all 7 masu sizes.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes. We ship masu worldwide. All masu are carefully wrapped in hinoki wood shavings (a natural cushioning material) and packed securely for international transit. Contact us for shipping quotes and delivery times to your region.',
      },
      {
        q: 'Can I order samples before placing a bulk order?',
        a: 'Yes. We offer 1-2 sample pieces so you can evaluate the quality, size, and engraving before committing to a larger order. Contact us to request samples.',
      },
    ],
  },
  {
    id: 'culture',
    title: 'Culture',
    items: [
      {
        q: 'Why is masu considered a lucky gift?',
        a: 'The word "masu" (枡) sounds identical to "masu" (益す), meaning "to increase" or "to prosper." This linguistic connection has made masu a traditional symbol of good fortune in Japan. Masu are given at weddings ("happiness increases"), business celebrations ("prosperity increases"), and New Year gatherings. The tradition dates back centuries and remains an important part of Japanese gift-giving culture.',
      },
      {
        q: 'What is Kagami-biraki?',
        a: 'Kagami-biraki (鏡開き) is a Japanese ceremony where the lid (called "kagami" or "mirror") of a sake barrel is broken open with a wooden mallet. The sake inside is then served to guests in masu cups. This ceremony symbolizes opening the way to good fortune and is performed at weddings, corporate anniversaries, New Year celebrations, and sporting victory parties.',
      },
      {
        q: 'What is Setsubun?',
        a: 'Setsubun (節分) is a Japanese festival held on February 3rd that marks the transition from winter to spring. During Setsubun, roasted soybeans are thrown from a masu while chanting "Oni wa soto, fuku wa uchi" ("Demons out, fortune in"). The masu is used because its name "masu" (increase) amplifies the wish for good fortune to enter the home.',
      },
    ],
  },
]

const allFaqItems = faqCategories.flatMap((cat) => cat.items)

export default function EnFAQPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: baseUrl },
          { name: 'English', href: `${baseUrl}/en` },
          { name: 'FAQ', href: `${baseUrl}/en/faq` },
        ]}
      />
      <FAQJsonLd items={allFaqItems} />
      <SpeakableJsonLd
        url={`${baseUrl}/en/faq`}
        cssSelectors={['[data-speakable]', '.section-title']}
      />

      {/* Hero */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: 'var(--color-accent)' }}>
            Frequently Asked Questions
          </p>
          <h1 className="text-3xl md:text-4xl font-light mb-6" style={{ lineHeight: 1.5 }}>
            Masu FAQ
          </h1>
          <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
            Everything you need to know about traditional Japanese masu —
            <br className="hidden md:block" />
            sizes, materials, care, sake, culture, and ordering.
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <nav className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {faqCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-4 py-2 text-xs tracking-wide border border-[var(--color-border)] rounded-sm hover:bg-[var(--color-subtle)] transition-colors"
            >
              {cat.title}
              <span className="ml-2 text-xs" style={{ color: 'var(--color-muted)' }}>
                {cat.items.length}
              </span>
            </a>
          ))}
        </div>
      </nav>

      <div className="divider mx-auto max-w-3xl" />

      {/* FAQ Sections by Category */}
      <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">
        {faqCategories.map((cat) => (
          <section key={cat.id} id={cat.id}>
            <h2 className="serif text-xl font-light mb-8">{cat.title}</h2>
            <div data-speakable>
              {cat.items.map((item, i) => (
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
        ))}
      </div>

      <div className="divider mx-auto max-w-3xl" />

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-sm leading-[2] mb-8" style={{ color: 'var(--color-muted)' }}>
          Can&rsquo;t find what you&rsquo;re looking for?
          <br />
          We&rsquo;re happy to help with any questions about masu.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/en/contact"
            className="inline-block px-8 py-4 text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
            style={{ background: 'var(--color-accent)', color: '#fff' }}
          >
            Contact Us
          </Link>
          <Link
            href="/en"
            className="inline-block px-8 py-4 text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
            style={{ border: '1px solid var(--color-border)', color: 'var(--foreground)' }}
          >
            Back to English Home
          </Link>
        </div>
      </section>

      {/* Language switcher */}
      <section className="py-8 text-center">
        <Link href="/faq" className="text-xs underline" style={{ color: 'var(--color-muted)' }}>
          日本語版はこちら
        </Link>
      </section>
    </>
  )
}
