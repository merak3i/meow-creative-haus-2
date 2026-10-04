import {
  clientLogos,
  clientWebsites,
  clientVideos,
  clientShorts,
  featuredArticles,
} from "@/lib/data";
import imported from "@/lib/work-media.json";
import { unavailableArticleSources } from "@/lib/article-sources";

import { disciplines } from "@/lib/work-query";
export { disciplines } from "@/lib/work-query";
export type Discipline = (typeof disciplines)[number];
export interface WorkMedia {
  id: string;
  kind: "image" | "video" | "youtube" | "website" | "article" | "resource";
  title: string;
  group: string;
  status: string;
  src?: string;
  thumbnail?: string;
  href?: string;
  videoId?: string;
  width?: number;
  height?: number;
  createdAt?: string;
  publishedAt?: string;
  sourceHref?: string;
  caption?: string;
  sourceNote?: string;
}
export interface WorkProject {
  slug: string;
  name: string;
  description: string;
  brief: string;
  contribution: string;
  status: string;
  disciplines: Discipline[];
  media: WorkMedia[];
  note?: string;
  modifiedAt: string;
}
export const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const normalName = (name: string) =>
  name === "BergLabs.ai" ? "BergLabs" : name;
const names = [
  ...new Set([
    ...clientWebsites.map((w) => w.name),
    ...clientVideos.map((v) => v.client),
    ...clientShorts.map((s) => s.client),
    ...featuredArticles.map((a) => a.client),
    ...clientLogos.map((l) => normalName(l.name)),
  ]),
];
const newMedia = (slug: string): WorkMedia[] =>
  imported
    .filter((m) => m.project === slug)
    .map((m) => ({ ...m, kind: m.kind as WorkMedia["kind"] }));
const archival: WorkProject[] = names.map((name) => {
  const websites = clientWebsites.filter((w) => w.name === name);
  const videos = clientVideos.filter((v) => v.client === name);
  const shorts = clientShorts
    .filter((s) => s.client === name)
    .flatMap((s) => s.shorts);
  const articles = featuredArticles.filter((a) => a.client === name);
  const logo = clientLogos.find((l) => normalName(l.name) === name);
  const logoSrc = typeof logo?.src === "string" ? logo.src : logo?.src.src;
  const media: WorkMedia[] = [
    ...websites.map((w) => ({
      id: `website-${slugify(w.name)}`,
      kind: "website" as const,
      title: w.name + " · website",
      group: "Website",
      status: "Portfolio archive",
      thumbnail: w.screenshot,
      href: w.url,
      caption:
        w.name === "Tender Moments"
          ? "Preschool website work, shown with the live site hero."
          : w.tagline,
      width: 1440,
      height: 900,
    })),
    ...videos.map((v, i) => ({
      id: `video-${v.videoId}`,
      kind: "youtube" as const,
      title: `${v.title} · ${v.tag} ${i + 1}`,
      group: "Video & audio",
      status: "Portfolio archive",
      videoId: v.videoId,
      thumbnail: `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
      href: `https://www.youtube.com/watch?v=${v.videoId}`,
      caption: v.description,
      width: 480,
      height: 360,
    })),
    ...shorts.map((s, i) => ({
      id: `short-${slugify(name)}-${s.videoId}`,
      kind: "youtube" as const,
      title: `${name} · short ${i + 1}`,
      group: "Short form",
      status: "Portfolio archive",
      videoId: s.videoId,
      thumbnail: `https://i.ytimg.com/vi/${s.videoId}/hqdefault.jpg`,
      href: `https://www.youtube.com/shorts/${s.videoId}`,
      caption:
        s.videoId === "e5Kh8wJEUEw"
          ? "Historical placement. The source is ‘hacker hell - cybsersec news wrap’ by Meow World Order; project attribution is unresolved. This is not evidence of a separate Asset Mantle commission."
          : s.description,
      width: 480,
      height: 360,
    })),
    ...articles.map((a) => ({
      id: `article-${a.id}`,
      kind: "article" as const,
      title: a.title,
      group: "Writing & editorial",
      status: "Archived source",
      thumbnail: a.coverImage,
      href: a.href,
      caption: a.excerpt,
      sourceNote: unavailableArticleSources[a.id],
      width: 1200,
      height: 750,
    })),
    ...newMedia(slugify(name)),
    ...(logoSrc
      ? [
          {
            id: `roster-logo-${slugify(name)}`,
            kind: "image" as const,
            title: `${name} · historical roster logo`,
            group: "Historical brand record",
            status: "Roster record",
            src: logoSrc,
            thumbnail: logoSrc,
            sourceHref: logoSrc,
            caption:
              "Preserved brand mark from the original client roster. This logo alone does not establish services or outcomes.",
            width: 600,
            height: 600,
          },
        ]
      : []),
  ];
  const labels: Discipline[] = [];
  if (websites.length) labels.push("Websites");
  if (videos.length) labels.push("Motion");
  if (shorts.length) labels.push("Social");
  if (articles.length) labels.push("Editorial");
  if (name === "Tender Moments") labels.push("Social", "Motion");
  if (name === "BergLabs") labels.push("Social");
  const hasWork =
    websites.length +
      videos.length +
      shorts.length +
      articles.length +
      newMedia(slugify(name)).length >
    0;
  return {
    slug: slugify(name),
    name,
    description:
      websites[0]?.tagline ??
      (hasWork
        ? "Video, short-form and editorial work from the portfolio archive."
        : "A brand retained in the historical client roster."),
    brief: hasWork
      ? "The original written brief is not published in this archive. The linked records document the available formats."
      : "Historical client roster entry.",
    contribution: hasWork
      ? "The linked portfolio records and labelled exports below document the available work."
      : "A logo-only record does not establish a particular service or project outcome.",
    status: hasWork ? "Portfolio archive" : "Roster record",
    disciplines: [...new Set(labels)],
    media,
    modifiedAt: "2026-10-03",
  };
});
const tender = archival.find((p) => p.slug === "tender-moments")!;
tender.description =
  "A preschool website, illustrated learning stories and social creative.";
tender.brief =
  "Make early learning approachable for families across a website and social content.";
tender.contribution =
  "Website design and implementation, Kids 101 illustrations, social concepts, Montessori carousel design and Teachers’ Day motion artwork.";
tender.note =
  "September creation dates and Instagram publication evidence are separate. The seven illustrated exports are not seven verified published posts. The Teachers’ Day selection shows the finished motion artwork’s end card.";
tender.media.push(
  ...[
    {
      id: "tm-instagram-carry",
      title: "The carry is a transition",
      href: "https://www.instagram.com/tender_moments_hebbal/p/DdOmDHWzDtx/",
      publishedAt: "2026-09-13",
      caption:
        "Verified Instagram publication. Source link; not matched to a local export by date alone.",
    },
    {
      id: "tm-instagram-school",
      title: "School visit carousel",
      href: "https://www.instagram.com/tender_moments_hebbal/p/Dd05JgwGZlH/",
      publishedAt: "2026-09-28",
      caption:
        "Verified publication; this school visit post is separate from the local Montessori carousel.",
    },
    {
      id: "tm-instagram-calm",
      title: "A calmer start",
      href: "https://www.instagram.com/tender_moments_hebbal/p/Dd36pAXmbbi/",
      publishedAt: "2026-09-29",
      caption:
        "Verified Instagram publication. Local creation date is not inferred from publication.",
    },
  ].map((m) => ({
    ...m,
    kind: "resource" as const,
    group: "Instagram publication evidence",
    status: "Published",
  })),
);
const berg = archival.find((p) => p.slug === "berglabs")!;
berg.description =
  "Identity and website, with an expanding editorial design system.";
berg.contribution =
  "Identity exploration, website design and implementation, and labelled editorial carousel drafts.";
berg.note =
  "The citation fingerprint draft comments on Foundation × AirOps and PromptWatch research, with original attribution retained in the artwork. Robotics pre-annotation is a composite illustrative scenario, not a client result or measured outcome. Neither carousel is claimed as published.";
const extra: WorkProject[] = [
  {
    slug: "meow-wild",
    name: "meow.wild",
    status: "Interactive build",
    description: "A playful scroll story exploring the world of cats.",
    brief: "Turn a small curiosity into an exploratory web experience.",
    contribution:
      "Interactive storytelling and a scroll-led visual journey. Open the standalone build to explore it.",
    disciplines: ["Websites", "Products", "Concepts"],
    modifiedAt: "2026-10-03",
    media: [
      {
        id: "meow-wild-public-build",
        kind: "image",
        title: "meow.wild · public build capture",
        group: "Interactive build",
        status: "Public build",
        src: "/work-media/meow-wild-public-build.webp",
        thumbnail: "/work-media/meow-wild-public-build.webp",
        sourceHref: "https://meow-wild.vercel.app",
        width: 1440,
        height: 1000,
        caption: "The standalone scroll story, captured on 3 October 2026.",
      },
      {
        id: "meow-wild-explore",
        kind: "website",
        title: "Explore meow.wild",
        group: "Interactive build",
        status: "Public build",
        href: "https://meow-wild.vercel.app",
        caption: "Open the standalone scroll story in a new tab.",
      },
    ],
  },
  {
    slug: "falcon-fitness",
    name: "Falcon Fitness",
    description: "An expressive fitness website and campaign artwork.",
    brief:
      "Present coaching, training formats and the gym’s character through a clear website.",
    contribution:
      "Website interface and implementation, with campaign artwork shown separately from documentary photography.",
    status: "Public website",
    disciplines: ["Websites", "Social"],
    media: [
      {
        id: "falcon-live",
        kind: "website",
        title: "Falcon Fitness · public site",
        group: "Website",
        status: "Public website",
        href: "https://falconfitnessmanipal.vercel.app/",
        thumbnail: newMedia("falcon-fitness")[0]?.thumbnail,
        width: 1440,
        height: 1000,
      },
      ...newMedia("falcon-fitness"),
    ],
    modifiedAt: "2026-10-03",
  },
  {
    slug: "patherle",
    name: "Patherle",
    description:
      "A business OS exploring conversational workflows and operational interfaces.",
    brief:
      "Connect business activity with a conversational entry point and a readable control surface.",
    contribution:
      "Selected interface and workflow build studies. The public teaser shows five screens; private capabilities are not demonstrated here.",
    status: "Build · beta",
    disciplines: ["Products"],
    media: [
      ...["face", "genie", "cockpit", "channels", "plans"].map((name, i) => ({
        id: `patherle-${name}`,
        kind: "image" as const,
        title: `Patherle · ${name}`,
        group: "Interface studies",
        status: "Build preview",
        src: `/screenshots/patherle/patherle-0${i + 1}-${name}.png`,
        thumbnail: `/screenshots/patherle/patherle-0${i + 1}-${name}.png`,
        width: 1440,
        height: 900,
      })),
      {
        id: "patherle-public",
        kind: "resource",
        title: "Patherle public teaser",
        group: "Build context",
        status: "Build preview",
        href: "/patherle",
      },
    ],
    modifiedAt: "2026-10-03",
  },
  {
    slug: "1clickwebsite-india",
    name: "1ClickWebsite India",
    description: "An alpha build for websites, invitations and pitch decks.",
    brief:
      "Explore a short creation workflow for small business pages and presentation formats.",
    contribution:
      "Website and workflow build exploration. Public entry points are visible; paid checkout, delivery reliability and provider integrations are not claimed as verified here.",
    status: "Build · alpha",
    disciplines: ["Products", "Websites"],
    media: [
      {
        id: "oneclick-workflow",
        kind: "image",
        title: "1ClickWebsite India · workflow record",
        group: "Build studies",
        status: "Build preview",
        src: "/studio-notes/ocw-workflow-collage.webp",
        thumbnail: "/studio-notes/ocw-workflow-collage.webp",
        width: 1200,
        height: 800,
      },
      {
        id: "oneclick-live",
        kind: "website",
        title: "Explore the alpha",
        group: "Build context",
        status: "Alpha",
        href: "https://1clickwebsiteindia.vercel.app/",
        thumbnail: "/studio-notes/ocw-workflow-collage.webp",
        width: 1200,
        height: 800,
      },
    ],
    modifiedAt: "2026-10-03",
  },
  {
    slug: "dil-se-rave",
    name: "DSR / Dil Se Rave",
    description: "Chrome forms, contour fields and silent motion backdrops.",
    brief: "Explore a visual language for performance backdrops.",
    contribution:
      "Five recovered directions and seven layered adaptations, presented as twelve silent loop studies.",
    status: "Motion studies",
    disciplines: ["Motion", "Concepts"],
    media: newMedia("dil-se-rave"),
    note: "These are silent motion studies. Venue deployment remains unverified.",
    modifiedAt: "2026-10-03",
  },
  {
    slug: "mch-art",
    name: "MCH art studies",
    description:
      "Original abstract compositions and film-inspired visual studies.",
    brief:
      "Explore gesture, colour, space and narrative through original compositions.",
    contribution:
      "AI-assisted image exploration, art direction and curation. The film-inspired collection is self-initiated interpretation, not a film commission.",
    status: "Concept collection",
    disciplines: ["Concepts"],
    media: newMedia("mch-art"),
    modifiedAt: "2026-10-03",
  },
  {
    slug: "meow-ops",
    name: "Meow Ops",
    description: "A local-first inbox and review surfaces for AI coding work.",
    brief: "Make session activity and review decisions easier to read.",
    contribution:
      "Product interface, local workflow tools and a public skills library.",
    status: "Public build",
    disciplines: ["Products"],
    media: [
      ...["summary", "ledger", "map", "runs", "sanctum", "mobile"].map(
        (n, i) => ({
          id: `meow-ops-${n}`,
          kind: "image" as const,
          title: `Meow Ops · ${n}`,
          group: "Product screens",
          status: "Portfolio capture",
          src: `/screenshots/meow-ops/meow-ops-0${i + 1}-${n}.webp`,
          thumbnail: `/screenshots/meow-ops/meow-ops-0${i + 1}-${n}.webp`,
          width: 1440,
          height: 900,
        }),
      ),
      {
        id: "meow-ops-demo",
        kind: "website",
        title: "Explore Meow Ops",
        group: "Public resources",
        status: "Public build",
        href: "https://meow-ops.vercel.app/",
      },
      {
        id: "meow-skills",
        kind: "resource",
        title: "Public skills library",
        group: "Public resources",
        status: "Published",
        href: "/lab/skills",
      },
    ],
    modifiedAt: "2026-10-03",
  },
];
const rhyth = archival.find((p) => p.slug === "rhythm-jain")!;
rhyth.description =
  "Brand record and the Sasta Hacker AI-assisted portrait outro concept.";
rhyth.brief =
  "Explore a fast portrait outro with a fashion and cyberpunk visual direction.";
rhyth.contribution =
  "AI-assisted adult performance concept. The silent study is shown without music reuse or delivery claims.";
rhyth.status = "Concept · delivery unverified";
rhyth.disciplines = ["Motion", "Concepts"];
const resonance = archival.find((p) => p.slug === "resonance-security")!;
resonance.media.push(
  ...[
    {
      id: "rs-linkedin",
      title: "Resonance Security on LinkedIn",
      href: "https://www.linkedin.com/company/resonance-security/",
    },
    {
      id: "rs-instagram",
      title: "Resonance Security on Instagram",
      href: "https://www.instagram.com/resonancesecurity/",
    },
    {
      id: "rs-site",
      title: "resonance.security",
      href: "https://www.resonance.security/",
    },
  ].map((m) => ({
    ...m,
    kind: "resource" as const,
    group: "Brand channels",
    status: "Official channel",
  })),
);
// Logo-only roster brands sit on the last page of the Work index.
const lastPage = [
  "coastal-karnataka-sailing-club",
  "precision-electrical-works",
  "blackfrog",
  "rhythm-jain",
  "canterclub",
];
const ordered = [...archival, ...extra];
export const workProjects = [
  ...ordered.filter((p) => !lastPage.includes(p.slug)),
  ...lastPage.map((slug) => ordered.find((p) => p.slug === slug)!),
];
export const featuredSlugs = [
  "tender-moments",
  "berglabs",
];
export const projectCover = (project: WorkProject) =>
  project.media.find((m) => m.thumbnail)?.thumbnail;
// Card-only crops: same artwork, framed to the card's landscape window so
// small screens do not download pixels the cover crop never shows.
const cardCovers: Record<string, string> = {
  "tender-moments": "/work-media/tender-moments-2026-09-04-kids-101-015-cover.webp",
};
export const projectCardCover = (project: WorkProject) =>
  cardCovers[project.slug] ?? projectCover(project);
export function getProject(slug: string) {
  return workProjects.find((p) => p.slug === slug);
}
