import type { Metadata } from 'next'
import { Noto_Serif_JP } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import siteConfig from '@/lib/site-config'
import FloatingContactButton from '@/components/ui/FloatingContactButton'
import Analytics from '@/components/analytics/Analytics'

const notoSerifJP = Noto_Serif_JP({
  variable: '--font-serif-jp',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: '枡（ます・升・桝）の専門店 | 国産ヒノキ枡の購入・名入れ・オーダーメイド',
    template: '%s | 枡の専門店 MASU-STORE',
  },
  description: siteConfig.description,
  keywords: [
    '枡', '升', '桝', 'ます', '枡 購入', '枡 通販', '枡 販売',
    'ヒノキ枡', '檜枡', '名入れ枡', '枡 ギフト', '枡 プレゼント',
    '枡 オーダーメイド', '枡 名入れ', '枡 ノベルティ', '枡 記念品',
    '一合枡', '五勺枡', '八勺枡', '一升枡',
    '日本酒 枡', 'もっきり', '枡酒',
    '枡 法人', '枡 企業', '枡 OEM',
    '枡 結婚祝い', '枡 引き出物',
    '枡 節分', '枡 鏡開き',
    '枡 お手入れ', '枡 歴史', '枡 サイズ',
  ].join(','),
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: 'ja_JP',
    images: [{
      url: `${baseUrl}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: siteConfig.name,
    }],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
    languages: { ja: baseUrl, en: `${baseUrl}/en` },
  },
}

// Organization JSON-LD
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: siteConfig.name,
  description: siteConfig.description,
  url: baseUrl,
  brand: { '@type': 'Brand', name: 'MASU-STORE' },
  sameAs: [siteConfig.fomusOfficialUrl, siteConfig.fomusUrl],
  email: siteConfig.contactEmail,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: siteConfig.contactEmail,
    availableLanguage: ['Japanese', 'English'],
    areaServed: 'Worldwide',
  },
  foundingDate: '1950',
  slogan: '一三〇〇年の技、一つの枡に。',
  areaServed: 'JP',
  priceRange: '¥500-¥5,000',
  knowsAbout: ['枡', 'ヒノキ枡', '木製枡', '名入れ枡', '日本の伝統工芸'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '枡商品カタログ',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: '三勺枡', description: '54ml ヒノキ枡' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: '五勺枡', description: '100ml ヒノキ枡' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: '八勺枡', description: '144ml ヒノキ枡' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: '一合枡', description: '180ml ヒノキ枡' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: '二合半枡', description: '450ml ヒノキ枡' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: '五合枡', description: '900ml ヒノキ枡' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: '一升枡', description: '1800ml ヒノキ枡' } },
    ],
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${baseUrl}/#localbusiness`,
  name: 'FOMUS（フォーマス）',
  description: '国産ヒノキ枡の製造・販売。名入れ・オーダーメイド対応。',
  url: baseUrl,
  email: siteConfig.contactEmail,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'JP',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Japan',
  },
  priceRange: '¥500-¥5,000',
  knowsAbout: ['枡', 'ヒノキ枡', '木製枡', '名入れ枡', '日本の伝統工芸'],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: baseUrl,
  description: siteConfig.description,
  inLanguage: ['ja', 'en'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      </head>
      <body className={`${notoSerifJP.variable} antialiased`}>
        <Header />
        <main className="site-main">{children}</main>
        <FloatingContactButton />
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
