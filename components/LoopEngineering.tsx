"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Three.js canvas — client-only, no SSR.
const InfiniteGallery = dynamic(() => import("@/components/InfiniteGallery"), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] md:h-[560px] w-full flex items-center justify-center border border-surface-border bg-surface-elevated">
      <span className="text-label-sm text-text-dim uppercase tracking-[0.2em]">
        Warming up the loom…
      </span>
    </div>
  ),
});

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

const SHOTS = [
  { src: "/screenshots/loom/loom-01-hierarchy.png", alt: "The Loom — full 31-entity hierarchy on the canvas" },
  { src: "/screenshots/loom/loom-02-waves.png", alt: "The Loom — collapsible wave clusters keep a 22-node lane readable" },
  { src: "/screenshots/loom/loom-03-inspector.png", alt: "The Loom — inspector answering the four ownership and verification questions" },
  { src: "/screenshots/loom/loom-04-timeline.png", alt: "The Loom — run timeline with real session cost joined" },
  { src: "/screenshots/loom/loom-05-mobile.png", alt: "The Loom — mobile fallback with director cards and search" },
];

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
          Loop Engineering
        </motion.p>
        <motion.h2 variants={headerVariants} className="text-display-lg max-w-[760px] mb-4">
          The Loom — where{" "}
          <span className="text-gradient-accent">agent loops are woven.</span>
        </motion.h2>
        <motion.p
          variants={headerVariants}
          className="text-body-md text-text-muted mb-12 max-w-[560px]"
        >
          A read-only control room for a 31-entity AI loop architecture. One Excel
          master spec in, one living canvas out — every node says what it owns, what
          it can touch, and what was never verified. Scroll the gallery; hover a
          frame to make it wave.
        </motion.p>

        {/* Explainer carousel — annotated captures from the real product */}
        <motion.div variants={headerVariants} className="border border-surface-border bg-surface-elevated">
          <InfiniteGallery
            images={SHOTS}
            className="h-[480px] md:h-[560px] w-full"
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
              <span className="text-accent-teal"># The Loom</span> — n8n-style loop
              visualizer inside Meow Ops. 1 coordinator · 4 director lanes · 26 worker
              surfaces, imported from a spreadsheet that is treated as law.
            </p>
          </div>

          {readmeOpen && (
            <div className="px-6 pb-6 font-mono text-[13px] leading-relaxed text-text-muted space-y-4 border-t border-surface-border pt-4">
              <p>
                <span className="text-text">## Why</span>
                <br />
                Multi-agent systems fail quietly. The Loom makes the whole organism
                visible — statuses are operational, not decorative, and an empty
                evidence list renders &quot;treat with suspicion&quot;.
              </p>
              <p>
                <span className="text-text">## How it works</span>
                <br />
                A fail-loud importer converts the Excel master spec into local JSON
                (wrong surface count, duplicate keys, or missing columns abort with
                every violation named). React Flow renders the hierarchy; a local
                API serves spec, status, and run history; recorded runs join their
                real session costs.
              </p>
              <p>
                <span className="text-text">## Run it</span>
              </p>
              <pre className="bg-surface border border-surface-border p-4 overflow-x-auto text-[12px]">
{`git clone https://github.com/merak3i/meow-ops
cd meow-ops && npm install
node sync/loop-ops-import.mjs   # spreadsheet → canvas data
npm run dev                     # open /#/loop-ops`}
              </pre>
              <p>
                <span className="text-text">## Posture</span>
                <br />
                Read-only toward every production system. Loop data is local-only;
                the hosted demo deliberately ships an instructional empty state.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["React Flow", "Vite 8", "React 19", "exceljs", "Playwright 32/32", "MIT"].map((t) => (
                  <span key={t} className="text-label-sm text-text-dim border border-surface-border px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="https://github.com/merak3i/meow-ops#the-loom"
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
