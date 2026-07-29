"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getWheelDirection, shouldThrottleWheel } from "@/lib/focus-rail-logic";

// ─── Types ─────────────────────────────────────────────────────────────────

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;        // YouTube maxresdefault URL or "" for placeholder
  href?: string;
  meta?: string;
  logoSrc?: string;
  videoId?: string;        // YouTube video ID — enables lazy nocookie embed on click
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  /**
   * "portrait"  → aspect-[3/4]  cards ~300px wide  (editorial / photo)
   * "landscape" → aspect-video  cards ~520px wide  (YouTube 16:9)
   */
  orientation?: "portrait" | "landscape";
  /** Label for the external link CTA. Defaults to "Watch". */
  ctaLabel?: string;
  className?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

// ─── Physics ─────────────────────────────────────────────────────────────────

// Spatial movement (x / z / rotateY)
const BASE_SPRING = { type: "spring", stiffness: 300, damping: 30, mass: 1 } as const;

// Scale — bouncier, used for the "tap" tactile feedback on the center card
const TAP_SPRING  = { type: "spring", stiffness: 450, damping: 18, mass: 1 } as const;

// ─── Component ───────────────────────────────────────────────────────────────

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  orientation = "portrait",
  ctaLabel = "Watch",
  className,
}: FocusRailProps) {
  const [active, setActive]     = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const [playingId, setPlayingId]   = React.useState<string | number | null>(null);
  const lastWheelTime = React.useRef<number>(0);

  const isLandscape = orientation === "landscape";

  // Card geometry — landscape cards are wider, so x-spacing between cards must scale too
  const CARD_W_CLASS   = isLandscape ? "w-[380px] md:w-[480px]" : "w-[260px] md:w-[300px]";
  const CARD_ASPECT    = isLandscape ? "aspect-video"            : "aspect-[3/4]";
  const X_SPACING      = isLandscape ? 500                       : 320;

  const count       = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem  = items[activeIndex];

  // ── Navigation ────────────────────────────────────────────────────────────

  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
    setPlayingId(null);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
    setPlayingId(null);
  }, [loop, active, count]);

  // ── Mouse wheel (horizontal track pad + vertical mouse) ──────────────────

  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (shouldThrottleWheel(now, lastWheelTime.current, 400)) return;
      const direction = getWheelDirection(e.deltaX, e.deltaY, 20);
      if (!direction) return;
      direction === "next" ? handleNext() : handlePrev();
      lastWheelTime.current = now;
    },
    [handleNext, handlePrev],
  );

  // ── Autoplay ──────────────────────────────────────────────────────────────

  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const t = setInterval(() => handleNext(), interval);
    return () => clearInterval(t);
  }, [autoPlay, isHovering, handleNext, interval]);

  // ── Keyboard ──────────────────────────────────────────────────────────────

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  handlePrev();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape")     setPlayingId(null);
  };

  // ── Swipe / drag ──────────────────────────────────────────────────────────

  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -10000) handleNext();
    else if (swipe > 10000) handlePrev();
  };

  const visibleOffsets = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex h-[600px] w-full flex-col overflow-hidden bg-neutral-950 text-white outline-none select-none",
        className,
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* ── Background ambience ──────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {activeItem.imageSrc ? (
              <img
                src={activeItem.imageSrc}
                alt=""
                className="h-full w-full object-cover blur-3xl saturate-200"
              />
            ) : (
              <div className="h-full w-full bg-neutral-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Main stage ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">

        {/* Draggable rail */}
        <motion.div
          className="relative mx-auto flex h-[360px] w-full max-w-6xl items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleOffsets.map((offset) => {
            const absIndex  = active + offset;
            const index     = wrap(0, count, absIndex);
            const item      = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter      = offset === 0;
            const dist          = Math.abs(offset);
            const isPlaying     = isCenter && playingId === item.id;
            // An item is a real placeholder only when it has no image at all
            // (e.g. aiCampaigns with imageSrc:""). Items with imageSrc but no
            // videoId (e.g. client-website screenshots) are NOT placeholders.
            const isPlaceholder = !item.imageSrc;
            const hasRealVideo  = Boolean(item.videoId && !item.videoId.startsWith("PLACEHOLDER"));

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  `absolute ${CARD_ASPECT} ${CARD_W_CLASS} rounded-2xl border-t border-white/20 bg-neutral-900 shadow-2xl overflow-hidden`,
                  isCenter ? "z-20" : "z-10",
                )}
                initial={false}
                animate={{
                  x:        offset * X_SPACING,
                  z:        -dist * 180,
                  scale:    isCenter ? 1 : 0.85,
                  rotateY:  offset * -20,
                  opacity:  isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5),
                  filter:   `blur(${isCenter ? 0 : dist * 6}px) brightness(${isCenter ? 1 : 0.5})`,
                }}
                transition={{
                  scale:   TAP_SPRING,
                  default: BASE_SPRING,
                }}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => {
                  if (offset !== 0) {
                    setActive((p) => p + offset);
                    setPlayingId(null);
                  } else if (isCenter && hasRealVideo) {
                    setPlayingId(item.id);
                  } else if (isCenter && !isPlaceholder && item.href) {
                    window.open(item.href, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                {isPlaying && item.videoId ? (
                  /* ── Playing state: lazy nocookie iframe ───────────── */
                  <>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1&color=white`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={item.title}
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); setPlayingId(null); }}
                      className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center hover:bg-black transition-colors"
                      aria-label="Stop video"
                    >
                      <X className="w-3.5 h-3.5 text-white" />
                    </button>
                  </>
                ) : (
                  /* ── Thumbnail / placeholder state ─────────────────── */
                  <>
                    {isPlaceholder || !item.imageSrc ? (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-neutral-900 border border-dashed border-neutral-800">
                        <span className="text-neutral-600 text-[10px] uppercase tracking-widest">Coming soon</span>
                        <span className="text-neutral-800 text-[9px]">{item.meta}</span>
                      </div>
                    ) : (
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover pointer-events-none"
                        onError={(e) => {
                          if (item.videoId && !item.videoId.startsWith("PLACEHOLDER")) {
                            (e.currentTarget as HTMLImageElement).src =
                              `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`;
                          }
                        }}
                      />
                    )}

                    {/* Lighting layers */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 rounded-2xl bg-black/10 pointer-events-none mix-blend-multiply" />

                    {/* Play button — center card, real video only */}
                    {isCenter && hasRealVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-black/70 border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:border-[#49c5b6] transition-all duration-300 backdrop-blur-sm">
                          <div
                            className="ml-1"
                            style={{
                              width: 0,
                              height: 0,
                              borderTop: "8px solid transparent",
                              borderBottom: "8px solid transparent",
                              borderLeft: "14px solid #f5f5f5",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Info & controls ──────────────────────────────────────────── */}
        <div className="mx-auto mt-12 flex w-full max-w-4xl flex-col items-center justify-between gap-6 md:flex-row pointer-events-auto">

          {/* Title block */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left h-32 justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {activeItem.logoSrc && (
                  <img
                    src={activeItem.logoSrc}
                    alt=""
                    className="mb-3 max-h-10 max-w-[220px] object-contain"
                  />
                )}
                {activeItem.meta && (
                  <span className="text-xs font-medium uppercase tracking-wider text-[#49c5b6]">
                    {activeItem.meta}
                  </span>
                )}
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white">
                  {activeItem.title}
                </h2>
                {activeItem.description && (
                  <p className="max-w-md text-neutral-400 text-sm">
                    {activeItem.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full bg-neutral-900/80 p-1 ring-1 ring-white/10 backdrop-blur-md">
              <button
                onClick={handlePrev}
                className="rounded-full p-3 text-neutral-400 transition hover:bg-white/10 hover:text-white active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="min-w-[40px] text-center text-xs font-mono text-neutral-500">
                {activeIndex + 1} / {count}
              </span>
              <button
                onClick={handleNext}
                className="rounded-full p-3 text-neutral-400 transition hover:bg-white/10 hover:text-white active:scale-95"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {activeItem.href && !playingId && (
              <Link
                href={activeItem.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
              >
                {ctaLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
