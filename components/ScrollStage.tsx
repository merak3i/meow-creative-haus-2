"use client";

// The reusable Scale-style primitive: a tall scroll-track whose inner viewport
// is pinned (position: sticky) while you scroll "through" it. Exposes a single
// 0→1 `progress` MotionValue plus a `reduced` flag to its children via a
// render-prop, so a scene is just: map progress → transforms.
//
//   <ScrollStage heightVh={260}>
//     {(progress, reduced) => ( …panels driven by progress… )}
//   </ScrollStage>
//
// Progress is computed manually from getBoundingClientRect on a rAF tick rather
// than framer's useScroll target-offset. That sidesteps the well-known
// measurement race (fonts/layout shifting after mount) and stays perfectly in
// sync with Lenis's smooth scroll. The rect is the single source of truth.

import { useEffect, useRef } from "react";
import { useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export default function ScrollStage({
  children,
  heightVh = 280,
  id,
  className = "",
  stageClassName = "",
}: {
  children: (progress: MotionValue<number>, reduced: boolean) => React.ReactNode;
  /** Track height in viewport units. Longer means a slower, more deliberate scrub. */
  heightVh?: number;
  id?: string;
  className?: string;
  stageClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const progress = useMotionValue(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) {
      progress.set(1);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      progress.set(total > 0 ? clamp(-rect.top / total) : 0);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [reduced, progress]);

  // Under reduced motion, collapse the track to a single screen and render the
  // scene's resting state: no pinning, no scrubbing.
  if (reduced) {
    return (
      <section id={id} className={className}>
        <div
          className={`relative flex min-h-screen items-center justify-center overflow-hidden ${stageClassName}`}
        >
          {children(progress, true)}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={ref}
      className={`relative ${className}`}
      style={{ height: `${heightVh}vh` }}
    >
      <div
        className={`sticky top-0 flex h-screen items-center justify-center overflow-hidden ${stageClassName}`}
      >
        {children(progress, false)}
      </div>
    </section>
  );
}
