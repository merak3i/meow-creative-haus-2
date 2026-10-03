import type { Metadata } from "next";
import Link from "next/link";
import WorkCard from "@/components/WorkCard";
import { getProject } from "@/lib/work";
import { siteConfig } from "@/lib/data";
export const metadata: Metadata = {
  title: "Lab · tools, motion & creative studies",
  description:
    "Meow Ops, silent DSR motion studies, original art, creative concepts and a public skills library. Explore the experiments and their current status.",
  alternates: { canonical: "/lab" },
  openGraph: { url: "/lab", images: ["/opengraph-image"] },
};
export default function Lab() {
  return (
    <div className="portfolio-page">
      <div className="page-intro">
        <p className="eyebrow">The Lab</p>
        <h1>
          A little room
          <br />
          <span>to explore.</span>
        </h1>
        <p>
          Tools, visual studies and experiments alongside the client work.
          Concepts stay labelled as concepts; a prototype is an invitation to
          look closer.
        </p>
      </div>
      <nav className="archive-strip" aria-label="Lab resources">
        <Link href="/lab/skills">Public skills library ↗</Link>
        <Link href="/updates">Build history ↗</Link>
        <a href={siteConfig.meowWild} target="_blank" rel="noreferrer">
          Explore meow.wild ↗
        </a>
      </nav>
      <div className="work-grid lab-work-grid">
        {[
          "meow-ops",
          "dil-se-rave",
          "mch-art",
          "patherle",
          "1clickwebsite-india",
          "meow-wild",
        ].map((slug) => (
          <WorkCard key={slug} project={getProject(slug)!} />
        ))}
      </div>
      <section id="loop-engineering" className="archive-strip">
        <Link href="/lab/archive#loop-engineering">
          Original Meow Ops walkthrough ↗
        </Link>
      </section>
      <section id="ship-log" className="archive-strip">
        <Link href="/updates">Complete release archive ↗</Link>
        <Link href="/lab/archive#ship-log">Historical release details ↗</Link>
      </section>
      <section id="client-videos" className="archive-strip">
        <Link href="/work?discipline=Motion">All video work ↗</Link>
      </section>
      <section id="client-shorts" className="archive-strip">
        <Link href="/work?discipline=Social">All short-form work ↗</Link>
      </section>
      <section id="patherle" className="archive-strip">
        <Link href="/work/patherle">Patherle build ↗</Link>
      </section>
      <section id="open-source" className="archive-strip">
        <Link href="/lab/archive">Historical Lab view ↗</Link>
      </section>
    </div>
  );
}
