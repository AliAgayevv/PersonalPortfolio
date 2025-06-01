import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Config for localhost:4000/uploads
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
