import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'How to Care for a Wooden Sake Cup — Cleaning & Maintenance Guide',
  description: 'Keep your wooden sake cup beautiful for years. Simple care tips for hinoki cypress cups: cleaning, drying, storage, and troubleshooting.',
  keywords: 'wooden sake cup care, how to clean wooden cup, hinoki care, wooden cup maintenance, sake cup cleaning, wooden drinkware care',
  alternates: {
    canonical: `${baseUrl}/en/care`,
    languages: { ja: `${baseUrl}/care`, en: `${baseUrl}/en/care` },
  },
  openGraph: {
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    locale: 'en_US',
  },
}

const careFaqData = [
  {
    q: 'How long does a masu last?',
    a: 'With proper care, a hinoki masu can last for many years — even decades. The key is to rinse it promptly after use, dry it thoroughly, and store it in a cool, dry place. Over time, the hinoki fragrance will mellow, but the wood remains strong and beautiful.',
  },
  {
    q: 'Can I put hot drinks in a masu?',
    a: 'Masu are traditionally designed for cold or room-temperature sake. Hot liquids can cause the wood to expand unevenly, which may loosen the joints over time. If you want to enjoy warm sake in a masu, let the liquid cool to a moderate temperature first. Coated masu handle temperature changes better than uncoated ones.',
  },
  {
    q: 'Is masu food-safe?',
    a: 'Yes. Our masu are made from natural Japanese hinoki cypress, which has been used for food and drink vessels for centuries. Hinoki contains natural antibacterial compounds (hinokitiol and phytoncides). For added protection, we also offer a food-safe urethane coating option.',
  },
]

const howToSteps = [
  {
    name: 'Rinse with water immediately after use',
    text: 'Rinse the inside and rim of the masu under running water. Gently rub with your fingertips. Avoid wetting the outside as much as possible.',
  },
  {
    name: 'Air dry upside down',
    text: 'Shake off excess water and place the masu bottom-up in a well-ventilated area. Allow it to air dry completely. Never use a dishwasher or dryer.',
  },
  {
    name: 'Store in a cool, dry, dark place',
    text: 'Keep the masu away from direct sunlight, high humidity, and heat sources. A cupboard shelf with some air circulation is ideal.',
  },
]

export default function EnCarePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: baseUrl },
          { name: 'English', href: `${baseUrl}/en` },
          { name: 'Masu Care Guide', href: `${baseUrl}/en/care` },
        ]}
      />
      <SpeakableJsonLd url={`${baseUrl}/en/care`} cssSelectors={['[data-speakable]', '.section-title']} />
      <HowToJsonLd
        name="How to Care for a Masu"
        description="Proper care instructions for hinoki cypress masu (Japanese wooden cup). Learn how to clean, dry, and store your masu to keep it beautiful for years."
        steps={howToSteps}
      />
      <FAQJsonLd items={careFaqData} />

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'English', href: '/en' }, { label: 'Masu Care Guide' }]} />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="section-title mt-4">How to Care for Your Masu</h1>
        <p className="mt-6 text-sm text-[var(--color-muted)] leading-[2] max-w-2xl mx-auto">
          With the right care, a hinoki masu will last for years and grow more beautiful with age.<br />
          Follow these three simple rules to keep your masu in perfect condition.
        </p>
      </section>

      {/* Quick Answer */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div data-speakable className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-8 rounded">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)] mb-4">Three Rules</p>
          <ol className="space-y-3">
            {[
              'Rinse with water immediately after use.',
              'Air dry upside down in a ventilated area.',
              'Never soak in water or use a dishwasher.',
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-[2] text-[var(--foreground)]">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center text-[10px] font-medium mt-0.5">
                  {i + 1}
                </span>
                {point}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* Detailed Sections */}
      <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

        {/* Before First Use */}
        <section>
          <h2 className="serif text-xl font-light mb-6">
            Before First Use
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              Wipe the inside of your new masu with a dry cloth to remove any wood dust from production. No special cleaning or sterilization is needed — hinoki cypress contains natural antibacterial compounds called hinokitiol and phytoncides, which provide built-in antimicrobial protection. These compounds are one reason hinoki has been used in Japanese shrines and temples for over 1,300 years.
            </p>
            <p>
              If the hinoki fragrance feels strong at first, fill the masu with water for a few minutes, pour it out, and let the masu dry before use. This will mellow the scent. However, many people consider this fresh, forest-like fragrance the best part of a new masu.
            </p>
          </div>
        </section>

        {/* After Each Use */}
        <section>
          <h2 className="serif text-xl font-light mb-6">
            After Each Use — Rinse and Dry Promptly
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              The most important care habit is to rinse your masu as soon as possible after use. Sake, soy sauce, or other liquids left sitting in the wood can cause staining, mold, or odors.
            </p>
            <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded my-6">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)] mb-4">Steps</p>
              <ol className="space-y-3 text-sm leading-[2]">
                <li className="flex gap-3">
                  <span className="text-[var(--color-muted)] flex-shrink-0">1.</span>
                  Rinse the inside and rim (especially the corners) under running water. Gently rub with your fingertips.
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-muted)] flex-shrink-0">2.</span>
                  Avoid wetting the outside. If the exterior gets soaked, it takes longer to dry and may cause warping.
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-muted)] flex-shrink-0">3.</span>
                  Shake off excess water and place the masu bottom-up in a well-ventilated spot to air dry.
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-muted)] flex-shrink-0">4.</span>
                  Let it dry completely before stacking or storing. Do not cover while damp.
                </li>
              </ol>
            </div>
            <p>
              Never soak a masu in water for extended periods. Wood absorbs moisture and expands; repeated swelling and shrinking loosens the joints and can lead to cracking. The rule is simple: rinse quickly, dry thoroughly.
            </p>
          </div>
        </section>

        {/* Storage */}
        <section>
          <h2 className="serif text-xl font-light mb-6">
            Storage
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              Store your masu in a cool, dry place away from direct sunlight. A cupboard or shelf with some air circulation is ideal. Avoid airtight containers — wood needs to breathe.
            </p>
            <p>
              Extremely dry environments (near heaters, air conditioning vents) can cause the wood to lose moisture too quickly, leading to cracks or warping. Conversely, very humid spots encourage mold growth.
            </p>
            <p>
              For long-term storage, loosely wrap the masu in paper (newspaper or washi). Do not seal it in a plastic bag, which traps moisture. If your masu came with hinoki wood shavings as packing material, keeping them nearby can help regulate humidity naturally.
            </p>
          </div>
        </section>

        {/* Cleaning Tips */}
        <section>
          <h2 className="serif text-xl font-light mb-6">
            Cleaning Tips
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
                <p className="text-xs font-medium tracking-wide mb-3">Uncoated Masu</p>
                <p className="text-xs leading-[2] text-[var(--color-muted)]">
                  Do not use dish soap — detergent chemicals can seep into the wood and affect flavor. For stubborn stains, sprinkle a pinch of salt inside and gently scrub with your fingertips, or use a diluted baking soda solution. Rinse thoroughly with water afterward.
                </p>
              </div>
              <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
                <p className="text-xs font-medium tracking-wide mb-3">Coated Masu</p>
                <p className="text-xs leading-[2] text-[var(--color-muted)]">
                  Coated masu (urethane finish) can be washed with a mild dish soap and the soft side of a sponge. Avoid abrasive scrubbers or scouring powders, which can scratch and damage the protective coating.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="serif text-xl font-light mb-6">
            Troubleshooting
          </h2>
          <div className="space-y-6 text-sm leading-[2.2] text-[var(--foreground)]">
            <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
              <p className="text-xs font-medium tracking-wide mb-3">Sticky Resin (Yani)</p>
              <p className="text-xs leading-[2] text-[var(--color-muted)]">
                Natural tree resin may seep from the wood, especially in warm conditions. This is normal for hinoki and is not a defect. Wipe the sticky area with a cloth dampened with ethanol (rubbing alcohol, 70-80% concentration). The resin dissolves easily in alcohol. Store the masu away from heat to reduce resin occurrence.
              </p>
            </div>
            <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
              <p className="text-xs font-medium tracking-wide mb-3">Mold</p>
              <p className="text-xs leading-[2] text-[var(--color-muted)]">
                If mold appears (usually from being stored damp), wipe the affected area with a cloth dampened with ethanol or diluted vinegar. Dry the masu thoroughly in a well-ventilated area. Moving forward, ensure the masu is completely dry before storing and keep it in a low-humidity environment.
              </p>
            </div>
            <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
              <p className="text-xs font-medium tracking-wide mb-3">Leaking</p>
              <p className="text-xs leading-[2] text-[var(--color-muted)]">
                If your masu leaks slightly after long storage, soak it in water for about 10 minutes. The wood will absorb moisture and swell, closing the gaps between the boards. This is a natural property of wood construction and not a sign of damage. After soaking, pour out the water and let the masu air dry bottom-up before use.
              </p>
            </div>
          </div>
        </section>

        {/* What NOT to Do */}
        <section>
          <h2 className="serif text-xl font-light mb-6">
            What NOT to Do
          </h2>
          <ul className="space-y-3">
            {[
              'Do not put your masu in a dishwasher — the heat and harsh detergents will damage the wood and loosen the joints.',
              'Do not microwave your masu — wood and microwave radiation are not compatible.',
              'Do not soak your masu in water for prolonged periods — this causes excessive swelling and weakens the joints.',
              'Do not dry your masu in direct sunlight — rapid moisture loss causes cracking and warping.',
              'Do not use bleach — it will discolor the wood.',
              'Do not scrub with abrasive materials (steel wool, scouring pads) — they will scratch and damage the wood surface.',
            ].map((caution, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-[2] text-[var(--foreground)]">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-muted)] mt-2.5" />
                {caution}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="divider max-w-4xl mx-auto" />

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mt-4 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {careFaqData.map((item, i) => (
            <details key={i} className="group border border-[var(--color-border)] rounded">
              <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer text-sm font-medium text-[var(--foreground)] hover:bg-[var(--color-subtle)] transition-colors">
                <span>{item.q}</span>
                <span className="flex-shrink-0 text-[var(--color-muted)] text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 pb-6 text-sm leading-[2.2] text-[var(--color-muted)]">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-sm text-[var(--color-muted)] leading-[2] mb-8">
          With proper care, your hinoki masu will become a lifelong companion.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/en/contact" className="btn-accent">
            Contact Us
          </Link>
          <Link href="/en/guide" className="btn-outline">
            Masu Choosing Guide
          </Link>
        </div>
      </section>

      {/* Language Switcher */}
      <div className="text-center pb-12">
        <Link
          href="/care"
          className="text-xs underline"
          style={{ color: 'var(--color-muted)' }}
        >
          日本語版はこちら / View in Japanese
        </Link>
      </div>
    </>
  )
}
