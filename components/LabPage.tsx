"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, GraduationCap, Inbox, ShieldCheck, Swords, Wallet } from "lucide-react";
import { openSourceProjects } from "@/lib/data";
import ClientWebsites from "@/components/ClientWebsites";
import LoopEngineering from "@/components/LoopEngineering";
import PatherleTeaser from "@/components/PatherleTeaser";
import ShipLog from "@/components/ShipLog";
import VideoShowcase from "@/components/VideoShowcase";
import ShortsShowcase from "@/components/ShortsShowcase";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const FEATURES = [
  {
    icon: Inbox,
    title: "Today",
    desc: "What your agents did in this range. Sessions, tokens, cost, and where the work went.",
  },
  {
    icon: ClipboardCheck,
    title: "Review",
    desc: "Pending proposals and project evidence. Nothing applies until you say so.",
  },
  {
    icon: Wallet,
    title: "Ledger",
    desc: "Spend, tokens, and unattributed provider usage. Unmatched totals stay unmatched.",
  },
  {
    icon: Swords,
    title: "Sanctum",
    desc: "The same runs as a 3D scene. A room, not a sixth job.",
  },
  {
    icon: GraduationCap,
    title: "Learn",
    desc: "Concepts mined from sessions you already ran. Name, technical summary, what you did, source, I get this. No school. No XP.",
  },
  {
    icon: ShieldCheck,
    title: "Local-first",
    desc: "No required account. No telemetry. Raw sessions stay on the machine. MIT licensed.",
  },
];

const SPECS = [
  { label: "Surfaces", value: "Today · Review · Ledger · Sanctum · Learn" },
  { label: "Timer", value: "Chip on every screen. Not a page." },
  { label: "Evidence sources", value: "Codex · Claude Code · Hermes · Antigravity · Cursor" },
  { label: "Learn", value: "Inferred from real sessions. You search YouTube yourself." },
  { label: "Governance", value: "Owner approval. Nothing applies until you say so." },
  { label: "Access", value: "MIT licensed · local-first · no account required" },
];

const SHOTS = [
  { src: "/screenshots/loom/loom-01-hierarchy.png", alt: "Meow Ops Today", label: "Today" },
  { src: "/screenshots/loom/loom-02-waves.png", alt: "Meow Ops Review", label: "Review" },
  { src: "/screenshots/loom/loom-03-inspector.png", alt: "Meow Ops Ledger", label: "Ledger" },
  { src: "/screenshots/loom/loom-04-timeline.png", alt: "Meow Ops Sanctum", label: "Sanctum" },
  { src: "/screenshots/loom/loom-05-mobile.png", alt: "Meow Ops Learn", label: "Learn" },
];

const COMING = [
  "Run narratives: one plain English sentence per run, for example \"3 agents, 68% cache hit, clean run.\"",
  "Health score (0-100): efficiency, cache rate, ghost ratio and parallelism in one grade.",
  "Slug identities: consistent color and marker per agent name across every run.",
  "Constellation view: your runs as a star map. Efficiency on Y, time on X, cost as bubble size.",
];

export default function LabPage() {
  const [comingOpen, setComingOpen] = useState(false);
  const project = openSourceProjects[0];

  return (
    <main className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto">

        {/* Hero */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="mb-24">
          <motion.p variants={fadeUp} className="text-label-sm uppercase text-accent-teal tracking-[0.2em] mb-4">
            From the Lab
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-display-lg mb-6">
            Open tools for{" "}
            <span className="text-gradient-accent">the agentic age.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-body-lg text-text-muted max-w-[580px]">
            Free, MIT-licensed, and designed for developers who want to understand
            what their AI is actually doing.
          </motion.p>
        </motion.div>

        {/* Meow Ops project block */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="border border-surface-border bg-surface-elevated p-8 md:p-12 mb-24"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h2 className="text-lg font-semibold text-accent-teal">{project.name}</h2>
            <span className="text-[10px] text-text-dim border border-surface-border px-1.5 py-0.5">AUG 2026 · v1.2.0</span>
            <span className="text-[10px] text-accent-teal border border-accent-teal/30 px-1.5 py-0.5">LIVE · MIT</span>
          </div>
          <p className="text-sm text-text-muted mb-6">{project.tagline}</p>

          <div className="grid gap-3 mb-8 sm:grid-cols-2">
            {SHOTS.map((shot) => (
              <figure key={shot.src} className="border border-surface-border bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shot.src} alt={shot.alt} className="w-full h-auto" />
                <figcaption className="px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-text-dim">
                  {shot.label}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Feature columns */}
          <div className="grid gap-5 mb-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title}>
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center border border-surface-border bg-surface text-accent-teal">
                  <f.icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <h3 className="text-xs font-semibold mb-1">{f.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 border-y border-surface-border py-6">
            <p className="mb-4 text-[10px] uppercase tracking-[0.15em] text-text-dim">
              Features &amp; specs
            </p>
            <dl className="grid gap-x-8 gap-y-4 md:grid-cols-2">
              {SPECS.map((spec) => (
                <div key={spec.label} className="grid gap-1 sm:grid-cols-[130px_1fr]">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-text-dim">{spec.label}</dt>
                  <dd className="text-xs leading-relaxed text-text-muted">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Install block */}
          <p className="text-[10px] uppercase text-text-dim tracking-[0.15em] mb-2">
            Install in 2 minutes. No account needed
          </p>
          <div className="bg-surface border border-surface-border font-mono text-xs text-text-muted p-4 mb-5 overflow-x-auto">
            <p><span className="text-accent-teal">$</span> git clone https://github.com/merak3i/meow-ops.git</p>
            <p><span className="text-accent-teal">$</span> cd meow-ops &amp;&amp; npm install</p>
            <p><span className="text-accent-teal">$</span> node sync/export-local.mjs &amp;&amp; npm run dev</p>
          </div>
          <p className="text-[11px] text-text-dim mb-6">
            Open <span className="text-text-muted font-mono">http://localhost:5173</span>. Your sessions load immediately.
            Install as a desktop app from the Chrome address bar install icon.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-teal text-surface text-[11px] uppercase tracking-wider hover:bg-accent-teal/90 transition-colors duration-300"
            >
              Try demo →
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-accent-gold/50 text-accent-gold text-[11px] uppercase tracking-wider hover:border-accent-gold hover:bg-accent-gold/5 transition-all duration-300"
            >
              ★ Star on GitHub
            </a>
          </div>

          {/* What's coming */}
          <button
            onClick={() => setComingOpen((o) => !o)}
            className="flex items-center gap-2 text-[10px] uppercase text-text-dim hover:text-text transition-colors duration-300 tracking-wider mb-3"
          >
            <span>What&apos;s coming</span>
            <span
              className="transition-transform duration-300"
              style={{ display: "inline-block", transform: comingOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              ▾
            </span>
          </button>
          {comingOpen && (
            <ul className="space-y-2 border-l-2 border-surface-border pl-4">
              {COMING.map((item, i) => (
                <li key={i} className="text-xs text-text-muted">{item}</li>
              ))}
            </ul>
          )}
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="border border-surface-border bg-surface-elevated p-8 md:p-12 mb-24"
        >
          <p className="text-label-sm uppercase text-accent-teal tracking-[0.2em] mb-4">
            Field note
          </p>
          <h2 className="text-lg font-semibold mb-6">Sales loops that wait for a human</h2>
          <div className="space-y-4 text-sm text-text-muted leading-relaxed max-w-[640px]">
            <p>
              Marketing from this lab is a recurring loop. A signal comes in. Someone qualifies it.
              Proof is gathered from work that already exists locally. Outreach is drafted. Follow-up
              is queued. Nothing sends until a human approves the message.
            </p>
            <p>
              The same motion runs again next week. It is scored against the last run, then trimmed.
              One-off blasts skip that check, so they stay out.
            </p>
            <p>
              What gets measured is a reply, a meeting, or a close. Impression counts and list size
              are vanity unless they turn into one of those three.
            </p>
            <p>
              The useful output is a queue a person can empty, not a campaign that fires itself.
            </p>
          </div>
        </motion.article>

      </div>

      <PatherleTeaser />

      <LoopEngineering />

      <ShipLog />

      {/* Video Showcase Carousel — landscape, long-form */}
      <VideoShowcase />

      {/* Client Websites Carousel */}
      <ClientWebsites />

      {/* Shorts Showcase — portrait, vertical short-form */}
      <ShortsShowcase />

      <p className="px-6 md:px-12 pt-16 text-label-sm text-text-dim text-center">
        Powered by{" "}
        <a href="/" className="text-text-muted hover:text-accent-teal transition-colors duration-300">
          Meow Creative Haus
        </a>{" "}
        · MIT License · Free forever
      </p>
    </main>
  );
}
