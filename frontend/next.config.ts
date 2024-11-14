import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // For client-side requests (browser)
    PUBLIC_API_URL: 'http://localhost:80',
    // For server-side requests (Next.js server in Docker)
    INTERNAL_API_URL: 'http://backend'
  }
};

export default nextConfig;
