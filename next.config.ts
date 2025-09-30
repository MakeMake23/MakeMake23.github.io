import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
  },
  // Enable proper Turbopack configuration
  experimental: {
    // Turbopack is enabled by default in dev command
  },
  allowedDevOrigins: ["192.168.1.*", "*.ngrok.app", "*.ngrok-free.app"],
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
