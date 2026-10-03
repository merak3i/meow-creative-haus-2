import type { Metadata } from "next";
import Link from "next/link";
import { entries, releaseSlug } from "@/lib/updates";
export const metadata: Metadata = {
  title: "Updates & release archive",
  description:
    "The complete dated Meow Creative Haus release record, studio notes, zine and public skills library.",
  alternates: { canonical: "/updates" },
  openGraph: { url: "/updates", images: ["/opengraph-image"] },
};
export default function Updates() {
  return (
    <div className="portfolio-page">
      <div className="page-intro">
        <p className="eyebrow">The record stays</p>
        <h1>
          Updates
          <br />
          <span>&amp; releases.</span>
        </h1>
        <p>
          Original dates and descriptions remain part of this archive. These
          entries describe the state of the work at the time; they do not
          establish its current behaviour.
        </p>
      </div>
      <nav className="archive-strip" aria-label="Related archives">
        <Link href="/studio-notes-september-2026">
          September studio notes ↗
        </Link>
        <Link href="/tech-misc-larp">Zine archive ↗</Link>
        <Link href="/lab/skills">Public skills ↗</Link>
        <Link href="/journal">Writing ↗</Link>
      </nav>
      <div className="archive-list">
        {entries.map((entry, index) => (
          <article key={releaseSlug(entry, index)}>
            <p className="eyebrow">{entry.date}</p>
            <div>
              <h2>
                <Link href={`/updates/${releaseSlug(entry, index)}`}>
                  {entry.title} ↗
                </Link>
              </h2>
              <p>{entry.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
