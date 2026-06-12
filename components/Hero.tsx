"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { GradientButton } from "@/components/ui/gradient-button";


const headlineWords =
  "Stop Burning Cash on Marketing That Doesn't Convert.".split(" ");

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Animated background paths */}
      <BackgroundPaths />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-surface-border opacity-40" />
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-surface-border opacity-40" />
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-surface-border opacity-40" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 px-6 md:px-12 pt-24 pb-16">
        <div>
          <div>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-label-sm uppercase text-accent-teal tracking-[0.2em] mb-8"
            >
              Revenue Engineering Studio
            </motion.p>

            {/* Headline with letter-by-letter animation */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="text-display-xl mb-8 [perspective:1000px]"
            >
              {headlineWords.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className="inline-block mr-[0.3em] last:mr-0"
                >
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.1 + letterIndex * 0.03,
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                      }}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.0,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-body-lg text-text-muted max-w-[620px] mb-12"
            >
              We engineer AI-driven B2B & B2C acquisition systems that turn
              strangers into booked calls and locked Annual Recurring Revenue.
              Predictable growth. Zero BS.
            </motion.p>

            {/* CTAs using gradient buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-wrap gap-4"
            >
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GradientButton className="text-sm uppercase tracking-widest">
                  Scale Your Revenue Today
                  <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                    &rarr;
                  </span>
                </GradientButton>
              </a>

              <a href="#offers">
                <GradientButton
                  variant="variant"
                  className="text-sm uppercase tracking-widest"
                >
                  See Our Systems
                </GradientButton>
              </a>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Scroll indicator — right center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-label-sm text-text-dim uppercase tracking-widest [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="w-px h-12 bg-text-dim relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-accent-teal"
          />
        </div>
      </motion.div>
    </section>
  );
}
