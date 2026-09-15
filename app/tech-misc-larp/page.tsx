import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { latestZineIssue, zineIssues } from "@/lib/zines";

export const metadata: Metadata = {
  title: "tech+misc larp: An irregular technology zine",
  description:
    "The home of tech+misc larp, an irregular, click-to-scroll technology zine from Meow Creative Haus.",
  alternates: {
    canonical: "/tech-misc-larp",
  },
  openGraph: {
    title: "tech+misc larp: An irregular technology zine",
    description:
      "Personal field notes from the information onslaught, arranged into clickable issues.",
    url: "/tech-misc-larp",
    type: "website",
    images: [
      {
        url: latestZineIssue.cover,
        width: 1238,
        height: 1548,
        alt: "Rise of the AGI, issue 01 of tech+misc larp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "tech+misc larp: An irregular technology zine",
    description: "Personal field notes from the information onslaught.",
    images: [latestZineIssue.cover],
  },
};

export default function TechMiscLarpArchivePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050706] pb-28 pt-32 text-[#f4f0e5]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12">
        <header className="relative border-b border-[#26322b] pb-16 md:pb-24">
          <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#55df96]/10 blur-[100px]" aria-hidden="true" />
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-[#55df96]">
            Meow Creative Haus / irregular publication
          </p>
          <h1 className="max-w-[1050px] font-serif text-[clamp(3.5rem,10vw,9rem)] font-semibold leading-[0.78] tracking-[-0.065em]">
            tech+misc<br />larp
          </h1>
          <div className="mt-10 grid max-w-[900px] gap-6 md:grid-cols-2 md:gap-16">
            <p className="font-serif text-2xl italic leading-snug text-[#d9ccba]">
              chronically online, now with an archive
            </p>
            <p className="text-sm leading-relaxed text-[#91a096]">
              A personal zine made whenever the information onslaught leaves enough debris to arrange into pages. No weekly cadence. No content calendar. It fires when it fires.
            </p>
          </div>
        </header>

        <section className="py-16 md:py-24" aria-labelledby="latest-issue-heading">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#55df96]">Latest transmission</p>
              <h2 id="latest-issue-heading" className="mt-2 font-serif text-3xl md:text-5xl">Read the newest issue</h2>
            </div>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-[#68756d] sm:block">scroll / click / arrows</span>
          </div>

          <Link href={latestZineIssue.href} className="group grid overflow-hidden border border-[#2c3931] bg-[#090c0a] lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative overflow-hidden bg-[#111512] p-6 md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(85,223,150,0.1),transparent_65%)]" aria-hidden="true" />
              <Image src={latestZineIssue.cover} alt={`Cover of ${latestZineIssue.issue}: ${latestZineIssue.title}`} width={1238} height={1548} sizes="(max-width: 1023px) 82vw, 470px" priority className="relative mx-auto h-auto w-full max-w-[470px] -rotate-2 border border-[#36443b] shadow-[0_35px_90px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.015]" />
            </div>
            <div className="flex flex-col justify-between border-t border-[#2c3931] p-7 md:p-12 lg:border-l lg:border-t-0">
              <div>
                <div className="mb-7 flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-[0.16em]">
                  <span className="border border-[#55df96]/40 px-3 py-1 text-[#55df96]">{latestZineIssue.issue}</span>
                  <span className="border border-[#2c3931] px-3 py-1 text-[#7c8981]">{latestZineIssue.pageCount} pages</span>
                  <span className="border border-[#2c3931] px-3 py-1 text-[#7c8981]">{latestZineIssue.displayDate}</span>
                </div>
                <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[#7c8981]">{latestZineIssue.eyebrow}</p>
                <h3 className="font-serif text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[0.88] tracking-[-0.045em]">{latestZineIssue.title}</h3>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-[#9da9a1]">{latestZineIssue.description}</p>
              </div>
              <span className="mt-12 inline-flex w-fit items-center gap-3 border-b border-[#55df96] pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#55df96]">
                Open issue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </section>

        <section className="border-t border-[#26322b] pt-16 md:pt-24" aria-labelledby="all-issues-heading">
          <div className="mb-10 grid gap-5 md:grid-cols-[1fr_0.8fr] md:items-end">
            <h2 id="all-issues-heading" className="font-serif text-4xl md:text-6xl">All issues</h2>
            <p className="max-w-lg text-sm leading-relaxed text-[#839087] md:justify-self-end">
              Each issue gets its own cover, date, and permanent reader. This shelf grows sideways without burying the articles around it.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {zineIssues.map((issue) => (
              <Link key={issue.slug} href={issue.href} className="group grid grid-cols-[110px_1fr] gap-5 border border-[#26322b] bg-[#090c0a] p-4 transition-colors hover:border-[#55df96]/60 sm:block">
                <Image src={issue.cover} alt="" width={1238} height={1548} sizes="(max-width: 639px) 110px, 300px" className="h-auto w-full border border-[#26322b] sm:mb-5" />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#55df96]">{issue.issue} / {issue.displayDate}</p>
                  <h3 className="mt-2 font-serif text-2xl leading-none group-hover:text-[#55df96]">{issue.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#7c8981]">{issue.pageCount} pages · click-to-scroll reader</p>
                </div>
              </Link>
            ))}
            <div className="flex min-h-[190px] items-end border border-dashed border-[#26322b] p-5 text-[#5f6b63] sm:min-h-[420px]" aria-label="Space reserved for the next issue">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Next issue</span>
                <p className="mt-2 font-serif text-2xl italic">whenever the next onslaught lands</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
