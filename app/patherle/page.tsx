import type { Metadata } from "next";
import PatherleTease from "@/components/PatherleTease";

export const metadata: Metadata = {
  title: "Patherle: AI Business OS for Indian MSMEs",
  description:
    "Meet Patherle, a WhatsApp-first AI business OS for Indian MSMEs, built around controlled automation, multilingual workflows, and evidence before autonomy.",
  alternates: {
    canonical: "/patherle",
  },
  openGraph: {
    title: "Patherle: WhatsApp-First AI Business OS for Indian MSMEs",
    description:
      "A WhatsApp-first AI business OS built around controlled automation, multilingual workflows, and evidence before autonomy.",
    url: "/patherle",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Meow Creative Haus product, web, and AI studio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patherle: WhatsApp-First AI Business OS for Indian MSMEs",
    description:
      "Controlled automation and multilingual workflows for Indian MSMEs, with evidence before autonomy.",
    images: ["/opengraph-image"],
  },
};

export default function PatherlePage() {
  return <PatherleTease />;
}
