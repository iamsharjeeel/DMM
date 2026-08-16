import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3t3ozftmdmh3i.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
