"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";

const footerLinks = [
  { label: "Services", href: "/services" },
  {
    label: "AI + Growth",
    href: "/ai-automation-digital-marketing-udupi",
  },
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "LinkedIn", href: siteConfig.social.linkedinPersonal },
  { label: "Twitter", href: siteConfig.social.twitter },
  { label: "Linktree", href: siteConfig.social.linktree },
  { label: "GitHub", href: siteConfig.social.github },
  { label: "Privacy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <p className="text-text font-bold text-xl tracking-tight mb-4">
              MCH<span className="text-accent-teal">.</span>
            </p>
            <p className="text-text-muted text-body-md max-w-xs">
              Product, web, and experience systems built in Udupi for teams
              anywhere.
            </p>
            <p className="mt-4 max-w-xs text-sm text-text-dim">
              Surbhi 202, Doddanagudde, Udupi, Karnataka 575101
              <br />
              Open every day, 11:00 AM-9:00 PM
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-label-sm uppercase text-text-dim mb-6 tracking-widest">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-text-muted hover:text-text transition-colors duration-300 text-body-md w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <p className="text-label-sm uppercase text-text-dim mb-6 tracking-widest">
              Start a Project
            </p>
            <p className="text-accent-teal text-body-lg block mb-2">
              Chat on WhatsApp
            </p>
            <p className="text-text-dim text-sm mb-4">
              Or call{" "}
              <a href={`tel:${siteConfig.phone}`} className="hover:text-text">
                {siteConfig.phoneDisplay}
              </a>
              <br />
              Email {siteConfig.email}
            </p>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border border-text-dim text-text text-label-sm uppercase tracking-widest hover:bg-text hover:text-surface transition-all duration-300"
            >
              Start on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-surface-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-text-dim text-sm">
            &copy; {new Date().getFullYear()} Meow Creative Haus. All rights
            reserved.
          </p>
          <p className="text-text-dim text-sm">
            Engineered for scale.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
