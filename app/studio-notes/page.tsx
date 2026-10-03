import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { studioNoteIssues } from "@/lib/studio-notes";

export const metadata: Metadata = {
  title: "Studio Notes · issue archive",
  description:
    "Dated issues from the Meow Creative Haus workbench: client work, media, builds and lessons. Every issue keeps its own permanent reading link.",
  alternates: { canonical: "/studio-notes" },
  openGraph: { url: "/studio-notes", images: ["/studio-notes/01-cover.webp"] },
};
export default function StudioNotes() {
  return (
    <div className="portfolio-page">
      <div className="page-intro">
        <p className="eyebrow">An irregular studio journal</p>
        <h1>
          Studio
          <br />
          <span>Notes.</span>
        </h1>
        <p>
          Work in progress, finished things and lessons from the studio. Each
          issue has a date and a permanent place in the archive.
        </p>
      </div>
      <div className="notes-issue-grid">
        {studioNoteIssues.map((note) => (
          <article className="notes-issue" key={note.href}>
            <Link href={note.href} className="notes-cover">
              <Image
                src={note.cover}
                alt={`Studio Notes Issue ${note.issue} cover`}
                width={note.coverWidth}
                height={note.coverHeight}
                sizes="(max-width:700px) 90vw, 44vw"
              />
            </Link>
            <p className="eyebrow">
              Issue {note.issue} ·{" "}
              <time dateTime={note.publishedAt}>
                {new Date(note.publishedAt + "T00:00:00Z").toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  },
                )}
              </time>
            </p>
            <h2>
              <Link href={note.href}>{note.title} ↗</Link>
            </h2>
            <p>{note.description}</p>
            <Link className="source-link" href={note.href}>
              Read issue {note.issue} ↗
            </Link>
          </article>
        ))}
      </div>
      <nav className="archive-strip" aria-label="Related archives">
        <Link href="/tech-misc-larp">Tech / Misc / Larp zine ↗</Link>
        <Link href="/journal">All writing ↗</Link>
        <Link href="/updates">Build history ↗</Link>
      </nav>
    </div>
  );
}
