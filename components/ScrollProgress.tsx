"use client";

// Fixed hairline progress bar bound to whole-page scroll.
// Scroll-linked (not time-animated), so it stays correct under reduced motion.

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent-teal to-accent-gold"
      aria-hidden
    />
  );
}
