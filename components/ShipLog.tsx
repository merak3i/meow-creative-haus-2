"use client";

// Ship log — the changelog block metamorphosed into MCH's language: mono date
// rail, hairline separators, teal LATEST badge. Real entries, real dates;
// shipping cadence is the marketing.
import { motion } from "framer-motion";

interface ShipLogEntry {
  badge?: string;
  date: string;
  title: string;
  description: string;
}

const entries: ShipLogEntry[] = [
  {
    date: "JUN 2026",
    title: "Loop Engineering goes live",
    description:
      "The Loom lands on this site: a magnified five-frame tour of our loop control room, under a new manifesto — we don't just run agents, we keep them honest.",
    badge: "LATEST",
  },
  {
    date: "JUN 2026",
    title: "FILE // 003 — Patherle, partially declassified",
    description:
      "The AI business OS we're building in the dark gets a teaser page: five stills, gold [WITHHELD] bars, and a build log that says just enough.",
  },
  {
    date: "JUN 2026",
    title: "Meow Ops becomes a control room",
    description:
      "The Loom ships inside Meow Ops — 31 entities woven from one spreadsheet, a fail-loud importer, run timelines that join real session costs.",
  },
  {
    date: "APR 2026",
    title: "v1.3 — The Lab fills up",
    description:
      "Client showcases, video and shorts carousels, and a marquee of brands built to convert.",
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function ShipLog() {
  return (
    <section id="ship-log" className="px-6 md:px-12 pb-24 md:pb-40">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.1 }}
        className="max-w-[1400px] mx-auto"
      >
        <motion.p
          variants={rowVariants}
          className="text-label-sm uppercase text-accent-teal tracking-[0.2em] mb-3"
        >
          Ship log
        </motion.p>
        <motion.h2 variants={rowVariants} className="text-display-lg max-w-[700px] mb-12">
          What we shipped, <span className="text-gradient-accent">and when.</span>
        </motion.h2>

        <div className="border-t border-surface-border">
          {entries.map((entry) => (
            <motion.div
              key={entry.title}
              variants={rowVariants}
              className="group grid md:grid-cols-[160px_1fr_auto] gap-2 md:gap-8 items-baseline py-7 border-b border-surface-border hover:bg-surface-elevated/60 transition-colors duration-500 px-2 md:px-4"
            >
              <span className="font-mono text-label-sm tracking-[0.2em] text-text-dim">
                {entry.date}
              </span>
              <div>
                <h3 className="text-display-md mb-1 group-hover:text-accent-teal transition-colors duration-300">
                  {entry.title}
                </h3>
                <p className="text-body-md text-text-muted max-w-[680px]">{entry.description}</p>
              </div>
              {entry.badge && (
                <span className="justify-self-start md:justify-self-end text-label-sm tracking-wider text-accent-teal border border-accent-teal/40 px-2 py-0.5">
                  {entry.badge}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
