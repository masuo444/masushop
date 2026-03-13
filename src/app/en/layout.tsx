import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  openGraph: {
    locale: 'en_US',
  },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'MASU-STORE',
  description: 'Handcrafted Japanese hinoki cypress wooden cups (masu). Custom engraving, worldwide shipping.',
  url: `${baseUrl}/en`,
  brand: { '@type': 'Brand', name: 'MASU-STORE' },
  email: 'masu@fomus.co.jp',
  areaServed: 'Worldwide',
  knowsAbout: ['masu', 'Japanese sake cups', 'hinoki cypress', 'Japanese traditional crafts', 'custom engraving'],
  foundingDate: '1950',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ogaki',
    addressRegion: 'Gifu',
    addressCountry: 'JP',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MASU-STORE',
  url: `${baseUrl}/en`,
  description: 'Handcrafted Japanese wooden sake cups. Custom engraving, worldwide shipping.',
  inLanguage: 'en',
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <nav className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-12">
          <Link href="/en" className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
            MASU-STORE
          </Link>
          <div className="flex items-center gap-6">
            {[
              { href: '/en/sake-cups', label: 'Sake Cups' },
              { href: '/en/gifts', label: 'Gifts' },
              { href: '/en/corporate', label: 'Corporate' },
              { href: '/en/guide', label: 'Guide' },
              { href: '/en/faq', label: 'FAQ' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] transition-colors"
                style={{ color: 'var(--color-muted)' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/en/contact"
              className="text-[11px]"
              style={{ color: 'var(--color-accent)' }}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {children}
    </div>
  )
}
