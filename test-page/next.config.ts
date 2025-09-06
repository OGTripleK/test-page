import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.146'],
  turbopack: {
    root: 'F:\\22Circles\\test-page',
  },
};

export default nextConfig;
