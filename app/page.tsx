import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FAQ from "@/components/FAQ";
import WorkCard from "@/components/WorkCard";
import { featuredSlugs, getProject } from "@/lib/work";
import { siteConfig } from "@/lib/data";
export const metadata: Metadata = {
  title: { absolute: "Digital products & media | Meow Creative Haus" },
  description:
    "Websites, AI systems and visual stories for founders and businesses, with support after launch. Explore Meow Creative Haus work, builds and creative studies.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Digital products & media | Meow Creative Haus",
    images: ["/opengraph-image"],
  },
};
export default function Home() {
  const art =
    getProject("mch-art")?.media.find((m) => m.title.includes("room within")) ??
    getProject("mch-art")?.media[0];
  return (
    <>
      <section id="hero" className="portfolio-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Independent creative studio
          </p>
          <h1>
            Digital products
            <br />
            <span>&amp; media.</span>
          </h1>
          <p className="hero-description">
            Digital products &amp; media for founders and businesses. Websites,
            AI systems and visual stories, with support after launch.
          </p>
          <div className="hero-actions">
            <Link className="button-primary" href="/work">
              View work <span aria-hidden="true">↗</span>
            </Link>
            <a className="button-text" href="#contact">
              Start a project <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="hero-footnote">
            From the first sketch to the working thing.
          </p>
        </div>
        <div className="hero-art">
          {art?.src && (
            <Link href="/work/mch-art">
              <Image
                src={art.src}
                alt="Room within a face: an original purple abstract study"
                width={art.width}
                height={art.height}
                priority
                sizes="(max-width: 700px) 90vw, 46vw"
              />
              <span>
                Study in colour &amp; space <span aria-hidden="true">↗</span>
              </span>
            </Link>
          )}
          <div className="hero-art-label">
            <span>Meow Creative Haus</span>
            <span>Design / Build / Tell</span>
          </div>
        </div>
      </section>
      <section id="client-sites" className="portfolio-section">
        <div id="selected-work" className="section-heading">
          <div>
            <p className="eyebrow">A few good starting points</p>
            <h2>
              Different briefs.
              <br />
              Distinct identities.
            </h2>
          </div>
          <Link href="/work">Explore all work ↗</Link>
        </div>
        <div className="work-grid">
          {featuredSlugs.map((slug) => (
            <WorkCard key={slug} project={getProject(slug)!} featured />
          ))}
        </div>
        <p className="section-note">
          Related formats, context and publication status sit together inside
          each case.
        </p>
      </section>
      <section id="offers" className="portfolio-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What we can make together</p>
            <h2>The idea, made usable.</h2>
          </div>
          <Link href="/services">Services in detail ↗</Link>
        </div>
        <div className="service-grid">
          {[
            {
              title: "Websites & products",
              href: "/services#product-web",
              body: "Clear structure, expressive interfaces and working builds. New websites, product screens or a thoughtful refresh that keeps your existing content and links.",
            },
            {
              title: "Media & visual stories",
              href: "/services#digital-media",
              body: "Illustration, campaign artwork, editorial carousels and motion. A visual language that carries across the website, the feed and the next chapter.",
            },
            {
              title: "AI & workflows",
              href: "/services#ai-systems",
              body: "Assistants, automation and internal tools built around a real task. Human review stays part of the process, from factual checks to release decisions.",
            },
            {
              title: "Experiences & growth",
              href: "/services#growth-systems",
              body: "Interactive storytelling, positioning and content workflows. We connect the presentation with the way people find, understand and use the work.",
            },
          ].map((s, i) => (
            <article key={s.title}>
              <span className="service-number">0{i + 1}</span>
              <h3>
                <Link href={s.href}>{s.title} ↗</Link>
              </h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="patherle" className="portfolio-section builds-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Interfaces in progress</p>
            <h2>Builds.</h2>
          </div>
          <p>
            A closer look at purpose, workflow and the current state of each
            build.
          </p>
        </div>
        <div className="builds-grid">
          {["patherle", "1clickwebsite-india"].map((slug) => {
            const p = getProject(slug)!;
            return (
              <Link key={slug} href={`/work/${slug}`} className="build-card">
                <p className="eyebrow">{p.status}</p>
                <h3>
                  {p.name} <span aria-hidden="true">↗</span>
                </h3>
                <p>{p.description}</p>
                <span className="build-detail">
                  Explore the screens &amp; build notes
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section id="lab" className="portfolio-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Experiments & field notes</p>
            <h2>Still curious.</h2>
          </div>
          <Link href="/lab">Enter the Lab ↗</Link>
        </div>
        <div className="lab-links">
          <Link href="/work/dil-se-rave">
            <span className="eyebrow">Motion studies</span>
            <h3>DSR / Dil Se Rave ↗</h3>
            <p>
              Silent backdrop loops: chrome, contour fields and layered motion.
            </p>
          </Link>
          <Link href="/work/mch-art">
            <span className="eyebrow">Art collection</span>
            <h3>Colour, gesture, space ↗</h3>
            <p>
              Original abstract compositions and clearly labelled film-inspired
              studies.
            </p>
          </Link>
          <Link href="/work/meow-ops">
            <span className="eyebrow">Latest / 01 Oct 2026</span>
            <h3>Meow Ops: Sanctum ↗</h3>
            <p>
              An original archive identity and a public record of the build.
            </p>
          </Link>
        </div>
        <div id="ship-log" className="archive-strip">
          <Link id="loop-engineering" href="/lab#loop-engineering">
            Design &amp; build practice ↗
          </Link>
          <Link href="/updates">All releases &amp; updates ↗</Link>
          <Link href="/studio-notes-september-2026">
            September studio notes ↗
          </Link>
          <Link id="substack" href="/journal">
            Writing &amp; zine archive ↗
          </Link>
        </div>
      </section>
      <section id="authority" className="studio-note">
        <p>
          Meow Creative Haus is led by Vismay Hegde. Design, development and
          media stay close to the brief, with the work reviewed as it takes
          shape.
        </p>
        <a
          href={siteConfig.social.linkedinPersonal}
          target="_blank"
          rel="noreferrer"
        >
          Meet the person behind the work ↗
        </a>
      </section>
      <FAQ />
      <section id="contact" className="portfolio-section contact-section">
        <p className="eyebrow">Have something in mind?</p>
        <h2>
          Let’s make it
          <br />
          <span>worth exploring.</span>
        </h2>
        <p>
          Tell us what you need, who it is for and what already exists. A few
          clear sentences are enough to begin.
        </p>
        <div className="hero-actions">
          <a
            className="button-primary"
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            Start a project ↗
          </a>
          <a className="button-text" href={`mailto:${siteConfig.email}`}>
            Prefer email? ↗
          </a>
        </div>
      </section>
    </>
  );
}
