"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { clientWebsites, siteConfig } from "@/lib/data";

// ─── Animation ──────────────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Data mapping ────────────────────────────────────────────────────────────

function toRailItem(site: (typeof clientWebsites)[number]): FocusRailItem {
  return {
    id:          site.name,
    title:       site.name,
    description: site.tagline,
    meta:        site.industry,
    imageSrc:    site.screenshot,
    href:        site.url,
    logoSrc:     site.logo || undefined,
    // no videoId — center-card click opens site URL via focus-rail's href fallback
  };
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function ClientWebsites() {
  const railItems: FocusRailItem[] = useMemo(
    () => clientWebsites.map(toRailItem),
    [],
  );

  return (
    <section id="client-sites" className="py-24 md:py-40 border-t border-surface-border">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Header — padded */}
        <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-12">
          <motion.p variants={fadeUp} className="text-label-sm uppercase text-accent-teal tracking-[0.2em] mb-3">
            Web Design
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-display-lg max-w-[760px] mb-4">
            Brands built{" "}
            <span className="text-gradient-accent">to convert.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-body-md text-text-muted max-w-[520px]">
            Fast, modern websites designed for clarity. Each one built to give clients
            a digital presence that earns trust on first load.
          </motion.p>
        </div>

        {/* FocusRail — full bleed */}
        <motion.div variants={fadeUp}>
          <FocusRail
            items={railItems}
            orientation="landscape"
            loop
            autoPlay={false}
            ctaLabel="Visit site"
          />
        </motion.div>

        {/* CTA — padded */}
        <motion.div
          variants={fadeUp}
          className="px-6 md:px-12 max-w-[1400px] mx-auto mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <p className="text-body-md text-text-muted max-w-[420px]">
            Need a site that works as hard as your team? We&apos;ll design, build, and ship it.
          </p>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-accent-teal text-surface text-label-sm uppercase tracking-wider hover:bg-accent-teal/90 transition-colors duration-300"
          >
            Start a project →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
