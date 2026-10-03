"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main section, main .page-intro, main .case-intro, main .archive-list > article, main .work-grid > article, main .media-group",
      ),
    ).filter((section) => !section.parentElement?.closest("section") &&
      !section.closest(".hero-scroll-track"));

    sections.forEach((section, index) => {
      section.classList.toggle("section-lines", index % 2 === 0);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (preference.matches) return;
        const animation = entry.target.animate(
          [
            { opacity: 0.65, transform: "translateY(18px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 550, easing: "cubic-bezier(.2,.7,.2,1)" },
        );
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation)).catch(() => {});
      });
    }, { threshold: 0.08 });

    sections.forEach((section) => observer.observe(section));
    const cancel = () => {
      if (preference.matches) animations.forEach((animation) => animation.cancel());
    };
    preference.addEventListener("change", cancel);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", cancel);
      animations.forEach((animation) => animation.cancel());
      sections.forEach((section) => section.classList.remove("section-lines"));
    };
  }, [pathname]);

  return null;
}
