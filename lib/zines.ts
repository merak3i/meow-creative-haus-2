export type ZineIssue = {
  slug: string;
  issue: string;
  title: string;
  eyebrow: string;
  description: string;
  publishedAt: string;
  displayDate: string;
  pageCount: number;
  cover: string;
  href: string;
};

export const zineIssues: ZineIssue[] = [
  {
    slug: "issue-01",
    issue: "Issue 01",
    title: "Rise of the AGI",
    eyebrow: "Sept 1-12, 2026 · the week AGI got declared",
    description:
      "A math problem died. Two Chinese labs got caught wearing Claude as a skinsuit. Twelve noisy days, arranged into 21 pages.",
    publishedAt: "2026-09-12T00:00:00+05:30",
    displayDate: "September 12, 2026",
    pageCount: 21,
    cover: "/tech-misc-larp/issue-01/page-01.webp",
    href: "/tech-misc-larp/issue-01",
  },
];

export const latestZineIssue = zineIssues[0];
