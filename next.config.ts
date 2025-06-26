import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/cv',
        destination: '/en/cv',
      },
    ];
  },
  // Enable proper Turbopack configuration
  experimental: {
    // Turbopack is enabled by default in dev command
  },
};

export default nextConfig;

