import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import { ReactLenis } from "@/utils/smoothScroll";

const interFont = localFont({
  src: "../public/fonts/Inter.ttf",
});

export const metadata: Metadata = {
  title: "Ali Aghayev",
  description: "Description of the website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-[90%] mx-auto ${interFont.className}`}>
        <ReactLenis root>
          <Navbar />
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
