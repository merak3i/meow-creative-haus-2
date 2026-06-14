"use client";

// Smooth-scroll backbone for the whole site.
//
// Upgrades over the original: a smoothing `lerp` instead of a fixed duration,
// in-page anchor links routed through Lenis so `#offers` glides instead of
// jumping, a shared instance exposed via context (so any component can call
// `scrollTo`), and a hard `prefers-reduced-motion` opt-out that falls back to
// native scrolling entirely.

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";

type LenisContextValue = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Respect reduced-motion: skip smoothing entirely, keep native scroll.
    if (prefersReduced) return;

    const instance = new Lenis({
      lerp: 0.1, // smoothing factor — preferred over a fixed duration for wheel
      smoothWheel: true,
      syncTouch: false, // native touch feels better on mobile
      wheelMultiplier: 1,
    });

    lenisRef.current = instance;
    setLenis(instance);

    let raf = 0;
    function loop(time: number) {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    // Route in-page anchor clicks through Lenis for a smooth glide.
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      const samePage =
        url.pathname === window.location.pathname && url.hash.length > 1;
      if (!samePage) return;

      const el = document.querySelector(url.hash);
      if (!el) return;

      e.preventDefault();
      instance.scrollTo(el as HTMLElement, { offset: -80 });
      window.history.pushState(null, "", url.hash);
    }

    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  const scrollTo = (
    target: string | number | HTMLElement,
    offset = -80,
  ) => {
    lenisRef.current?.scrollTo(target, { offset });
  };

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
