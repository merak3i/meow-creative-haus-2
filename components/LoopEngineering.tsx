"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedTabs } from "@/components/AnimatedTabs";

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const readmePop = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 22, delay: 0.15 },
  },
};

// Each frame is a public-safe demo screen that keeps the product posture
// visible without exposing a client workflow or private operating model.
const FRAMES = [
  {
    id: "map",
    label: "01 / Map",
    src: "/screenshots/loop-ops/loop-ops-01-overview.svg",
    alt: "Loop Ops overview screen with a coordinator and four public demo lanes",
    note: "A bring-your-own registry becomes a readable loop map: coordinator, lanes, workers, gates, and current confidence.",
  },
  {
    id: "lanes",
    label: "02 / Lanes",
    src: "/screenshots/loop-ops/loop-ops-02-lanes.svg",
    alt: "Loop Ops lane board showing research, build, review, and ops tracks",
    note: "Lanes stay scannable when the loop grows. The worst state in a group remains visible until the evidence improves.",
  },
  {
    id: "inspector",
    label: "03 / Inspector",
    src: "/screenshots/loop-ops/loop-ops-03-inspector.svg",
    alt: "Loop Ops inspector with ownership, access, evidence, and not-verified fields",
    note: "Every node answers the same questions: owns what, touches what, verified when, and what was not verified.",
  },
  {
    id: "runs",
    label: "04 / Runs",
    src: "/screenshots/loop-ops/loop-ops-04-runs.svg",
    alt: "Loop Ops run timeline with token spend, wall-clock time, and evidence links",
    note: "Runs join time, cost, status, and evidence. Green is earned by artifacts, not optimism.",
  },
  {
    id: "mobile",
    label: "05 / Mobile",
    src: "/screenshots/loop-ops/loop-ops-05-mobile.svg",
    alt: "Loop Ops mobile screen with searchable lane cards and evidence states",
    note: "On small screens the canvas becomes searchable lane cards. Same model, less chrome.",
  },
];

function FrameContent({ frame }: { frame: (typeof FRAMES)[number] }) {
  return (
    <div className="flex flex-col">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frame.src}
        alt={frame.alt}
        className="mx-auto block h-auto max-h-[760px] w-auto max-w-full object-contain"
      />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-t border-surface-border">
        <p className="text-body-md text-text-muted max-w-[760px]">{frame.note}</p>
        <a
          href={frame.src}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-label-sm uppercase tracking-wider text-text-dim hover:text-accent-teal transition-colors duration-300"
        >
          Open full size →
        </a>
      </div>
    </div>
  );
}

export default function LoopEngineering() {
  const [readmeOpen, setReadmeOpen] = useState(false);

  return (
    <section id="loop-engineering" className="py-24 md:py-40 px-6 md:px-12">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1400px] mx-auto"
      >
        <motion.p
          variants={headerVariants}
          className="text-label-sm uppercase text-accent-teal tracking-[0.2em] mb-3"
        >
          Meow Ops / Loop Ops
        </motion.p>
        <motion.h2 variants={headerVariants} className="text-display-lg max-w-[820px] mb-4">
          Public loop operations for{" "}
          <span className="text-gradient-accent">agents that need receipts.</span>
        </motion.h2>
        <motion.p
          variants={headerVariants}
          className="text-body-md text-text-muted mb-12 max-w-[600px]"
        >
          Loop Ops is the Meow Ops surface for local agent work: map the lanes,
          inspect the handoffs, and make every status carry evidence. These
          screens use generic demo data from the same product posture, without
          exposing private client systems.
        </motion.p>

        {/* Magnified frame viewer */}
        <motion.div variants={headerVariants}>
          <AnimatedTabs
            tabs={FRAMES.map((frame) => ({
              id: frame.id,
              label: frame.label,
              content: <FrameContent frame={frame} />,
            }))}
          />
        </motion.div>

        {/* Small README — pops up beneath the explainer */}
        <motion.div
          variants={readmePop}
          className="mt-6 border border-surface-border bg-surface-elevated"
        >
          <button
            onClick={() => setReadmeOpen(!readmeOpen)}
            aria-expanded={readmeOpen}
            className="w-full flex items-center justify-between px-6 py-4 text-left group"
          >
            <span className="font-mono text-label-sm text-text-muted group-hover:text-accent-teal transition-colors duration-300">
              README.md
            </span>
            <span className="text-label-sm text-text-dim uppercase tracking-wider">
              {readmeOpen ? "− collapse" : "+ expand"}
            </span>
          </button>

          <div className="px-6 pb-2 font-mono text-[13px] leading-relaxed text-text-muted">
            <p>
              <span className="text-accent-teal"># Loop Ops</span> inside Meow Ops:
              a read-only loop visualizer for workbook-backed agent systems,
              local run history, and evidence-first review.
            </p>
          </div>

          {readmeOpen && (
            <div className="px-6 pb-6 font-mono text-[13px] leading-relaxed text-text-muted space-y-4 border-t border-surface-border pt-4">
              <p>
                <span className="text-text">## Why</span>
                <br />
                Agent loops fail quietly when ownership is vague. Loop Ops keeps
                lane, owner, dependency, status, and evidence visible in the same
                place, so confidence has to be earned.
              </p>
              <p>
                <span className="text-text">## How it works</span>
                <br />
                Bring your own workflow registry workbook or JSON export. The
                importer validates required columns, duplicate ids, and stale
                evidence before the canvas renders. Local APIs serve spec,
                status, and run history.
              </p>
              <p>
                <span className="text-text">## Run it</span>
              </p>
              <pre className="bg-surface border border-surface-border p-4 overflow-x-auto text-[12px]">
{`git clone https://github.com/merak3i/meow-ops
cd meow-ops && npm install
node sync/loop-ops-import.mjs --spec <YOUR_WORKBOOK.xlsx>
npm run dev`}
              </pre>
              <p>
                <span className="text-text">## Posture</span>
                <br />
                Public demo data only. Production writes stay disabled, local
                artifacts stay local, and private client loops stay out of the
                repository.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["React Flow", "Vite", "React", "exceljs", "Playwright", "MIT"].map((t) => (
                  <span key={t} className="text-label-sm text-text-dim border border-surface-border px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="https://github.com/merak3i/meow-ops"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 text-label-sm uppercase tracking-wider text-accent-gold border border-accent-gold/50 px-5 py-2.5 hover:border-accent-gold hover:bg-accent-gold/5 transition-all duration-300"
              >
                ★ Read the full README on GitHub
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
