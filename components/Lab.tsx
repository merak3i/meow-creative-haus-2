"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { openSourceProjects } from "@/lib/data";

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Lab() {
  const project = openSourceProjects[0];

  return (
    <section id="lab" className="py-24 md:py-40 px-6 md:px-12">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1400px] mx-auto"
      >
        <motion.p
          variants={headerVariants}
          className="text-label-sm uppercase text-accent-teal tracking-[0.2em] mb-3"
        >
          From the Lab
        </motion.p>
        <motion.h2 variants={headerVariants} className="text-display-lg max-w-[700px] mb-4">
          We build what we wish{" "}
          <span className="text-gradient-accent">existed.</span>
        </motion.h2>
        <motion.p
          variants={headerVariants}
          className="text-body-md text-text-muted mb-16 max-w-[560px]"
        >
          Tools that came out of our own bad days, released under MIT so you can
          run them without asking us for anything.
        </motion.p>

        {/* Project card */}
        <motion.div
          variants={cardVariants}
          className="group relative border border-surface-border bg-surface-elevated hover:border-text-dim transition-all duration-500 p-8 md:p-10"
        >
          {/* Hover accent line */}
          <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent-teal group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            {/* Left: project info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-display-md group-hover:text-accent-teal transition-colors duration-300">
                  {project.name}
                </span>
                <span className="text-label-sm text-text-dim border border-surface-border px-2 py-0.5">
                  v1.6.2
                </span>
                <span className="text-label-sm text-accent-teal border border-accent-teal/30 px-2 py-0.5">
                  LIVE
                </span>
              </div>
              <p className="text-body-md text-text-muted mb-6 max-w-[540px]">
                {project.tagline}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stats.map((s) => (
                  <span
                    key={s}
                    className="text-label-sm text-text-dim border border-surface-border px-3 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: CTAs */}
            <div className="flex flex-col gap-3 md:items-end justify-start shrink-0">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-teal text-surface text-label-sm uppercase tracking-wider hover:bg-accent-teal/90 transition-colors duration-300"
              >
                Try it live →
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent-gold/50 text-accent-gold text-label-sm uppercase tracking-wider hover:border-accent-gold hover:bg-accent-gold/5 transition-all duration-300"
              >
                ★ Star on GitHub
              </a>
            </div>
          </div>

          <a
            href="#loop-engineering"
            className="mt-8 block overflow-hidden rounded-lg border border-surface-border bg-surface"
          >
            <Image
              src="/screenshots/meow-ops/meow-ops-05-sanctum.webp"
              alt="The Meow Ops Sanctum screen rendering a session of agent runs as an orbitable 3D scene"
              width={2000}
              height={1250}
              sizes="(max-width: 768px) 100vw, 1200px"
              className="h-auto w-full opacity-90 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="block border-t border-surface-border px-5 py-3 text-label-sm uppercase tracking-wider text-text-dim">
              Sanctum: a night of agent runs as a 3D scene. Five more screens below
            </span>
          </a>
        </motion.div>

        {/* Lab link */}
        <motion.div variants={headerVariants} className="mt-8 text-right">
          <Link
            href="/lab"
            className="text-label-sm text-text-dim hover:text-accent-teal transition-colors duration-300 uppercase tracking-wider"
          >
            Explore the lab →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
