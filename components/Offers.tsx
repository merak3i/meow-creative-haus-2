"use client";

import { motion, useReducedMotion } from "framer-motion";
import { offers } from "@/lib/data";

// Offers is a set of four static cards — there's no multi-state sequence to
// scrub, so pinning would only manufacture dead space. Instead it's a normal
// section with a tuned staggered reveal-on-enter (skipped under reduced motion).

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const headerV = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const cardV = {
  hidden: { opacity: 0, y: 56 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Offers() {
  const reduced = useReducedMotion();

  return (
    <section id="offers" className="px-6 py-24 md:px-12 md:py-40">
      <motion.div
        variants={reduced ? undefined : container}
        initial={reduced ? undefined : "hidden"}
        whileInView={reduced ? undefined : "visible"}
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-[1400px]"
      >
        <motion.div variants={reduced ? undefined : headerV} className="mb-12 md:mb-16">
          <p className="text-label-sm uppercase tracking-[0.2em] text-accent-teal mb-3">
            What We Build
          </p>
          <h2 className="text-display-lg max-w-[820px]">
            Work you can{" "}
            <span className="text-gradient-accent">click.</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {offers.map((offer) => (
            <motion.div
              key={offer.index}
              variants={reduced ? undefined : cardV}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-8 transition-colors duration-500 hover:border-accent-teal/40 hover:bg-white/[0.06] md:p-10"
            >
              <div className="absolute left-0 top-0 h-[2px] w-0 bg-accent-teal transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-teal/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div>
                <span className="mb-6 block font-mono text-label-sm text-accent-teal">
                  {offer.index}
                </span>
                <h3 className="text-display-md mb-4 text-text transition-colors duration-300 group-hover:text-accent-teal">
                  {offer.title}
                </h3>
              </div>
              <p className="text-body-md text-text-muted">{offer.description}</p>

              <div className="absolute bottom-6 right-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent-teal">
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
