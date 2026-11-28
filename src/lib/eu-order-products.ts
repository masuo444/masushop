// 欧州向けオンライン購入（Stripe決済リンク）の商品データ。/en/order と Merchant Center 用フィード（/merchant-feed.xml）で共用。
// 送料€45の定額に収まるよう、1注文あたりの数量に上限を設けている。
export const SHIP_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
  'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'NO',
]
export const SHIPPING_EUR = '45.00'

export const euProducts = [
  {
    id: 'ichigo',
    tag: 'The Classic',
    name: 'Ichigo masu',
    ja: '一合枡',
    schemaName: 'Ichigo masu – Japanese hinoki wooden sake cup (180 ml)',
    alt: ['一合枡', '1-go masu'],
    ml: 180,
    size: [85, 85, 56],
    price: '15.20',
    max: 10,
    image: '/images/reasons/hinoki-masu.webp',
    imageAlt: 'Plain Ichigo masu, a square Japanese hinoki wooden sake cup with interlocking corners',
    desc: 'The standard sake cup — exactly one gō, the traditional Japanese measure. The most popular masu in Japan.',
    stripe: 'https://buy.stripe.com/7sY9AUa3bbA9d8w7M74ko0R',
  },
  {
    id: 'sanjaku',
    tag: 'The Jewel Box',
    name: 'Sanjaku mini masu',
    ja: '三勺枡',
    schemaName: 'Sanjaku mini masu – Japanese hinoki wooden cup (54 ml)',
    alt: ['三勺枡', '3-shaku masu', 'mini masu'],
    ml: 54,
    size: [56, 56, 39],
    price: '12.10',
    max: 20,
    image: '/images/purchase/plain-masu.webp',
    imageAlt: 'Plain hinoki masu in three sizes, with the small Sanjaku mini masu in front',
    desc: 'A miniature masu (the small one in front) — perfect for a small sip, a ring, or a shelf. A tiny object of Japanese craft.',
    stripe: 'https://buy.stripe.com/5kQ28s0sBeMl5G4c2n4ko0S',
  },
]

