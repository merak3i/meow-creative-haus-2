import type { Metadata } from "next";
import ZineReader from "@/components/ZineReader";

export const metadata: Metadata = {
  title: "tech+misc larp issue 01: Rise of the AGI",
  description:
    "A 21-page, click-to-scroll zine about the September 2026 AI information onslaught, published by Meow Creative Haus.",
  alternates: {
    canonical: "/tech-misc-larp",
  },
  openGraph: {
    title: "tech+misc larp issue 01: Rise of the AGI",
    description:
      "Twenty-one pages from twelve noisy days in AI, presented as an interactive web zine.",
    url: "/tech-misc-larp",
    type: "article",
    publishedTime: "2026-09-12T00:00:00+05:30",
    images: [
      {
        url: "/tech-misc-larp/issue-01/page-01.webp",
        width: 1238,
        height: 1548,
        alt: "Rise of the AGI, issue 01 of tech+misc larp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "tech+misc larp issue 01: Rise of the AGI",
    description: "A click-to-scroll zine from Meow Creative Haus.",
    images: ["/tech-misc-larp/issue-01/page-01.webp"],
  },
};

export default function TechMiscLarpPage() {
  return <ZineReader />;
}
