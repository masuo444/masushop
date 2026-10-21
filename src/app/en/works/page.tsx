import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { jsonLd } from '@/lib/json-ld'
import { KURA_MASTER } from '@/lib/works'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'Our Work — Kura Master 10th Anniversary Masu & Custom Logo Masu',
  description:
    'Custom hinoki masu made by MASU-STORE: the commemorative masu for the 10th anniversary of Kura Master, the sake competition in Paris, plus logo-engraved masu for companies and organizations. Engraving from 1 piece, shipped worldwide.',
  alternates: {
    canonical: `${baseUrl}/en/works`,
    languages: { ja: `${baseUrl}/works`, en: `${baseUrl}/en/works` },
  },
  openGraph: {
    title: 'Our Work — Kura Master 10th Anniversary Masu',
    description: 'We made the commemorative masu for the 10th anniversary of Kura Master in Paris. Custom engraving from 1 piece, shipped worldwide.',
    url: `${baseUrl}/en/works`,
    locale: 'en_US',
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

const worksJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Our Work',
  url: `${baseUrl}/en/works`,
  inLanguage: 'en',
  hasPart: [
    {
      '@type': 'CreativeWork',
      name: KURA_MASTER.en.title,
      description: KURA_MASTER.en.lead,
      dateCreated: String(KURA_MASTER.edition),
      image: `${baseUrl}${KURA_MASTER.image.src}`,
      material: 'Japanese hinoki cypress',
      creator: { '@type': 'Organization', name: siteConfig.nameEn, url: `${baseUrl}/en` },
      about: {
        '@type': 'Event',
        name: `Kura Master ${KURA_MASTER.edition} Awards Ceremony`,
        startDate: KURA_MASTER.ceremonyDate,
        location: { '@type': 'Place', name: KURA_MASTER.en.venue, address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' } },
        url: KURA_MASTER.url,
      },
    },
  ],
}

export default function EnWorksPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: `${baseUrl}/en` },
          { name: 'Our Work', href: `${baseUrl}/en/works` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(worksJsonLd) }} />

      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Breadcrumb items={[{ label: 'Home', href: '/en' }, { label: 'Our Work' }]} />
      </div>

      <section className="max-w-4xl mx-auto px-6 pt-12 pb-14 text-center">
        <p className="text-[11px] tracking-[0.2em] mb-4" style={{ color: 'var(--color-accent)' }}>
          OUR WORK
        </p>
        <h1 className="section-title mb-6">Masu we have made</h1>
        <p className="lead max-w-2xl mx-auto">
          From the commemorative cup of a sake competition in Paris to company logos and one-of-a-kind gifts —
          each one carved into Japanese hinoki cypress.
        </p>
      </section>

      <section className="py-16 md:py-20" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.18em] mb-3" style={{ color: 'var(--color-accent)' }}>
            PARIS, FRANCE — {KURA_MASTER.edition}
          </p>
          <h2 className="serif text-2xl md:text-3xl font-light leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
            {KURA_MASTER.en.title}
          </h2>
          <p className="text-[15px] leading-[2] mb-6" style={{ color: 'var(--foreground)' }}>
            {KURA_MASTER.en.lead} {KURA_MASTER.en.use}
          </p>
          <figure className="mb-6">
            <Image
              src={KURA_MASTER.image.src}
              alt={KURA_MASTER.en.imageAlt}
              width={KURA_MASTER.image.width}
              height={KURA_MASTER.image.height}
              sizes="(max-width: 768px) 100vw, 720px"
              className="w-full max-w-md mx-auto rounded-sm"
              priority
            />
            <figcaption className="text-[12px] text-center mt-3" style={{ color: 'var(--color-muted)' }}>
              On display at the awards ceremony, the Residence of the Ambassador of Japan in France ({KURA_MASTER.en.method.toLowerCase()})
            </figcaption>
          </figure>
          <dl className="grid grid-cols-[7em_1fr] gap-y-2 text-[14px] mb-6">
            <dt style={{ color: 'var(--color-muted)' }}>Used for</dt><dd>Display at the awards ceremony (30 September 2026, {KURA_MASTER.en.venue}); keepsakes for award-winning breweries</dd>
            <dt style={{ color: 'var(--color-muted)' }}>Engraving</dt><dd>{KURA_MASTER.en.detail}</dd>
            <dt style={{ color: 'var(--color-muted)' }}>Material</dt><dd>Japanese hinoki cypress</dd>
          </dl>
          <div className="rounded-sm p-6 md:p-7 mb-6" style={{ background: 'var(--background)', border: '1px solid var(--color-border)' }}>
            <h3 className="text-[13px] tracking-[0.08em] mb-3" style={{ color: 'var(--color-muted)' }}>
              About Kura Master
            </h3>
            <p className="text-[14px] leading-[1.9]" style={{ color: 'var(--foreground)' }}>
              {KURA_MASTER.en.about}
            </p>
            <p className="text-[13px] mt-4">
              <a href={KURA_MASTER.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" style={{ color: 'var(--color-accent)' }}>
                Kura Master official website ↗
              </a>
            </p>
          </div>
          <p className="text-[14px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
            Competitions, ceremonies and anniversaries: we quote commemorative masu based on the engraving and quantity,
            and email you a free preview image of the finished design before you order.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <h2 className="section-title mb-4 text-center">Logo engraving</h2>
        <p className="lead text-center mb-10 max-w-2xl mx-auto">
          Laser-engraved logos on the classic 180 ml Ichigo masu. Fine lines are carved together with the wood grain.
          No logo file? A photo of your business card or sign is enough.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Image src="/images/works/ishiwa-ashiyu-front.jpg" alt="Laser-engraved logo on a hinoki masu cup, front view" width={1448} height={1086} className="w-full rounded-sm" />
          <Image src="/images/works/ishiwa-ashiyu-detail.jpg" alt="Close-up of laser engraving on hinoki wood grain" width={1536} height={1024} className="w-full rounded-sm" />
          <Image src="/images/works/ishiwa-ashiyu-hand.jpg" alt="Engraved hinoki masu cup held in hand, showing scale" width={1448} height={1086} className="w-full rounded-sm" />
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
        <h2 className="section-title mb-4">Order a custom masu</h2>
        <p className="lead mb-8">
          Engraving from a single piece (plain masu from 10). Send us your text or logo and we design it for you.
          We ship worldwide from Japan.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/en/contact" className="btn-accent">Request a free quote</Link>
          <Link href="/en/corporate" className="btn-outline">Corporate orders</Link>
        </div>
      </section>
    </>
  )
}
