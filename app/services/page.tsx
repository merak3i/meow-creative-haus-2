import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Product, Web & AI Studio Services",
  description:
    "Explore product design, web development, interactive experiences, AI automation, and go-to-market systems from Meow Creative Haus in India.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Product, Web, AI & Experience Studio Services | Meow Creative Haus",
    description:
      "Product design, web development, interactive experiences, AI automation, and go-to-market systems built to ship.",
    url: "/services",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Meow Creative Haus product, web, and AI studio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product, Web, AI & Experience Studio Services | Meow Creative Haus",
    description:
      "Product design, web development, interactive experiences, AI automation, and go-to-market systems built to ship.",
    images: ["/opengraph-image"],
  },
};

const serviceDetails = [
  {
    slug: "interactive-experiences",
    eyebrow: "Interactive experiences",
    title: "Web experiences people remember and share",
    body: "We shape scroll-led stories, motion systems, and interactive web experiences around the idea a visitor needs to understand. The work combines narrative, interface design, and production implementation so the experience can move from concept to a live URL.",
    deliverables: [
      "Interactive landing pages",
      "Scroll and motion systems",
      "Campaign experiences",
      "Digital storytelling",
    ],
  },
  {
    slug: "product-web",
    eyebrow: "Product and web",
    title: "Websites and products designed to ship",
    body: "We design and build websites and digital products for founders and businesses that need a working system, not a static presentation. The engagement can cover information architecture, interface design, development, integrations, launch preparation, and iteration after release.",
    deliverables: [
      "Marketing websites",
      "Product interfaces",
      "Design and development",
      "Launch-ready integrations",
    ],
  },
  {
    slug: "ai-systems",
    eyebrow: "AI systems",
    title: "AI and automation wired into real workflows",
    body: "We build practical AI systems around the workflow they need to support. That includes multilingual assistants, agent-operated tools, automation layers, and internal control surfaces where evidence and human oversight matter as much as model output.",
    deliverables: [
      "Multilingual assistants",
      "Workflow automation",
      "Agent-operated tools",
      "Operational control surfaces",
    ],
  },
  {
    slug: "growth-systems",
    eyebrow: "Go-to-market systems",
    title: "Growth infrastructure connected to the work",
    body: "For teams that need distribution as well as delivery, we connect positioning, outreach, content, and pipeline operations to the product or website being launched. The goal is a repeatable operating system that the team can inspect and improve.",
    deliverables: [
      "Positioning and launch systems",
      "Organic content workflows",
      "Outreach operations",
      "Pipeline infrastructure",
    ],
  },
] as const;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Meow Creative Haus services",
  url: `${siteConfig.url}/services`,
  itemListElement: serviceDetails.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.eyebrow,
      description: service.body,
      url: `${siteConfig.url}/services#${service.slug}`,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <section className="px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-5 text-label-sm uppercase tracking-[0.2em] text-accent-teal">
            Services
          </p>
          <h1 className="max-w-[950px] text-display-xl">
            Product, web, and AI systems built to{" "}
            <span className="text-gradient-accent">ship.</span>
          </h1>
          <p className="mt-8 max-w-[760px] text-body-lg text-text-muted">
            Meow Creative Haus works across experience design, digital products,
            AI systems, and go-to-market infrastructure. Each engagement starts
            with the operating problem and ends with something the team can use,
            inspect, and improve.
          </p>
        </div>
      </section>

      <section className="border-t border-surface-border px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1200px] space-y-24">
          {serviceDetails.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="scroll-mt-28 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16"
            >
              <div>
                <span className="mb-4 block font-mono text-label-sm text-accent-teal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-label-sm uppercase tracking-[0.18em] text-text-dim">
                  {service.eyebrow}
                </p>
              </div>
              <div>
                <h2 className="max-w-[760px] text-display-lg">
                  {service.title}
                </h2>
                <p className="mt-6 max-w-[760px] text-body-lg text-text-muted">
                  {service.body}
                </p>
                <ul className="mt-8 grid gap-3 text-body-md text-text md:grid-cols-2">
                  {service.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="border-l border-accent-teal/60 pl-4"
                    >
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-surface-border px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-label-sm uppercase tracking-[0.2em] text-accent-teal">
              Start with the real constraint
            </p>
            <h2 className="max-w-[760px] text-display-lg">
              Bring the problem. We will map the smallest useful system.
            </h2>
          </div>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-text-dim px-6 py-3 text-label-sm uppercase tracking-widest text-text transition-all duration-300 hover:bg-text hover:text-surface"
          >
            Start on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
