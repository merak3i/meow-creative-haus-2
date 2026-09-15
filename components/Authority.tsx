"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/data";

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Authority() {
  return (
    <section
      id="authority"
      className="perforated-section overflow-hidden py-24 md:py-40 px-6 md:px-12 border-t border-surface-border"
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1400px] mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Left: Avatar */}
          <motion.div variants={itemVariants} className="relative">
            <div className="aspect-[4/5] bg-surface-elevated border border-surface-border relative overflow-hidden rounded-sm">
              {/* Avatar image, cropped as headshot with the face centered */}
              <div className="absolute inset-0">
                <Image
                  src="/vismay-avatar.png"
                  alt="Vismay Hegde"
                  fill
                  className="object-cover object-[center_25%]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Subtle gradient overlay at bottom for clean crop */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-surface-elevated to-transparent" />

              {/* Corner label */}
              <span className="absolute top-6 left-6 text-label-sm text-text-dim uppercase tracking-widest z-10">
                Founder
              </span>

              {/* Rotating ring accents behind avatar */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -bottom-20 -right-20 w-64 h-64 border border-accent-teal/10 rounded-full pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-16 -left-16 w-48 h-48 border border-accent-gold/10 rounded-full pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Right: Copy */}
          <div>
            <motion.p
              variants={itemVariants}
              className="text-label-sm uppercase text-accent-teal tracking-[0.2em] mb-3"
            >
              Who you work with
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-display-lg mb-8"
            >
              One studio. No handoff to a junior.
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-body-lg text-text-muted mb-6"
            >
              I am Vismay Hegde. I design and build the work, and I stay on the
              project after launch. That means one person who knows why every
              decision was made, and short feedback loops instead of a queue.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-body-lg text-text-muted mb-10"
            >
              Everything on this site is a link you can open: client sites, our
              own tools, the ship log with real dates. Judge the studio on that
              rather than on adjectives.
            </motion.p>
            <motion.a
              variants={itemVariants}
              href={siteConfig.social.linkedinPersonal}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-accent-teal hover:text-accent-gold transition-colors duration-300"
            >
              <span className="text-label-sm uppercase tracking-widest">
                Connect with Vismay on LinkedIn
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
