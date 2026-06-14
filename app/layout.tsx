import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Meow Creative Haus | AI-Driven Revenue Engineering",
  description:
    "We engineer AI-driven B2B & B2C acquisition systems that turn strangers into booked calls and locked Annual Recurring Revenue.",
  openGraph: {
    title: "Meow Creative Haus | AI-Driven Revenue Engineering",
    description:
      "We engineer AI-driven acquisition systems. Predictable growth. Zero BS.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-surface text-text">
        <Script
          src="https://www.patherle.com/patherle-pixel.js"
          data-tenant-id="9318a323-8e3f-4d5b-b664-050564c8bf42"
          strategy="afterInteractive"
        />
        <LenisProvider>
          <div className="grain-overlay" />
          <ScrollProgress />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
