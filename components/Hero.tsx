"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { GradientButton } from "@/components/ui/gradient-button";
import ScrollStage from "@/components/ScrollStage";
import PinnedPanels from "@/components/PinnedPanels";
import RevenueDashboard from "@/components/RevenueDashboard";

// The pinned hero scene. Text owns the first beat, then recedes as the layered
// dashboard panels rotate flat and rise to centre — the Scale signature.
function HeroScene({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const textOpacity = useTransform(progress, [0, 0.28], [1, 0]);
  const textY = useTransform(progress, [0, 0.45], [0, -110]);
  const panelY = useTransform(progress, [0, 1], [560, -10]);
  const panelOpacity = useTransform(progress, [0.12, 0.4], [0, 1]);
  const captionOpacity = useTransform(progress, [0.6, 0.92], [0, 1]);
  const indicatorOpacity = useTransform(progress, [0, 0.12], [1, 0]);

  return (
    <div className="relative h-full w-full">
      {/* Ambient background */}
      <BackgroundPaths />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-surface-border opacity-40" />
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-surface-border opacity-40" />
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-surface-border opacity-40" />
      </div>

      {/* ── Text beat ── */}
      <motion.div
        style={reduced ? undefined : { opacity: textOpacity, y: textY }}
        className="absolute inset-0 flex flex-col justify-center px-6 md:px-12"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <p className="text-label-sm uppercase text-accent-teal tracking-[0.2em] mb-6">
            Product &amp; Experience Studio
          </p>

          <h1 className="text-display-xl mb-7 max-w-[15ch] bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            We design and build software worth feeling.
          </h1>

          <p className="text-body-lg text-text-muted max-w-[600px] mb-10">
            Meow Creative Haus is a product and experience studio. We ship
            interfaces, AI systems, and websites for founders and businesses in
            India and beyond. Every project below is live — click any of them.
          </p>

          <div className="flex flex-wrap gap-4">
            <GradientButton asChild className="text-sm uppercase tracking-widest">
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start a Project
                <span className="ml-3 opacity-70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100">
                  &rarr;
                </span>
              </a>
            </GradientButton>
            <GradientButton
              asChild
              variant="variant"
              className="text-sm uppercase tracking-widest"
            >
              <a href="#offers">
                See the Work
              </a>
            </GradientButton>
          </div>
        </div>
      </motion.div>

      {/* ── Panel beat ── */}
      <motion.div
        style={reduced ? { opacity: 1 } : { y: panelY, opacity: panelOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12"
      >
        <div className="h-[280px] w-full max-w-4xl md:h-[440px]">
          <PinnedPanels progress={progress} reduced={reduced} className="h-full">
            <div className="h-[280px] md:h-[440px]">
              <RevenueDashboard />
            </div>
          </PinnedPanels>
        </div>
        <motion.p
          style={reduced ? { opacity: 1 } : { opacity: captionOpacity }}
          className="mt-8 text-center text-label-sm uppercase tracking-[0.2em] text-text-dim"
        >
          Every project is live. Click any of them.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={reduced ? { opacity: 1 } : { opacity: indicatorOpacity }}
        className="absolute right-8 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-3 md:right-12"
      >
        <span className="text-label-sm uppercase tracking-widest text-text-dim [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="relative h-12 w-px overflow-hidden bg-text-dim">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-accent-teal"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <ScrollStage id="hero" heightVh={240}>
      {(progress, reduced) => <HeroScene progress={progress} reduced={reduced} />}
    </ScrollStage>
  );
}
