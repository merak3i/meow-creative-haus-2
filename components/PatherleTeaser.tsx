"use client";

// Homepage snippet: a slim classified-file band that routes to /patherle.
// One glance = something cutting-edge is assembling; one click = the tease.
import Link from "next/link";
import { motion } from "framer-motion";
import VectorField from "@/components/VectorField";

const rise = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function PatherleTeaser() {
  return (
    <section id="patherle" className="px-6 md:px-12 pb-24 md:pb-40">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={rise}
        className="max-w-[1400px] mx-auto"
      >
        <Link
          href="/patherle"
          className="group relative block border border-surface-border bg-surface-elevated overflow-hidden"
        >
          <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-700">
            <VectorField />
          </div>
          {/* Gold sweep on hover */}
          <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent-gold group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

          <div className="relative p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <div className="shrink-0 flex md:flex-col items-center md:items-start gap-3">
              <span className="font-mono text-label-sm tracking-[0.25em] text-text-dim">
                FILE // 003
              </span>
              <span className="text-label-sm tracking-wider text-accent-gold border border-accent-gold/40 px-2 py-0.5 animate-pulse">
                WIP
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-display-md mb-2 group-hover:text-accent-gold transition-colors duration-300">
                Patherle: an AI business OS assembling in our lab.
              </h3>
              <p className="text-body-md text-text-muted max-w-[620px]">
                WhatsApp-first. 22 languages. Live for early Indian businesses.
                The private automation layer stays{" "}
                <span className="font-mono text-accent-gold/90">[WITHHELD]</span>. Some
                public surfaces, we&apos;ll show you.
              </p>
            </div>
            <span className="shrink-0 text-label-sm uppercase tracking-wider text-text-dim group-hover:text-accent-gold transition-colors duration-300">
              Open the file →
            </span>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
