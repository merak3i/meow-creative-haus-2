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

function Layer({
  layer,
  stroke,
  extra = "",
}: {
  layer: number;
  stroke: string;
  extra?: string;
}) {
  return (
    <svg
      className={`hero-layer hero-layer-${layer + 1}${extra}`}
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
    // While the page is being scrolled the depth layers already move with
    // it; the free drift holds still so each scroll frame stays light.
    let settle: number | undefined;
    const onScroll = () => {
      start();
      request();
      if (!visible) return;
      if (settle === undefined) element.dataset.scrolling = "";
      else clearTimeout(settle);
      settle = window.setTimeout(() => {
        settle = undefined;
        delete element.dataset.scrolling;
      }, 160);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      element.dataset.onscreen = String(visible);
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
      if (settle !== undefined) clearTimeout(settle);
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
          <Layer layer={0} stroke="currentColor" />
          <Layer layer={1} stroke="currentColor" />
          <Layer layer={2} stroke="currentColor" />
          <div className="hero-sweep-band">
            <Layer layer={1} stroke="url(#hero-signal)" extra=" hero-sweep-lines" />
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
