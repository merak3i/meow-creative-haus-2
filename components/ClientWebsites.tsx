import Image from "next/image";
import { clientWebsites, siteConfig } from "@/lib/data";

export default function ClientWebsites() {
  return (
    <section
      id="client-sites"
      className="perforated-section border-t border-surface-border px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <div>
            <p className="mb-3 text-label-sm uppercase tracking-[0.2em] text-accent-teal">
              Web Design
            </p>
            <h2 className="mb-4 max-w-[760px] text-display-lg">
              Brands built <span className="text-gradient-accent">to convert.</span>
            </h2>
            <p className="max-w-[520px] text-body-md text-text-muted">
              Fast, modern websites designed for clarity. Each one built to give
              clients a digital presence that earns trust on first load.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clientWebsites.map((site) => (
            <a
              className="website-card group"
              href={site.url}
              key={site.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="website-browser-frame">
                <div className="website-browser-bar">
                  <span className="website-browser-dot" />
                  <span className="website-browser-dot" />
                  <span className="website-browser-dot" />
                  <span className="website-browser-domain">
                    {new URL(site.url).hostname}
                  </span>
                </div>
                <div className="website-card-image">
                  <Image
                    src={site.screenshot}
                    alt={`${site.name} live website`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1400px) 33vw, 25vw"
                  />
                </div>
              </div>
              <div className="website-card-copy">
                <div className="flex items-start justify-between gap-3">
                  <h3>{site.name}</h3>
                  <span className="website-card-arrow" aria-hidden="true">↗</span>
                </div>
                <p>{site.tagline}</p>
                <span className="website-card-live">Live website</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <p className="max-w-[420px] text-body-md text-text-muted">
            Need a site that works as hard as your team? We&apos;ll design, build,
            and ship it.
          </p>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-accent-teal text-surface text-label-sm uppercase tracking-wider hover:bg-accent-teal/90 transition-colors duration-300"
          >
            Start a project →
          </a>
        </div>
      </div>
    </section>
  );
}
