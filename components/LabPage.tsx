"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    icon: "📊",
    title: "Token Analytics",
    desc: "Cost by day, project, model, and session type. Ghost sessions flagged. Burn rate forecasted.",
  },
  {
    icon: "⚡",
    title: "Agent Ops",
    desc: "Wall-clock Gantt for subagent runs. Which agents overlapped. Output tokens per dollar — the number that matters.",
  },
  {
    icon: "🐱",
    title: "3D Companion",
    desc: "WebGL cat that physically evolves from your coding patterns. Tamagotchi mechanics. Permanent memory marks. Shareable card.",
  },
];

const COMING = [
  "Run narratives — one plain English sentence per run: \"3 agents, 68% cache hit, clean run.\"",
  "Health score (0–100): efficiency, cache rate, ghost ratio and parallelism in one grade.",
  "Slug identities — consistent color and emoji per agent name across every run.",
  "Constellation view — your runs as a star map. Efficiency on Y, time on X, cost as bubble size.",
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
          className="border border-surface-border bg-surface-elevated p-8 md:p-12 mb-8"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h2 className="text-lg font-semibold text-accent-teal">{project.name}</h2>
            <span className="text-[10px] text-text-dim border border-surface-border px-1.5 py-0.5">v1.3.0</span>
            <span className="text-[10px] text-accent-teal border border-accent-teal/30 px-1.5 py-0.5">LIVE · MIT</span>
          </div>
          <p className="text-sm text-text-muted mb-6">{project.tagline}</p>

          {/* Feature columns */}
          <div className="grid md:grid-cols-3 gap-5 mb-6 pb-6 border-b border-surface-border">
            {FEATURES.map((f) => (
              <div key={f.title}>
                <span className="text-base block mb-2">{f.icon}</span>
                <h3 className="text-xs font-semibold mb-1">{f.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Install block */}
          <p className="text-[10px] uppercase text-text-dim tracking-[0.15em] mb-2">
            Install in 2 minutes — no account needed
          </p>
          <div className="bg-surface border border-surface-border font-mono text-xs text-text-muted p-4 mb-5 overflow-x-auto">
            <p><span className="text-accent-teal">$</span> git clone https://github.com/merak3i/meow-ops.git</p>
            <p><span className="text-accent-teal">$</span> cd meow-ops &amp;&amp; npm install</p>
            <p><span className="text-accent-teal">$</span> node sync/export-local.mjs &amp;&amp; npm run dev</p>
          </div>
          <p className="text-[11px] text-text-dim mb-6">
            Open <span className="text-text-muted font-mono">http://localhost:5173</span>. Your sessions load immediately.
            Install as a desktop app via Chrome → address bar → install icon.
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
        <a href="/" className="text-text-muted hover:text-accent-teal transition-colors duration-300">
          Meow Creative Haus
        </a>{" "}
        · MIT License · Free forever
      </p>
    </main>
  );
}
