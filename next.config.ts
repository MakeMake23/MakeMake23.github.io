import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable proper Turbopack configuration
  experimental: {
    // Turbopack is enabled by default in dev command
  }
};

export default nextConfig;
