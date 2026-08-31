"use client";

// Ship log: the changelog block in MCH's language. Mono date rail, hairline
// separators, teal LATEST badge. Real entries, real dates; shipping cadence is
// the marketing.
import { motion } from "framer-motion";

interface ShipLogEntry {
  badge?: string;
  date: string;
  title: string;
  description: string;
}

const entries: ShipLogEntry[] = [
  {
    date: "AUG 31 2026",
    title: "v1.7.0: The Meow Ops mockups get replaced by the real thing",
    description:
      "Six captures from the running app take over the product carousel: Today, Ledger, Runs, Map, Sanctum, and mobile. The illustrated placeholders are gone. Live client sites move up to the top of the homepage so the first proof arrives before the first pitch, the founder section stops talking about multiplying ARR, and every em dash on the site has been retired.",
    badge: "LATEST",
  },
  {
    date: "AUG 31 2026",
    title: "v1.2.0: Meow Ops becomes an inbox",
    description:
      "Five surfaces: Today, Review, Ledger, Sanctum, Learn. The focus timer is a chip on every screen. Companion is gone. Learn mines concepts from sessions you already ran. Each card has a name, a short industry summary, a layman what-you-did line, a source, and an I get this mark. You search YouTube yourself. No school. No XP.",
  },
  {
    date: "JUL 19 2026",
    title: "v1.6.2: Builder's Journey opens",
    description:
      "Meow Ops gains a calm, private learning track from vibe-led exploration to first-principles craft: start anywhere, resume unfinished workshops, practise quick recall for up to 360 days, and progress only when real evidence supports it.",
  },
  {
    date: "JUL 18 2026",
    title: "v1.6.1: Project learning moves under owner control",
    description:
      "Evidence from Codex, Claude Code, Hermes, Antigravity, and Cursor now enters one private local plane. Meow Ops can propose reusable learning, but publication, agent distribution, and rollback remain owner-governed.",
  },
  {
    date: "JUL 16 2026",
    title: "v1.6.0: Record of Scrying Sanctum build and refinement",
    description:
      "A retrospective release record follows the Apr 12 to May 4 build from the first source-stat Sanctum through its WoW overhaul, Dalaran phases, citadel and floor refinements, Lich King pass, design-system freeze, modular extraction, and final visual and session-label polish.",
  },
  {
    date: "JUL 05 2026",
    title: "v1.5.1: The homepage stops bragging, starts proving",
    description:
      "The revenue-engineering pitch and its unverifiable stats retire. The hero leads with one honest line, we design and build software worth feeling. A Selected Work panel puts live projects up front (meow.wild, Patherle, EAASH, Coastal Edge), and the four offers become Experiences, Product & Web, AI Systems, and Growth. Every claim on the page is a link you can click.",
  },
  {
    date: "JUN 14 2026",
    title: "v1.5.0: The site learns to scroll",
    description:
      "A scroll-led rebuild. The hero assembles a live revenue dashboard as you descend, Loop Ops becomes a scroll-scrubbed walkthrough, and a smooth-scroll engine with a progress rail ties the page together. Space Grotesk lands in the product frames.",
  },
  {
    date: "JUN 13 2026",
    title: "v1.4.0: Loop Ops goes public",
    description:
      "Meow Ops opens up with a five-frame Loop Ops tour built from generic demo data and an evidence-first posture.",
  },
  {
    date: "JUN 13 2026",
    title: "v1.4.0: FILE // 003, Patherle partially declassified",
    description:
      "The AI business OS we're building in the dark gets a teaser page: five stills, gold [WITHHELD] bars, and a build log that says just enough.",
  },
  {
    date: "JUN 13 2026",
    title: "v1.4.0: Meow Ops becomes a control room",
    description:
      "Loop Ops ships inside Meow Ops with a generic workbook importer, local run timelines, and evidence-first node states.",
  },
  {
    date: "APR 15 2026",
    title: "v1.3.0: The Lab fills up",
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
        <motion.h2 variants={rowVariants} className="text-display-lg max-w-[700px] mb-5">
          What we shipped, <span className="text-gradient-accent">and when.</span>
        </motion.h2>
        <motion.p
          variants={rowVariants}
          className="text-body-md text-text-muted mb-10 max-w-[620px]"
        >
          Dated, specific, and occasionally unflattering. If a release was mostly
          us deleting our own copy, it says so.
        </motion.p>
        <motion.p
          variants={rowVariants}
          className="font-mono text-label-sm text-text-dim tracking-[0.12em] mb-8 max-w-[760px]"
        >
          VERSION KEY · major: architecture · minor: capability · patch: refinement
        </motion.p>

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
