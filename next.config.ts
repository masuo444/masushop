import type { NextConfig } from "next";

// 外部から読み込んでよいスクリプトは GA4 と Microsoft Clarity だけ。
// それ以外の場所から差し込まれたスクリプトや、他サイトへの埋め込み（クリックジャッキング）を拒否する
const contentSecurityPolicy = [
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
]

const nextConfig: NextConfig = {
  // 使っているフレームワーク名を応答に出さない（攻撃者に手がかりを与えない）
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    return [
      // /order-made と /order は /original に統合した（内容が重複していたため）
      { source: '/order-made', destination: '/original', permanent: true },
      { source: '/order', destination: '/original', permanent: true },
      // 2026-09: Googleが「クロール済み・インデックス未登録」と判定した薄い記事を、
      // 内容が重なる本ページへ統合（記事を増やす前に重複を減らす）
      { source: '/blog/masu-naire-guide', destination: '/products/engraving', permanent: true },
      { source: '/blog/masu-gift-guide', destination: '/gift', permanent: true },
      { source: '/blog/masu-novelty', destination: '/business/novelty', permanent: true },
      { source: '/blog/masu-wedding', destination: '/business/ceremony', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shop.fomus.co.jp',
      },
      {
        protocol: 'https',
        hostname: '*.fomus.co.jp',
      },
    ],
  },
};

export default nextConfig;
