import { NextResponse } from 'next/server'
import { masuSizes } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'

export async function GET() {
  const baseUrl = siteConfig.url

  const items = masuSizes.map((m) => `
    <item>
      <g:id>${m.id}</g:id>
      <g:title>${m.name} — 国産ヒノキ枡</g:title>
      <g:description>${m.name}（${m.reading}）。外寸${m.size}、容量${m.capacity}（${m.capacityNote}）。用途：${m.use}。国産ヒノキ（檜）製。名入れ対応。</g:description>
      <g:link>${baseUrl}/products#standard</g:link>
      <g:price>${m.priceFrom} JPY</g:price>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:brand>MASU-STORE</g:brand>
      <g:product_type>Home &amp; Garden &gt; Kitchen &amp; Dining &gt; Barware &gt; Sake Sets</g:product_type>
      <g:google_product_category>Kitchen &amp; Dining &gt; Barware</g:google_product_category>
      <g:material>Hinoki (Japanese Cypress)</g:material>
      <g:shipping>
        <g:country>JP</g:country>
        <g:service>Standard</g:service>
        <g:price>0 JPY</g:price>
      </g:shipping>
    </item>
  `).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${baseUrl}</link>
    <description>${siteConfig.description}</description>
    ${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
