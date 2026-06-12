"use client";

// /patherle — the tease page. Classified-tech register: vector field, gold
// WIP pulse, scroll-tilt device reveal, five redacted stills, build-log.
// Shows just enough to sting; everything sensitive wears a [WITHHELD] bar.
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ContainerScroll";
import PatherleRoadmap from "@/components/PatherleRoadmap";
import VectorField from "@/components/VectorField";

const rise = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const STILLS = [
  { src: "/screenshots/patherle/patherle-02-genie.png", alt: "Patherle Genie workspace assistant — details withheld", w: 1552, h: 1047 },
  { src: "/screenshots/patherle/patherle-03-cockpit.png", alt: "Patherle multi-tenant cockpit — names withheld on purpose", w: 1552, h: 1047 },
  { src: "/screenshots/patherle/patherle-04-channels.png", alt: "Patherle connectivity — every channel, one pulse", w: 1552, h: 1047 },
  { src: "/screenshots/patherle/patherle-05-plans.png", alt: "Patherle plans — Haiku, Opus, Mythos", w: 1552, h: 1047 },
];

export default function PatherleTease() {
  return (
    <main className="relative bg-surface text-text overflow-hidden">
      <VectorField />

      {/* Hero */}
      <section className="relative pt-36 md:pt-48 px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12 }}
          className="max-w-[1400px] mx-auto"
        >
          <motion.div variants={rise} className="flex items-center gap-3 mb-4">
            <span className="font-mono text-label-sm tracking-[0.25em] text-text-dim">
              INTERNAL BUILD // 003
            </span>
            <span className="text-label-sm tracking-wider text-accent-gold border border-accent-gold/40 px-2 py-0.5 animate-pulse">
              WIP
            </span>
          </motion.div>
          <motion.h1 variants={rise} className="text-display-xl max-w-[900px] mb-6">
            The AI business OS we&apos;re building{" "}
            <span className="text-gradient-accent">in the dark.</span>
          </motion.h1>
          <motion.p variants={rise} className="text-body-md text-text-muted max-w-[560px]">
            Patherle runs real Indian businesses over WhatsApp today — 22 languages,
            voice, catalogue, payments. That part is public. The part where it starts
            running itself? That part is below, behind the gold bars.
          </motion.p>
        </motion.div>
      </section>

      {/* Scroll-tilt reveal — the public face */}
      <section className="relative -mt-16">
        <ContainerScroll
          titleComponent={
            <p className="font-mono text-label-sm tracking-[0.25em] text-text-dim mb-8">
              01 — THE FACE CUSTOMERS SEE
            </p>
          }
        >
          <Image
            src="/screenshots/patherle/patherle-01-face.png"
            alt="patherle.com — AI that actually speaks their language"
            width={1552}
            height={1166}
            className="h-full w-full object-cover object-top"
            priority
          />
        </ContainerScroll>
      </section>

      {/* The classified stills */}
      <section className="relative px-6 md:px-12 pb-10 -mt-40 md:-mt-64">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-16">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={rise}
            className="font-mono text-label-sm tracking-[0.25em] text-text-dim"
          >
            02—05 · INSIDE THE MACHINE <span className="text-accent-gold">[PARTIALLY DECLASSIFIED]</span>
          </motion.p>
          {STILLS.map((s) => (
            <motion.div
              key={s.src}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={rise}
              className="border border-surface-border bg-surface-elevated"
            >
              <Image src={s.src} alt={s.alt} width={s.w} height={s.h} className="w-full h-auto" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Build log */}
      <section className="relative px-6 md:px-12 py-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={rise}
            className="text-label-sm uppercase text-accent-gold tracking-[0.2em] mb-3"
          >
            Build log
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={rise}
            className="text-display-lg max-w-[700px] mb-12"
          >
            Shipping in the open.{" "}
            <span className="text-gradient-accent">Teasing the rest.</span>
          </motion.h2>
          <PatherleRoadmap />
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 md:px-12 pb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={rise}
          className="max-w-[1400px] mx-auto border border-surface-border bg-surface-elevated p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <div>
            <h3 className="text-display-md mb-2">Early businesses are already on it.</h3>
            <p className="text-body-md text-text-muted max-w-[480px]">
              The agentic core arrives wider, soon. Watch the loops being kept honest
              in our Loop Engineering lab meanwhile.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://www.patherle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent-gold text-surface text-label-sm uppercase tracking-wider hover:bg-accent-gold/90 transition-colors duration-300"
            >
              Visit patherle.com →
            </a>
            <Link
              href="/#loop-engineering"
              className="inline-flex items-center justify-center px-6 py-3 border border-accent-teal/50 text-accent-teal text-label-sm uppercase tracking-wider hover:border-accent-teal hover:bg-accent-teal/5 transition-all duration-300"
            >
              See The Loom
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
