"use client";

// Ship log: the changelog block in MCH's language. Mono date rail, hairline
// separators, teal LATEST badge. Real entries, real dates; shipping cadence is
// the marketing.
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { entries } from "@/lib/updates";

const rowVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function ShipLog() {
  const releaseDialog = useRef<HTMLDialogElement>(null);

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
                {entry.href && (
                  <a
                    href={entry.href}
                    className="inline-block mt-3 text-sm text-accent-teal hover:text-text transition-colors duration-300"
                    aria-haspopup={entry.releaseDetails ? "dialog" : undefined}
                    onClick={entry.releaseDetails ? (event) => {
                      event.preventDefault();
                      releaseDialog.current?.showModal();
                    } : undefined}
                  >
                    {entry.releaseDetails ? "View build image and next steps ↗" : "Open the resource shelf →"}
                  </a>
                )}
                {entry.resources && (
                  <div className="mt-5" aria-label="Tools referenced in this release">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim mb-2">
                      Resource surfaces · full wordmarks
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 max-w-[840px]">
                      {entry.resources.map((resource) => (
                        <div
                          key={resource.name}
                          className="border border-surface-border bg-surface px-3 py-2.5"
                          title={`${resource.name}: ${resource.detail}`}
                        >
                          <span className="block text-sm font-semibold text-text leading-tight">
                            {resource.name}
                          </span>
                          <span className="block mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-accent-teal">
                            {resource.detail}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-[11px] text-text-dim max-w-[700px]">
                      Names identify the tools seen in the session; the release is independent and implies no endorsement.
                    </p>
                  </div>
                )}
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
      <dialog
        ref={releaseDialog}
        aria-labelledby="sanctum-release-title"
        className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto border border-surface-border bg-surface p-0 text-text backdrop:bg-black/75"
      >
        <div className="p-5 sm:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-teal">Meow Creative Haus Ship Log · v1.9.0</p>
              <h2 id="sanctum-release-title" className="mt-2 text-display-md text-text">Sanctum archive identity</h2>
            </div>
            <form method="dialog">
              <button className="border border-surface-border px-3 py-2 text-sm text-text-muted hover:text-text" aria-label="Close release details">
                Close
              </button>
            </form>
          </div>
          <Image
            src="/images/ship-log/meow-ops-sanctum-v1-9.jpg"
            alt="Meow Ops Sanctum early build: a civic archive atrium and session index with the distinct Archive Seal"
            width={1440}
            height={900}
            unoptimized
            className="mb-6 h-auto w-full border border-surface-border"
          />
          <div className="grid gap-5 text-sm leading-relaxed sm:grid-cols-3">
            <section>
              <h3 className="mb-1 font-semibold text-text">What changed</h3>
              <p className="text-text-muted">A civic archive atrium, a fictional archive worker, session-linked figures, and an authored Archive Seal. The preview uses synthetic sample data.</p>
            </section>
            <section>
              <h3 className="mb-1 font-semibold text-text">Still early</h3>
              <p className="text-text-muted">The scene is raw. The guide, movement, collisions, framing, and performance still need refinement.</p>
            </section>
            <section>
              <h3 className="mb-1 font-semibold text-text">Next</h3>
              <p className="text-text-muted">Explore a useful Krishna-inspired AI guide role while keeping its appearance original; improve character physics and movement; and decide whether opt-in, privacy-safe telemetry is useful before collecting anything. The longer-term aim is a cinematic, lived-in open-world RPG with shared-world scale.</p>
            </section>
          </div>
          <a
            href="https://meow-ops.vercel.app/#/sanctum"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm text-accent-teal hover:text-text"
          >
            Open Meow Ops Sanctum ↗
          </a>
        </div>
      </dialog>
    </section>
  );
}
