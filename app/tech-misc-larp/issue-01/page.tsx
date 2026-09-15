import type { Metadata } from "next";
import ZineReader from "@/components/ZineReader";
import { latestZineIssue } from "@/lib/zines";

export const metadata: Metadata = {
  title: "tech+misc larp issue 01: Rise of the AGI",
  description:
    "A 21-page, click-to-scroll zine about the September 2026 AI information onslaught, published by Meow Creative Haus.",
  alternates: {
    canonical: latestZineIssue.href,
  },
  openGraph: {
    title: "tech+misc larp issue 01: Rise of the AGI",
    description:
      "Twenty-one pages from twelve noisy days in AI, presented as an interactive web zine.",
    url: latestZineIssue.href,
    type: "article",
    publishedTime: latestZineIssue.publishedAt,
    images: [
      {
        url: latestZineIssue.cover,
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
    images: [latestZineIssue.cover],
  },
};

export default function TechMiscLarpIssueOnePage() {
  return <ZineReader />;
}
