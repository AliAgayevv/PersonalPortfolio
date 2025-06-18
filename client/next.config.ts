/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "45.85.146.73",
        port: "5000",
        pathname: "/**", // Tüm path'lere izin ver
      },
    ],
  },
};

module.exports = nextConfig;
