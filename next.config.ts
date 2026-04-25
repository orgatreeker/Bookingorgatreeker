import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fast.wistia.com",
      },
    ],
  },
};

export default nextConfig;
