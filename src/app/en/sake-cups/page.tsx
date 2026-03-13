import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'Japanese Wooden Sake Cups — The Authentic Way to Drink Sake',
  description:
    "Discover why Japanese sake connoisseurs have used hinoki wooden cups for over 1,000 years. The wood's natural aroma transforms every sip. Handcrafted in Gifu, Japan.",
  keywords:
    'Japanese sake cup, wooden sake cup, sake accessories, best sake cup, how to drink sake, sake set, hinoki sake cup, traditional sake cup, sake gift set, sake tasting',
  alternates: {
    canonical: `${baseUrl}/en/sake-cups`,
    languages: { ja: `${baseUrl}/sake`, en: `${baseUrl}/en/sake-cups` },
  },
  openGraph: {
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
    locale: 'en_US',
  },
}

const breadcrumbItems = [
  { name: 'Home', href: baseUrl },
  { name: 'English', href: `${baseUrl}/en` },
  { name: 'Sake Cups', href: `${baseUrl}/en/sake-cups` },
]

const faqItems = [
  {
    q: 'Does the wood flavor overpower the sake?',
    a: "No, it's subtle. Think of it like how a wine barrel adds complexity to wine without masking it. The hinoki aroma complements the sake, softening harsh notes and adding a gentle depth. If you prefer a lighter wood influence, simply rinse the masu with water before your first pour.",
  },
  {
    q: 'Can I use these for other drinks?',
    a: 'Yes. Hot tea, whisky, water, even cocktails. Any drink benefits from the gentle hinoki aroma. Some customers use their masu for morning coffee or as a small vessel for nuts and snacks during drinks.',
  },
  {
    q: 'How many times can I use one cup?',
    a: "Years, with proper care. The hinoki aroma mellows beautifully over time, becoming more subtle and refined with each use. Rinse with water after use and air dry upside down. With an optional food-grade coating, a masu can last even longer.",
  },
  {
    q: 'What type of sake works best in a masu?',
    a: "Junmai and honjozo styles pair wonderfully with hinoki, as the wood's aroma complements their fuller, rice-forward profiles. Delicate daiginjo can also be enjoyed in a masu, though you may want a well-used cup where the aroma has mellowed for these lighter sakes.",
  },
]

export default function SakeCupsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SpeakableJsonLd
        url={`${baseUrl}/en/sake-cups`}
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
          <li style={{ color: 'var(--foreground)' }}>Sake Cups</li>
        </ol>
      </nav>

      {/* ===== HERO ===== */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <p
          className="text-[10px] tracking-[0.5em] uppercase mb-6"
          style={{ color: 'var(--color-accent)' }}
        >
          The Authentic Sake Experience
        </p>
        <h1 className="section-title mt-4" style={{ lineHeight: 1.5 }}>
          The Cup That Changes How You Taste Sake
        </h1>
        <p
          className="mt-6 text-sm leading-[2] max-w-2xl mx-auto"
          style={{ color: 'var(--color-muted)' }}
        >
          For over a thousand years, Japan&rsquo;s finest sake has been sipped from hinoki cypress
          cups. Not because of tradition alone — because the wood makes it taste better.
        </p>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ===== Glass vs. Wood ===== */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-10">Glass vs. Wood: What Changes</h2>
        <div data-speakable className="space-y-6">
          <div
            className="p-6 rounded-sm"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <p className="text-sm font-medium mb-2">Glass</p>
            <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
              Neutral. Clean. Shows color well. — But adds nothing to the flavor. What you pour
              in is exactly what you get out. No more, no less.
            </p>
          </div>
          <div
            className="p-6 rounded-sm"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <p className="text-sm font-medium mb-2">Ceramic</p>
            <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)' }}>
              Elegant. Holds temperature. — But masks the aroma. The vessel becomes decoration,
              not a participant in the tasting experience.
            </p>
          </div>
          <div
            className="p-6 rounded-sm"
            style={{
              border: '1px solid var(--color-accent)',
              background: 'var(--color-accent-light)',
            }}
          >
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
              Hinoki Wood
            </p>
            <p className="text-sm leading-[2]" style={{ color: 'var(--foreground)' }}>
              The wood&rsquo;s natural aroma <strong>enhances</strong> the sake. Phytoncide creates
              a calming, forest-like scent. Each sip is infused with 1,300 years of Japanese craft.
              — This is how sake was meant to be experienced.
            </p>
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ===== Three Ways to Enjoy ===== */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-10">Three Ways to Enjoy Sake in a Masu</h2>
        <div className="space-y-8">
          <div
            className="p-6 rounded-sm"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <div
              className="flex items-baseline gap-3 mb-3"
            >
              <span
                className="text-xs font-medium flex-shrink-0"
                style={{ color: 'var(--color-accent)', letterSpacing: '0.05em' }}
              >
                01
              </span>
              <h3 className="serif text-lg font-light">The Classic Pour</h3>
            </div>
            <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)', paddingLeft: '2.25rem' }}>
              Sake directly in the masu. The simplest, most traditional way. The hinoki aroma
              rises with each sip, blending with the sake in a way no other vessel can replicate.
            </p>
            <p
              className="text-xs mt-3"
              style={{ color: 'var(--color-accent)', paddingLeft: '2.25rem' }}
            >
              Recommended: Ichigo 180ml — one perfect serving
            </p>
          </div>

          <div
            className="p-6 rounded-sm"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <div className="flex items-baseline gap-3 mb-3">
              <span
                className="text-xs font-medium flex-shrink-0"
                style={{ color: 'var(--color-accent)', letterSpacing: '0.05em' }}
              >
                02
              </span>
              <h3 className="serif text-lg font-light">Mokkiri Style</h3>
            </div>
            <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)', paddingLeft: '2.25rem' }}>
              A glass placed inside the masu, sake poured until it overflows. This generous
              ritual is how Japanese izakayas serve their best sake. The overflow is your bonus
              pour — drink from the glass first, then savor the hinoki-infused sake from the masu.
            </p>
            <p
              className="text-xs mt-3"
              style={{ color: 'var(--color-accent)', paddingLeft: '2.25rem' }}
            >
              Recommended: Hasshaku 144ml — the izakaya standard
            </p>
          </div>

          <div
            className="p-6 rounded-sm"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <div className="flex items-baseline gap-3 mb-3">
              <span
                className="text-xs font-medium flex-shrink-0"
                style={{ color: 'var(--color-accent)', letterSpacing: '0.05em' }}
              >
                03
              </span>
              <h3 className="serif text-lg font-light">The Slow Sip</h3>
            </div>
            <p className="text-sm leading-[2]" style={{ color: 'var(--color-muted)', paddingLeft: '2.25rem' }}>
              A smaller masu for premium sake. Pour less, taste more. Let the hinoki work its
              magic with each small sip. The concentrated aroma in a smaller vessel intensifies
              the experience.
            </p>
            <p
              className="text-xs mt-3"
              style={{ color: 'var(--color-accent)', paddingLeft: '2.25rem' }}
            >
              Recommended: Goshaku 100ml — for intimate moments
            </p>
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ===== The Science ===== */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-8">The Science Behind the Flavor</h2>
        <div className="space-y-4 text-sm leading-[2.2]" style={{ color: 'var(--foreground)' }}>
          <p>
            Hinoki cypress contains <strong>phytoncide</strong>, the same compound responsible
            for the calming effect of Japanese forest bathing (<em>shinrin-yoku</em>). When sake
            meets the wood, these aromatic compounds are released, softening harsh notes and
            adding a gentle depth to every sip.
          </p>
          <p>
            The wood also contains <strong>hinokitiol</strong>, a natural preservative found in
            Japanese cypress. These compounds interact with sake to create a flavor profile
            impossible to achieve in glass or ceramic.
          </p>
          <p style={{ color: 'var(--color-muted)' }}>
            It&rsquo;s the same reason Japanese onsen (hot springs) are lined with hinoki,
            temples are built from it, and traditional bathhouses fill rooms with its scent. The
            Japanese have understood this wood for over a millennium.
          </p>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ===== Which Size ===== */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-10">Which Size for Sake?</h2>
        <div data-speakable className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="p-6 rounded-sm"
            style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
          >
            <p className="serif text-lg font-light mb-1">Goshaku</p>
            <p
              className="text-[10px] tracking-wide mb-4"
              style={{ color: 'var(--color-muted)' }}
            >
              100ml
            </p>
            <p className="text-xs leading-[2]" style={{ color: 'var(--foreground)' }}>
              Premium sake, slow sipping, intimate moments. The smaller vessel concentrates the
              hinoki aroma for a more intense experience.
            </p>
          </div>
          <div
            className="p-6 rounded-sm"
            style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
          >
            <p className="serif text-lg font-light mb-1">Hasshaku</p>
            <p
              className="text-[10px] tracking-wide mb-4"
              style={{ color: 'var(--color-muted)' }}
            >
              144ml
            </p>
            <p className="text-xs leading-[2]" style={{ color: 'var(--foreground)' }}>
              Mokkiri style. Bring the izakaya atmosphere home. The perfect size for a glass to
              sit inside with room for the overflow.
            </p>
          </div>
          <div
            className="p-6 rounded-sm"
            style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
          >
            <p className="serif text-lg font-light mb-1">Ichigo</p>
            <p
              className="text-[10px] tracking-wide mb-4"
              style={{ color: 'var(--color-muted)' }}
            >
              180ml
            </p>
            <p className="text-xs leading-[2]" style={{ color: 'var(--foreground)' }}>
              The standard. One &ldquo;g&#x14D;&rdquo; — a perfect single serving of sake. The
              most popular size in Japan for over a century.
            </p>
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ===== Protective Coating ===== */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-8">Add a Protective Coating</h2>
        <p className="text-sm leading-[2]" style={{ color: 'var(--foreground)' }}>
          For those who want their masu to last even longer, a food-grade protective coating is
          available. It repels water and oil, prevents staining, and is certified safe for food
          contact. The coating extends the life of your masu while preserving the hinoki aroma.
        </p>
        <div className="mt-6">
          <Link
            href="/en/care"
            className="text-xs tracking-[0.1em] uppercase font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-accent)' }}
          >
            Learn about masu care &rarr;
          </Link>
        </div>
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
            Experience It Yourself
          </h2>
          <p className="text-sm mb-8 leading-[2]" style={{ opacity: 0.85 }}>
            Ships worldwide from Japan. Custom engraving available on every size.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/en/contact"
              className="inline-block px-8 py-4 text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ background: '#fff', color: 'var(--color-accent)' }}
            >
              Order Now
            </Link>
            <Link
              href="/en/gifts"
              className="inline-block px-8 py-4 text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-opacity hover:opacity-85"
              style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#fff' }}
            >
              Gift Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Language switcher */}
      <section className="py-8 text-center">
        <Link href="/sake" className="text-xs underline" style={{ color: 'var(--color-muted)' }}>
          日本語版はこちら
        </Link>
      </section>
    </>
  )
}
