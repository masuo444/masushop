import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
