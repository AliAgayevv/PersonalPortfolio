import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/private"],
      },
    ],
    sitemap: "http://localhost:3000/sitemap.xml", // TODO: Replace with your actual sitemap URL
  };
}
