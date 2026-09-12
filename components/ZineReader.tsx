"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp } from "lucide-react";
import { useLenis } from "@/components/LenisProvider";

const pages = [
  ["Cover", "Rise of the AGI"],
  ["Meme", "Kimi K3 and GLM 5.3, one week after Astra launched"],
  ["Pre-AI spotlight", "The guy who wrote Cloudflare into existence"],
  ["Pre-AI spotlight", "Lee Holloway, part two"],
  ["The main event", "OpenAI declares the AGI era"],
  ["Polymarket", "The Fed, tariffs, and AI capex"],
  ["Drama", "The million-dollar math problem"],
  ["The fight", "OpenAI, NYU, and the provenance argument"],
  ["Quiet war", "DeepSeek retires its own pro model"],
  ["Meme", "37 million views on a palm-reading ad"],
  ["Annotation", "How a labeled pixel becomes a demand forecast"],
  ["Visibility", "One Gemini, three attribution habits"],
  ["Meme", "Claude Code and a rocket test"],
  ["Visibility", "Your website is 10% of what AI says"],
  ["Breaking points", "Is AGI here? No verdict"],
  ["The rogue-agent arc", "Agents built a secret message board"],
  ["The verdict", "The cluster wipe"],
  ["The stack", "A one-person marketing team, ranked"],
  ["Profile", "Pliny the Liberator"],
  ["What happens next", "Five unresolved questions"],
  ["Back cover", "Issue 02 fires when the next onslaught lands"],
] as const;

const padPage = (page: number) => String(page).padStart(2, "0");

export default function ZineReader() {
  const [activePage, setActivePage] = useState(1);
  const pageRefs = useRef<Array<HTMLElement | null>>([]);
  const { lenis } = useLenis();

  const goToPage = (page: number) => {
    const safePage = Math.min(Math.max(page, 1), pages.length);
    const target = pageRefs.current[safePage - 1];
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, { offset: -76 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) {
          setActivePage(Number(mostVisible.target.getAttribute("data-page")));
        }
      },
      { rootMargin: "-22% 0px -45%", threshold: [0.1, 0.4, 0.7] },
    );

    pageRefs.current.forEach((page) => page && observer.observe(page));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        goToPage(activePage + 1);
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goToPage(activePage - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goToPage(1);
      } else if (event.key === "End") {
        event.preventDefault();
        goToPage(pages.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePage, lenis]);

  return (
    <div className="relative bg-[#050706] pb-28 pt-28 text-[#f4f0e5] md:pb-20">
      <header className="mx-auto grid max-w-[1500px] gap-8 px-5 pb-14 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,430px)] lg:items-end lg:pb-20">
        <div>
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7fa492] transition-colors hover:text-[#d1ffdf]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Meow Creative Haus
          </Link>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#55df96]">
            tech+misc larp / issue 01 / sept 12, 2026
          </p>
          <h1 className="max-w-[900px] font-serif text-[clamp(3.1rem,9vw,8.8rem)] font-semibold leading-[0.78] tracking-[-0.065em]">
            rise of<br />the agi
          </h1>
        </div>
        <div className="border-l border-[#55df96]/40 pl-5">
          <p className="font-serif text-xl italic leading-snug text-[#d9ccba]">
            chronically online, now with page numbers
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#91a096]">
            Twenty-one pages from twelve noisy days. Click a signal in the rail,
            use the arrow keys, or keep scrolling.
          </p>
          <button
            type="button"
            onClick={() => goToPage(1)}
            className="mt-7 inline-flex items-center gap-2 border border-[#55df96]/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#55df96] transition-colors hover:bg-[#55df96] hover:text-[#050706]"
          >
            Enter issue <ArrowDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-8 px-3 sm:px-5 md:px-10 lg:grid-cols-[190px_minmax(0,1fr)_72px] xl:grid-cols-[230px_minmax(0,1fr)_90px]">
        <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] self-start lg:flex lg:flex-col" aria-label="Issue contents">
          <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.24em] text-[#66736b]">
            Signal rail
          </p>
          <div className="min-h-0 flex-1 overflow-y-auto pr-3">
            {pages.map(([category, title], index) => {
              const page = index + 1;
              const active = page === activePage;
              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => goToPage(page)}
                  aria-current={active ? "page" : undefined}
                  className={`group grid w-full grid-cols-[28px_1fr] gap-2 border-l py-2 pl-3 text-left transition-colors ${
                    active
                      ? "border-[#55df96] text-[#f4f0e5]"
                      : "border-[#202923] text-[#68756d] hover:border-[#607f6d] hover:text-[#b7c1ba]"
                  }`}
                >
                  <span className="font-mono text-[9px]">{padPage(page)}</span>
                  <span>
                    <span className="block font-mono text-[8px] uppercase tracking-[0.12em] text-[#55df96]/65">
                      {category}
                    </span>
                    <span className="mt-0.5 block text-[10px] leading-tight">{title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="min-w-0" aria-label="Tech plus misc LARP issue 01">
          {pages.map(([category, title], index) => {
            const page = index + 1;
            return (
              <article
                key={title}
                id={`issue-page-${page}`}
                data-page={page}
                ref={(element) => {
                  pageRefs.current[index] = element;
                }}
                className="mb-7 scroll-mt-24 md:mb-12"
                aria-labelledby={`issue-page-${page}-title`}
              >
                <div className="mb-3 flex items-end justify-between gap-4 px-1">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#55df96]">{category}</p>
                    <h2 id={`issue-page-${page}-title`} className="mt-1 text-xs text-[#9da9a1]">{title}</h2>
                  </div>
                  <span className="font-mono text-[9px] text-[#66736b]">{padPage(page)} / 21</span>
                </div>
                <div className="overflow-hidden border border-[#27332c] bg-[#0b0e0c] shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
                  <Image
                    src={`/tech-misc-larp/issue-01/page-${padPage(page)}.webp`}
                    alt={`Page ${page} of tech+misc larp issue 01: ${title}`}
                    width={1238}
                    height={1548}
                    sizes="(max-width: 1023px) 100vw, 980px"
                    priority={page <= 2}
                    className="h-auto w-full"
                  />
                </div>
              </article>
            );
          })}
        </main>

        <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] self-start lg:flex lg:flex-col lg:items-center lg:justify-between" aria-label="Reader controls">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#66736b] [writing-mode:vertical-rl]">
            scroll / click / arrows
          </span>
          <div className="flex flex-col items-center gap-3">
            <button type="button" onClick={() => goToPage(activePage - 1)} disabled={activePage === 1} aria-label="Previous page" className="border border-[#27332c] p-2 text-[#819087] transition-colors hover:border-[#55df96] hover:text-[#55df96] disabled:opacity-25">
              <ArrowUp className="h-4 w-4" />
            </button>
            <span className="font-mono text-xs text-[#55df96]">{padPage(activePage)}</span>
            <div className="h-28 w-px bg-[#27332c]">
              <div className="w-px bg-[#55df96] transition-[height] duration-300" style={{ height: `${(activePage / pages.length) * 100}%` }} />
            </div>
            <span className="font-mono text-[9px] text-[#66736b]">21</span>
            <button type="button" onClick={() => goToPage(activePage + 1)} disabled={activePage === pages.length} aria-label="Next page" className="border border-[#27332c] p-2 text-[#819087] transition-colors hover:border-[#55df96] hover:text-[#55df96] disabled:opacity-25">
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </aside>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-2 border border-[#334139] bg-[#080b09]/95 p-2 shadow-2xl backdrop-blur md:inset-x-6 lg:hidden" aria-label="Mobile reader controls">
        <button type="button" onClick={() => goToPage(activePage - 1)} disabled={activePage === 1} aria-label="Previous page" className="shrink-0 border border-[#27332c] p-2 text-[#55df96] disabled:opacity-25">
          <ArrowUp className="h-4 w-4" />
        </button>
        <div className="min-w-0 flex-1 overflow-x-auto">
          <div className="flex min-w-max gap-1">
            {pages.map(([, title], index) => {
              const page = index + 1;
              return (
                <button key={title} type="button" onClick={() => goToPage(page)} aria-label={`Go to page ${page}: ${title}`} aria-current={page === activePage ? "page" : undefined} className={`h-8 w-8 font-mono text-[9px] transition-colors ${page === activePage ? "bg-[#55df96] text-[#050706]" : "text-[#819087] hover:bg-[#182019]"}`}>
                  {padPage(page)}
                </button>
              );
            })}
          </div>
        </div>
        <button type="button" onClick={() => goToPage(activePage + 1)} disabled={activePage === pages.length} aria-label="Next page" className="shrink-0 border border-[#27332c] p-2 text-[#55df96] disabled:opacity-25">
          <ArrowDown className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
}
