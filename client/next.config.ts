/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**", // Tüm path'lere izin ver
      },
    ],
  },
};

module.exports = nextConfig;
