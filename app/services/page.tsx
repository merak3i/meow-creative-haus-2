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

const faqs = [
  {
    question: "What does Meow Creative Haus build?",
    answer:
      "Meow Creative Haus designs and develops marketing websites, product interfaces, interactive web experiences, practical AI systems, workflow automation, and go-to-market infrastructure. The scope is shaped around the operating problem, with an emphasis on shipping a usable system rather than stopping at a strategy document or visual concept.",
  },
  {
    question: "Where is Meow Creative Haus based?",
    answer:
      "Meow Creative Haus is based in Mangalore, Karnataka, India. The studio works with local businesses as well as distributed teams elsewhere in India and internationally. Projects can be run remotely, with the working format and communication rhythm agreed during the initial scoping conversation.",
  },
  {
    question: "Can one engagement include strategy, design, and development?",
    answer:
      "Yes. A project can combine positioning, information architecture, interface design, implementation, integrations, launch preparation, and iteration. The exact mix depends on what already exists and what is blocking progress. Smaller engagements can focus on one layer when a complete end-to-end build is unnecessary.",
  },
  {
    question: "Does the studio build AI agents and automation?",
    answer:
      "Yes. The studio builds multilingual assistants, agent-operated tools, workflow automation, and internal control surfaces. The approach starts with the real workflow and its failure cases, then adds AI where it creates useful leverage. Human review and inspectable evidence remain part of the system when the work is consequential.",
  },
  {
    question: "How does a new project begin?",
    answer:
      "A project begins with the problem, the people affected, the current system, and the smallest useful outcome. After a short scoping conversation, Meow Creative Haus maps the recommended deliverable, boundaries, proof needed, and next step. You can start that conversation through WhatsApp or the contact details on this website.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <section className="perforated-section overflow-hidden px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44">
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
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-5 text-label-sm uppercase tracking-[0.2em] text-accent-teal">
            Frequently asked
          </p>
          <h2 className="max-w-[760px] text-display-lg">
            Direct answers before the first call.
          </h2>
          <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question}>
                <h3 className="text-display-sm text-text">{faq.question}</h3>
                <p className="mt-4 text-body-md text-text-muted">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
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
