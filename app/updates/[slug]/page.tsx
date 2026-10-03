import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { entries, releaseSlug } from "@/lib/updates";
export function generateStaticParams() {
  return entries.map((e, i) => ({ slug: releaseSlug(e, i) }));
}
const lookup = (slug: string) =>
  entries.find((e, i) => releaseSlug(e, i) === slug);
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params,
    e = lookup(slug);
  return e
    ? {
        title: e.title,
        description: e.description.slice(0, 170),
        alternates: { canonical: `/updates/${slug}` },
        openGraph: { url: `/updates/${slug}`, images: ["/opengraph-image"] },
      }
    : {};
}
export default async function Release({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    e = lookup(slug);
  if (!e) notFound();
  return (
    <div className="portfolio-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/updates">Updates</Link>
      </nav>
      <article className="update-body">
        <p className="eyebrow">{e.date} · Historical release record</p>
        <div className="case-intro">
          <h1>{e.title}</h1>
        </div>
        <p>{e.description}</p>
        {e.releaseDetails && (
          <Image
            src="/images/ship-log/meow-ops-sanctum-v1-9.jpg"
            alt="Meow Ops Sanctum archive identity, captured for the October 1 release"
            width={1200}
            height={800}
            sizes="(max-width:700px) 90vw, 800px"
          />
        )}
        {e.resources && (
          <ul>
            {e.resources.map((r) => (
              <li key={r.name}>
                {r.name}: {r.detail}
              </li>
            ))}
          </ul>
        )}
        {e.href && (
          <a className="source-link" href={e.href}>
            Original destination ↗
          </a>
        )}
        {e.releaseDetails && (
          <Link className="source-link" href="/lab#ship-log">
            Original detailed release view ↗
          </Link>
        )}
        <p className="case-note">
          This dated entry is preserved as written. Current capabilities and
          attribution are described on the relevant work page.
        </p>
      </article>
      <div className="case-end">
        <Link href="/updates">← All updates</Link>
      </div>
    </div>
  );
}
