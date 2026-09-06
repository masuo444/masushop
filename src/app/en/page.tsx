import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  // 同階層の layout の template は自身には適用されないため absolute で指定する
  title: { absolute: 'Japanese Wooden Sake Cups — Handcrafted Hinoki Cypress Masu | MASU-STORE' },
  description:
    'Handcrafted wooden sake cups made from Japanese hinoki cypress. A 1,300-year-old tradition that transforms how you experience sake. Custom engraving available. Ships worldwide.',
  keywords:
    'Japanese sake cup, wooden sake cup, hinoki sake cup, Japanese wooden cup, sake accessories, Japanese gift, Japanese crafts, wooden sake box, sake set, Japanese cypress cup, artisan sake cup',
  alternates: {
    canonical: `${baseUrl}/en`,
    languages: { ja: baseUrl, en: `${baseUrl}/en` },
  },
  openGraph: {
    title: 'Japanese Wooden Sake Cups — Handcrafted Hinoki Masu',
    description: 'A 1,300-year-old craft that transforms your sake experience. Ships worldwide.',
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    locale: 'en_US',
  },
}

const faq = [
  {
    q: 'What makes a wooden sake cup better than glass?',
    a: 'Hinoki (Japanese cypress) naturally infuses sake with a delicate woody aroma that enhances the flavor — something glass and ceramic cannot do. The wood contains phytoncide, a compound that creates a forest-bathing-like calming effect. Japanese sake connoisseurs have preferred hinoki cups for over a thousand years for this reason.',
  },
  {
    q: 'Are these cups food-safe?',
    a: 'Yes. Our masu are made from natural, untreated hinoki wood with food-safe adhesive. Optional food-grade coating (tested and certified by the Japan Food Research Laboratories) is available for enhanced durability. Hinoki itself has natural antibacterial properties.',
  },
  {
    q: 'What size should I choose for sake?',
    a: 'The Ichigo (180ml) is the classic choice — it holds exactly one "gō" (a traditional Japanese sake serving). For a smaller pour, the Goshaku (100ml) is perfect for slow sipping. The Hasshaku (144ml) is the traditional size used in Japanese bars for the iconic "mokkiri" overflow style.',
  },
  {
    q: 'Can I get my logo or name engraved?',
    a: 'Yes. We offer two methods: traditional branding-iron engraving (yakiin) for a warm, artisanal look, and precision laser engraving for detailed designs, photos, and QR codes. Both work on all sizes. Perfect for corporate gifts, wedding favors, or personalized presents.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we ship worldwide from Japan. Masu are lightweight and durable, making them ideal for international shipping. Contact us for a shipping quote to your country.',
  },
  {
    q: 'How do I care for a wooden sake cup?',
    a: 'Simply rinse with water after use and air dry upside down. Avoid dishwashers and prolonged soaking. With proper care, your masu will last for years, developing a beautiful patina over time.',
  },
]

const sizes = [
  {
    name: 'Ichigo',
    kanji: '一合枡',
    ml: '180ml',
    dim: '85 × 85 × 56 mm',
    label: 'The Classic',
    desc: 'The standard sake cup. One perfect serving — exactly one gō, the traditional measure. The most popular masu in Japan.',
  },
  {
    name: 'Goshaku',
    kanji: '五勺枡',
    ml: '100ml',
    dim: '67 × 67 × 47 mm',
    label: 'The Slow Sip',
    desc: 'For savoring premium sake, one deliberate pour at a time. The choice when the sake matters more than the volume.',
  },
  {
    name: 'Hasshaku',
    kanji: '八勺枡',
    ml: '144ml',
    dim: '76 × 76 × 51 mm',
    label: 'The Bar Style',
    desc: 'The traditional izakaya cup for mokkiri — where sake overflows from glass to masu. Generous, theatrical, unforgettable.',
  },
  {
    name: 'Sanjaku',
    kanji: '三勺枡',
    ml: '54ml',
    dim: '56 × 56 × 39 mm',
    label: 'The Jewel Box',
    desc: 'Tiny enough for a ring, elegant enough for a shelf. A miniature object of beauty.',
  },
  {
    name: 'Nigohan',
    kanji: '二合半枡',
    ml: '450ml',
    dim: '117 × 117 × 75 mm',
    label: 'The Desk Companion',
    desc: 'Pen holder, plant pot, catch-all. A piece of Japan on your desk, quietly useful, always beautiful.',
  },
  {
    name: 'Gogo',
    kanji: '五合枡',
    ml: '900ml',
    dim: '135 × 135 × 92 mm',
    label: 'The Ceremony',
    desc: 'For Setsubun — Japan\'s annual bean-throwing ritual to welcome spring and drive away misfortune.',
  },
  {
    name: 'Issho',
    kanji: '一升枡',
    ml: '1,800ml',
    dim: '170 × 170 × 92 mm',
    label: 'The Celebration',
    desc: 'Grand openings, weddings, milestones. When the occasion calls for something larger than ordinary.',
  },
]

export default function EnHomePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: baseUrl },
          { name: 'English', href: `${baseUrl}/en` },
        ]}
      />
      <FAQJsonLd items={faq} />
      <SpeakableJsonLd
        url={`${baseUrl}/en`}
        cssSelectors={['[data-speakable]', '.section-title']}
      />

      {/* Hero */}
      <section
        className="py-24 md:py-36 text-center"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-8"
            style={{ color: 'var(--color-accent)' }}
          >
            Handcrafted in Japan since the 8th century
          </p>
          <h1
            className="text-3xl md:text-5xl font-light mb-8"
            style={{ lineHeight: 1.4, letterSpacing: '-0.01em' }}
          >
            A 1,300-Year-Old Sake Ritual,
            <br />
            In Your Hands
          </h1>
          <p
            className="text-sm md:text-base leading-[2] max-w-xl mx-auto mb-12"
            style={{ color: 'var(--color-muted)' }}
          >
            Handcrafted hinoki cypress cups from Japan&rsquo;s oldest masu workshop tradition.
            <br className="hidden md:block" />
            The way sake was meant to be enjoyed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/guide"
              className="inline-block px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ background: 'var(--color-accent)', color: '#fff' }}
            >
              Explore Our Cups
            </Link>
            <Link
              href="/en/contact"
              className="inline-block px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ border: '1px solid var(--color-border)', color: 'var(--foreground)' }}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1: Why Sake Tastes Better in Wood */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p
          className="text-[10px] tracking-[0.5em] uppercase mb-4"
          style={{ color: 'var(--color-accent)' }}
        >
          The Difference
        </p>
        <h2 className="section-title mb-10" style={{ fontSize: '1.5rem', fontWeight: 300 }}>
          Why Sake Tastes Better in Wood
        </h2>
        <div data-speakable className="space-y-6">
          <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
            Pour sake into a hinoki cup and something remarkable happens. The wood&rsquo;s natural
            aroma — the same scent that fills Japan&rsquo;s ancient cypress forests — rises to meet
            the sake. The flavor softens. The moment slows down. This is how sake has been enjoyed
            in Japan for over a thousand years.
          </p>
          <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
            Unlike glass or ceramic, hinoki actively enhances your sake. The wood contains{' '}
            <strong>phytoncide</strong>, a natural compound that Japanese scientists have linked to
            the calming effects of forest bathing (<em>shinrin-yoku</em>). Every sip becomes a small
            ritual.
          </p>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Section 2: Seven Sizes, Seven Purposes */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p
          className="text-[10px] tracking-[0.5em] uppercase mb-4"
          style={{ color: 'var(--color-accent)' }}
        >
          The Collection
        </p>
        <h2 className="section-title mb-4" style={{ fontSize: '1.5rem', fontWeight: 300 }}>
          Seven Sizes, Seven Purposes
        </h2>
        <p className="text-sm mb-12" style={{ color: 'var(--color-muted)' }}>
          Every size has a story. Find the one that fits yours.
        </p>
        <div className="grid gap-4">
          {sizes.map((s) => (
            <div
              key={s.name}
              className="p-6 md:p-8 rounded-sm transition-colors"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="sm:w-2/5">
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-2"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {s.label}
                  </p>
                  <p className="text-base font-medium mb-1">
                    {s.name}
                    <span
                      className="text-xs font-normal ml-2"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {s.kanji}
                    </span>
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                    {s.ml} — {s.dim}
                  </p>
                </div>
                <p
                  className="text-sm leading-[1.8] sm:w-3/5"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Section 3: Make It Yours */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p
          className="text-[10px] tracking-[0.5em] uppercase mb-4"
          style={{ color: 'var(--color-accent)' }}
        >
          Personalization
        </p>
        <h2 className="section-title mb-6" style={{ fontSize: '1.5rem', fontWeight: 300 }}>
          Make It Yours
        </h2>
        <p className="text-sm md:text-base leading-[2] mb-10" style={{ color: 'var(--foreground)' }}>
          Your initials. Your company logo. A date that matters. Every masu can be personalized with
          traditional branding-iron engraving or precision laser carving.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div
            className="p-8 rounded-sm"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ color: 'var(--color-accent)' }}
            >
              Traditional
            </p>
            <h3 className="text-base font-medium mb-4">Yakiin — Branding Iron</h3>
            <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
              A heated copper plate pressed into the wood at 400&deg;C. The result is a warm,
              burnt-amber impression with an unmistakably handmade character. The technique
              used by masu makers for centuries. Ideal for logos, crests, and bold designs.
            </p>
          </div>
          <div
            className="p-8 rounded-sm"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ color: 'var(--color-accent)' }}
            >
              Modern
            </p>
            <h3 className="text-base font-medium mb-4">Laser Engraving</h3>
            <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
              High-precision laser carving that reproduces photographs, QR codes, gradients,
              and fine text with perfect accuracy. Each piece can carry a unique design. The choice
              for personalized gifts, individual names, and intricate detail.
            </p>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Section 4: A Gift That Means Something */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p
          className="text-[10px] tracking-[0.5em] uppercase mb-4"
          style={{ color: 'var(--color-accent)' }}
        >
          Meaning
        </p>
        <h2 className="section-title mb-10" style={{ fontSize: '1.5rem', fontWeight: 300 }}>
          A Gift That Means Something
        </h2>
        <div data-speakable className="space-y-6">
          <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
            In Japanese, &ldquo;masu&rdquo; (枡) sounds identical to the word for
            &ldquo;increase&rdquo; — as in, <em>may your happiness increase</em>. For centuries,
            masu have been given at weddings, business celebrations, and milestones as a wish for
            prosperity.
          </p>
          <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
            Unlike generic gifts that get forgotten, a masu is a conversation piece — a handcrafted
            object that carries 1,300 years of meaning. It sits on a desk, holds a pen, catches the
            light. And every time someone asks about it, the story begins again.
          </p>
        </div>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Section 5: From Forest to Cup */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p
          className="text-[10px] tracking-[0.5em] uppercase mb-4"
          style={{ color: 'var(--color-accent)' }}
        >
          Provenance
        </p>
        <h2 className="section-title mb-10" style={{ fontSize: '1.5rem', fontWeight: 300 }}>
          From Forest to Cup
        </h2>
        <p className="text-sm md:text-base leading-[2]" style={{ color: 'var(--foreground)' }}>
          Our masu are made in Ogaki, Gifu Prefecture — Japan&rsquo;s hinoki heartland, where cypress
          forests have supplied woodworkers for generations. Each cup is crafted from{' '}
          <strong>Japanese hinoki cypress</strong>, joined with a centuries-old interlocking technique
          called <em>arale-gumi</em> that requires no nails or screws. The result is a seamless box
          that holds liquid, holds beauty, and holds up — for years.
        </p>
      </section>

      <div className="divider mx-auto max-w-3xl" />

      {/* Section 6: FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
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
          {faq.map((item, i) => (
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
      </section>

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
            Whether you need one cup
            <br className="hidden md:block" />
            or ten thousand, we&rsquo;ll help you
            <br className="hidden md:block" />
            find the perfect masu.
          </h2>
          <p className="text-sm mb-10 leading-[2]" style={{ opacity: 0.8 }}>
            Custom engraving. Bulk pricing. Expert guidance on sizes and finishes.
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

      {/* Footer nav */}
      <section className="py-12" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
            {[
              { href: '/en/guide', label: 'Masu Guide' },
              { href: '/en/care', label: 'Care Instructions' },
              { href: '/en/history', label: 'History of Masu' },
              { href: '/en/glossary', label: 'Glossary' },
              { href: '/en/faq', label: 'FAQ' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.1em] uppercase transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-muted)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-center">
            <Link
              href="/"
              className="text-xs underline transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-muted)' }}
            >
              日本語版はこちら
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
