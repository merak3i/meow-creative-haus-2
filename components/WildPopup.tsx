"use client";

// Homepage popup that links out to the meow.wild scroll story (opens in its own
// window). Attention is guided by two real visual-illusion mechanisms, both
// reduced-motion gated:
//   1. Gaze cueing — animated cat eyes blink and dart toward the CTA. Biological
//      motion + gaze direction is one of the strongest involuntary attention pulls.
//   2. Peripheral motion pop-out — a slow rotating conic halo behind the card; a
//      single moving element among a static page captures the eye.

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/data";

const STORAGE_KEY = "mw-wild-dismissed";

function CatEyes({ reduced }: { reduced: boolean }) {
  const blink = reduced ? undefined : { scaleY: [1, 1, 0.1, 1] };
  const blinkT = { duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.9, 0.94, 1] };
  // pupils glance down-right toward the "Begin the descent" CTA, then recenter
  const gaze = reduced ? undefined : { x: [0, 4, 4, -2, 0], scaleX: [1, 0.7, 0.7, 1.15, 1] };
  const gazeT = { duration: 4.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.55, 0.8, 1] };

  return (
    <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          animate={blink}
          transition={blinkT}
          className="relative h-7 w-[22px] overflow-hidden rounded-[50%] ring-1 ring-black/40"
          style={{
            background:
              "radial-gradient(circle at 50% 38%, #f3e29a 0%, #ECD06F 52%, #b8901f 100%)",
            boxShadow: "0 0 14px rgba(236,208,111,0.45)",
          }}
        >
          {/* vertical slit pupil */}
          <motion.div
            animate={gaze}
            transition={gazeT}
            className="absolute left-1/2 top-[-15%] -ml-[2.5px] h-[130%] w-[5px] rounded-full bg-[#0a0a0a]"
          />
          {/* glint */}
          <span className="absolute left-[26%] top-[20%] h-1 w-1 rounded-full bg-white/85" />
        </motion.div>
      ))}
    </div>
  );
}

export default function WildPopup() {
  const reduced = useReducedMotion() ?? false;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setShow(true), 3800);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 44, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-[70] w-[330px] max-w-[calc(100vw-2.5rem)]"
        >
          {/* peripheral-motion halo */}
          {!reduced && (
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute -inset-px rounded-[18px] opacity-70 blur-[2px]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, #49c5b6 55deg, transparent 130deg, #ECD06F 210deg, transparent 320deg)",
              }}
            />
          )}

          <a
            href={siteConfig.meowWild}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="group relative block overflow-hidden rounded-[16px] border border-white/10 bg-surface-elevated/95 p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dismiss();
              }}
              aria-label="Dismiss"
              className="absolute right-2.5 top-2.5 z-10 grid h-6 w-6 place-items-center rounded-full text-lg leading-none text-text-dim transition-colors hover:bg-white/10 hover:text-text"
            >
              ×
            </button>

            <div className="flex items-center gap-4">
              <CatEyes reduced={reduced} />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent-teal">
                  From the Lab
                </p>
                <h3 className="text-lg font-semibold leading-tight text-text">
                  meow.wild
                </h3>
              </div>
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-text-muted">
              How high does a cat live? Scroll down the mountain — from the snow
              leopard at 5,000&nbsp;m to the cat asleep in your lap.
            </p>

            <span className="mt-4 inline-flex items-center gap-1.5 text-label-sm uppercase tracking-wider text-accent-gold">
              Begin the descent
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
