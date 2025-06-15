import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
// import { ReactLenis } from "@/utils/smoothScroll";
// import Footer from "@/components/Footer";

const interFont = localFont({
  src: "../public/fonts/Inter.ttf",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourwebsite.com"), // TODO: Replace with your actual domain
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
  authors: [{ name: "Ali", url: "https://yourwebsite.com" }], // TODO: Replace with your actual name and URL
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
    url: "https://yourwebsite.com", // TODO: Replace with your actual URL
    title: "Ali - Frontend Developer",
    description:
      "Bakıda fəaliyyət göstərən peşəkar Next.js və React developer — Ali. TypeScript və Node.js üzrə ixtisaslaşmış veb proqramçı. Freelance veb development və modern frontend xidmətləri.",
    siteName: "Ali Aghayev Portfolio",
    images: [
      {
        url: "/og-image.jpg", // TODO: Replace with your actual image path
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
      <body className={`w-[90%] mx-auto ${interFont.className}`}>
        {/* <ReactLenis root> */}
        <Navbar />
        {children}
        {/* </ReactLenis> */}
      </body>
    </html>
  );
}
