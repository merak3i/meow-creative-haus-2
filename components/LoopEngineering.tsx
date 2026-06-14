"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        loading="lazy"
        className="mx-auto block h-auto max-h-[620px] w-auto max-w-full object-contain"
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

function LoopReadme() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-6 border border-surface-border bg-surface-elevated">
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
          <span className="text-accent-teal"># Loop Ops</span> inside Meow Ops: a
          read-only loop visualizer for workbook-backed agent systems, local run
          history, and evidence-first review.
        </p>
      </div>

      {open && (
        <div className="space-y-4 border-t border-surface-border px-6 pb-6 pt-4 font-mono text-[13px] leading-relaxed text-text-muted">
          <p>
            <span className="text-text">## Why</span>
            <br />
            Agent loops fail quietly when ownership is vague. Loop Ops keeps lane,
            owner, dependency, status, and evidence visible in the same place, so
            confidence has to be earned.
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
  );
}

export default function LoopEngineering() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Active frame = whichever card is most visible inside the horizontal track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.55) {
            const idx = Number((e.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { root: track, threshold: [0.55] },
    );
    Array.from(track.children).forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const scrollToFrame = (i: number) => {
    const track = trackRef.current;
    const clamped = Math.max(0, Math.min(FRAMES.length - 1, i));
    const child = track?.children[clamped] as HTMLElement | undefined;
    if (track && child) track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  };

  return (
    <section id="loop-engineering" className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 40 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p className="text-label-sm uppercase tracking-[0.2em] text-accent-teal mb-3">
            Meow Ops / Loop Ops
          </p>
          <h2 className="text-display-lg max-w-[820px] mb-4">
            Operations for agents that{" "}
            <span className="text-gradient-accent">stay in the loop.</span>
          </h2>
          <p className="text-body-md max-w-[620px] text-text-muted">
            Map the lanes, inspect the handoffs, and make every status carry
            evidence. Swipe through the loop — these screens use generic demo data
            from the same product posture, without exposing private client systems.
          </p>
        </motion.div>

        {/* Stepper + arrows */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Loop Ops frames">
            {FRAMES.map((f, i) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => scrollToFrame(i)}
                className={`border px-3 py-1.5 font-mono text-label-sm uppercase tracking-wider transition-colors duration-300 ${
                  i === active
                    ? "border-accent-teal/50 bg-accent-teal/10 text-accent-teal"
                    : "border-surface-border text-text-dim hover:text-text"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="hidden shrink-0 items-center gap-1 md:flex">
            <button
              onClick={() => scrollToFrame(active - 1)}
              disabled={active === 0}
              aria-label="Previous frame"
              className="grid h-9 w-9 place-items-center rounded-full border border-surface-border text-text-muted transition-colors hover:text-text disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToFrame(active + 1)}
              disabled={active === FRAMES.length - 1}
              aria-label="Next frame"
              className="grid h-9 w-9 place-items-center rounded-full border border-surface-border text-text-muted transition-colors hover:text-text disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll-snap carousel */}
        <div
          ref={trackRef}
          tabIndex={0}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FRAMES.map((f, i) => (
            <div key={f.id} data-index={i} className="w-full shrink-0 snap-start">
              <div className="overflow-hidden rounded-2xl border border-surface-border bg-surface-elevated">
                <FrameContent frame={f} />
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {FRAMES.map((f, i) => (
            <button
              key={f.id}
              onClick={() => scrollToFrame(i)}
              aria-label={`Go to ${f.label}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-accent-teal" : "w-1.5 bg-surface-border hover:bg-text-dim"
              }`}
            />
          ))}
        </div>

        <LoopReadme />
      </div>
    </section>
  );
}
