import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
