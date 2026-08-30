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
              Since early July this lab has run two sales loops side by side. One sources accounts
              from a licensed people database and from public job posts. The other works
              connection requests, DMs, and posts: twenty unpersonalized connects a day to people
              already commenting on category threads, a four-step DM, a daily proof post, and two
              lead magnets a week. Both loops stop at a queue. A human sends every message.
            </p>
            <p>
              Signals start cheap. Company size, geography, role, and hiring news are enough for a
              first pass. A full dossier only happens after the account clears a written
              fit, timing, and intent threshold. On the network side, a comment on a category post
              is the warm signal. A one-word reply to a filter CTA is a hand raise. A comment on a
              magnet means send the resource and wait.
            </p>
            <p>
              Qualification is three numbers written down. Fit, timing, and intent each get a
              score. The message type follows the public surface. Teardown if the site is weak,
              audit if there is something specific to inspect, direct if the problem is already
              obvious. Connection lists get marked keep or skip before anyone is added. Magnets
              use disqualifying language so the wrong company size and role stay out.
            </p>
            <p>
              Proof comes from work that already shipped. A post needs a live URL, a screenshot,
              or a commit. Client numbers stay out unless that client signed off. Friday proof
              reloads every link the morning it goes out. If a URL is down, that line is cut.
              Teardown and opinion posts follow the same receipt rule. No receipt, no draft.
            </p>
            <p>
              Drafts follow a fixed week. Monday teardown, Wednesday build-in-public, Friday proof.
              Each slot gets three platform variants. Daily posts weave one proof point and end
              with a filter CTA: who this is for, what they are stuck on, and one word to reply.
              DMs stay four separate messages. First a greeting. Then one compliment tied to a
              checkable fact. Then one pain question that hangs. Then one observation a peer would
              nod at. They do not collapse into a single pitch. The next message waits for a reply
              unless a full kit was asked for.
            </p>
            <p>
              Follow-up sits in the same queue. After a connect is accepted, only the next message
              is written. After a magnet comment, the resource goes out with no pitch, then the
              same four-step sequence later. When impressions on a magnet slow, the same asset is
              reposted. Replies get a label and a next action. The labels are interested, objection,
              not now, unsubscribe, or auto. Nothing auto-replies. Unsubscribe never gets
              sequenced again.
            </p>
            <p>
              Nothing sends until a person approves it. The agent does not post, schedule, mail,
              or click connect. Remaining credits are checked before a batch so a run cannot blow
              a cap. Calendar swaps are proposed with one line of rationale. The calendar does not
              move until the operator says so.
            </p>
            <p>
              Each week the loop is scored against the last run. Correctness, craft, safety,
              whether it actually shipped, and whether anything was learned. A pass needs every
              dimension at least three, and at least one dimension better than last week, or a new
              failure class written down. A failed pass blocks the closeout. Thin motions get
              trimmed. One-off blasts skip that check, so they stay out.
            </p>
            <p>
              What gets counted is a reply, a meeting, or a close. The monthly bar is twenty
              qualified meetings. Accepts, impressions, and list size only matter as ratios into
              those three. If they do not turn into a reply, a meeting, or a close, they are vanity
              and they get cut.
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
        <a href="/" className="text-text underline underline-offset-4 hover:text-accent-teal transition-colors duration-300">
          Meow Creative Haus
        </a>{" "}
        · MIT License · Free forever
      </p>
    </main>
  );
}
