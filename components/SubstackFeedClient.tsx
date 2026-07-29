"use client";

import { motion } from "framer-motion";
import type { SubstackPost } from "@/lib/data";

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
  if (posts.length === 0) {
    return null;
  }

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
          Newsletter
        </motion.p>
        <motion.h2
          variants={headerVariants}
          className="text-display-lg mb-16"
        >
          Meow Creative Haus:{" "}
          <span className="text-gradient-accent">The Playbook.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* CTA to full Substack */}
        <motion.div
          variants={headerVariants}
          className="mt-12 text-center"
        >
          <a
            href="https://impostersyndromeenjoyer.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-accent-gold/30 text-accent-gold text-label-sm uppercase tracking-widest hover:bg-accent-gold hover:text-surface transition-all duration-500"
          >
            View All Posts
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
