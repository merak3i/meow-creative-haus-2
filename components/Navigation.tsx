"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";

function useNavLinks() {
  const pathname = usePathname();
  const prefix   = pathname === "/" ? "" : "/";
  return [
    { label: "Systems",  href: `${prefix}#offers`    },
    { label: "About",    href: `${prefix}#authority` },
    { label: "Lab",      href: "/lab"                },
    { label: "Playbook", href: `${prefix}#substack`  },
    { label: "Contact",  href: siteConfig.whatsapp, external: true },
  ];
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = useNavLinks();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-6 md:px-12 py-6">
        <a href="#" className="text-text font-bold text-lg tracking-tight">
          MCH<span className="text-accent-teal">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-label-sm uppercase text-text-muted hover:text-text transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label-sm uppercase px-5 py-2.5 border border-text-dim text-text hover:bg-text hover:text-surface transition-all duration-300"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 z-50"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[1.5px] bg-text"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-[1.5px] bg-text"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[1.5px] bg-text"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-surface/98 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-display-md text-text hover:text-accent-teal transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 px-8 py-3 border border-accent-teal text-accent-teal text-label-sm uppercase tracking-widest"
            >
              Chat on WhatsApp
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-6 mt-8"
            >
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-text transition-colors text-sm"
              >
                IG
              </a>
              <a
                href={siteConfig.social.linkedinPersonal}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-text transition-colors text-sm"
              >
                LI
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-text transition-colors text-sm"
              >
                TW
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-text transition-colors text-sm"
              >
                GH
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
