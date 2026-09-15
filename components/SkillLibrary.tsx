"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { publicSkills, themes, type Theme } from "@/lib/public-skills";
import styles from "@/app/lab/skills/skills.module.css";

const chapters = [
  { tag: "01 / the idea", title: "good habits, in small files", body: "i kept asking for the same corrections. keep my voice. put the answer where i can use it. open the actual page. those patterns became a kit other people can adapt.", cards: [["16 workflows", "Short instructions you can read, edit and reuse"], ["4 themes", "Start with the job you need to finish"], ["Your setup", "Bring your own model, tools and permissions"]] },
  { tag: "02 / choose a job", title: "start with the friction", body: "a skill is useful when it changes a decision or catches a recurring mistake. choose one that fits the task, give it the right input, then inspect the result.", cards: [["The draft sounds wrong", "Keep my voice + Usable handoff"], ["The claim needs checking", "Research with receipts + Buyer context"], ["The export looks broken", "Compact documents + Reference-safe edits"]] },
  { tag: "03 / make it yours", title: "read it. try it. change it.", body: "start on a small task with a result you can check. edit the defaults that do not fit your work. the original usage audit informed the selection; it does not validate these new public versions.", cards: [["Read the file", "Check scope, required tools and the expected output"], ["Try a bounded task", "Compare the result with your source or reference"], ["Keep the useful change", "Add a rule only when a real correction supports it"]] },
];

export default function SkillLibrary() {
  const [chapter, setChapter] = useState(0);
  const [theme, setTheme] = useState<Theme | "All">("All");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [presenting, setPresenting] = useState(false);
  const presentation = useRef<HTMLElement>(null);
  const current = chapters[chapter];
  const matches = publicSkills.filter((skill) => (theme === "All" || skill.theme === theme) && `${skill.title} ${skill.summary} ${skill.when}`.toLowerCase().includes(query.toLowerCase().trim()));

  async function copyPrompt(prompt: string) {
    try { await navigator.clipboard.writeText(prompt); setMessage("Example request copied"); }
    catch { setMessage("Copy is unavailable here. Select the example request text and copy it manually."); }
  }

  function enterPresentation() {
    setPresenting(true);
    presentation.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    presentation.current?.focus({ preventScroll: true });
  }

  return <main className={styles.page}>
    <div className={styles.container}>
      <div className={styles.top}><Link href="/lab">← the lab</Link><span>public resources / session release 01</span></div>
      <section ref={presentation} tabIndex={-1} role={presenting ? "dialog" : "region"} aria-modal={presenting || undefined} data-lenis-prevent={presenting ? "" : undefined} aria-label="Three-chapter presentation" className={`${styles.presentation} ${presenting ? styles.presenting : ""}`} onKeyDown={(event) => {
        if (!presenting) return;
        if (event.key === "Escape") { setPresenting(false); return; }
        if (event.key === "Tab") {
          const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (event.shiftKey && (event.target === first || event.target === event.currentTarget)) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && event.target === last) { event.preventDefault(); first?.focus(); }
        }
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowRight") { event.preventDefault(); setChapter((value) => Math.min(2, value + 1)); }
        if (event.key === "ArrowLeft") { event.preventDefault(); setChapter((value) => Math.max(0, value - 1)); }
      }}>
        <div className={styles.chapterTop}><span>{current.tag}</span><button onClick={() => presenting ? setPresenting(false) : enterPresentation()}>{presenting ? "Exit presentation" : "Present this"}</button></div>
        <h1>{current.title}</h1>
        <p className={styles.intro}>{current.body}</p>
        <div className={styles.chapterCards}>{current.cards.map(([title, body]) => <div key={title}><h2>{title}</h2><p>{body}</p></div>)}</div>
        <div className={styles.controls}><button disabled={chapter === 0} onClick={() => setChapter(chapter - 1)}>← Previous</button><div role="group" aria-label="Choose chapter">{chapters.map((item, index) => <button key={item.tag} aria-label={`Chapter ${index + 1}`} aria-pressed={chapter === index} onClick={() => setChapter(index)}>{index + 1}</button>)}</div><button disabled={chapter === 2} onClick={() => setChapter(chapter + 1)}>Next →</button></div>
        <p className={styles.small}>{presenting ? "Use the chapter buttons, or focus this panel and use ← →. Escape exits." : "A three-chapter introduction. The full library is below."}</p>
      </section>

      <section className={styles.start} aria-labelledby="start-title"><div><p className={styles.label}>a small first task</p><h2 id="start-title">borrow one resource</h2><p>A skill is a resource: a compact piece of operating knowledge you can inspect, adapt and carry between tools. Choose one below, download its file, then attach it to a bounded AI task with your own inputs.</p></div><div><h3>Want to install it?</h3><p>Save the file as <code>SKILL.md</code> inside a folder named after the skill. Import that folder using your app’s skill support. Loading behavior varies by app; confirm the assistant can see the instructions. Downloading alone does not install anything.</p><p>These are tool-neutral instructions. Browser, OCR and document workflows need the corresponding tools. Nothing here adds an account, integration or scheduler.</p><a href="/skill-kit/mch-public-skills-v1.zip" download className={styles.primary}>Download all 16 resources ↓</a></div></section>

      <section aria-labelledby="library-title">
        <div className={styles.libraryHeading}><div><p className={styles.label}>choose by the work</p><h2 id="library-title">the useful kit</h2></div><label className={styles.search}>Find a skill<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="writing, browser, report…" /></label></div>
        <div className={styles.filters} role="group" aria-label="Filter by theme">{(["All", ...themes] as const).map((item) => <button key={item} aria-pressed={theme === item} onClick={() => setTheme(item)}>{item}</button>)}</div>
        <p className={styles.small}>S = core utility in my setup · A = useful for a particular task · personal tiers, not quality scores · every file is a resource to edit</p>
        <p className={styles.result} aria-live="polite">{matches.length} of 16 skills</p>
        <div className={styles.grid}>{matches.map((skill) => <article className={styles.skill} key={skill.id} id={skill.id}>
          <div className={styles.cardTop}><span>{skill.theme}</span><span className={styles.tier}>{skill.tier}</span></div>
          <h3>{skill.title}</h3><p>{skill.summary}</p>
          <details><summary>When to use it + example</summary><div className={styles.detail}><h4>Use it when</h4><p>{skill.when}</p><h4>Bring</h4><p>{skill.inputs}</p><h4>From my work patterns</h4><p>{skill.example}</p><p className={styles.small}>Composite illustration, informed by the local audit. No client identity or measured outcome is implied.</p><h4>A useful constraint</h4><p>{skill.limit}</p><h4>My advice</h4><p>{skill.advice}</p><h4>Try this request</h4><blockquote>{skill.prompt}</blockquote><button onClick={() => copyPrompt(skill.prompt)}>Copy example request</button><h4>What comes back</h4><p>{skill.output}</p></div></details>
          <a className={styles.download} href={`/lab/skills/${skill.id}`} download="SKILL.md">Download skill ↓ <span>plain Markdown</span></a>
        </article>)}</div>
        {matches.length === 0 && <p className={styles.empty}>No match. Try a broader term or choose All.</p>}
        <p role="status" className={styles.status}>{message}</p>
      </section>

      <section className={styles.notes}><div><h2>what became public</h2><p>Clear answer generalizes the concise-answer habit. Voice editing also covers the cleanup role. Buyer context combines qualification and nurture preparation. The remaining workflows cover the research, browser, document, context and recurring-work patterns in the original audit.</p><p>The downloads are newly written public workflows. They do not redistribute private configuration files or third-party skill implementations.</p></div><div><h2>reuse, with context</h2><p>You may use, modify and redistribute these files, including commercially, with their included notice retained. They are provided as-is. That permission covers the new files, not third-party software or services.</p><p>Examples are composites and tiers are personal judgments. File validation checks structure; it does not establish effectiveness across models or prove time saved. Treat the first task as a trial you can inspect.</p></div></section>
      <footer className={styles.footer}>made at meow creative haus · public kit v1.0 · <Link href="/lab">back to the lab</Link></footer>
    </div>
  </main>;
}
