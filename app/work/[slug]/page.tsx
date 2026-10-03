import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MediaGallery from "@/components/MediaGallery";
import { getProject, workProjects, projectCover } from "@/lib/work";
import { siteConfig } from "@/lib/data";
export function generateStaticParams() {
  return workProjects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params,
    p = getProject(slug);
  if (!p) return {};
  return {
    title: p.name + " · work",
    description: p.description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: p.name + " | Meow Creative Haus",
      description: p.description,
      url: `/work/${slug}`,
      images: [projectCover(p) ?? "/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: p.name,
      description: p.description,
      images: [projectCover(p) ?? "/opengraph-image"],
    },
  };
}
export default async function Case({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    p = getProject(slug);
  if (!p) notFound();
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${siteConfig.url}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: p.name,
        item: `${siteConfig.url}/work/${slug}`,
      },
    ],
  };
  return (
    <div className="portfolio-page case-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/work">Work</Link>
        <span>/</span>
        <span>{p.name}</span>
      </nav>
      <header className="case-intro">
        <p className="eyebrow">
          {p.disciplines.join(" / ") || "Historical roster"} · {p.status}
        </p>
        <h1>
          {p.name}
          <span>.</span>
        </h1>
        <p className="case-description">{p.description}</p>
      </header>
      <dl className="case-brief">
        <div>
          <dt>Brief</dt>
          <dd>{p.brief}</dd>
        </div>
        <div>
          <dt>Contribution</dt>
          <dd>{p.contribution}</dd>
        </div>
        <div>
          <dt>Deliverables & status</dt>
          <dd>
            {p.media.length} linked items · {p.status}. Individual publication
            and draft labels appear below.
          </dd>
        </div>
      </dl>
      {p.note && <p className="case-note">{p.note}</p>}
      {p.media.length ? (
        <MediaGallery media={p.media} />
      ) : (
        <p className="empty-state">
          This name remains in the historical client roster. Detailed
          deliverables have not been added to the public record.
        </p>
      )}
      <div className="case-end">
        <Link href="/work">← Back to all work</Link>
        <Link href="/#contact">Have a related brief? Start a project ↗</Link>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
