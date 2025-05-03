import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
