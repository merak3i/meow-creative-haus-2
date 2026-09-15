import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteConfig.url}/lab/skills`, lastModified: new Date("2026-09-15T00:00:00+05:30"), changeFrequency: "monthly", priority: 0.8 },
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/ai-automation-digital-marketing-mangalore`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/lab`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/patherle`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/tech-misc-larp`,
      lastModified: new Date("2026-09-12T00:00:00+05:30"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/tech-misc-larp/issue-01`,
      lastModified: new Date("2026-09-12T00:00:00+05:30"),
      changeFrequency: "yearly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
