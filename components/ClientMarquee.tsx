"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { clientLogos } from "@/lib/data";

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Base logo height. All image logos scale from this value.
const BASE_REM = 3.75; // 2.5rem × 1.5 = 50 % bigger

function LogoStrip() {
  return (
    <>
      {clientLogos.map((logo, i) => {
        const scale    = ("scale"    in logo ? logo.scale    : 1)     as number;
        const noInvert = "noInvert" in logo && logo.noInvert;
        const isText   = "isText"   in logo && logo.isText;
        const preserveColor = "preserveColor" in logo && logo.preserveColor;

        return (
          <div
            key={`${logo.name}-${i}`}
            className="group relative mx-5 flex h-24 w-[11rem] flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 transition-all duration-500 hover:border-[#49c5b6]/35 hover:bg-white/[0.08] hover:shadow-[0_0_28px_rgba(73,197,182,0.14)] active:border-[#49c5b6]/35 active:bg-white/[0.08] active:shadow-[0_0_28px_rgba(73,197,182,0.14)] md:mx-7 md:w-[12rem]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(73,197,182,0.18),_transparent_58%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />

            {isText ? (
              /* ── Text wordmark (e.g. CanterClub) ── */
              <span
                className="relative z-10 select-none whitespace-nowrap font-semibold tracking-tight text-white/45 transition-all duration-500 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(73,197,182,0.45)] group-active:text-white group-active:drop-shadow-[0_0_12px_rgba(73,197,182,0.45)]"
                style={{ fontSize: "2rem", letterSpacing: "-0.04em" }}
              >
                {logo.name}
              </span>
            ) : (
              /* ── Image logo ── */
              <Image
                src={logo.src}
                alt={logo.name}
                width={160}
                height={64}
                sizes="160px"
                className={`relative z-10 h-auto w-auto max-w-[150px] object-contain transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(73,197,182,0.45)] group-active:scale-[1.03] group-active:opacity-100 group-active:drop-shadow-[0_0_12px_rgba(73,197,182,0.45)] ${
                  preserveColor
                    ? "opacity-55 saturate-0 brightness-110 group-hover:saturate-100 group-active:saturate-100"
                    : `grayscale brightness-125 opacity-45 group-hover:grayscale-0 group-active:grayscale-0${noInvert ? "" : " invert group-hover:invert-0 group-active:invert-0"}`
                }`}
                style={{ height: `${scale * BASE_REM}rem` }}
                unoptimized={
                  typeof logo.src === "string" && logo.src.endsWith(".svg")
                }
              />
            )}
          </div>
        );
      })}
    </>
  );
}

export default function ClientMarquee() {
  return (
    <section className="py-20 md:py-32 border-t border-b border-surface-border overflow-hidden">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12"
      >
        <motion.p
          variants={headerVariants}
          className="text-label-sm uppercase text-text-dim tracking-[0.2em] mb-3"
        >
          Trusted Partners
        </motion.p>
        <motion.h2
          variants={headerVariants}
          className="text-display-md text-gradient"
        >
          Brands we&apos;ve built for.
        </motion.h2>
      </motion.div>

      {/* Single marquee row, right to left */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />

        <div className="flex items-center animate-marquee w-fit">
          <LogoStrip />
          <LogoStrip />
        </div>
      </div>
    </section>
  );
}
