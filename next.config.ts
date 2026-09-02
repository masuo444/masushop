import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/order-made', destination: '/original', permanent: true },
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
