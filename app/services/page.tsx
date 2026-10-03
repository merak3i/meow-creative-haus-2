import type { Metadata } from "next";
import Link from "next/link";
import FAQ from "@/components/FAQ";
import Authority from "@/components/Authority";
import { siteConfig } from "@/lib/data";
export const metadata: Metadata = {
  title: "Services · digital products & media",
  description:
    "Website and product design, branded media, interactive experiences, AI workflows and growth systems. Agree a practical scope with Meow Creative Haus.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", images: ["/opengraph-image"] },
};
const services = [
  {
    slug: "product-web",
    title: "Websites & digital products",
    description:
      "Information architecture, interface design, development and integrations. We can build a new site or improve an existing one while preserving its media, links and history.",
    deliverables:
      "Marketing websites / Product interfaces / Integrations / Launch preparation",
    work: "tender-moments",
  },
  {
    slug: "digital-media",
    title: "Media & visual stories",
    description:
      "Illustrations, social creative, editorial carousels and video shaped around the message. Related formats can share a visual direction, while the work’s publication status and source attribution stay clear.",
    deliverables:
      "Illustration / Campaign artwork / Social content / Editorial design / Video",
    work: "berglabs",
  },
  {
    slug: "interactive-experiences",
    title: "Interactive experiences",
    description:
      "Digital storytelling, campaign experiences and motion systems. We use interaction where it helps explain the idea, with readable content and usable controls on smaller screens and for visitors who prefer less motion.",
    deliverables:
      "Interactive landing pages / Motion systems / Campaign experiences",
    work: "dil-se-rave",
  },
  {
    slug: "ai-systems",
    title: "AI systems & workflows",
    description:
      "Assistants, agent-operated tools, automation and internal control surfaces. The starting point is the task and its failure cases. Human review and inspectable evidence remain part of delivery.",
    deliverables:
      "Workflow automation / Multilingual assistants / Internal tools / Review surfaces",
    work: "meow-ops",
  },
  {
    slug: "growth-systems",
    title: "Content & growth systems",
    description:
      "Positioning, organic content workflows, outreach operations and pipeline infrastructure connected to the website or product. We agree the scope and review process before setting up recurring work.",
    deliverables:
      "Positioning / Organic content workflows / Outreach operations / Pipeline infrastructure",
    work: "coastal-edge-ai",
  },
];
export default function Services() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Meow Creative Haus services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        url: `${siteConfig.url}/services#${s.slug}`,
        provider: { "@id": `${siteConfig.url}/#organization` },
      },
    })),
  };
  return (
    <>
      <div className="portfolio-page">
        <div className="page-intro">
          <p className="eyebrow">Services</p>
          <h1>
            Digital products.
            <br />
            <span>Stories that travel.</span>
          </h1>
          <p>
            Design, build and media can sit in one scope or start with one
            useful piece. We agree the brief, deliverables and review points
            before work begins.
          </p>
        </div>
        <div className="archive-list">
          {services.map((s, i) => (
            <article id={s.slug} key={s.slug}>
              <p className="eyebrow">0{i + 1} / Services</p>
              <div>
                <h2>{s.title}</h2>
                <p>{s.description}</p>
                <p>{s.deliverables}</p>
                <Link className="source-link" href={`/work/${s.work}`}>
                  See related work ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Authority />
      <FAQ />
      <section className="portfolio-section contact-section">
        <p className="eyebrow">Start with the brief</p>
        <h2>
          What needs
          <br />
          <span>to take shape?</span>
        </h2>
        <p>
          Send your goal, existing material and any constraints. We’ll use them
          to discuss a scope and a next step.
        </p>
        <Link className="button-primary" href="/#contact">
          Start a project ↗
        </Link>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
