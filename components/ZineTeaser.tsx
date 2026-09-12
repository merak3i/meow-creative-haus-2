"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ZineTeaser() {
  return (
    <section className="border-y border-surface-border bg-[#070908] px-6 py-24 md:px-12 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <Link href="/tech-misc-larp" className="group relative mx-auto block w-full max-w-[430px] -rotate-2 transition-transform duration-500 hover:rotate-0">
          <div className="absolute inset-0 translate-x-4 translate-y-4 border border-accent-teal/30 bg-accent-teal/5 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
          <Image
            src="/tech-misc-larp/issue-01/page-01.webp"
            alt="Cover of tech+misc larp issue 01, Rise of the AGI"
            width={1238}
            height={1548}
            sizes="(max-width: 1023px) 80vw, 430px"
            className="relative h-auto w-full border border-surface-border"
          />
        </Link>

        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-accent-teal">
            New from the chronically-online desk
          </p>
          <h2 className="max-w-[720px] text-display-lg">
            tech+misc larp is now a place you can fall into.
          </h2>
          <p className="mt-6 max-w-[590px] text-body-md text-text-muted">
            Issue 01 turns twelve days of AI noise into a 21-page web zine. Click the signal rail, use your arrow keys, or scroll until something breaks your brain a little.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/tech-misc-larp" className="inline-flex border border-accent-teal bg-accent-teal px-5 py-3 text-label-sm uppercase tracking-wider text-surface transition-colors hover:bg-transparent hover:text-accent-teal">
              Enter issue 01 →
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim">
              21 pages · sept 1-12, 2026
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
