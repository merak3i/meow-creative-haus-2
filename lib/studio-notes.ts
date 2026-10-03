export interface StudioNoteIssue {
  issue: string;
  title: string;
  description: string;
  publishedAt: string;
  href: string;
  cover: string;
  coverWidth: number;
  coverHeight: number;
}

// Add each published issue here; its existing permanent URL remains unchanged.
export const studioNoteIssues: StudioNoteIssue[] = [
  {
    issue: "01",
    title: "been building, forgot to write about it",
    description:
      "A few months of MCH, client work and the things still held together with WIP.",
    publishedAt: "2026-09-15",
    href: "/studio-notes-september-2026",
    cover: "/studio-notes/01-cover.webp",
    coverWidth: 1672,
    coverHeight: 941,
  },
];
