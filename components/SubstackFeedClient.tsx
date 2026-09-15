"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { SubstackPost } from "@/lib/data";
import { latestZineIssue } from "@/lib/zines";

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return dateStr;
  }
}

export default function SubstackFeedClient({
  posts,
}: {
  posts: SubstackPost[];
}) {
  return (
    <section id="substack" className="py-24 md:py-40 px-6 md:px-12 border-t border-surface-border">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1400px] mx-auto"
      >
        <motion.p
          variants={headerVariants}
          className="text-label-sm uppercase text-accent-gold tracking-[0.2em] mb-3"
        >
          Notes + zines
        </motion.p>
        <motion.h2
          variants={headerVariants}
          className="text-display-lg mb-16"
        >
          Essays, field notes, and{" "}
          <span className="text-gradient-accent">things with page numbers.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div variants={cardVariants} className="group relative overflow-hidden border border-accent-teal/30 bg-[#090d0b] transition-colors duration-500 hover:border-accent-teal">
            <Link href={latestZineIssue.href} className="block h-full p-5">
              <div className="grid h-full grid-cols-[100px_1fr] gap-5 sm:block">
                <Image src={latestZineIssue.cover} alt={`Cover of ${latestZineIssue.issue}: ${latestZineIssue.title}`} width={1238} height={1548} sizes="(max-width: 639px) 100px, 350px" className="h-auto w-full border border-surface-border sm:mb-6" />
                <div>
                  <span className="mb-3 block text-label-sm uppercase tracking-wider text-accent-teal">Zine · {latestZineIssue.issue}</span>
                  <h3 className="mb-4 text-xl font-semibold text-text transition-colors duration-300 group-hover:text-accent-teal">{latestZineIssue.title}</h3>
                  <p className="mb-6 line-clamp-3 text-body-md text-text-muted">{latestZineIssue.description}</p>
                  <span className="inline-flex items-center gap-2 text-label-sm uppercase text-text-dim transition-colors duration-300 group-hover:text-accent-teal">Open issue →</span>
                </div>
              </div>
            </Link>
          </motion.div>
          {posts.map((post) => (
            <motion.a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className="group block p-8 border border-surface-border bg-surface-elevated hover:border-text-dim transition-all duration-500 relative overflow-hidden"
            >
              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-gold group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

              <span className="text-label-sm text-text-dim block mb-4">
                {formatDate(post.pubDate)}
              </span>
              <h3 className="text-xl font-semibold text-text mb-4 group-hover:text-accent-gold transition-colors duration-300 line-clamp-3">
                {post.title}
              </h3>
              <p className="text-body-md text-text-muted line-clamp-3 mb-6">
                {post.excerpt}
              </p>

              <span className="inline-flex items-center gap-2 text-label-sm uppercase text-text-dim group-hover:text-accent-gold transition-colors duration-300">
                Read
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          variants={headerVariants}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://impostersyndromeenjoyer.substack.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-accent-gold/30 px-8 py-4 text-label-sm uppercase tracking-widest text-accent-gold transition-all duration-500 hover:bg-accent-gold hover:text-surface">View all articles ↗</a>
            <Link href="/tech-misc-larp" className="inline-flex items-center gap-3 border border-accent-teal/30 px-8 py-4 text-label-sm uppercase tracking-widest text-accent-teal transition-all duration-500 hover:bg-accent-teal hover:text-surface">Browse the zine archive →</Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
