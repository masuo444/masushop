import type { Metadata } from 'next'
import siteConfig from '@/lib/site-config'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'Contact — Custom Engraved Masu Quotes',
  description:
    'Request a quote for custom engraved hinoki masu cups. Corporate gifts, weddings and events. Laser engraving and branding from one piece. Worldwide shipping.',
  alternates: { canonical: `${baseUrl}/en/contact` },
}

export default function EnContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
