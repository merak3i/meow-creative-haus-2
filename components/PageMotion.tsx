"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Reveal targets for browsers without CSS scroll timelines. Keep in sync with
// the reveal grammar in globals.css.
const revealTargets =
  "main :is(.section-heading h2,.gallery-heading h2,.contact-section h2,.work-card,.section-heading>p,.service-grid>article,.build-card,.lab-links>a,.faq-list>details,.media-item,.archive-list>article,.section-note)";

export default function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main section, main .page-intro, main .case-intro, main .archive-list > article, main .work-grid > article, main .media-group",
      ),
    ).filter((section) => !section.parentElement?.closest("section") &&
      !section.closest(".hero-scroll-track"));

    sections.forEach((section, index) => {
      section.dataset.lineSection = String(index % 2 === 0);
    });

    // Static line backgrounds load as their section approaches.
    const lines = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        lines.unobserve(entry.target);
        if ((entry.target as HTMLElement).dataset.lineSection === "true")
          entry.target.classList.add("section-lines");
      });
    }, { rootMargin: "0px 0px 25% 0px" });
    sections.forEach((section) => lines.observe(section));

    // Ambient motion (contact field) runs only while on screen and visible.
    const scopes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-motion-scope]"),
    );
    const onScreen = new Set<Element>();
    const syncScopes = () =>
      scopes.forEach((scope) => {
        scope.dataset.motion =
          onScreen.has(scope) && !document.hidden && !preference.matches
            ? "running"
            : "paused";
      });
    const ambient = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>
        entry.isIntersecting ? onScreen.add(entry.target) : onScreen.delete(entry.target),
      );
      syncScopes();
    });
    scopes.forEach((scope) => ambient.observe(scope));
    document.addEventListener("visibilitychange", syncScopes);
    preference.addEventListener("change", syncScopes);

    // Reveal fallback: only items that start below the fold are held back,
    // so nothing already on screen ever blinks.
    let reveal: IntersectionObserver | undefined;
    const pending: HTMLElement[] = [];
    if (!CSS.supports("animation-timeline: view()") && !preference.matches) {
      document.documentElement.classList.add("reveal-fallback");
      reveal = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal?.unobserve(entry.target);
          entry.target.classList.remove("reveal-pending");
        });
      }, { threshold: 0.12 });
      document.querySelectorAll<HTMLElement>(revealTargets).forEach((item) => {
        if (item.getBoundingClientRect().top < innerHeight) return;
        item.classList.add("reveal-target", "reveal-pending");
        pending.push(item);
        reveal?.observe(item);
      });
    }

    return () => {
      lines.disconnect();
      ambient.disconnect();
      reveal?.disconnect();
      document.removeEventListener("visibilitychange", syncScopes);
      preference.removeEventListener("change", syncScopes);
      pending.forEach((item) => item.classList.remove("reveal-target", "reveal-pending"));
      sections.forEach((section) => {
        section.classList.remove("section-lines");
        delete section.dataset.lineSection;
      });
    };
  }, [pathname]);

  return null;
}
