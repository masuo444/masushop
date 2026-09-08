import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /order-made と /order は /original に統合した（内容が重複していたため）
      { source: '/order-made', destination: '/original', permanent: true },
      { source: '/order', destination: '/original', permanent: true },
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
