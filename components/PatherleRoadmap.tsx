"use client";

// Build-log timeline — metamorphosed from the 8bit changelog block into MCH's
// language: mono dates, hairline cards, gold status badges, no retro fonts.
// Entries tease capability without naming internals.
import { motion } from "framer-motion";

export interface RoadmapEntry {
  badge?: string;
  badgeTone?: "live" | "wip";
  date: string;
  title: string;
  description: string;
}

const entries: RoadmapEntry[] = [
  {
    date: "TODAY",
    title: "Live for early businesses",
    description:
      "Multilingual WhatsApp + voice commerce, catalogue, leads, campaigns, payments — already serving Indian MSMEs in production.",
    badge: "LIVE",
    badgeTone: "live",
  },
  {
    date: "IN THE LAB",
    title: "An agentic harness with trust gates",
    description:
      "Dozens of AI surfaces, each behind eval gates that remember every mistake. An assistant earns autonomy here — it is never given it.",
    badge: "WIP",
    badgeTone: "wip",
  },
  {
    date: "NEXT",
    title: "Genie stops suggesting and starts doing",
    description:
      "Catalogue fixes, campaign drafts, integration repair — executed end-to-end, human-approved, always reversible. The interesting part is [WITHHELD].",
    badge: "WIP",
    badgeTone: "wip",
  },
  {
    date: "SOON",
    title: "Loops watching loops",
    description:
      "The same machinery we showcase in Loop Engineering keeps Patherle's agents honest — a control room where every loop must show its evidence.",
    badge: "WIP",
    badgeTone: "wip",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function PatherleRoadmap() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.1 }}
      className="flex flex-col gap-4 max-w-[820px]"
    >
      {entries.map((entry) => (
        <motion.div
          key={entry.title}
          variants={cardVariants}
          className="group relative border border-surface-border bg-surface-elevated p-6 md:p-8 hover:border-text-dim transition-colors duration-500"
        >
          {entry.badge && (
            <span
              className={
                entry.badgeTone === "live"
                  ? "absolute top-4 right-4 text-label-sm tracking-wider text-accent-teal border border-accent-teal/40 px-2 py-0.5"
                  : "absolute top-4 right-4 text-label-sm tracking-wider text-accent-gold border border-accent-gold/40 px-2 py-0.5 animate-pulse"
              }
            >
              {entry.badge}
            </span>
          )}
          <p className="font-mono text-label-sm text-text-dim tracking-[0.2em] mb-2">{entry.date}</p>
          <h3 className="text-display-md mb-2 group-hover:text-accent-gold transition-colors duration-300">
            {entry.title}
          </h3>
          <p className="text-body-md text-text-muted max-w-[640px]">{entry.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
