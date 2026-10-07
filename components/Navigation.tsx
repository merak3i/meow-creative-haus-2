"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";

const servicePreview = [
  { label: "Interactive Experiences", href: "/services#interactive-experiences" },
  { label: "Product & Web", href: "/services#product-web" },
  { label: "AI Systems", href: "/services#ai-systems" },
  { label: "Growth Systems", href: "/services#growth-systems" },
];

function useNavLinks() {
  const pathname = usePathname();
  const prefix   = pathname === "/" ? "" : "/";
  return [
    { label: "Work",     href: `${prefix}#client-sites` },
    { label: "Services", href: "/services"             },
    { label: "Lab",      href: "/lab"                  },
    { label: "Journal",  href: "/studio-notes-september-2026" },
  ];
}

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = useNavLinks();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled || menuOpen
          ? "border-b border-surface-border bg-surface/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`flex items-center justify-between px-6 md:px-12 transition-[padding] duration-300 ${
          scrolled ? "py-3.5" : "py-6"
        }`}
      >
        <a
          href={pathname === "/" ? "#hero" : "/"}
          aria-label="MCH. Meow Creative Haus home"
          className="text-text font-bold text-lg tracking-tight"
        >
          MCH<span className="text-accent-teal">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-label-sm uppercase text-text-muted hover:text-text transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="studio-nav-cta text-label-sm px-5 py-2.5 border border-text-dim text-text hover:bg-text hover:text-surface transition-all duration-300"
          >
            Start a project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 z-50"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
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
            id="mobile-navigation"
            className="terminal-mobile-menu fixed inset-0 overflow-y-auto bg-surface px-6 py-24 flex flex-col items-center gap-6 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-display-md text-text hover:text-accent-teal transition-colors"
                >
                  {link.label}
                </a>
                {link.label === "Services" && (
                  <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2">
                    {servicePreview.map((service) => (
                      <a
                        key={service.href}
                        href={service.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-xs text-text-dim hover:text-text"
                      >
                        {service.label}
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
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
              Start a project
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
