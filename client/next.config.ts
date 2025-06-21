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
    ],
  },
};

console.log(`Next.js Config - Mode: ${mode}, Image Host: ${imageHost}`);
module.exports = nextConfig;
