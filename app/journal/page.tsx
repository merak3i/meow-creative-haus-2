import type { Metadata } from "next";
import Link from "next/link";
import { featuredArticles } from "@/lib/data";
export const metadata: Metadata = {
  title: "Journal & zine",
  description:
    "Studio notes, Tech / Misc / Larp zine, and the complete linked editorial portfolio. These permanent records remain discoverable without a live feed.",
  alternates: { canonical: "/journal" },
  openGraph: { url: "/journal", images: ["/opengraph-image"] },
};
export default function Journal() {
  return (
    <div className="portfolio-page">
      <div className="page-intro">
        <p className="eyebrow">Writing, collected</p>
        <h1>
          Notes from
          <br />
          <span>the workbench.</span>
        </h1>
        <p>
          Longer stories, dated studio notes and an independent zine. Permanent
          archive links keep the collection discoverable when a feed is
          unavailable.
        </p>
      </div>
      <div className="builds-grid journal-features">
        <Link className="build-card" href="/tech-misc-larp">
          <p className="eyebrow">Tech / Misc / Larp</p>
          <h3>The zine archive ↗</h3>
          <p>Issue 01, its reading links and the local archive.</p>
        </Link>
        <Link className="build-card" href="/studio-notes">
          <p className="eyebrow">Studio Notes</p>
          <h3>The issue archive ↗</h3>
          <p>
            Dated issues on websites, media, builds and lessons from the studio.
          </p>
        </Link>
      </div>
      <div className="archive-list">
        {featuredArticles.map((a) => (
          <article key={a.id}>
            <p className="eyebrow">
              {a.client}
              <br />
              {a.platform}
            </p>
            <div>
              <h2>
                <a href={a.href} target="_blank" rel="noreferrer">
                  {a.title} ↗
                </a>
              </h2>
              <p>{a.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
