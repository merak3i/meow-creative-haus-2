export interface ShipLogEntry {
  badge?: string;
  date: string;
  title: string;
  description: string;
  href?: string;
  releaseDetails?: boolean;
  resources?: Array<{ name: string; detail: string }>;
}

export const entries: ShipLogEntry[] = [
  {
    date: "OCT 01 2026",
    title: "v1.9.0: Sanctum gets an original archive identity",
    description:
      "An early rebuild gives Meow Ops Sanctum a grounded archive setting, a fictional guide, and a distinct Archive Seal. Dated design records help compare versions; they do not establish legal rights.",
    badge: "LATEST",
    releaseDetails: true,
    resources: [
      { name: "Meow Ops", detail: "Sanctum build" },
      { name: "Archive Seal", detail: "authored mark" },
    ],
    href: "https://meow-ops.vercel.app/#/sanctum",
  },
  {
    date: "SEP 15 2026",
    title: "v1.8.0: The workbench opens",
    description:
      "Repeated corrections from real sessions became a public library of 16 editable skills. They cover writing, research, browser checks, release review and recurring work. Each one is plain Markdown, available separately or as one ZIP, with examples and limits visible before download. Treat them as starting points. You still have to understand your own workflow, spend time with the details, and rewrite each skill around your tools. One size does not fit all, especially when automation enters the work. A weekly or monthly log reviewer, pattern analyser or data miner can show you what keeps repeating and what needs to change. The more personal the skill becomes, the more useful it gets.",
    href: "/lab/skills",
    resources: [
      { name: "Codex", detail: "build + verify" },
      { name: "Claude Code", detail: "draft + revise" },
      { name: "Cursor", detail: "inspect + edit" },
      { name: "Hermes", detail: "cross-agent check" },
      { name: "Antigravity", detail: "browser proof" },
    ],
  },
  {
    date: "AUG 31 2026",
    title: "v1.7.0: The Meow Ops mockups get replaced by the real thing",
    description:
      "Six captures from the running app take over the product carousel: Today, Ledger, Runs, Map, Sanctum, and mobile. The illustrated placeholders are gone. Live client sites move up to the top of the homepage so the first proof arrives before the first pitch, the founder section stops talking about multiplying ARR, and every em dash on the site has been retired.",
  },
  {
    date: "AUG 31 2026",
    title: "v1.2.0: Meow Ops becomes an inbox",
    description:
      "Five surfaces: Today, Review, Ledger, Sanctum, Learn. The focus timer is a chip on every screen. Companion is gone. Learn mines concepts from sessions you already ran. Each card has a name, a short industry summary, a layman what-you-did line, a source, and an I get this mark. You search YouTube yourself. No school. No XP.",
  },
  {
    date: "JUL 19 2026",
    title: "v1.6.2: Builder's Journey opens",
    description:
      "Meow Ops gains a calm, private learning track from vibe-led exploration to first-principles craft: start anywhere, resume unfinished workshops, practise quick recall for up to 360 days, and progress only when real evidence supports it.",
  },
  {
    date: "JUL 18 2026",
    title: "v1.6.1: Project learning moves under owner control",
    description:
      "Evidence from Codex, Claude Code, Hermes, Antigravity, and Cursor now enters one private local plane. Meow Ops can propose reusable learning, but publication, agent distribution, and rollback remain owner-governed.",
  },
  {
    date: "JUL 16 2026",
    title: "v1.6.0: Record of Scrying Sanctum build and refinement",
    description:
      "A retrospective release record follows the Apr 12 to May 4 build from the first source-stat Sanctum through its WoW overhaul, Dalaran phases, citadel and floor refinements, Lich King pass, design-system freeze, modular extraction, and final visual and session-label polish.",
  },
  {
    date: "JUL 05 2026",
    title: "v1.5.1: The homepage stops bragging, starts proving",
    description:
      "The revenue-engineering pitch and its unverifiable stats retire. The hero leads with one honest line, we design and build software worth feeling. A Selected Work panel puts live projects up front (meow.wild, Patherle, EAASH, Coastal Edge), and the four offers become Experiences, Product & Web, AI Systems, and Growth. Every claim on the page is a link you can click.",
  },
  {
    date: "JUN 14 2026",
    title: "v1.5.0: The site learns to scroll",
    description:
      "A scroll-led rebuild. The hero assembles a live revenue dashboard as you descend, Loop Ops becomes a scroll-scrubbed walkthrough, and a smooth-scroll engine with a progress rail ties the page together. Space Grotesk lands in the product frames.",
  },
  {
    date: "JUN 13 2026",
    title: "v1.4.0: Loop Ops goes public",
    description:
      "Meow Ops opens up with a five-frame Loop Ops tour built from generic demo data and an evidence-first posture.",
  },
  {
    date: "JUN 13 2026",
    title: "v1.4.0: FILE // 003, Patherle partially declassified",
    description:
      "The AI business OS we're building in the dark gets a teaser page: five stills, gold [WITHHELD] bars, and a build log that says just enough.",
  },
  {
    date: "JUN 13 2026",
    title: "v1.4.0: Meow Ops becomes a control room",
    description:
      "Loop Ops ships inside Meow Ops with a generic workbook importer, local run timelines, and evidence-first node states.",
  },
  {
    date: "APR 15 2026",
    title: "v1.3.0: The Lab fills up",
    description:
      "Client showcases, video and shorts carousels, and a marquee of brands built to convert.",
  },
];

export const releaseSlug = (entry: ShipLogEntry, index: number) =>
  entry.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") +
  "-" +
  (index + 1);
export const releaseDate = (entry: ShipLogEntry) =>
  new Date(entry.date).toISOString().slice(0, 10);
