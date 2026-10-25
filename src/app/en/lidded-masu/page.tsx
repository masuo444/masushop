import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { masuSizes } from '@/lib/masu-data'
import { BreadcrumbJsonLd, FAQJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

// 日本語版 /futatsuki と同じ商品。FOMUS SHOP の送料表示は国内向けなので、海外のお客様は問い合わせへ送る
const utm = 'utm_source=masu-store&utm_medium=referral&utm_campaign=futatsuki-en'
const lidSizes = [
  { sizeId: 'sanjaku', label: 'Mini (3-shaku)', price: 2200, url: `https://shop.fomus.jp/shop/masu-lid-mini?${utm}`, use: 'Rings, earrings, charms, incense' },
  { sizeId: 'ichigo', label: '1-go', price: 3300, url: `https://shop.fomus.jp/shop/masu-lid-ichigo?${utm}`, use: 'A seal stamp, a key ring, a small gift' },
].map((p) => ({ ...p, size: masuSizes.find((m) => m.id === p.sizeId)! }))

const title = 'Masu with Lid — Hinoki Wooden Box for Jewelry & Gifts'
const description =
  'A Japanese hinoki masu with a matching hinoki lid: a small wooden box for jewelry, keepsakes, incense, or as a gift box. Two sizes. Custom engraving of names and logos, bulk orders, and worldwide shipping available.'

export const metadata: Metadata = {
  title,
  description,
  keywords:
    'masu with lid, lidded masu, hinoki box, hinoki wooden box, japanese wooden box, wooden jewelry box japan, wooden ring box, japanese gift box, engraved wooden box',
  alternates: {
    canonical: `${baseUrl}/en/lidded-masu`,
    languages: { ja: `${baseUrl}/futatsuki`, en: `${baseUrl}/en/lidded-masu` },
  },
  openGraph: {
    title,
    description,
    url: `${baseUrl}/en/lidded-masu`,
    images: [{ url: `${baseUrl}/images/lid/lid-open.jpg`, width: 1024, height: 1024 }],
    locale: 'en_US',
  },
}

const faq = [
  {
    q: 'Which sizes come with a lid?',
    a: 'Two sizes: the mini 3-shaku masu (56×56×39mm) and the 1-go masu (85×85×56mm). Other sizes are not available with a lid.',
  },
  {
    q: 'Can you engrave a name or logo on a masu with lid?',
    a: 'Yes. We engrave names, dates, messages and logos by branding iron (yakiin) or laser. Just send us the text — no design file is needed — and we will send a free preview with your quote before you order.',
  },
  {
    q: 'Do you ship overseas?',
    a: 'Yes, we ship worldwide. Please contact us with the quantity and destination, and we will quote shipping along with the order.',
  },
  {
    q: 'Can I drink sake from it?',
    a: 'The box itself is a standard masu, so it works as a sake cup too. That said, the lidded version is designed to be used as a small box.',
  },
]

const muted = { color: 'var(--color-muted)' }

export default function LiddedMasuPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: baseUrl },
          { name: 'English', href: `${baseUrl}/en` },
          { name: 'Masu with Lid', href: `${baseUrl}/en/lidded-masu` },
        ]}
      />
      <FAQJsonLd items={faq} />
      <SpeakableJsonLd url={`${baseUrl}/en/lidded-masu`} cssSelectors={['[data-speakable]', '.section-title']} />

      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-6 pt-8 text-[11px]" style={muted}>
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/en" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
          </li>
          <li>/</li>
          <li style={{ color: 'var(--foreground)' }}>Masu with Lid</li>
        </ol>
      </nav>

      <section className="max-w-5xl mx-auto px-6 py-14 md:py-16 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: 'var(--color-accent)' }}>
            Hinoki Wooden Box
          </p>
          <h1 className="section-title mb-6" style={{ lineHeight: 1.5 }}>Masu with Lid</h1>
          <p data-speakable className="text-sm leading-[2]" style={muted}>
            A traditional Japanese masu made of hinoki cypress, finished with a matching hinoki lid.
            Instead of a sake cup, it becomes a small wooden box — for jewelry, keepsakes, incense,
            or as a gift box that is a keepsake in itself. Available in two sizes, with custom engraving.
          </p>
        </div>
        <Image
          src="/images/lid/lid-open.jpg"
          alt="Hinoki masu with its lid removed"
          width={1024}
          height={1024}
          priority
          sizes="(max-width: 768px) 100vw, 480px"
          className="w-full rounded-sm"
        />
      </section>

      <div className="divider max-w-4xl mx-auto" />

      <section className="max-w-4xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-8">Two sizes</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {lidSizes.map((p) => (
            <article key={p.sizeId} className="rounded-sm p-6" style={{ border: '1px solid var(--color-border)' }}>
              <h3 className="serif text-xl mb-1">{p.label}</h3>
              <p className="text-xs mb-4" style={muted}>{p.size.size}</p>
              <p className="text-sm leading-[1.9] mb-4" style={muted}>Good for: {p.use}</p>
              <p className="text-sm">
                ¥{p.price.toLocaleString()} <span className="text-xs" style={muted}>(plain, tax incl., shipping within Japan)</span>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-16" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-6">Engraving, bulk orders and overseas shipping</h2>
          <p className="text-sm leading-[2] mb-8" style={muted}>
            Names, dates, a wedding message or your company logo — engraved on hinoki and closed with a lid,
            it makes a gift box that lasts. Send us the text and we will send a free preview with your quote.
            Engraving is available from a single piece, and bulk orders are quoted by quantity.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/en/contact" className="btn-accent">Request a quote</Link>
            <Link href="/en/shipping" className="btn-outline">How overseas orders work</Link>
          </div>
          <p className="mt-8 text-xs leading-relaxed" style={muted}>
            Buying a plain one within Japan? Order from our official shop:{' '}
            {lidSizes.map((p, i) => (
              <span key={p.sizeId}>
                {i > 0 && ' / '}
                <a href={p.url} target="_blank" rel="noopener" className="underline">{p.label}</a>
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <h2 className="section-title mb-8">FAQ</h2>
        {faq.map((item) => (
          <details key={item.q} className="group" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium list-none">
              <span>{item.q}</span>
              <span className="ml-4 text-lg transition-transform group-open:rotate-45" style={muted}>+</span>
            </summary>
            <p className="pb-5 text-sm leading-relaxed" style={muted}>{item.a}</p>
          </details>
        ))}
      </section>
    </>
  )
}
