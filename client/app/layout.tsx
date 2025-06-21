import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import { ReactLenis } from "@/utils/smoothScroll";

const interFont = localFont({
  src: "../public/fonts/Inter.ttf",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aghayev.dev"), // Güncellendi
  title: {
    default: "Ali Aghayev - Frontend Developer | Baku, Azerbaijan",
    template: "%s | Ali Aghayev - Developer",
  },
  description:
    "Bakıda fəaliyyət göstərən peşəkar Next.js və React developer — Ali. TypeScript və Node.js üzrə ixtisaslaşmış veb proqramçı. Freelance veb development və modern frontend xidmətləri.",
  keywords: [
    "web developer Baku",
    "freelance web developer",
    "React developer Azerbaijan",
    "Next.js expert Baku",
    "TypeScript developer",
    "Node.js backend developer",
    "frontend developer Baku",
    "freelance frontend developer",
    "Next.js portfolio developer",
    "Azerbaijan software engineer",
  ],
  authors: [{ name: "Ali", url: "https://aghayev.dev" }], // Güncellendi
  creator: "Ali Aghayev",
  publisher: "Ali Aghayev",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    alternateLocale: "en_US",
    url: "https://aghayev.dev", // Güncellendi
    title: "Ali - Frontend Developer",
    description:
      "Bakıda fəaliyyət göstərən peşəkar Next.js və React developer — Ali. TypeScript və Node.js üzrə ixtisaslaşmış veb proqramçı. Freelance veb development və modern frontend xidmətləri.",
    siteName: "Ali Aghayev Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ali Aghayev - Frontend Developer",
      },
    ],
  },
  // Mixed Content sorununu çözmek için
  other: {
    "Content-Security-Policy": "upgrade-insecure-requests",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <head>
        {/* Mixed Content hatası için meta tag */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body className={`w-[90%] mx-auto ${interFont.className}`}>
        <ReactLenis root>
          <Navbar />
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
