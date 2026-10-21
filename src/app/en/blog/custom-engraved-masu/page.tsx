import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { KURA_MASTER } from '@/lib/works'

const baseUrl = siteConfig.url
const url = `${baseUrl}/en/blog/custom-engraved-masu`
const minPrice = `¥${siteConfig.orderMinPrice.toLocaleString('en-US')}`

export const metadata: Metadata = {
  title: 'Custom Engraved Masu — Logo & Name Engraving on Hinoki Sake Cups',
  description:
    'How custom engraving on a masu works: branding iron vs laser, engraving area by size, logo files, text in any language, prices and lead times. Engraved masu from a single piece, shipped worldwide from Japan.',
  keywords:
    'custom engraved masu, personalized masu, logo masu cup, engraved sake cup, custom wooden sake cup, branded masu, masu engraving, laser engraved masu, wedding masu, corporate gift masu',
  alternates: {
    canonical: url,
    languages: { ja: `${baseUrl}/products/engraving`, en: url },
  },
  openGraph: {
    title: 'Custom Engraved Masu — Logo & Name Engraving on Hinoki Sake Cups',
    description: 'Branding iron or laser, any language, from a single piece. Free design preview before you order.',
    url,
    type: 'article',
    locale: 'en_US',
    siteName: siteConfig.nameEn,
    images: [{ url: `${baseUrl}${KURA_MASTER.image.src}`, width: KURA_MASTER.image.width, height: KURA_MASTER.image.height }],
  },
}

const faq = [
  {
    q: 'Can you engrave a different name on every masu?',
    a: 'Yes, with laser engraving. Award recipients, guests at a wedding, or each department of a company can each get their own name without any extra setup cost.',
  },
  {
    q: 'Can you engrave in English, French or other languages?',
    a: 'Yes. We engrave Latin script, Japanese and other scripts, as well as logos. You will see a preview of exactly how the text sits on the masu before you order.',
  },
  {
    q: 'I do not have a vector logo file. Is that a problem?',
    a: 'No. Send any image of your logo — a photo of a business card, a sign or a screenshot is enough. We redraw it for engraving and include it in the free preview.',
  },
  {
    q: 'How much does engraving cost?',
    a: `An engraved order starts from ${minPrice} per order (tax included, shipping extra), including the design work and the preview image. Additional pieces with the same design cost less. Larger orders are quoted by quantity.`,
  },
  {
    q: 'How long does it take?',
    a: 'Engraved masu are usually dispatched within 2–3 weeks (3–4 weeks for 100 pieces or more), plus transit time to your country. Tell us your date and we will plan back from it.',
  },
]

const sizes = [
  ['Sanjaku', '54 ml', '56 × 39 mm', 'A short name or a small logo on one line'],
  ['Goshaku', '100 ml', '67 × 47 mm', 'A name and a date on two lines'],
  ['Hasshaku', '144 ml', '76 × 51 mm', 'A larger logo or shop name'],
  ['Ichigo', '180 ml', '85 × 56 mm', 'Logo, name and date together — the most flexible'],
  ['Nigohan', '450 ml', '117 × 75 mm', 'Large logos and detailed illustrations'],
]

export default function CustomEngravedMasuPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: `${baseUrl}/en` },
          { name: 'Custom Engraved Masu', href: url },
        ]}
      />
      <ArticleJsonLd
        headline="Custom Engraved Masu — Logo & Name Engraving on Hinoki Sake Cups"
        description="How custom engraving on a masu works: methods, engraving area, files, prices and lead times."
        datePublished="2026-10-21"
        dateModified="2026-10-21"
        url={url}
      />
      <FAQJsonLd items={faq} />
      <SpeakableJsonLd url={url} cssSelectors={['[data-speakable]', '.section-title']} />

      <Breadcrumb items={[{ label: 'Home', href: '/en' }, { label: 'Custom Engraved Masu' }]} />

      <section className="py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: 'var(--color-accent)' }}>
            Engraving Guide
          </p>
          <h1 className="text-2xl md:text-4xl font-light mb-6" style={{ lineHeight: 1.4 }}>
            Custom Engraved Masu
            <br className="hidden md:block" /> — Your Logo or Name on Japanese Hinoki
          </h1>
          <p className="text-sm md:text-base leading-[2] max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
            Everything you need to know before ordering an engraved masu: which method to choose, how much fits on each size, and what we need from you.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div data-speakable className="p-8 rounded-sm" style={{ background: 'var(--color-accent-light)', borderLeft: '4px solid var(--color-accent)' }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-accent)' }}>In short</p>
            <p className="text-sm md:text-base leading-[2]">
              MASU-STORE engraves names, dates, messages and logos on Japanese hinoki masu — <strong>from a single piece</strong>.
              Choose the traditional <strong>branding iron</strong> for a warm burnt look, or <strong>laser engraving</strong> for fine detail and a different name on every cup.
              No design file is needed: send your text or a photo of your logo and you get a <strong>free preview image</strong> with the quote. We ship worldwide.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-8">Branding iron or laser?</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-sm p-6" style={{ border: '1px solid var(--color-border)' }}>
              <h3 className="text-base font-medium mb-3">Yakiin — branding iron</h3>
              <p className="text-sm leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                A heated copper plate is pressed into the wood. The result is a warm, deep brown mark with the feel of a traditional craft.
                Best when the same logo goes on every cup. The first order needs a copper plate to be made.
              </p>
            </div>
            <div className="rounded-sm p-6" style={{ border: '1px solid var(--color-border)' }}>
              <h3 className="text-base font-medium mb-3">Laser engraving</h3>
              <p className="text-sm leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                Carves fine lines, small text, photos and QR codes. No plate is needed, so each cup can carry a different name.
                Best for detailed logos, small runs and personalized gifts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-8">How much fits on each size</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  {['Size', 'Volume', 'Engraving face', 'Works well for'].map((h) => (
                    <th key={h} className="text-left py-3 pr-4 font-medium" style={{ color: 'var(--color-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizes.map((row) => (
                  <tr key={row[0]} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    {row.map((cell, i) => (
                      <td key={i} className={`py-3 pr-4 ${i < 3 ? 'whitespace-nowrap' : ''}`} style={{ color: i === 3 ? 'var(--color-muted)' : undefined }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[13px] mt-4" style={{ color: 'var(--color-muted)' }}>
            You can engrave from one to all four sides. The 180 ml Ichigo is the most popular choice for engraving.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-6">What we need from you</h2>
          <ul className="space-y-3 text-sm leading-[1.9]">
            <li>• <strong>The text</strong> — names, dates, a message, in any language. Rough wording is fine.</li>
            <li>• <strong>Your logo</strong>, if any — any image works, even a photo of a business card or a sign.</li>
            <li>• <strong>Size and quantity</strong> — or tell us the occasion and we will suggest one.</li>
            <li>• <strong>Your date and destination</strong> — so we can plan production and shipping.</li>
          </ul>
          <p className="text-sm leading-[2] mt-6" style={{ color: 'var(--color-muted)' }}>
            We reply with a quote and a preview image of the finished masu, usually within 1–2 business days. You decide after seeing it.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.18em] mb-2" style={{ color: 'var(--color-accent)' }}>EXAMPLE — LASER ENGRAVING</p>
          <h2 className="serif text-xl font-light mb-4">{KURA_MASTER.en.title}</h2>
          <p className="text-sm leading-[2] mb-4" style={{ color: 'var(--color-muted)' }}>{KURA_MASTER.en.detail} {KURA_MASTER.en.use}</p>
          <Link href="/en/works" className="text-sm underline underline-offset-4" style={{ color: 'var(--color-accent)' }}>See our work →</Link>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-8">FAQ</h2>
          {faq.map((item) => (
            <details key={item.q} className="group" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium list-none">
                <span>{item.q}</span>
                <span className="ml-4 text-lg transition-transform group-open:rotate-45" style={{ color: 'var(--color-muted)' }}>+</span>
              </summary>
              <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 text-center" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="section-title mb-4">Start with a free preview</h2>
          <p className="text-sm leading-[2] mb-8" style={{ color: 'var(--color-muted)' }}>
            Send your text or logo. We reply with a quote and a preview image of your engraved masu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/en/contact" className="btn-accent">Request a free quote</Link>
            <Link href="/en/corporate" className="btn-outline">Corporate orders</Link>
          </div>
        </div>
      </section>
    </>
  )
}
