"use client";

// The signature Scale move: a stack of translucent glass panels at staggered
// depth that rotate from tilted (~16°) to flat and scale up as scroll progress
// runs 0 → 1. The front panel carries real content (passed as children); two
// ghost panels behind add depth and converge into alignment as the stack
// levels out. Only transform and opacity are animated, never blur on scroll.

import { motion, useTransform, type MotionValue } from "framer-motion";

export default function PinnedPanels({
  progress,
  reduced = false,
  children,
  className = "",
}: {
  progress: MotionValue<number>;
  reduced?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  // Whole-stack orientation.
  const rotateX = useTransform(progress, [0, 1], [16, 0]);
  const scale = useTransform(progress, [0, 1], [1.06, 1]);

  // Ghost panels spread out when tilted, converge when flat.
  const ghostAX = useTransform(progress, [0, 1], [-64, -22]);
  const ghostAY = useTransform(progress, [0, 1], [-44, -16]);
  const ghostBX = useTransform(progress, [0, 1], [56, 20]);
  const ghostBY = useTransform(progress, [0, 1], [40, 14]);
  const ghostOpacity = useTransform(progress, [0, 0.6, 1], [0.18, 0.3, 0.42]);

  const stackStyle = reduced
    ? { rotateX: 0, scale: 1 }
    : { rotateX, scale };

  return (
    <div
      className={`pointer-events-none relative mx-auto w-full max-w-5xl ${className}`}
      style={{ perspective: "1400px" }}
    >
      <motion.div
        style={{ ...stackStyle, transformStyle: "preserve-3d", willChange: "transform" }}
        className="relative"
      >
        {/* Ghost panel A (upper-left) */}
        <motion.div
          aria-hidden
          style={
            reduced
              ? { opacity: 0.28, x: -22, y: -16 }
              : { x: ghostAX, y: ghostAY, opacity: ghostOpacity }
          }
          className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-[1px]"
        />
        {/* Ghost panel B (lower-right) */}
        <motion.div
          aria-hidden
          style={
            reduced
              ? { opacity: 0.28, x: 20, y: 14 }
              : { x: ghostBX, y: ghostBY, opacity: ghostOpacity }
          }
          className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-[1px]"
        />
        {/* Front panel, real content */}
        <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-surface-elevated shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8),0_0_90px_-30px_rgba(73,197,182,0.25)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          {children}
        </div>
      </motion.div>
    </div>
  );
}
