"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { clientShorts, siteConfig, type ShortsGroup } from "@/lib/data";

// ─── Animation ──────────────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Filter tabs ─────────────────────────────────────────────────────────────

const TAGS = [
  { key: "all",              label: "All"              },
  { key: "Video Marketing",  label: "Video Marketing"  },
  { key: "AI Model",         label: "AI Model"         },
];

// ─── Desktop helpers ─────────────────────────────────────────────────────────

function toRailItems(groups: ShortsGroup[]): FocusRailItem[] {
  return groups.flatMap((g) =>
    g.shorts.map((s) => ({
      id:          s.videoId,
      title:       g.client,
      description: s.description,
      meta:        g.tag || undefined,
      videoId:     s.videoId,
      // hqdefault works for both regular uploads and Shorts
      imageSrc:    `https://i.ytimg.com/vi/${s.videoId}/hqdefault.jpg`,
      href:        `https://www.youtube.com/watch?v=${s.videoId}`,
    }))
  );
}

// ─── Mobile: paired company card ─────────────────────────────────────────────
//
//  Each card shows up to 2 portrait shorts from the same company side-by-side.
//  Tap a thumbnail to play inline; tap ✕ to close.

function MobileCompanyCard({ group }: { group: ShortsGroup }) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const pair = group.shorts.slice(0, 2);

  return (
    <div className="flex-shrink-0 w-[calc(100vw-2.5rem)] snap-center">
      {/* Client label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] uppercase tracking-[0.18em] text-text-dim font-medium">
          {group.client}
        </span>
        {group.tag && (
          <span className="text-[9px] text-accent-teal border border-accent-teal/30 px-1.5 py-0.5 leading-none">
            {group.tag}
          </span>
        )}
      </div>

      {/* Portrait pair */}
      <div className="flex gap-2">
        {pair.map((s) => (
          <div
            key={s.videoId}
            className="flex-1 relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900 border border-white/10"
          >
            {playingId === s.videoId ? (
              <>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${s.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={group.client}
                />
                <button
                  onClick={() => setPlayingId(null)}
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center"
                  aria-label="Stop video"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </>
            ) : (
              <>
                <img
                  src={`https://i.ytimg.com/vi/${s.videoId}/hqdefault.jpg`}
                  alt={group.client}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://i.ytimg.com/vi/${s.videoId}/mqdefault.jpg`;
                  }}
                />
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                {/* Play button */}
                <button
                  onClick={() => setPlayingId(s.videoId)}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="Play"
                >
                  <div className="w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <div
                      className="ml-0.5"
                      style={{
                        width: 0, height: 0,
                        borderTop:    "6px solid transparent",
                        borderBottom: "6px solid transparent",
                        borderLeft:   "10px solid #f5f5f5",
                      }}
                    />
                  </div>
                </button>
              </>
            )}
          </div>
        ))}

        {/* Spacer when a company has only 1 short, keeps visual balance */}
        {pair.length === 1 && <div className="flex-1" />}
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function ShortsShowcase() {
  const [activeTag, setActiveTag] = useState("all");

  const filteredGroups = useMemo(
    () => activeTag === "all"
      ? clientShorts
      : clientShorts.filter((g) => g.tag === activeTag),
    [activeTag],
  );

  const railItems = useMemo(() => toRailItems(filteredGroups), [filteredGroups]);

  return (
    <section id="client-shorts" className="py-24 md:py-40 border-t border-surface-border">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >

        {/* ── Header ── padded ─────────────────────────────────────────── */}
        <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-12">
          <motion.p
            variants={fadeUp}
            className="text-label-sm uppercase text-accent-teal tracking-[0.2em] mb-3"
          >
            Short-Form Content
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-display-lg max-w-[760px] mb-4">
            Every second of attention,{" "}
            <span className="text-gradient-accent">earned.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-body-md text-text-muted max-w-[560px] mb-8"
          >
            Vertical-first campaigns built for the scroll: platform-optimised,
            brand-consistent, and engineered for maximum retention in the formats
            your audience actually watches.
          </motion.p>

          {/* Filter pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTag(t.key)}
                className={[
                  "text-label-sm px-4 py-1.5 border transition-all duration-300",
                  activeTag === t.key
                    ? "border-accent-teal text-accent-teal bg-accent-teal/5"
                    : "border-surface-border text-text-dim hover:border-text-dim hover:text-text",
                ].join(" ")}
              >
                {t.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Desktop: FocusRail portrait, full bleed ──────────────────── */}
        <motion.div variants={fadeUp} className="hidden md:block">
          <FocusRail
            key={activeTag}
            items={railItems}
            orientation="portrait"
            loop
            autoPlay={false}
          />
        </motion.div>

        {/* ── Mobile: paired company cards, horizontal snap scroll ─────── */}
        <motion.div
          variants={fadeUp}
          className="md:hidden overflow-x-auto flex gap-4 px-6 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredGroups.map((g) => (
            <MobileCompanyCard key={`${g.client}-${activeTag}`} group={g} />
          ))}
        </motion.div>

        {/* ── CTA ── padded ─────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="px-6 md:px-12 max-w-[1400px] mx-auto mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <p className="text-body-md text-text-muted max-w-[440px]">
            Want short-form content that stops the scroll?{" "}
            <span className="text-text">We script, produce, and optimise for every platform.</span>
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
