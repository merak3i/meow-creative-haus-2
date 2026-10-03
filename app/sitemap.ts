import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";
import { workProjects } from "@/lib/work";
import { entries, releaseSlug } from "@/lib/updates";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...[
      "",
      "/services",
      "/work",
      "/lab",
      "/lab/archive",
      "/patherle",
      "/journal",
      "/studio-notes",
      "/updates",
    ].map((route) => ({
      url: siteConfig.url + route,
      lastModified: "2026-10-03",
      changeFrequency: "monthly" as const,
      priority: route ? 0.8 : 1,
    })),
    ...[
      { route: "/lab/skills", date: "2026-09-15" },
      { route: "/studio-notes-september-2026", date: "2026-09-15" },
      { route: "/tech-misc-larp", date: "2026-09-12" },
      { route: "/tech-misc-larp/issue-01", date: "2026-09-12" },
      {
        route: "/ai-automation-digital-marketing-mangalore",
        date: "2026-07-29",
      },
      { route: "/privacy", date: "2026-07-28" },
    ].map((p) => ({ url: siteConfig.url + p.route, lastModified: p.date })),
    ...workProjects.map((p) => ({
      url: `${siteConfig.url}/work/${p.slug}`,
      lastModified: p.modifiedAt,
    })),
    ...entries.map((e, i) => ({
      url: `${siteConfig.url}/updates/${releaseSlug(e, i)}`,
      lastModified: "2026-10-03",
    })),
  ];
}
