import type { Metadata } from "next";
import Link from "next/link";
import WorkCard from "@/components/WorkCard";
import { disciplines, workProjects } from "@/lib/work";
import {
  normalizeWorkQuery,
  workQueryHref,
  type WorkSearchParams,
} from "@/lib/work-query";
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<WorkSearchParams>;
}): Promise<Metadata> {
  const { q, discipline, page } = normalizeWorkQuery(await searchParams);
  const canonical = workQueryHref("", discipline, page);
  return {
    title: `${discipline ? discipline + " work" : "Work · websites, products & media"}${page > 1 ? ` · page ${page}` : ""}`,
    description:
      "Explore grouped websites, digital builds, social creative, motion, editorial and concepts from Meow Creative Haus. Published work and draft studies are clearly labelled.",
    alternates: { canonical },
    openGraph: { url: canonical, images: ["/opengraph-image"] },
    ...(q ? { robots: { index: false, follow: true } } : {}),
  };
}
export default async function Work({
  searchParams,
}: {
  searchParams: Promise<WorkSearchParams>;
}) {
  const { q, discipline, page } = normalizeWorkQuery(await searchParams);
  const filtered = workProjects.filter(
    (p) =>
      (!discipline || p.disciplines.includes(discipline)) &&
      (!q ||
        `${p.name} ${p.description} ${p.disciplines.join(" ")}`
          .toLowerCase()
          .includes(q.toLowerCase())),
  );
  const pageSize = 12,
    pages = Math.ceil(filtered.length / pageSize),
    current = Math.min(page, Math.max(pages, 1));
  const href = (type?: string, n = 1) => {
    return workQueryHref(q, type, n);
  };
  return (
    <div className="portfolio-page">
      <div className="page-intro">
        <p className="eyebrow">The work, in context</p>
        <h1>
          Find your
          <br />
          <span>kind of thing.</span>
        </h1>
        <p>
          One place for each client, build or concept. Related formats sit
          together, with their status and sources close to the work.
        </p>
      </div>
      <form className="work-search" action="/work">
        <label htmlFor="work-query">Search projects</label>
        <div>
          <input
            id="work-query"
            type="search"
            name="q"
            defaultValue={q}
            placeholder="A client, project or format"
          />
          {discipline && (
            <input type="hidden" name="discipline" value={discipline} />
          )}
          <button type="submit">Search ↗</button>
        </div>
      </form>
      <nav className="filter-bar" aria-label="Filter by discipline">
        <Link href={href()} aria-current={!discipline ? "page" : undefined}>
          All work
        </Link>
        {disciplines.map((d) => (
          <Link
            key={d}
            href={href(d)}
            aria-current={discipline === d ? "page" : undefined}
          >
            {d}
          </Link>
        ))}
      </nav>
      <div className="collection-count">
        <p>
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          {discipline
            ? ` · ${discipline}`
            : " · All clients, builds & concepts"}
        </p>
        {q && (
          <Link href={discipline ? `/work?discipline=${discipline}` : "/work"}>
            Clear search ×
          </Link>
        )}
      </div>
      <div className="work-grid">
        {filtered
          .slice((current - 1) * pageSize, current * pageSize)
          .map((p) => (
            <WorkCard key={p.slug} project={p} />
          ))}
      </div>
      {!filtered.length && (
        <p className="empty-state">
          No projects match that search.{" "}
          <Link href="/work">Browse all work</Link>.
        </p>
      )}
      {pages > 1 && (
        <nav className="pagination" aria-label="Work collection pages">
          {Array.from({ length: pages }, (_, i) => (
            <Link
              key={i}
              href={href(discipline, i + 1)}
              aria-current={current === i + 1 ? "page" : undefined}
            >
              Page {i + 1}
            </Link>
          ))}
        </nav>
      )}
      <p className="section-note">
        Historical roster entries stay accessible. A logo-only record does not
        establish additional services or results.
      </p>
    </div>
  );
}
