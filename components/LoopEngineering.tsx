"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { AnimatedTabs } from "@/components/AnimatedTabs";
import ScrollStage from "@/components/ScrollStage";
import PinnedPanels from "@/components/PinnedPanels";

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
      <div className="flex flex-col justify-between gap-3 border-t border-surface-border px-5 py-4 sm:flex-row sm:items-center">
        <p className="text-body-md max-w-[760px] text-text-muted">{frame.note}</p>
        <a
          href={frame.src}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-label-sm uppercase tracking-wider text-text-dim transition-colors duration-300 hover:text-accent-teal"
        >
          Open full size →
        </a>
      </div>
    </div>
  );
}

const HEADER = (
  <div className="mb-10">
    <p className="text-label-sm uppercase tracking-[0.2em] text-accent-teal mb-3">
      Meow Ops / Loop Ops
    </p>
    <h2 className="text-display-lg max-w-[820px] mb-4">
      Operations for agents that{" "}
      <span className="text-gradient-accent">stay in the loop.</span>
    </h2>
    <p className="text-body-md max-w-[620px] text-text-muted">
      Map the lanes, inspect the handoffs, and make every status carry evidence.
      Scroll to walk the loop — these screens use generic demo data from the same
      product posture, without exposing private client systems.
    </p>
  </div>
);

// ── Pinned, scroll-scrubbed sequence (default) ──────────────────────────────
function LoopScene({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const [active, setActive] = useState(0);

  // Panel settles flat in the first 18% of scroll; frames cycle across the rest.
  const panelProgress = useTransform(progress, [0, 0.18], [0, 1]);

  useMotionValueEvent(progress, "change", (v) => {
    const raw = (v - 0.12) / 0.86;
    const idx = Math.min(FRAMES.length - 1, Math.max(0, Math.floor(raw * FRAMES.length)));
    setActive(idx);
  });

  const frame = FRAMES[active];

  return (
    <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col justify-center px-6 md:px-12">
      {HEADER}

      {/* Frame stepper */}
      <div className="mb-5 flex flex-wrap gap-2">
        {FRAMES.map((f, i) => (
          <span
            key={f.id}
            className={`font-mono text-label-sm uppercase tracking-wider transition-colors duration-300 ${
              i === active ? "text-accent-teal" : "text-text-dim"
            }`}
          >
            {f.label}
            {i < FRAMES.length - 1 && <span className="ml-2 text-surface-border">/</span>}
          </span>
        ))}
      </div>

      <div className="w-full max-w-5xl">
        <PinnedPanels progress={panelProgress} reduced={reduced}>
          <div className="min-h-[300px] md:min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={frame.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <FrameContent frame={frame} />
              </motion.div>
            </AnimatePresence>
          </div>
        </PinnedPanels>
      </div>
    </div>
  );
}

// ── Collapsible README (rendered after the scene, normal flow) ──────────────
function LoopReadme() {
  const [open, setOpen] = useState(false);
  return (
    <section className="px-6 md:px-12 pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="border border-surface-border bg-surface-elevated">
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="group flex w-full items-center justify-between px-6 py-4 text-left"
          >
            <span className="font-mono text-label-sm text-text-muted transition-colors duration-300 group-hover:text-accent-teal">
              README.md
            </span>
            <span className="text-label-sm uppercase tracking-wider text-text-dim">
              {open ? "− collapse" : "+ expand"}
            </span>
          </button>

          <div className="px-6 pb-2 font-mono text-[13px] leading-relaxed text-text-muted">
            <p>
              <span className="text-accent-teal"># Loop Ops</span> inside Meow Ops:
              a read-only loop visualizer for workbook-backed agent systems, local
              run history, and evidence-first review.
            </p>
          </div>

          {open && (
            <div className="space-y-4 border-t border-surface-border px-6 pb-6 pt-4 font-mono text-[13px] leading-relaxed text-text-muted">
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
                evidence before the canvas renders. Local APIs serve spec, status,
                and run history.
              </p>
              <p>
                <span className="text-text">## Run it</span>
              </p>
              <pre className="overflow-x-auto border border-surface-border bg-surface p-4 text-[12px]">
{`git clone https://github.com/merak3i/meow-ops
cd meow-ops && npm install
node sync/loop-ops-import.mjs --spec <YOUR_WORKBOOK.xlsx>
npm run dev`}
              </pre>
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
                className="mt-2 inline-flex items-center gap-2 border border-accent-gold/50 px-5 py-2.5 text-label-sm uppercase tracking-wider text-accent-gold transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/5"
              >
                ★ Read the full README on GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function LoopEngineering() {
  const reduced = useReducedMotion();

  // Reduced motion → keep the original interactive tabs, no scrubbing.
  if (reduced) {
    return (
      <>
        <section id="loop-engineering" className="px-6 md:px-12 py-24 md:py-32">
          <div className="mx-auto max-w-[1400px]">
            {HEADER}
            <AnimatedTabs
              tabs={FRAMES.map((f) => ({
                id: f.id,
                label: f.label,
                content: <FrameContent frame={f} />,
              }))}
            />
          </div>
        </section>
        <LoopReadme />
      </>
    );
  }

  return (
    <>
      <ScrollStage id="loop-engineering" heightVh={360}>
        {(progress) => <LoopScene progress={progress} reduced={false} />}
      </ScrollStage>
      <LoopReadme />
    </>
  );
}
