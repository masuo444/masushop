import type { Metadata } from 'next'
import siteConfig from '@/lib/site-config'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  // ルートの日本語テンプレート（%s | 枡の専門店 MASU-STORE）を英語側で上書きする
  title: {
    default: 'MASU-STORE — Handcrafted Japanese Wooden Sake Cups',
    template: '%s | MASU-STORE',
  },
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
  email: siteConfig.contactEmail,
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

      {children}
    </div>
  )
}
