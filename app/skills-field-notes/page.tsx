import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import styles from "./reader.module.css";

export const dynamic = "force-static";
const title = "my laptop has a skill issue";
const description = "A personal field report on AI skills across Codex, Cursor, Claude Code and Hermes: useful defaults, specialist rescues and the limits of a local-history audit.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/skills-field-notes" },
  openGraph: { title, description, type: "article", url: "/skills-field-notes", publishedTime: "2026-09-15T00:00:00+05:30", images: [{ url: "/skills-field-notes/tier-list.png", width: 1536, height: 1024, alt: "Personal S and A tier list of AI skills in Meow Creative Haus colours" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/skills-field-notes/tier-list.png"] },
};

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => part.startsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part);
}

export default function SkillsFieldNotes() {
  const source = readFileSync(join(process.cwd(), "content/skills-field-notes.md"), "utf8");
  const blocks = source.split(/\n\s*\n/).slice(3);
  return (
    <article className={styles.reader}>
      <header className={styles.header}>
        <Link href="/#substack" className={styles.back}>← back to the playbook</Link>
        <p className={styles.eyebrow}>field notes / 15 september 2026 / by vismay hegde</p>
        <h1>my laptop has a <span>skill issue</span></h1>
        <p className={styles.dek}>the useful kind / what i keep asking AI to do, and where the small instructions earn their place</p>
        <a href="#s-tier-is-a-lot-of-editing-and-checking" className={styles.jump}>skip to the useful skills ↓</a>
      </header>
      <figure className={styles.hero}>
        <Image src="/skills-field-notes/tier-list.png" alt="S tier: writing, chat delivery, browser proof, PDF and documents, Rocky, social content. A tier: research, GTM and outreach, ops rhythm, vision rescue, finance documents, grilling. A pixel cat thinks about its own tools." width={1536} height={1024} priority sizes="(max-width: 1000px) 100vw, 1100px" unoptimized />
        <figcaption>personal utility tiers, not a benchmark · illustrated with AI · <a href="/skills-field-notes/tier-list.png" download>download the image</a></figcaption>
      </figure>
      <div className={styles.body}>
        {blocks.map((block, index) => {
          if (block.startsWith("## ")) {
            const text = block.slice(3).trim();
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");
            return <h2 key={index} id={id}>{text}</h2>;
          }
          if (block.startsWith("|")) {
            const rows = block.split("\n").filter((row) => !/^\|[\s|:-]+\|$/.test(row)).map((row) => row.split("|").slice(1, -1).map((cell) => cell.trim()));
            return <div key={index} className={styles.tableWrap} tabIndex={0} role="region" aria-label="Skill ranking table"><table><caption>Observed Cursor transcript IDs with an explicit read request</caption><thead><tr>{rows[0].map((cell) => <th key={cell} scope="col">{cell}</th>)}</tr></thead><tbody>{rows.slice(1).map((row) => <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>;
          }
          return <p key={index}>{inline(block.replace(/\n/g, " "))}</p>;
        })}
        <aside className={styles.note}>Source note: local aggregate audit dated 15 September 2026. Counts describe observed requests, not successful workflows or a complete lifetime history. No raw conversation records are published.</aside>
        <Link href="/#substack" className={styles.back}>← more from the playbook</Link>
      </div>
    </article>
  );
}
