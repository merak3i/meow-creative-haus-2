import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";

const pagePath = "/ai-automation-digital-marketing-mangalore";

export const metadata: Metadata = {
  title: "AI Automation & Digital Marketing in Mangalore",
  description:
    "AI automation, product engineering, experience engineering, and AI-backed digital marketing from Meow Creative Haus in Mangalore.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title:
      "AI Automation & Digital Marketing in Mangalore | Meow Creative Haus",
    description:
      "Product and experience engineering with AI, data, and process at the center - connected to marketing that learns from real signals.",
    url: pagePath,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Meow Creative Haus AI automation and digital marketing studio in Mangalore",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Automation & Digital Marketing in Mangalore | Meow Creative Haus",
    description:
      "Product and experience engineering with AI, data, and process at the center.",
    images: ["/opengraph-image"],
  },
};

const tracks = [
  {
    id: "product-engineering",
    index: "01",
    title: "Product engineering",
    answer:
      "We turn an operating problem into software people can use. That can mean a customer-facing product, an internal control surface, a multilingual assistant, or the integrations that connect a new product to the rest of the business.",
    examples: [
      "Product strategy and information architecture",
      "Web apps, dashboards, and internal tools",
      "Integrations, permissions, and release workflows",
      "Instrumentation for what the product is doing",
    ],
  },
  {
    id: "experience-engineering",
    index: "02",
    title: "Experience engineering",
    answer:
      "We design the journey around the system: what a person sees, understands, trusts, and does next. The work can combine websites, motion, narrative, interfaces, conversion paths, and accessibility without separating design from implementation.",
    examples: [
      "Interactive and motion-led websites",
      "Customer journeys and conversion paths",
      "Interface systems and content structure",
      "Performance, accessibility, and launch QA",
    ],
  },
  {
    id: "ai-automation",
    index: "03",
    title: "AI, data, and process",
    answer:
      "AI is useful when it is attached to a real process, grounded in the right data, and observable when it acts. We build assistants, agents, routing, automation, and review surfaces with clear handoffs instead of treating a model response as the finished system.",
    examples: [
      "Multilingual assistants and knowledge workflows",
      "Agent-operated tasks with human checkpoints",
      "Lead, content, support, and operations automation",
      "Evidence, review, and exception handling",
    ],
  },
  {
    id: "ai-backed-marketing",
    index: "04",
    title: "AI-backed digital marketing",
    answer:
      "We connect the product or website to distribution. Signals from search, content, conversations, and conversion paths inform what gets made and what changes next. AI can accelerate research, variants, media, and reporting while people retain judgment and brand direction.",
    examples: [
      "Positioning, SEO, AEO, and GEO foundations",
      "Content systems and campaign variations",
      "AI presenters, podcasts, and video workflows",
      "Lead routing, reporting, and iteration loops",
    ],
  },
] as const;

const operatingLoop = [
  {
    index: "01",
    title: "Read the signal",
    body: "Start with customer questions, team friction, process delays, available data, and the behaviour already visible across the business.",
  },
  {
    index: "02",
    title: "Shape the system",
    body: "Decide what should be a product, an experience, an automation, a content operation, or a simpler process change.",
  },
  {
    index: "03",
    title: "Engineer the path",
    body: "Build the interface, data flow, integrations, controls, and human checkpoints needed to move from intent to action.",
  },
  {
    index: "04",
    title: "Distribute with context",
    body: "Connect search, content, social, outreach, and conversations to the actual system instead of running disconnected campaigns.",
  },
  {
    index: "05",
    title: "Keep the evidence",
    body: "Measure what happened, review exceptions, preserve useful proof, and use the result to decide the next iteration.",
  },
] as const;

const proof = [
  {
    label: "Product + controlled automation",
    title: "Patherle",
    body: "A WhatsApp-first AI business system for Indian MSMEs, shaped around multilingual workflows, controlled automation, and evidence before autonomy.",
    href: "https://www.patherle.com/",
  },
  {
    label: "AI operations + observability",
    title: "Meow Operations",
    body: "A local-first command deck for agent work, including token analytics, timelines, and a read-only view of multi-agent loops and their evidence.",
    href: "https://github.com/merak3i/meow-ops",
  },
  {
    label: "Enterprise AI experience",
    title: "BergLabs",
    body: "Public identity, platform storytelling, application pages, and a production website for enterprise AI operations and human-in-the-loop delivery.",
    href: "https://berglabs.ai/",
  },
  {
    label: "AI-backed marketing narrative",
    title: "Coastal Edge AI",
    body: "A predictive social media marketing experience organized around intent signals, dynamic creative, conversation AI, and a continuous learning loop.",
    href: "https://coastaledge.vercel.app/",
  },
  {
    label: "Experience engineering",
    title: "Websites across sectors",
    body: "Public website work spans aviation, early education, hospitality, professional services, AI, and founder-led businesses, with the system adapted to each audience.",
    href: "/lab",
  },
  {
    label: "AI-assisted media systems",
    title: "Campaign variations",
    body: "Public work includes AI presenters, branded podcast and audiocast formats, video marketing, article systems, and reusable content operations.",
    href: "/lab",
  },
] as const;

const faqs = [
  {
    question: "What AI automation services do you offer in Mangalore?",
    answer:
      "Meow Creative Haus builds multilingual assistants, workflow automation, agent-operated tools, lead and content operations, internal dashboards, and human-review systems. The exact solution depends on the process, available data, risk, and people involved. We begin with the operating problem rather than selling a fixed automation package.",
  },
  {
    question: "What is the difference between product engineering and experience engineering?",
    answer:
      "Product engineering builds the working system: its logic, data, interfaces, integrations, permissions, and release path. Experience engineering shapes how people understand and use that system across websites, content, interactions, and conversion journeys. Meow Creative Haus can deliver either discipline independently or connect them in one engagement.",
  },
  {
    question: "How is your digital marketing backed by AI?",
    answer:
      "AI can help interpret search and conversation signals, organize research, produce controlled creative variations, support content workflows, route leads, and improve reporting. It does not replace positioning, taste, consent, or business judgment. The marketing system stays connected to measurable customer actions and the product or service being offered.",
  },
  {
    question: "Can you connect marketing automation to our existing website or tools?",
    answer:
      "Yes. An engagement can connect forms, WhatsApp, email, CRM records, content operations, analytics, reporting, and internal review steps. We first inspect the current stack and data boundaries, then recommend the smallest useful integration. Existing tools are kept when they are fit for purpose instead of being replaced automatically.",
  },
  {
    question: "Will AI automation replace our team?",
    answer:
      "The goal is usually to remove repetitive handling, surface better context, and make important work easier to review. Decisions with commercial, legal, financial, safety, or relationship consequences should retain appropriate human oversight. We design the handoffs, approval points, and exception paths as part of the system.",
  },
  {
    question: "How does an AI, product, or marketing project begin?",
    answer:
      "We start with the outcome, current workflow, users, available data, existing tools, and known failure cases. The first recommendation identifies the smallest useful system, what can be proved quickly, what should remain manual, and how success will be measured. You can begin through WhatsApp or visit the Mangalore studio during listed hours.",
  },
] as const;

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${pagePath}/#webpage`,
      url: `${siteConfig.url}${pagePath}`,
      name: "AI Automation & Digital Marketing in Mangalore",
      description:
        "Product engineering, experience engineering, AI automation, and AI-backed digital marketing from Meow Creative Haus in Mangalore.",
      about: { "@id": `${siteConfig.url}/#studio` },
      inLanguage: "en-IN",
    },
    {
      "@type": "Service",
      "@id": `${siteConfig.url}${pagePath}/#service`,
      name: "AI automation and AI-backed digital marketing",
      serviceType: [
        "AI automation",
        "Product engineering",
        "Experience engineering",
        "Digital marketing",
        "SEO, AEO and GEO",
      ],
      provider: { "@id": `${siteConfig.url}/#studio` },
      areaServed: [
        {
          "@type": "City",
          name: "Mangalore",
        },
        {
          "@type": "Country",
          name: "India",
        },
      ],
      url: `${siteConfig.url}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}${pagePath}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.url}${pagePath}/#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "AI Automation & Digital Marketing in Mangalore",
          item: `${siteConfig.url}${pagePath}`,
        },
      ],
    },
  ],
};

export default function AiAutomationDigitalMarketingPage() {
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${siteConfig.location.streetAddress}, ${siteConfig.location.locality}, ${siteConfig.location.region} ${siteConfig.location.postalCode}`,
  )}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaGraph).replace(/</g, "\\u003c"),
        }}
      />

      <section className="px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-5 text-label-sm uppercase tracking-[0.2em] text-accent-teal">
            AI automation + digital marketing in Mangalore
          </p>
          <h1 className="max-w-[1050px] text-display-xl">
            AI, data, and process at the center.{" "}
            <span className="text-gradient-accent">
              Products and experiences around it.
            </span>
          </h1>
          <p className="mt-8 max-w-[820px] text-body-lg text-text-muted">
            Meow Creative Haus helps businesses design products, engineer
            digital experiences, automate real workflows, and connect the
            result to AI-backed marketing. Based in Mangalore, we work from the
            operating problem outward: data and process first, useful software
            next, then distribution that can learn from evidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-accent-teal bg-accent-teal px-6 py-3 text-label-sm uppercase tracking-widest text-surface transition-opacity hover:opacity-90"
            >
              Discuss the system
            </a>
            <a
              href="#what-we-do"
              className="inline-block border border-text-dim px-6 py-3 text-label-sm uppercase tracking-widest text-text transition-colors hover:bg-text hover:text-surface"
            >
              See what we do here
            </a>
          </div>
        </div>
      </section>

      <section
        id="what-we-do"
        className="border-t border-surface-border px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
            <div>
              <p className="text-label-sm uppercase tracking-[0.2em] text-accent-teal">
                What we do here
              </p>
            </div>
            <div>
              <h2 className="max-w-[820px] text-display-lg">
                We do not bolt AI onto the edge. We engineer the whole path.
              </h2>
              <p className="mt-7 max-w-[780px] text-body-lg text-text-muted">
                A website, product, automation, and marketing operation often
                fail for the same reason: each part was designed alone. We map
                how information enters, where judgment is needed, what the user
                experiences, how action moves downstream, and what evidence
                comes back. Then we build the smallest coherent system.
              </p>
            </div>
          </div>

          <div className="mt-20 space-y-20">
            {tracks.map((track) => (
              <article
                key={track.id}
                id={track.id}
                className="scroll-mt-28 grid gap-7 border-t border-surface-border pt-10 md:grid-cols-[0.75fr_1.25fr] md:gap-20"
              >
                <div>
                  <span className="font-mono text-label-sm text-accent-teal">
                    {track.index}
                  </span>
                  <h3 className="mt-4 text-display-md">{track.title}</h3>
                </div>
                <div>
                  <p className="max-w-[760px] text-body-lg text-text-muted">
                    {track.answer}
                  </p>
                  <ul className="mt-8 grid gap-3 text-body-md text-text md:grid-cols-2">
                    {track.examples.map((example) => (
                      <li
                        key={example}
                        className="border-l border-accent-teal/60 pl-4"
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-surface-border px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-5 text-label-sm uppercase tracking-[0.2em] text-accent-teal">
            The operating loop
          </p>
          <h2 className="max-w-[880px] text-display-lg">
            From signal to system to evidence - then around again.
          </h2>
          <p className="mt-6 max-w-[760px] text-body-lg text-text-muted">
            Marketing can reveal intent. Products can capture action.
            Operations can fulfill it. Data can show what failed. We connect
            those parts so the next decision is based on more than a campaign
            calendar or a model guess.
          </p>
          <ol className="mt-14 grid gap-5 md:grid-cols-5">
            {operatingLoop.map((step) => (
              <li
                key={step.index}
                className="border-t border-accent-teal/50 pt-5"
              >
                <span className="font-mono text-label-sm text-accent-teal">
                  {step.index}
                </span>
                <h3 className="mt-4 text-display-sm">{step.title}</h3>
                <p className="mt-3 text-body-md text-text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-surface-border px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-5 text-label-sm uppercase tracking-[0.2em] text-accent-teal">
            Work and variations
          </p>
          <h2 className="max-w-[800px] text-display-lg">
            The work changes shape. The center stays the same.
          </h2>
          <p className="mt-6 max-w-[760px] text-body-lg text-text-muted">
            These public examples span products, internal tools, enterprise AI
            stories, predictive marketing, websites, and AI-assisted media.
            They share one approach: understand the process, build the useful
            layer, and keep enough evidence to improve it.
          </p>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {proof.map((item) => (
              <a
                key={`${item.title}-${item.label}`}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group border border-surface-border p-7 transition-colors hover:border-accent-teal/50 md:p-9"
              >
                <p className="text-label-sm uppercase tracking-[0.16em] text-accent-teal">
                  {item.label}
                </p>
                <h3 className="mt-4 text-display-md transition-colors group-hover:text-accent-teal">
                  {item.title}
                </h3>
                <p className="mt-4 text-body-md text-text-muted">{item.body}</p>
                <span className="mt-7 inline-block text-label-sm uppercase tracking-widest text-text">
                  View public proof &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-surface-border px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-5 text-label-sm uppercase tracking-[0.2em] text-accent-teal">
            Questions businesses ask
          </p>
          <h2 className="max-w-[760px] text-display-lg">
            Direct answers before we design the solution.
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
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="mb-5 text-label-sm uppercase tracking-[0.2em] text-accent-teal">
              Start in Mangalore or remotely
            </p>
            <h2 className="max-w-[760px] text-display-lg">
              Bring the process that is slow, fragmented, or hard to see.
            </h2>
            <p className="mt-6 max-w-[720px] text-body-lg text-text-muted">
              We will map whether the right answer is product engineering,
              experience engineering, AI automation, AI-backed marketing, or a
              smaller process fix.
            </p>
          </div>
          <div className="border-l border-surface-border pl-6 md:pl-10">
            <p className="text-label-sm uppercase tracking-[0.16em] text-text-dim">
              Meow Creative Haus studio
            </p>
            <address className="mt-4 not-italic text-body-lg text-text">
              {siteConfig.location.streetAddress}
              <br />
              {siteConfig.location.locality}, {siteConfig.location.region}{" "}
              {siteConfig.location.postalCode}
              <br />
              India
            </address>
            <p className="mt-3 text-body-md text-text-muted">
              {siteConfig.location.hours}
            </p>
            <a
              href={`tel:${siteConfig.phone}`}
              className="mt-2 inline-block text-body-md text-text-muted transition-colors hover:text-accent-teal"
            >
              {siteConfig.phoneDisplay}
            </a>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-accent-teal px-5 py-3 text-label-sm uppercase tracking-widest text-accent-teal"
              >
                WhatsApp
              </a>
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-text-dim px-5 py-3 text-label-sm uppercase tracking-widest text-text"
              >
                Open map
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
