import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import { ReactLenis } from "@/utils/smoothScroll";
// import Footer from "@/components/Footer";

const interFont = localFont({
  src: "../public/fonts/Inter.ttf",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aghayev.dev"),
  title: {
    default: "Ali Aghayev - Frontend Developer | Baku, Azerbaijan",
    template: "%s | Ali Aghayev - Developer",
  },
  description:
    "Bakıda fəaliyyət göstərən peşəkar Next.js və React developer — Ali. TypeScript və Node.js üzrə ixtisaslaşmış veb proqramçı. Freelance veb development və modern frontend xidmətləri.",
  keywords: [
    "əli ağayev",
    "ali aghayev",
    "web developer baku",
    "veb developer bakı",
    "freelance web developer",
    "freelance veb developer",
    "react developer azerbaijan",
    "react developer azərbaycan",
    "next.js expert baku",
    "next.js ekspert bakı",
    "typescript developer",
    "node.js backend developer",
    "frontend developer baku",
    "frontend developer bakı",
    "freelance frontend developer",
    "next.js portfolio developer",
    "azerbaijan software engineer",
    "azərbaycan proqramçı",
    "bakı proqramçı",
    "veb sayt hazırlayan",
    "sayt hazırlayan bakı",
    "react js developer",
    "javascript developer bakı",
  ],
  authors: [{ name: "Ali", url: "https://aghayev.dev" }],
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
    url: "https://aghayev.dev",
    title: "Ali - Frontend Developer",
    description:
      "Bakıda fəaliyyət göstərən peşəkar Next.js və React developer — Ali. TypeScript və Node.js üzrə ixtisaslaşmış veb proqramçı. Freelance veb development və modern frontend xidmətləri.",
    siteName: "Ali Aghayev Portfolio",
    images: [
      {
        url: "/og-image.jpg", // TODO: Update with actual image URL
        width: 1200,
        height: 630,
        alt: "Ali Aghayev  - Frontend Developer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <body className={`w-[90%] mx-auto  ${interFont.className}`}>
        <ReactLenis root>
          <Navbar />
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
