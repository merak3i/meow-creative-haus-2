"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function HeroScroll({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let ready = false;
    let motionFallback: number | undefined;
    let paintObserver: PerformanceObserver | undefined;
    const syncMotion = () => {
      element.dataset.motion =
        ready && visible && !document.hidden && !reduced.matches ? "running" : "paused";
    };
    const startMotion = () => {
      ready = true;
      syncMotion();
    };
    const update = () => {
      frame = 0;
      if (!visible || reduced.matches) return;
      const rect = element.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(rect.height - innerHeight, 1)),
      );
      element.style.setProperty("--hero-progress", String(progress));
    };
    const request = () => {
      if (!frame && visible && !reduced.matches)
        frame = requestAnimationFrame(update);
    };
    const startOnScroll = () => {
      if (!ready && !reduced.matches) {
        startMotion();
        paintObserver?.disconnect();
        if (motionFallback !== undefined) clearTimeout(motionFallback);
      }
      request();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncMotion();
      request();
    });
    const motionPreferenceChanged = () => {
      syncMotion();
      request();
    };
    observer.observe(element);
    // Start line drift after the hero paints so it cannot compete with LCP.
    if (
      "PerformanceObserver" in window &&
      PerformanceObserver.supportedEntryTypes?.includes("largest-contentful-paint")
    ) {
      paintObserver = new PerformanceObserver((list) => {
        if (!list.getEntries().length) return;
        paintObserver?.disconnect();
        startMotion();
      });
      paintObserver.observe({ type: "largest-contentful-paint", buffered: true });
      motionFallback = window.setTimeout(startMotion, 4000);
    } else {
      motionFallback = window.setTimeout(startMotion, 1800);
    }
    addEventListener("scroll", startOnScroll, { passive: true });
    addEventListener("resize", request);
    reduced.addEventListener("change", motionPreferenceChanged);
    document.addEventListener("visibilitychange", syncMotion);
    return () => {
      observer.disconnect();
      paintObserver?.disconnect();
      if (motionFallback !== undefined) clearTimeout(motionFallback);
      cancelAnimationFrame(frame);
      removeEventListener("scroll", startOnScroll);
      removeEventListener("resize", request);
      reduced.removeEventListener("change", motionPreferenceChanged);
      document.removeEventListener("visibilitychange", syncMotion);
    };
  }, []);
  return (
    <div className="hero-scroll-track" data-motion="paused" ref={track}>
      <div className="hero-scroll-stage">
        <div className="hero-paths" aria-hidden="true">
          <svg
            viewBox="0 0 696 316"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            {[1, -1].flatMap((position) =>
              Array.from({ length: 18 }, (_, i) => (
                  <path
                    key={`${position}-${i}`}
                    d={`M-${380 - i * 10 * position} -${189 + i * 12}C-${380 - i * 10 * position} -${189 + i * 12} -${312 - i * 10 * position} ${216 - i * 12} ${152 - i * 10 * position} ${343 - i * 12}C${616 - i * 10 * position} ${470 - i * 12} ${684 - i * 10 * position} ${875 - i * 12} ${684 - i * 10 * position} ${875 - i * 12}`}
                    stroke="currentColor"
                    strokeWidth={0.5 + i * 0.04}
                  />
              )),
            )}
          </svg>
        </div>
        {children}
        <a className="hero-scroll-cue" href="#selected-work">
          Scroll <span aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
