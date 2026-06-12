"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { aiCampaigns, siteConfig } from "@/lib/data";

// ─── Animation ──────────────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Niche filter tabs ───────────────────────────────────────────────────────

const NICHES = [
  { key: "all",        label: "All"           },
  { key: "blockchain", label: "Blockchain"    },
  { key: "fitness",    label: "Fitness"       },
  { key: "security",   label: "Cybersecurity" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toRailItem(c: (typeof aiCampaigns)[number]): FocusRailItem {
  const isPlaceholder = c.videoId.startsWith("PLACEHOLDER");
  return {
    id:          c.videoId,
    title:       c.title,
    description: c.description,
    meta:        c.nicheLabel,
    videoId:     c.videoId,
    // thumbnail served from YouTube CDN — zero cost until play
    imageSrc:    isPlaceholder
      ? ""
      : `https://i.ytimg.com/vi/${c.videoId}/maxresdefault.jpg`,
    href: isPlaceholder
      ? undefined
      : `https://www.youtube.com/watch?v=${c.videoId}`,
  };
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function AIModelsShowcase() {
  const [activeNiche, setActiveNiche] = useState("all");

  const railItems: FocusRailItem[] = useMemo(() => {
    const source =
      activeNiche === "all"
        ? aiCampaigns
        : aiCampaigns.filter((c) => c.niche === activeNiche);
    return source.map(toRailItem);
  }, [activeNiche]);

  return (
    <section id="ai-models" className="py-24 md:py-40 border-t border-surface-border">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* ── Header + filter pills ── padded ──────────────────────────── */}
        <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-12">
          <motion.p
            variants={fadeUp}
            className="text-label-sm uppercase text-accent-teal tracking-[0.2em] mb-3"
          >
            AI Media
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-display-lg max-w-[760px] mb-4">
            The next medium{" "}
            <span className="text-gradient-accent">doesn&apos;t need a camera.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-body-md text-text-muted max-w-[560px] mb-8"
          >
            Synthetic AI presenters. No studio. No shoot days. No casting.
            Every brand voice, rendered on demand — indistinguishable from the real thing.
            This is how the next decade of advertising gets made.
          </motion.p>

          {/* Filter pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {NICHES.map((n) => (
              <button
                key={n.key}
                onClick={() => setActiveNiche(n.key)}
                className={[
                  "text-label-sm px-4 py-1.5 border transition-all duration-300",
                  activeNiche === n.key
                    ? "border-accent-teal text-accent-teal bg-accent-teal/5"
                    : "border-surface-border text-text-dim hover:border-text-dim hover:text-text",
                ].join(" ")}
              >
                {n.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── FocusRail — full bleed ────────────────────────────────────── */}
        {/* key=activeNiche forces remount + index reset on filter change   */}
        <motion.div variants={fadeUp}>
          <FocusRail
            key={activeNiche}
            items={railItems}
            orientation="landscape"
            loop
            autoPlay={false}
          />
        </motion.div>

        {/* ── CTA ── padded ─────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="px-6 md:px-12 max-w-[1400px] mx-auto mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <p className="text-body-md text-text-muted max-w-[420px]">
            Want AI media for your brand? We&apos;ll build the model, write the script,
            and ship the campaign.
          </p>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-accent-teal text-surface text-label-sm uppercase tracking-wider hover:bg-accent-teal/90 transition-colors duration-300"
          >
            Start a campaign →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
