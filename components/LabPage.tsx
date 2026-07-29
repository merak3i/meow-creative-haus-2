"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Bot, BrainCircuit, GitBranch, Network, ShieldCheck } from "lucide-react";
import { openSourceProjects } from "@/lib/data";
import ClientWebsites from "@/components/ClientWebsites";
import LoopEngineering from "@/components/LoopEngineering";
import PatherleTeaser from "@/components/PatherleTeaser";
import ShipLog from "@/components/ShipLog";
import VideoShowcase from "@/components/VideoShowcase";
import ShortsShowcase from "@/components/ShortsShowcase";

const FEATURES = [
  {
    icon: BarChart3,
    title: "Operations Analytics",
    desc: "Token spend, wall-clock time, session history, run evidence, and agent activity in one local control room.",
  },
  {
    icon: Network,
    title: "Project Learning Control Plane",
    desc: "Five agent sources feed a private evidence plane. Meow Ops proposes learning; only the owner can approve and publish it.",
  },
  {
    icon: BrainCircuit,
    title: "Builder's Journey",
    desc: "A calm learning track from vibe-led exploration to first principles, with resumable workshops and evidence-derived mastery.",
  },
  {
    icon: Bot,
    title: "Companion Project Intelligence",
    desc: "A persistent local partner that separates verified knowledge, known gaps, hypotheses, and blind spots before answering.",
  },
  {
    icon: GitBranch,
    title: "Native-Agent Context",
    desc: "Owner-approved learning reaches Codex, Claude Code, Hermes, Antigravity, and Cursor through guarded, rollback-ready adapters.",
  },
  {
    icon: ShieldCheck,
    title: "Local-First Privacy",
    desc: "Raw sessions, answers, paths, proof records, and project details stay private. The learning surface receives only approved concepts and aggregates.",
  },
];

const SPECS = [
  { label: "Evidence sources", value: "Codex · Claude Code · Hermes · Antigravity · Cursor" },
  { label: "Learning states", value: "Discovered → Practiced → Proven → Shipped" },
  { label: "Recall horizon", value: "1 to 360 days" },
  { label: "Governance", value: "Owner approval · one-use authorization · rollback" },
  { label: "Browser boundary", value: "Approved concepts + aggregate progress only" },
  { label: "Access", value: "MIT licensed · local-first · no account required" },
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
        <div className="mb-24">
          <p className="text-label-sm uppercase text-accent-teal tracking-[0.2em] mb-4">
            From the Lab
          </p>
          <h1 className="text-display-lg mb-6">
            Open tools for{" "}
            <span className="text-gradient-accent">the agentic age.</span>
          </h1>
          <p className="text-body-lg text-text-muted max-w-[580px]">
            Free, MIT-licensed, and designed for developers who want to understand
            what their AI is actually doing.
          </p>
        </div>

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
            <span className="text-[10px] text-text-dim border border-surface-border px-1.5 py-0.5">JUL 2026</span>
            <span className="text-[10px] text-accent-teal border border-accent-teal/30 px-1.5 py-0.5">LIVE · MIT</span>
          </div>
          <p className="text-sm text-text-muted mb-6">{project.tagline}</p>

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
        <a href="/" className="text-text underline underline-offset-4 hover:text-accent-teal transition-colors duration-300">
          Meow Creative Haus
        </a>{" "}
        · MIT License · Free forever
      </p>
    </main>
  );
}
