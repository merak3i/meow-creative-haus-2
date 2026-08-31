"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Real captures from the running app. The loop map is imported from a public
// demo spec, and the aggregate screens are cropped above any per-client row, so
// nothing here exposes a client workflow.
const FRAMES = [
  {
    id: "today",
    label: "01 / Today",
    src: "/screenshots/meow-ops/meow-ops-01-summary.webp",
    width: 2000,
    height: 1150,
    alt: "Meow Ops Today screen showing sessions, tokens, cost, time, spend by source, tokens per day, and the tool mix",
    note: "Sessions, tokens, cost, and hours across every coding agent on the machine. Ghost rate sits next to the spend, so context you paid for and never used is impossible to miss.",
  },
  {
    id: "ledger",
    label: "02 / Ledger",
    src: "/screenshots/meow-ops/meow-ops-02-ledger.webp",
    width: 2000,
    height: 1100,
    alt: "Meow Ops Ledger screen with total spend, per active day, projected month, calendar periods, and cost curves",
    note: "The money view. Total spend, cost per active day, a projected month, and calendar periods that answer today, this week, and last month without a spreadsheet.",
  },
  {
    id: "runs",
    label: "03 / Runs",
    src: "/screenshots/meow-ops/meow-ops-04-runs.webp",
    width: 2000,
    height: 1250,
    alt: "Meow Ops Runs screen with a wall-clock timeline of parent runs and their subagents",
    note: "Every run on a wall-clock timeline, parents above their subagents. You can see where an hour went, which tools the agent reached for, and which launches produced nothing.",
  },
  {
    id: "map",
    label: "04 / Map",
    src: "/screenshots/meow-ops/meow-ops-03-map.webp",
    width: 2000,
    height: 977,
    alt: "Meow Ops Map screen showing a coordinator, directors, waves, and worker nodes imported from a demo spec",
    note: "A spreadsheet of agents becomes a readable graph: coordinator, directors, waves, workers, and the review state of each one. Production writes stay disabled until a human says otherwise.",
  },
  {
    id: "sanctum",
    label: "05 / Sanctum",
    src: "/screenshots/meow-ops/meow-ops-05-sanctum.webp",
    width: 2000,
    height: 1250,
    alt: "Meow Ops Sanctum screen rendering the same agent runs as a 3D scene",
    note: "The same runs, rendered as a scene you can orbit. It sounds like a toy until you spot the run that drifted, because the shape of a bad session reads faster than a table.",
  },
  {
    id: "mobile",
    label: "06 / Mobile",
    src: "/screenshots/meow-ops/meow-ops-06-mobile.webp",
    width: 900,
    height: 1884,
    alt: "Meow Ops on a phone-sized screen with stacked metric cards and spend by source",
    note: "On a phone the same numbers stack into cards and the chrome gets out of the way. Same data, no separate mobile build.",
  },
];

function FrameContent({ frame }: { frame: (typeof FRAMES)[number] }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center bg-surface p-2 sm:p-4">
        <Image
          src={frame.src}
          alt={frame.alt}
          width={frame.width}
          height={frame.height}
          sizes="(max-width: 768px) 100vw, 1200px"
          className="block h-auto max-h-[620px] w-auto max-w-full rounded-lg object-contain"
        />
      </div>
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
          <span className="text-accent-teal"># Meow Ops</span> reads the session
          files Codex, Claude Code, Cursor and Hermes already wrote to your disk,
          then turns them into spend, timelines, and loop evidence. Nothing
          leaves the machine.
        </p>
      </div>

      {open && (
        <div className="space-y-4 border-t border-surface-border px-6 pb-6 pt-4 font-mono text-[13px] leading-relaxed text-text-muted">
          <p>
            <span className="text-text">## Why</span>
            <br />
            Agent work fails quietly. Budget disappears into launches that never
            produced output, and loops go green while nobody can point at the
            artifact. Meow Ops keeps cost, ownership, status and evidence in the
            same place, so confidence has to be earned.
          </p>
          <p>
            <span className="text-text">## Run it</span>
          </p>
          <pre className="overflow-x-auto border border-surface-border bg-surface p-4 text-[12px]">
{`git clone https://github.com/merak3i/meow-ops
cd meow-ops && npm install
node sync/export-local.mjs
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
        {/* Under reduced motion the reveal collapses to its end state. Dropping
            initial/whileInView entirely would strand the server-rendered hidden
            styles at opacity 0. */}
        <motion.div
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={reduced ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p className="text-label-sm uppercase tracking-[0.2em] text-accent-teal mb-3">
            Meow Ops
          </p>
          <h2 className="text-display-lg max-w-[820px] mb-4">
            We ship with agents, so we built the{" "}
            <span className="text-gradient-accent">instrument panel.</span>
          </h2>
          <p className="text-body-md max-w-[680px] text-text-muted">
            Meow Ops is the control room we run every build through. Six real
            screens from the running app are below. The loop map is imported from
            a public demo spec and the money views are cropped above any client
            row, so you get the product, not our client list.
          </p>
        </motion.div>

        {/* Stepper + arrows */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Meow Ops frames">
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
        <div className="mt-4 flex items-center justify-center gap-1">
          {FRAMES.map((f, i) => (
            <button
              key={f.id}
              onClick={() => scrollToFrame(i)}
              aria-label={`Go to ${f.label}`}
              className={`grid h-11 w-11 place-items-center rounded-full transition-all duration-300 after:block after:h-1.5 after:rounded-full ${
                i === active
                  ? "after:w-6 after:bg-accent-teal"
                  : "after:w-1.5 after:bg-text-dim hover:after:bg-text-muted"
              }`}
            />
          ))}
        </div>

        <LoopReadme />
      </div>
    </section>
  );
}
