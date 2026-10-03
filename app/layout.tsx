import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageMotion from "@/components/PageMotion";
import Analytics from "@/components/Analytics";
import { siteConfig } from "@/lib/data";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const siteDescription =
  "Digital products & media for founders and businesses. Websites, AI systems and visual stories, with support after launch.";

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.location.streetAddress,
  addressLocality: siteConfig.location.locality,
  addressRegion: siteConfig.location.region,
  postalCode: siteConfig.location.postalCode,
  addressCountry: siteConfig.location.country,
};

const openingHours = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: [
    "https://schema.org/Monday",
    "https://schema.org/Tuesday",
    "https://schema.org/Wednesday",
    "https://schema.org/Thursday",
    "https://schema.org/Friday",
    "https://schema.org/Saturday",
    "https://schema.org/Sunday",
  ],
  opens: "11:00",
  closes: "21:00",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Digital products & media | Meow Creative Haus",
    template: "%s | Meow Creative Haus",
  },
  description: siteDescription,
  applicationName: siteConfig.name,
  authors: [{ name: "Vismay Hegde", url: siteConfig.social.linkedinPersonal }],
  creator: "Meow Creative Haus",
  publisher: "Meow Creative Haus",
  category: "technology",
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? {
          other: {
            "msvalidate.01": process.env.BING_SITE_VERIFICATION,
          },
        }
      : {}),
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Digital products & media | Meow Creative Haus",
    description: siteDescription,
    url: "/",
    siteName: "Meow Creative Haus",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital products & media | Meow Creative Haus",
    description: siteDescription,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      address: postalAddress,
      founder: {
        "@type": "Person",
        name: "Vismay Hegde",
        url: siteConfig.social.linkedinPersonal,
      },
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.linkedinCompany,
        siteConfig.social.linkedinPersonal,
        siteConfig.social.twitter,
        siteConfig.social.github,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteDescription,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#studio`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteDescription,
      telephone: siteConfig.phone,
      address: postalAddress,
      openingHoursSpecification: openingHours,
      areaServed: [
        {
          "@type": "City",
          name: siteConfig.location.locality,
          containedInPlace: {
            "@type": "State",
            name: siteConfig.location.region,
          },
        },
        {
          "@type": "Country",
          name: "India",
        },
      ],
      provider: { "@id": `${siteConfig.url}/#organization` },
      serviceType: [
        "Product design and development",
        "Web design and development",
        "Interactive digital experiences",
        "Branded media, illustration and video",
        "AI systems and automation",
        "Go-to-market systems",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-surface text-text`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <Analytics />
        <PageMotion />
        <div>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
