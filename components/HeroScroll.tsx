"use client";

import { useEffect, useRef, type ReactNode } from "react";

// 36 flowing strokes, dealt into three depth layers. Each layer is its own
// <svg> box so its drift runs on the compositor (transform only).
const strokes = [1, -1].flatMap((position) =>
  Array.from({ length: 18 }, (_, i) => ({
    key: `${position}-${i}`,
    layer: i % 3,
    d: `M-${380 - i * 10 * position} -${189 + i * 12}C-${380 - i * 10 * position} -${189 + i * 12} -${312 - i * 10 * position} ${216 - i * 12} ${152 - i * 10 * position} ${343 - i * 12}C${616 - i * 10 * position} ${470 - i * 12} ${684 - i * 10 * position} ${875 - i * 12} ${684 - i * 10 * position} ${875 - i * 12}`,
    width: 0.5 + i * 0.04,
  })),
);

function Layer({ layer, stroke }: { layer: number; stroke: string }) {
  return (
    <svg
      className={`hero-layer hero-layer-${layer + 1}`}
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {strokes
        .filter((s) => s.layer === layer)
        .map((s) => (
          <path key={s.key} d={s.d} stroke={stroke} strokeWidth={s.width} />
        ))}
    </svg>
  );
}

export default function HeroScroll({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let ready = false;
    let frame = 0;
    let last = "";
    let fallback: number | undefined;
    let paint: PerformanceObserver | undefined;
    const sync = () => {
      element.dataset.motion =
        ready && visible && !document.hidden && !reduced.matches
          ? "running"
          : "paused";
    };
    const update = () => {
      frame = 0;
      if (reduced.matches) return;
      const rect = element.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(rect.height - innerHeight, 1)),
      );
      const value = progress.toFixed(3);
      if (value !== last) element.style.setProperty("--hero-progress", (last = value));
    };
    const request = () => {
      if (!frame && !reduced.matches) frame = requestAnimationFrame(update);
    };
    // The line field starts once the hero has painted, so it never competes
    // with the largest paint. Scrolling or a timeout start it too.
    const start = () => {
      if (ready) return;
      ready = true;
      paint?.disconnect();
      if (fallback !== undefined) clearTimeout(fallback);
      sync();
    };
    const onScroll = () => {
      start();
      request();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
      request();
    });
    observer.observe(element);
    try {
      paint = new PerformanceObserver((list) => {
        if (list.getEntries().length) setTimeout(start, 120);
      });
      paint.observe({ type: "largest-contentful-paint", buffered: true });
      fallback = window.setTimeout(start, 3000);
    } catch {
      fallback = window.setTimeout(start, 1200);
    }
    const preference = () => {
      sync();
      request();
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", request);
    reduced.addEventListener("change", preference);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      paint?.disconnect();
      if (fallback !== undefined) clearTimeout(fallback);
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", request);
      reduced.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return (
    <div className="hero-scroll-track" data-motion="paused" ref={track}>
      <div className="hero-scroll-stage">
        <div className="hero-paths" aria-hidden="true">
          <div className="hero-depth hero-depth-1">
            <Layer layer={0} stroke="currentColor" />
          </div>
          <div className="hero-depth hero-depth-2">
            <Layer layer={1} stroke="currentColor" />
          </div>
          <div className="hero-depth hero-depth-3">
            <Layer layer={2} stroke="currentColor" />
          </div>
          <div className="hero-depth hero-depth-2 hero-sweep">
            <div className="hero-sweep-band">
              <div className="hero-sweep-field">
                <Layer layer={1} stroke="url(#hero-signal)" />
              </div>
            </div>
          </div>
          <svg className="hero-defs" width="0" height="0" focusable="false">
            <defs>
              <linearGradient
                id="hero-signal"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="696"
                y2="0"
              >
                <stop offset="0.4" stopColor="#64dbc8" />
                <stop offset="0.75" stopColor="#e8ca84" />
              </linearGradient>
            </defs>
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
