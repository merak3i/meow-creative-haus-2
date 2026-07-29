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
    { label: "Work",     href: `${prefix}#offers`    },
    { label: "Services", href: "/services"           },
    { label: "About",    href: `${prefix}#authority` },
    { label: "Lab",      href: "/lab"                },
    { label: "Playbook", href: `${prefix}#substack`  },
    { label: "Contact",  href: siteConfig.whatsapp, external: true },
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
          aria-label="Meow Creative Haus home"
          className="text-text font-bold text-lg tracking-tight"
        >
          MCH<span className="text-accent-teal">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.label === "Services" ? (
              <div key={link.label} className="group relative">
                <a
                  href={link.href}
                  aria-haspopup="true"
                  className="text-label-sm uppercase text-text-muted hover:text-text transition-colors duration-300"
                >
                  {link.label}
                </a>
                <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-5 opacity-0 transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="border border-surface-border bg-surface/95 p-5 shadow-2xl backdrop-blur-md">
                    <p className="mb-3 text-[0.65rem] uppercase tracking-[0.2em] text-text-dim">
                      What we build
                    </p>
                    <div className="flex flex-col gap-1">
                      {servicePreview.map((service) => (
                        <a
                          key={service.href}
                          href={service.href}
                          className="px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface-elevated hover:text-text"
                        >
                          {service.label}
                        </a>
                      ))}
                    </div>
                    <a
                      href="/services"
                      className="mt-3 inline-block text-xs uppercase tracking-widest text-accent-teal hover:text-text"
                    >
                      View all services →
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-label-sm uppercase text-text-muted hover:text-text transition-colors duration-300"
              >
                {link.label}
              </a>
            ),
          )}
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
          className="lg:hidden flex flex-col gap-1.5 z-50"
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
            className="fixed inset-0 overflow-y-auto bg-surface/98 px-6 py-24 backdrop-blur-sm flex flex-col items-center justify-center gap-6 lg:hidden"
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
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
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
