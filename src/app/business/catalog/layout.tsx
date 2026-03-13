import type { Metadata } from 'next'
import siteConfig from '@/lib/site-config'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'PDFカタログ — 枡の商品・価格一覧',
  description:
    '枡の全商品ラインナップと数量別価格表をPDFカタログとしてご覧いただけます。印刷してご利用ください。',
  openGraph: {
    title: `PDFカタログ | ${siteConfig.name}`,
    description: '枡の全商品ラインナップと数量別価格表。印刷対応。',
    type: 'website',
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
  alternates: { canonical: `${baseUrl}/business/catalog` },
}

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
