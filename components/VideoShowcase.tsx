"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { clientVideos, siteConfig } from "@/lib/data";

// ─── Animation ──────────────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Sub-section definitions ─────────────────────────────────────────────────
//
//  Each entry maps to a filter key, a visible label, a short descriptor line,
//  and a longer body that renders beneath the active card.

const CATEGORIES = [
  {
    key:         "all",
    eyebrow:     "Full Portfolio",
    label:       "All Formats",
    descriptor:  "Every channel. Every medium.",
    body:        "From traditional video campaigns to AI-generated presenters and branded podcast series — the complete range of media we produce for clients.",
  },
  {
    key:         "Video Marketing",
    eyebrow:     "Video Marketing",
    label:       "Video Marketing",
    descriptor:  "Performance-driven. Conversion-focused.",
    body:        "Traditional video campaigns engineered around your funnel. Scripted for impact, produced with precision, and distributed to move audiences at every stage — awareness through acquisition.",
  },
  {
    key:         "AI Model",
    eyebrow:     "AI Media",
    label:       "AI Model",
    descriptor:  "No studio. No shoot days. Unlimited scale.",
    body:        "Synthetic AI presenters built to your exact brand voice and visual identity. Campaign-ready media delivered faster and at a fraction of traditional production cost — without sacrificing authority.",
  },
  {
    key:         "AI Podcast",
    eyebrow:     "AI Podcast",
    label:       "AI Podcast",
    descriptor:  "Authority, serialized and distributed.",
    body:        "AI-assisted branded podcast series engineered to position your company as the definitive voice in its category. Built for retention, optimised for every major distribution platform.",
  },
  {
    key:         "Audiocast",
    eyebrow:     "Audiocast",
    label:       "Audiocast",
    descriptor:  "Long-form audio. Expert positioning.",
    body:        "Branded audiocast series that go deep — interview-driven, research-backed, and distributed to the audiences that actually make buying decisions.",
  },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]["key"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toRailItem(v: (typeof clientVideos)[number]): FocusRailItem {
  return {
    id:          v.videoId,
    title:       v.client,
    description: v.description,
    meta:        v.tag || undefined,
    videoId:     v.videoId,
    imageSrc:    `https://i.ytimg.com/vi/${v.videoId}/maxresdefault.jpg`,
    href:        `https://www.youtube.com/watch?v=${v.videoId}`,
  };
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function VideoShowcase() {
  const [activeKey, setActiveKey] = useState<CategoryKey>("all");

  const activeCategory = CATEGORIES.find((c) => c.key === activeKey)!;

  const railItems: FocusRailItem[] = useMemo(() => {
    const source =
      activeKey === "all"
        ? clientVideos
        : clientVideos.filter((v) => v.tag === activeKey);
    return source.map(toRailItem);
  }, [activeKey]);

  return (
    <section id="client-videos" className="py-24 md:py-40 border-t border-surface-border">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >

        {/* ── Section header ── padded ─────────────────────────────────── */}
        <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-14">

          <motion.p
            variants={fadeUp}
            className="text-label-sm uppercase text-accent-teal tracking-[0.2em] mb-3"
          >
            Media Production
          </motion.p>

          <motion.h2 variants={fadeUp} className="text-display-lg max-w-[820px] mb-5">
            Content at{" "}
            <span className="text-gradient-accent">every frequency.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-body-md text-text-muted max-w-[620px] mb-14 leading-relaxed"
          >
            We produce across the full spectrum of modern media — performance-driven
            video campaigns, AI-generated brand presenters, and podcast series built
            to establish authority. Whatever your channel, whatever your audience,
            we engineer content that earns attention and converts it.
          </motion.p>

          {/* ── Sub-section selector cards ──────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeKey === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveKey(cat.key)}
                  className={[
                    "group relative text-left p-4 border transition-all duration-300 focus:outline-none",
                    isActive
                      ? "border-accent-teal bg-accent-teal/5"
                      : "border-surface-border hover:border-text-dim bg-transparent",
                  ].join(" ")}
                >
                  {/* Active indicator bar */}
                  <span
                    className={[
                      "absolute top-0 left-0 h-[2px] w-full transition-transform duration-300 origin-left",
                      isActive ? "bg-accent-teal scale-x-100" : "bg-accent-teal scale-x-0",
                    ].join(" ")}
                  />

                  <p
                    className={[
                      "text-[9px] uppercase tracking-[0.18em] mb-2 transition-colors duration-300",
                      isActive ? "text-accent-teal" : "text-text-dim",
                    ].join(" ")}
                  >
                    {cat.eyebrow}
                  </p>
                  <p
                    className={[
                      "text-[11px] font-semibold uppercase tracking-wide mb-1.5 transition-colors duration-300",
                      isActive ? "text-text" : "text-text-muted group-hover:text-text",
                    ].join(" ")}
                  >
                    {cat.label}
                  </p>
                  <p
                    className={[
                      "text-[10px] leading-relaxed transition-colors duration-300",
                      isActive ? "text-text-muted" : "text-text-dim group-hover:text-text-dim",
                    ].join(" ")}
                  >
                    {cat.descriptor}
                  </p>
                </button>
              );
            })}
          </motion.div>

          {/* ── Active sub-section body copy ─────────────────────────────── */}
          <motion.div variants={fadeUp} className="mt-5 min-h-[36px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeKey}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-xs text-text-dim max-w-[560px] leading-relaxed border-l-2 border-accent-teal/40 pl-4"
              >
                {activeCategory.body}
              </motion.p>
            </AnimatePresence>
          </motion.div>

        </div>

        {/* ── FocusRail — full bleed ────────────────────────────────────── */}
        {/* key=activeKey forces remount + index reset on filter change      */}
        <motion.div variants={fadeUp}>
          <FocusRail
            key={activeKey}
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
          <p className="text-body-md text-text-muted max-w-[460px]">
            Ready to produce content that moves your market?{" "}
            <span className="text-text">Let&apos;s build the campaign.</span>
          </p>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-accent-teal text-surface text-label-sm uppercase tracking-wider hover:bg-accent-teal/90 transition-colors duration-300"
          >
            Get a production brief →
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}
