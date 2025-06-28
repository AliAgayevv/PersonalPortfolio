/** @type {import('next').NextConfig} */
const mode = process.env.MODE || "development";

// Backend URL'leri
const imageHost = mode === "development" ? "localhost" : "45.85.146.73";
const port = mode === "development" ? "4000" : "5000";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: imageHost,
        port: port,
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
