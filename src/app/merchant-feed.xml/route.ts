import siteConfig from '@/lib/site-config'
import { euProducts, SHIP_COUNTRIES, SHIPPING_EUR } from '@/lib/eu-order-products'

// Google Merchant Center 用の商品フィード（RSS 2.0）。欧州向けオンライン購入ページ（/en/order）の商品を掲載する。
export const dynamic = 'force-static'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function GET() {
  const base = siteConfig.url
  const items = euProducts
    .map((p) => {
      const shipping = SHIP_COUNTRIES.map(
        (c) =>
          `<g:shipping><g:country>${c}</g:country><g:service>EMS</g:service><g:price>${SHIPPING_EUR} EUR</g:price><g:min_handling_time>10</g:min_handling_time><g:max_handling_time>20</g:max_handling_time><g:min_transit_time>5</g:min_transit_time><g:max_transit_time>10</g:max_transit_time></g:shipping>`,
      ).join('')
      const title = `${p.schemaName.replace(' – ', ' – Plain ')}, handmade in Japan`
      const desc = `${p.desc} Plain Japanese hinoki cypress masu, ${p.ml} ml, ${p.size.join(' × ')} mm. Made to order in Ogaki, Japan (usually about 3 weeks). Ships by EMS to EU countries, Switzerland and Norway (flat €45 per order, 1–${p.max} cups). 14-day returns.`
      return `<item>
<g:id>EU-${p.id.toUpperCase()}</g:id>
<g:title>${esc(title)}</g:title>
<g:description>${esc(desc)}</g:description>
<g:link>${base}/en/order#${p.id}</g:link>
<g:image_link>${base}${p.image}</g:image_link>
<g:availability>in_stock</g:availability>
<g:price>${p.price} EUR</g:price>
<g:brand>MASU-STORE</g:brand>
<g:condition>new</g:condition>
<g:identifier_exists>no</g:identifier_exists>
<g:google_product_category>696</g:google_product_category>
<g:product_type>Home &amp; Garden &gt; Decor &gt; Japanese hinoki masu</g:product_type>
<g:material>Hinoki cypress</g:material>
<g:product_length>${p.size[0]} mm</g:product_length>
<g:product_width>${p.size[1]} mm</g:product_width>
<g:product_height>${p.size[2]} mm</g:product_height>
<g:max_handling_time>20</g:max_handling_time>
${shipping}
</item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>MASU-STORE – Buy plain masu online (Europe)</title>
<link>${base}/en/order</link>
<description>Handcrafted Japanese hinoki masu shipped to Europe.</description>
${items}
</channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
