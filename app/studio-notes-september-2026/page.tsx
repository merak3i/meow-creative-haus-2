import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "been building, forgot to write about it — Meow Creative Haus",
  description:
    "A few months of MCH work: OneClickWebsite India, BergLabs, Tender Moments, Meow Ops, a zine, and Patherle in progress.",
  openGraph: {
    title: "been building, forgot to write about it",
    description:
      "A few months of MCH work, client systems, and the things still held together with WIP.",
    type: "article",
    publishedTime: "2026-09-15T00:00:00.000Z",
    authors: ["Vismay Hegde"],
    images: ["/studio-notes/01-cover.webp"],
  },
};

function Figure({
  src,
  alt,
  caption,
  screenshot = false,
}: {
  src: string;
  alt: string;
  caption: string;
  screenshot?: boolean;
}) {
  return (
    <figure className="my-10 md:my-14">
      <div className={screenshot ? "border border-surface-border bg-surface-elevated p-2 md:p-3" : "overflow-hidden border border-surface-border"}>
        <img src={src} alt={alt} className="block h-auto w-full" loading="lazy" />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-text-dim">{caption}</figcaption>
    </figure>
  );
}

export default function StudioNotesSeptember2026() {
  return (
    <main className="min-h-screen bg-[#f7f5ed] text-[#182623]">
      <div className="fixed inset-x-0 top-0 z-40 h-24 bg-[#0a0a0a]" aria-hidden="true" />
      <div className="mx-auto max-w-[900px] px-6 pb-24 pt-32 md:px-10 md:pt-44">
        <Link href="/#substack" className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#4b716a] hover:text-[#157e73]">
          ← back to the playbook
        </Link>

        <article className="mt-12">
          <header className="max-w-[760px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#157e73]">from the lab · 15 september 2026</p>
            <h1 className="mt-5 font-sans text-[clamp(2.7rem,8vw,5.8rem)] font-bold leading-[0.95] tracking-[-0.06em] text-[#182623]">
              been building, forgot to write about it
            </h1>
            <p className="mt-7 max-w-[620px] font-serif text-xl leading-relaxed text-[#4b716a]">
              a few months of mch, some client work, and the things still held together with WIP
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#6d7b76]">by vismay hegde · meow creative haus</p>
          </header>

          <Figure
            src="/studio-notes/01-cover.webp"
            alt="A pixel-art studio at night, with a shop model, glowing paths and an unfinished landscape on a desk"
            caption="a few things on the worktable"
          />

          <div className="article-copy font-serif text-[1.1rem] leading-[1.85] text-[#263b36] md:text-[1.18rem]">
            <p>been a bit buried in the work lately</p>
            <p>websites, enquiry flows, editors, then somehow a small fantasy world for dev logs</p>
            <p>thought i&apos;d put some of it here while i still remember why we changed things</p>

            <h2>first, 1clickwebsiteindia</h2>
            <p>for 1clickwebsiteindia, we&apos;ve been working on a website builder for local businesses</p>
            <p>the brief sounds simple enough: give the business its own page, let the owner understand what they&apos;re changing, make it work on a phone</p>
            <p>the editor now has phone, tablet and desktop previews, section controls and bounded design remixes in the code</p>
            <p>there&apos;s presentation editing taking shape too, with editable text, slide ordering and undo</p>
            <p>still WIP, but this is the part i care about: can someone change a thing without feeling like they&apos;ve broken the whole thing</p>
            <p>small alpha from this one: put the preview close to the decision</p>
            <p>“save” is a surprisingly large commitment when you have no idea what happens next</p>
          </div>

          <figure className="my-10 md:my-14">
            <div className="overflow-hidden border border-surface-border bg-[#0a0a0a] p-2 md:p-3">
              <img
                src="/studio-notes/ocw-workflow-collage.webp"
                alt="Collage of four real 1ClickWebsite India builder screens showing business setup, content input, AI suggestions and review preview"
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-text-dim">
              real builder screens / input → suggestions → review
            </figcaption>
          </figure>

          <div className="article-copy font-serif text-[1.1rem] leading-[1.85] text-[#263b36] md:text-[1.18rem]">
            <h2>berglabs, and the journey after the post</h2>
            <p>with berglabs, part of the work has been around carrying useful context from a social post towards an enquiry</p>
            <p>labelled links, first and latest visits, somewhere for that information to go</p>
            <p>the new attribution work is prepared locally; the staging installation and CRM connection still need proving</p>
            <p>one detail worth keeping: analytics consent and advertising consent are separate</p>
            <p>saying yes to understanding a visit shouldn&apos;t quietly become yes to ad pixels</p>
            <p>the website direction is changing too: four managed services up front, platforms and applications further in as evidence of how the work gets done</p>
            <p>that is still being worked through</p>
            <p>people arrive with a problem. making them learn the entire company vocabulary before they can choose anything is quite a tax</p>
          </div>

          <Figure
            src="/studio-notes/04-berglabs.webp"
            alt="A glowing path passes two lit stops and a gate towards an unfinished bridge"
            caption="keeping context, with a connection still to finish"
          />
          <Figure
            src="/studio-notes/05-service-first.webp"
            alt="Four illuminated doorways reveal different distant machines"
            caption="choose the service first"
          />

          <div className="article-copy font-serif text-[1.1rem] leading-[1.85] text-[#263b36] md:text-[1.18rem]">
            <h2>tender moments, especially reply two</h2>
            <p>tender moments has involved the website, parent-facing content and the enquiry process around it</p>
            <p>clearer visit prompts, a compact testimonial section, and a lead register that puts age band, programme, care hours, start timing and area together</p>
            <p>the staff still enters the enquiry. there isn&apos;t a magical inbox-to-sheet connection hiding here (yet)</p>
            <p>right now, n+1 is the basic acknowledgement</p>
            <p>after that, staff read what the parent actually said and follow up in their own words. pasting an LLM reply into that moment loses trust</p>
            <p>the future path is a webhook into a database update, then support for n+2 and n+n replies without hiding the human inside the workflow</p>
            <p>you find the missing information very quickly</p>
          </div>

          <Figure
            src="/studio-notes/06-tender-moments.webp"
            alt="Five coloured blocks in a tray beside stepping stones to a school doorway"
            caption="the useful details, together"
          />
          <Figure
            src="/studio-notes/07-second-reply.webp"
            alt="A person arranges five tiles between a complete and an unfinished speech bubble"
            caption="there is work between welcome and follow-up"
          />

          <div className="article-copy font-serif text-[1.1rem] leading-[1.85] text-[#263b36] md:text-[1.18rem]">
            <h2>the bits worth copying</h2>
            <p>the useful tools are small: a preview beside the edit, a labelled source link, a lead register that keeps the fields together, a second reply with a human in it, and an estimate that stays an estimate</p>
            <p>copy the order before you copy the stack. put the decision in front of the person, keep the context attached, then leave a clear place to pivot when the answer changes</p>
            <p>that is enough to start. the rest can earn its way in</p>
          </div>

          <div className="article-copy font-serif text-[1.1rem] leading-[1.85] text-[#263b36] md:text-[1.18rem]">
            <h2>the small instructions have a shelf now</h2>
            <p>some of the MCH in-house flow is now available through the skills section on the website</p>
            <p>clear answer helps get to the point. keep my voice edits without sanding the writing flat. usable handoff makes the result easier for the next person to pick up</p>
            <p>they are small instruction files built from repeated work, which is probably the right size for them</p>
            <p><Link className="text-[#157e73] underline decoration-[#157e73]/40 underline-offset-4 hover:text-[#0f5d56]" href="/lab/skills">browse the MCH skills</Link></p>
          </div>

          <Figure
            src="/studio-notes/skills-release.webp"
            alt="The live MCH public skills shelf showing filters and downloadable skill cards"
            caption="the live skills shelf / 16 resources grouped by the work"
            screenshot
          />

          <div className="article-copy font-serif text-[1.1rem] leading-[1.85] text-[#263b36] md:text-[1.18rem]">
            <h2>meanwhile, meow ops got a little carried away</h2>
            <p>what started as making dev logs readable is growing into an interactive 3d sanctum</p>
            <p>the sanctum is being carried through blender work, with a local guide that has voice and mouth-animation work</p>
            <p>session identity and usage now have a place in a world. the local guide has voice and mouth-animation work; character tests are happening separately while the full scene comes together</p>
            <p>there&apos;s also a slightly strange personal-assistant idea in the mix: a krishna-inspired fren. e-krishna to e-arjuna (you), with the guide helping you look at the work without pretending to be the answer</p>
            <p>very much WIP</p>
            <p>also, estimated cost stays estimated cost. dressing a number up nicely doesn&apos;t turn it into an invoice</p>
            <p>i like seeing an internal tool get a personality. i also want to be able to tell which session i&apos;m looking at</p>
            <p>both jobs remain</p>
          </div>

          <Figure
            src="/studio-notes/08-meow-ops.webp"
            alt="A pixel observatory with distinct session markers and scaffolding"
            caption="dev logs grew a world"
          />

          <div className="article-copy font-serif text-[1.1rem] leading-[1.85] text-[#263b36] md:text-[1.18rem]">
            <h2>a zine escaped, and october has a token problem</h2>
            <p>tech+misc larp issue 01 is out</p>
            <p>randomly fired, whenever there&apos;s something worth putting together</p>
            <p><a className="text-[#157e73] underline decoration-[#157e73]/40 underline-offset-4 hover:text-[#0f5d56]" href="https://meowcreativehaus.xyz/tech-misc-larp">read issue 01 here</a></p>
            <p>next month i&apos;m planning to move most of the mch workflow towards hermes agent + kimi k3</p>
            <p>the aim is lower token cost. the migration is WIP and the savings are still something to measure</p>
            <p>cheap inference gets less exciting if i spend the evening repairing the output, so that&apos;ll be part of the experiment too</p>
            <p>i&apos;m also exploring Kunchenguid&apos;s Firstmate, Herdr and Lavish around agent supervision and visual review. that is exploratory too, not the new permanent stack</p>
          </div>

          <Figure
            src="/studio-notes/09-zine-and-october.webp"
            alt="An open zine, two small computers, an hourglass and tokens on a desk"
            caption="a zine out, a workflow experiment ahead"
          />

          <div className="article-copy font-serif text-[1.1rem] leading-[1.85] text-[#263b36] md:text-[1.18rem]">
            <h2>the little green squares</h2>
            <p>1,683 contributions in the last year, in this github snapshot</p>
            <p>quite a lot of tabs behind those squares. some building, some fixing what i&apos;d just built. keeping the screenshot here as a small receipt of time spent; the useful part is still whether the things work for someone else</p>
          </div>

          <Figure
            src="/studio-notes/github-snapshot.webp"
            alt="Actual GitHub profile screenshot for merak3i showing 1,683 contributions in the last year, captured 15 September 2026"
            caption="github snapshot / 15 sep 2026 / 1,683 contributions in the last year"
            screenshot
          />

          <div className="article-copy font-serif text-[1.1rem] leading-[1.85] text-[#263b36] md:text-[1.18rem]">
            <h2>lastly, patherle</h2>
            <p>patherle is about business conversations and the work those conversations create</p>
            <p>the current workspace brings knowledge, conversations, campaigns and voice setup into the same place</p>
            <p>one small change i like: new users get directed towards the next unfinished setup step; returning users keep the page they came back to</p>
            <p>knowledge upload has files and pasted text, progress, parse errors and retry paths. website crawling is gated</p>
            <p>there are a few friends-and-family businesses testing the beta now</p>
            <p>the small-business agent is being shaped for sales, customer service and social media. that release sits further out, towards 2027, so the current work is still about finding the shape</p>
            <p>there&apos;s more being built, but i&apos;ll leave it there for now</p>
            <p>a lot of the recent work has been this sort of thing. making the next action clearer, giving someone a way back when something fails</p>
            <p>less exciting to announce than a new feature, until you&apos;re the person trying to use it</p>
            <p>anyway, back to the tabs</p>
          </div>

          <Figure
            src="/studio-notes/10-patherle.webp"
            alt="Two paths lead through a shared file library towards a familiar workspace"
            caption="finding your way in, and your way back"
          />
        </article>
      </div>
      <style>{`.article-copy h2{font-family:Poppins,system-ui,sans-serif;font-weight:700;font-size:clamp(1.65rem,3vw,2.25rem);line-height:1.15;letter-spacing:-.03em;margin:4rem 0 1.35rem;color:#182623}.article-copy p{margin:1.15rem 0}.article-copy h2+p{margin-top:0}`}</style>
    </main>
  );
}
