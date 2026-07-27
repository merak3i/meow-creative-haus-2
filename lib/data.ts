import tenderMomentsLogo from "@/assets/client-logos/tender-moments-logo.png";

export const siteConfig = {
  name: "Meow Creative Haus",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
    "https://meowcreativehaus.xyz",
  email: "mewdiaservice@gmail.com",
  phone: "+919448546254",
  phoneDisplay: "+91 94485 46254",
  calendly: "https://calendly.com/mewdiaservice/30min",
  whatsapp: "https://wa.me/message/2A5FTZGCFJY6B1",
  meowWild: "https://meow-wild.vercel.app",
  location: {
    streetAddress: "Surbhi 202, Doddanagudde",
    locality: "Udupi",
    region: "Karnataka",
    postalCode: "575101",
    country: "IN",
    hours: "Every day, 11:00 AM-9:00 PM",
  },
  social: {
    instagram: "https://www.instagram.com/m3ow.ai/",
    linkedinCompany: "https://www.linkedin.com/company/105362259/",
    linkedinPersonal: "https://www.linkedin.com/in/vismay-h-b9a89a81gde/",
    linktree: "https://linktr.ee/vismay9",
    twitter: "https://x.com/m3ow_ai",
    github: "https://github.com/merak3i",
  },
} as const;

export const clientLogos = [
  {
    name: "Manipal Aerosports",
    src: "https://meowcreativehaus.lovable.app/lovable-uploads/2ab5b161-6bee-476d-87ba-767c24bb9168.png",
    scale: 1.8,
  },
  {
    name: "Resonance Security",
    src: "https://meowcreativehaus.lovable.app/lovable-uploads/resonance-security-new.svg",
  },
  {
    name: "Active Power",
    src: "https://meowcreativehaus.lovable.app/lovable-uploads/69925ab5-3c33-482a-9561-5eb05acbc182.png",
    scale: 1.8,
  },
  {
    name: "Asset Mantle",
    src: "https://meowcreativehaus.lovable.app/lovable-uploads/229aac74-3415-4b4d-8638-01cde5697f70.png",
    scale: 1.4,
  },
  {
    name: "Ingrained Logic",
    src: "https://meowcreativehaus.lovable.app/lovable-uploads/0999c1f8-5124-43bc-a51a-af2cd02d5967.png",
  },
  {
    name: "Coastal Karnataka Sailing Club",
    src: "https://meowcreativehaus.lovable.app/lovable-uploads/b0883064-dd0a-456f-b051-0af15c5a9ea4.png",
  },
  {
    name: "Stroi Analytics",
    src: "https://meowcreativehaus.lovable.app/lovable-uploads/439e62ad-6f38-4c3d-9eca-38def3ad2118.png",
  },
  {
    name: "Mantle Works",
    src: "https://meowcreativehaus.lovable.app/lovable-uploads/1af13004-dd8f-444c-a10b-c5a2573ab542.png",
    scale: 1.4,
    hasBg: true,
  },
  {
    name: "JB & Co",
    src: "https://meowcreativehaus.lovable.app/lovable-uploads/jb-co-logo.png",
  },
  {
    name: "Precision Electrical Works",
    src: "https://meowcreativehaus.lovable.app/lovable-uploads/precision-electrical-works.png",
  },
  {
    name: "BlackFrog",
    src: "https://meowcreativehaus.lovable.app/lovable-uploads/blackfrog-logo.png",
  },
  {
    name: "Rhyth Jain",
    src: "https://meowcreativehaus.lovable.app/lovable-uploads/rhyth-jain-logo.png",
  },
  {
    name: "Tender Moments",
    src: tenderMomentsLogo,
    scale: 1.4,
    preserveColor: true,
  },
  {
    name: "BergLabs.ai",
    src: "/berg-logo.svg",
    noInvert: true,
  },
  {
    name: "CanterClub",
    src: "",
    isText: true,
    noInvert: true,
  },
  {
    name: "Coastal Edge AI",
    src: "/coastal-edge-logo.svg",
    scale: 1.45,
    preserveColor: true,
  },
] as const;

export const offers = [
  {
    slug: "interactive-experiences",
    title: "Experiences",
    description:
      "Scroll stories, interactive web, and motion people remember and share.",
    index: "01",
  },
  {
    slug: "product-web",
    title: "Product & Web",
    description:
      "Websites and apps that look sharp and convert — designed and built to ship.",
    index: "02",
  },
  {
    slug: "ai-systems",
    href: "/ai-automation-digital-marketing-udupi#ai-automation",
    title: "AI Systems",
    description:
      "Multilingual bots, agents, and automation wired into real workflows.",
    index: "03",
  },
  {
    slug: "growth-systems",
    href: "/ai-automation-digital-marketing-udupi#ai-backed-marketing",
    title: "Growth",
    description:
      "Go-to-market and outreach for clients who need pipeline, not just a site.",
    index: "04",
  },
] as const;

export const openSourceProjects = [
  {
    name: "Meow Operations",
    slug: "meow-ops",
    tagline: "Local-first command deck for agent work: token spend, timelines, and loop evidence in one place.",
    description:
      "Local-first command deck for Claude Code, Cursor, Aider and Codex: token analytics, wall-clock timelines, and Loop Ops, a read-only map where multi-agent loops show evidence before anything claims green.",
    stats: ["30+ models", "4 AI tools", "Loop Ops control room", "MIT license", "3D companion"],
    github: "https://github.com/merak3i/meow-ops",
    demo: process.env.NEXT_PUBLIC_DEMO_URL ?? "",
    status: "live",
  },
] as const;

export const aiCampaigns = [
  {
    client: "Asset Mantle",
    niche: "blockchain",
    nicheLabel: "Blockchain · Web3",
    videoId: "PLACEHOLDER_AM",
    title: "AI spokesperson for NFT launchpad",
    description: "Synthetic presenter delivering product narrative to Web3 founders at scale.",
  },
  {
    client: "Active Power",
    niche: "fitness",
    nicheLabel: "Fitness · Performance",
    videoId: "PLACEHOLDER_AP",
    title: "AI brand ambassador for supplement launch",
    description: "Custom AI model carrying campaign messaging without a studio or shoot day.",
  },
  {
    client: "Resonance Security",
    niche: "security",
    nicheLabel: "Cybersecurity",
    videoId: "PLACEHOLDER_RS",
    title: "Threat advisory AI presenter",
    description: "Authoritative AI voice used for security awareness content across channels.",
  },
] as const;

export type AICampaign = (typeof aiCampaigns)[number];

// ─── Logos (shared across article + website sections) ─────────────────────────

const LOGOS = {
  resonanceSecurity: "https://meowcreativehaus.lovable.app/lovable-uploads/resonance-security-new.svg",
  assetMantle:       "https://meowcreativehaus.lovable.app/lovable-uploads/229aac74-3415-4b4d-8638-01cde5697f70.png",
  stroiAnalytics:    "https://meowcreativehaus.lovable.app/lovable-uploads/439e62ad-6f38-4c3d-9eca-38def3ad2118.png",
  activePower:       "https://meowcreativehaus.lovable.app/lovable-uploads/69925ab5-3c33-482a-9561-5eb05acbc182.png",
  mantleWorks:       "https://meowcreativehaus.lovable.app/lovable-uploads/1af13004-dd8f-444c-a10b-c5a2573ab542.png",
  manipalAerosports: "https://meowcreativehaus.lovable.app/lovable-uploads/2ab5b161-6bee-476d-87ba-767c24bb9168.png",
  merak3i:           "https://substackcdn.com/image/fetch/$s_!AOTz!,w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2d55abfa-bb35-4bc5-b16c-a69fc36c83e2_1320x1318.png",
  coastalEdge:       "/coastal-edge-logo.svg",
};

// ─── Featured Articles ────────────────────────────────────────────────────────

export const featuredArticles = [
  // ── Merak3i (Personal Substack) ───────────────────────────────────────────
  {
    id: "merak3i-2",
    title: "BergLabs Identity & Website Build",
    excerpt: "The April-to-July field record of turning a company story, identity system, AI-assisted build process, and WordPress release discipline into berglabs.ai.",
    client: "BergLabs",
    clientLogo: "/berg-logo.svg",
    niche: "industrial-ai",
    nicheLabel: "Industrial AI",
    platform: "blog" as const,
    href: "https://merak3i.substack.com/p/berglabs-identity-and-website-build",
    coverImage: "/berglabs-identity-website-build.jpg",
  },
  {
    id: "merak3i-1",
    title: "The Cost of Compute, the Compute of Cost",
    excerpt: "A field report from the last summer of free compute. Four labs — Gemini, ChatGPT, Claude, Grok — and one orbital problem. They want you hooked before the rate card lands.",
    client: "Merak3i",
    clientLogo: LOGOS.merak3i,
    niche: "ai-compute",
    nicheLabel: "AI · Compute",
    platform: "blog" as const,
    href: "https://merak3i.substack.com/p/the-cost-of-compute-the-compute-of",
    coverImage: "https://substackcdn.com/image/fetch/$s_!kJ8t!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe6b6aaa4-a273-4cd6-a018-b515acc52342_2920x1800.png",
  },
  // ── Resonance Security ────────────────────────────────────────────────────
  {
    id: "rs-1",
    title: "The Pornhub x Mixpanel Breach",
    excerpt: "A forensics deep dive — what happens when third-party analytics scripts become the attack surface.",
    client: "Resonance Security",
    clientLogo: LOGOS.resonanceSecurity,
    niche: "security",
    nicheLabel: "Cybersecurity",
    platform: "blog" as const,
    href: "https://www.resonance.security/blog-posts/the-pornhub-x-mixpanel-breach",
    coverImage: "https://cdn.prod.website-files.com/655193402606af8e0573624c/695e429ac09f3051429869f5_chrome_R8nhAg8Xmy.png",
  },
  {
    id: "rs-2",
    title: "AI-Powered Phishing: How Machines Weaponized Human Psychology",
    excerpt: "LLMs lowered the barrier to craft convincing spear-phishing at unprecedented scale.",
    client: "Resonance Security",
    clientLogo: LOGOS.resonanceSecurity,
    niche: "security",
    nicheLabel: "Cybersecurity",
    platform: "blog" as const,
    href: "https://www.resonance.security/blog-posts/ai-powered-phishing-how-machines-weaponized-human-psychology",
    coverImage: "https://cdn.prod.website-files.com/655193402606af8e0573624c/68fb7845dee02ec742958147_iScreen%20Shoter%20-%20Google%20Chrome%20-%20251024145901.png",
  },
  // ── Asset Mantle ──────────────────────────────────────────────────────────
  {
    id: "am-1",
    title: "AssetMantle 2025: The Blueprint for Institutional-Grade Assetization",
    excerpt: "The roadmap for bringing institutional capital into the on-chain asset economy.",
    client: "Asset Mantle",
    clientLogo: LOGOS.assetMantle,
    niche: "blockchain",
    nicheLabel: "Blockchain · RWA",
    platform: "medium" as const,
    href: "https://assetmantle.medium.com/assetmantle-2025-the-blueprint-for-institutional-grade-assetization-c167788348a7",
    coverImage: "https://miro.medium.com/v2/resize:fit:1024/0*GB6AGK7Vry1pX-Q9.png",
  },
  {
    id: "am-2",
    title: "The Regulatory Race: How Compliance Laws Are Shaping the Future of Tokenized Assets",
    excerpt: "MiCA, SEC enforcement, and the compliance race shaping who wins in tokenized real-world assets.",
    client: "Asset Mantle",
    clientLogo: LOGOS.assetMantle,
    niche: "blockchain",
    nicheLabel: "Blockchain · RWA",
    platform: "medium" as const,
    href: "https://assetmantle.medium.com/the-regulatory-race-how-compliance-laws-are-shaping-the-future-of-tokenized-assets-rwa-ba7e6020ad6d",
    coverImage: "https://miro.medium.com/v2/da:true/resize:fit:1200/0*SUIPlm4BovAtp4yw",
  },
  {
    id: "am-3",
    title: "The Cost of What We Can't Measure",
    excerpt: "Why the metrics that matter most in tokenization don't show up on any dashboard.",
    client: "Asset Mantle",
    clientLogo: LOGOS.assetMantle,
    niche: "blockchain",
    nicheLabel: "Blockchain · RWA",
    platform: "medium" as const,
    href: "https://assetmantle.medium.com/the-cost-of-what-we-cant-measure-88a6a1a268de",
    coverImage: "https://miro.medium.com/v2/resize:fit:1200/1*fgos39fREDz0UGCrdASwWA.jpeg",
  },
  {
    id: "am-4",
    title: "The Assetization of Industries: A Multi-Sectoral Analysis",
    excerpt: "How blockchain tokenization applies across real estate, supply chains, art, and energy.",
    client: "Asset Mantle",
    clientLogo: LOGOS.assetMantle,
    niche: "blockchain",
    nicheLabel: "Blockchain · RWA",
    platform: "medium" as const,
    href: "https://assetmantle.medium.com/the-assetization-of-industries-a-multi-sectoral-analysis-anchored-in-blockchain-tokenization-85b561ed8e9c",
    coverImage: "https://miro.medium.com/v2/resize:fit:1200/1*en5VHM9trxAiU18hohCdwg.png",
  },
  {
    id: "am-5",
    title: "What the Trump Presidency Means for Crypto: A Paradigm Shift",
    excerpt: "The policy pivot that changed crypto's regulatory outlook — and what founders should do now.",
    client: "Asset Mantle",
    clientLogo: LOGOS.assetMantle,
    niche: "blockchain",
    nicheLabel: "Blockchain · RWA",
    platform: "medium" as const,
    href: "https://assetmantle.medium.com/what-the-trump-presidency-means-for-crypto-a-paradigm-shift-09a1a0663e5a",
    coverImage: "https://miro.medium.com/v2/da:true/resize:fit:1200/0*5-6gMx3_yun6xM9i",
  },
  // ── Stroi Analytics ───────────────────────────────────────────────────────
  {
    id: "stroi-1",
    title: "AI-Backed Industrial Analytics: From Origins to Intelligent Industry",
    excerpt: "From basic SCADA to AI-driven predictive intelligence — the full arc of industrial analytics.",
    client: "Stroi Analytics",
    clientLogo: LOGOS.stroiAnalytics,
    niche: "industrial-ai",
    nicheLabel: "Industrial AI",
    platform: "linkedin" as const,
    href: "https://www.linkedin.com/pulse/ai-backed-industrial-analytics-from-origins-intelligent-d5e3c/",
    coverImage: "https://media.licdn.com/dms/image/v2/D5612AQHwRDm0fxtmCg/article-cover_image-shrink_720_1280/B56Zd9ueoYGoAM-/0/1750161033717?e=2147483647&v=beta&t=DbNR_DKCLcy8TvztfUtwDLGRPh3ka3vDyDfP4VKHMxo",
  },
  // ── Active Power ──────────────────────────────────────────────────────────
  {
    id: "ap-1",
    title: "Beyond Task Execution: How RPA Evolved Into the Backbone of Intelligent Industrial Operations",
    excerpt: "How RPA went from simple task bots to the connective layer in intelligent manufacturing.",
    client: "Active Power",
    clientLogo: LOGOS.activePower,
    niche: "industrial-ai",
    nicheLabel: "Industrial AI",
    platform: "linkedin" as const,
    href: "https://www.linkedin.com/pulse/beyond-task-execution-how-rpa-evolved-backbone-intelligent-c6e3c/",
    coverImage: "https://media.licdn.com/dms/image/v2/D5612AQHoEsGZFWRsmA/article-cover_image-shrink_720_1280/B56ZqwLBgoHYAI-/0/1763892383296?e=2147483647&v=beta&t=BSsTla5lEVnIYd_nbECIK0ComMi1qVWU1EyTJfau868",
  },
  {
    id: "ap-2",
    title: "When Machines Learn to Think: The Human-Centered Revolution in Industrial Automation",
    excerpt: "Human-machine collaboration isn't the future of industry — it's already the present.",
    client: "Active Power",
    clientLogo: LOGOS.activePower,
    niche: "industrial-ai",
    nicheLabel: "Industrial AI",
    platform: "linkedin" as const,
    href: "https://www.linkedin.com/pulse/when-machines-learn-think-human-centered-revolution-jtbmf/",
    coverImage: "https://media.licdn.com/dms/image/v2/D4D12AQF7ydcIbGNatQ/article-cover_image-shrink_720_1280/B4DZpYXIrmIkAI-/0/1762419083455?e=2147483647&v=beta&t=YqnDwHFa0snq77hrBzHfsG5nb-lAfSpQLfW7Kt7kV6k",
  },
  {
    id: "ap-3",
    title: "Industry 4.0: The Revolution That Cannot Be Ignored",
    excerpt: "The convergence of cyber-physical systems, AI, and automation that factory operators can't ignore.",
    client: "Active Power",
    clientLogo: LOGOS.activePower,
    niche: "industrial-ai",
    nicheLabel: "Industrial AI",
    platform: "linkedin" as const,
    href: "https://www.linkedin.com/pulse/industry-40-revolution-cannot-ignored-active-power-system-dqjcc/",
    coverImage: "https://media.licdn.com/dms/image/v2/D5612AQGbxBBRHKyW2Q/article-cover_image-shrink_720_1280/B56ZavRs.sGgAI-/0/1746697400877?e=2147483647&v=beta&t=GRO5-zCrf9NJWFGIbEu90lXjm7hObp1hB4wlMC-sWFk",
  },
  // ── Mantle Works ──────────────────────────────────────────────────────────
  {
    id: "mw-1",
    title: "RWA News Wrap August (03)",
    excerpt: "The week's most important real-world asset news, curated for institutional builders.",
    client: "Mantle Works",
    clientLogo: LOGOS.mantleWorks,
    niche: "blockchain",
    nicheLabel: "Blockchain · RWA",
    platform: "linkedin" as const,
    href: "https://www.linkedin.com/pulse/rwa-news-wrap-august-03-mantleworks-dcenc",
    coverImage: "https://media.licdn.com/dms/image/v2/D5612AQFFmVjqXZGo1w/article-cover_image-shrink_720_1280/B56ZjXRMOtHAAM-/0/1755958269778?e=2147483647&v=beta&t=BpsaAI8CgiYXcMurEI2I9sk2VUoZ0LMctXB8HjWcnZY",
  },
  {
    id: "mw-2",
    title: "Blockchain's Corporate Revolution: Stablecoins, Custom Chains, and the Death of Legacy Payments",
    excerpt: "Enterprises are building private chains and stablecoins. Traditional payment rails won't survive.",
    client: "Mantle Works",
    clientLogo: LOGOS.mantleWorks,
    niche: "blockchain",
    nicheLabel: "Blockchain · RWA",
    platform: "linkedin" as const,
    href: "https://www.linkedin.com/pulse/blockchains-corporate-revolution-stablecoins-custom-chains-4dxpc/",
    coverImage: "https://media.licdn.com/dms/image/v2/D5612AQETf1bcglZ-Iw/article-cover_image-shrink_720_1280/B56Zi3ZbuyHcAI-/0/1755423579488?e=2147483647&v=beta&t=ozCvPJq51lj7kSS3x_gvx_iYMTpow_Gz3NU7zn41OW0",
  },
  {
    id: "mw-3",
    title: "The Great Stablecoin Divide: A Tale of Two Visions for Global Finance",
    excerpt: "Competing visions for stablecoin regulation — and why the outcome reshapes global capital flows.",
    client: "Mantle Works",
    clientLogo: LOGOS.mantleWorks,
    niche: "blockchain",
    nicheLabel: "Blockchain · RWA",
    platform: "linkedin" as const,
    href: "https://www.linkedin.com/pulse/great-stablecoin-divide-tale-two-visions-global-finance-mantleworks-83omc/",
    coverImage: "https://media.licdn.com/dms/image/v2/D5612AQE7EvQ_WLaGRg/article-cover_image-shrink_720_1280/B56Zh1nHjCG0AI-/0/1754319855555?e=2147483647&v=beta&t=pqCp9oxzq_GddBwjviw-5RXrF_CQXxstYeu0lA5Ud4A",
  },
  {
    id: "mw-4",
    title: "The Invisible Hand of Web3: Why the Killer App Won't Announce Itself",
    excerpt: "The most transformative Web3 application won't arrive with fanfare — it already hasn't.",
    client: "Mantle Works",
    clientLogo: LOGOS.mantleWorks,
    niche: "blockchain",
    nicheLabel: "Blockchain · RWA",
    platform: "linkedin" as const,
    href: "https://www.linkedin.com/pulse/invisible-hand-web3-why-killer-app-wont-announce-itself-years-6uu9f/",
    coverImage: "https://media.licdn.com/dms/image/v2/D4D12AQFtHSbsFnOsLQ/article-cover_image-shrink_720_1280/B4DZg8v4xuG8AI-/0/1753365853706?e=2147483647&v=beta&t=_2mcnS2Hm0o9qkZOUEXcDKMh-n9MQgnwkoO5Q0f61uA",
  },
  {
    id: "mw-5",
    title: "Ledgers, Liquidity, Latticework: Unpacking Stablecoin Sovereignties",
    excerpt: "Stablecoin sovereignty, cross-border liquidity, and the emerging lattice of on-chain value.",
    client: "Mantle Works",
    clientLogo: LOGOS.mantleWorks,
    niche: "blockchain",
    nicheLabel: "Blockchain · RWA",
    platform: "linkedin" as const,
    href: "https://www.linkedin.com/pulse/ledgers-liquidity-latticework-unpacking-stablecoin-sovereignties-c0gvc/",
    coverImage: "https://media.licdn.com/dms/image/v2/D5612AQF0MkNRloOfkw/article-cover_image-shrink_720_1280/B56ZhCQEtrHcAM-/0/1753458189350?e=2147483647&v=beta&t=JjAePmCGHkxU9ezZpuCNvDoSsaAHuTP_nZfzQpKL3eg",
  },
] as const;

export type FeaturedArticle = (typeof featuredArticles)[number];

// ─── Client Websites ──────────────────────────────────────────────────────────

export const clientWebsites = [
  {
    name: "BergLabs",
    tagline: "Enterprise AI operations — production systems",
    url: "https://berglabs.ai/",
    screenshot: "/screenshots/berglabs-homepage-2026-07-26.png",
    industry: "Enterprise AI",
    logo: "/berg-logo.svg",
  },
  {
    name: "Tender Moments",
    tagline: "Preschool & early learning",
    url: "https://tendermomentshebbal.in/",
    screenshot: "/screenshots/tender-moments-live-hero-2026-07-28.png",
    industry: "Early Education",
    logo: tenderMomentsLogo.src,
  },
  {
    name: "Manipal Aerosports",
    tagline: "Aviation training & airshow brand",
    url: "https://manipalaerosports.vercel.app",
    screenshot: "/screenshots/manipal-aerosports.png",
    industry: "Aviation",
    logo: LOGOS.manipalAerosports,
  },
  {
    name: "Coastal Edge AI",
    tagline: "Predictive social media marketing",
    url: "https://coastaledge.vercel.app/",
    screenshot: "/screenshots/coastal-edge-ai.png",
    industry: "AI Marketing",
    logo: LOGOS.coastalEdge,
  },
  {
    name: "Suha Rehma",
    tagline: "Psychology practice — digital presence",
    url: "https://suharehma.vercel.app/",
    screenshot: "/screenshots/suha-rehma.png",
    industry: "Psychology",
    logo: "",
  },
  {
    name: "EAASH",
    tagline: "Boutique coastal stay brand",
    url: "https://eaash.vercel.app/",
    screenshot: "/screenshots/eaash.png",
    industry: "Hospitality",
    logo: "",
  },
] as const;

export type ClientWebsite = (typeof clientWebsites)[number];

// ─── Client Videos ────────────────────────────────────────────────────────────

export type ClientVideo = {
  client: string;
  videoId: string;
  title: string;
  description: string;
  /** "Video Marketing" | "AI Model" | "AI Podcast" | "Audiocast" */
  tag: string;
};

export const clientVideos: ClientVideo[] = [
  {
    client: "Active Power",
    videoId: "kkSUicrnRHM",
    title: "Active Power",
    description: "High-performance video campaign for an industrial energy brand.",
    tag: "Video Marketing",
  },
  {
    client: "Active Power",
    videoId: "2HWmE4hRqR4",
    title: "Active Power",
    description: "High-performance video campaign for an industrial energy brand.",
    tag: "Video Marketing",
  },
  {
    client: "Asset Mantle",
    videoId: "5CYGxM9emo4",
    title: "Asset Mantle",
    description: "AI-generated spokesperson for AssetMantle's Web3 platform.",
    tag: "AI Model",
  },
  {
    client: "Asset Mantle",
    videoId: "RgQ35W-Yq08",
    title: "Asset Mantle",
    description: "AI-generated spokesperson for AssetMantle's Web3 platform.",
    tag: "AI Model",
  },
  {
    client: "Ingrained Logic",
    videoId: "gBlE3XpGmwU",
    title: "Ingrained Logic",
    description: "Brand video campaign communicating core product value.",
    tag: "Video Marketing",
  },
  {
    client: "Mantle Works",
    videoId: "--3EhPjznAg",
    title: "Mantle Works",
    description: "AI podcast — Web3 and RWA insights.",
    tag: "AI Podcast",
  },
  {
    client: "Mantle Works",
    videoId: "WroSa1eiUbU",
    title: "Mantle Works",
    description: "AI podcast — Web3 and RWA insights.",
    tag: "AI Podcast",
  },
  {
    client: "Meow World Order (MCH)",
    videoId: "QDjZwuR6tIQ",
    title: "Meow World Order",
    description: "AI podcast by Meow Creative Haus.",
    tag: "AI Podcast",
  },
  {
    client: "Asset Mantle",
    videoId: "mn9gpSiOVbU",
    title: "Asset Mantle",
    description: "Video marketing campaign for AssetMantle's Web3 platform.",
    tag: "Video Marketing",
  },
  {
    client: "Resonance Security",
    videoId: "0pwHJjd1yhY",
    title: "Resonance Security",
    description: "Cybersecurity audiocast — threat intelligence and industry insights.",
    tag: "Audiocast",
  },
  {
    client: "Stroi Analytics",
    videoId: "JXyjIlcXXdU",
    title: "Stroi Analytics",
    description: "Video marketing campaign for industrial AI analytics.",
    tag: "Video Marketing",
  },
  {
    client: "Mantle Works",
    videoId: "xgtbMVUxggg",
    title: "Mantle Works",
    description: "Video marketing campaign for Web3 and RWA brand.",
    tag: "Video Marketing",
  },
];

// ─── Client Shorts (YouTube Shorts — portrait) ───────────────────────────────

export type ShortsGroup = {
  client: string;
  /** "Video Marketing" | "AI Model" */
  tag: string;
  shorts: { videoId: string; description: string }[];
};

export const clientShorts: ShortsGroup[] = [
  {
    client: "Ingrained Logic",
    tag: "Video Marketing",
    shorts: [
      { videoId: "6mIj1Kv0tIE", description: "Brand identity campaign." },
      { videoId: "gyBWLQZ_E6Q", description: "Short-form brand content." },
      { videoId: "uSzsEemJJ94", description: "Short-form brand content." },
    ],
  },
  {
    client: "Manipal Aerosports",
    tag: "Video Marketing",
    shorts: [
      { videoId: "45SbbqoqEsU", description: "Aviation brand short." },
    ],
  },
  {
    client: "Resonance Security",
    tag: "Video Marketing",
    shorts: [
      { videoId: "STubABAZO2g", description: "Cybersecurity awareness content." },
      { videoId: "e5Kh8wJEUEw", description: "Cybersecurity awareness content." },
      { videoId: "XeHMo4a5g6w", description: "Cybersecurity awareness content." },
    ],
  },
  {
    client: "Asset Mantle",
    tag: "AI Model",
    shorts: [
      { videoId: "DVBG4RRkOsE", description: "AI model short for Web3 platform." },
      { videoId: "e5Kh8wJEUEw", description: "AI model short for Web3 platform." },
    ],
  },
];

import { mergeAndSortSubstackPosts, parseSubstackXml } from "./substack-parser";

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
}

const CURATED_EXTRA_POSTS: SubstackPost[] = [
  {
    title: "BergLabs Identity & Website Build",
    link: "https://merak3i.substack.com/p/berglabs-identity-and-website-build",
    pubDate: "Sat, 25 Jul 2026 20:42:00 GMT",
    excerpt: "The April-to-July field record of turning a company story, identity system, AI-assisted build process, and WordPress release discipline into berglabs.ai.",
  },
  {
    title: "The Cost of Compute, the Compute of Cost",
    link: "https://merak3i.substack.com/p/the-cost-of-compute-the-compute-of",
    pubDate: "Sun, 26 Apr 2026 14:10:53 GMT",
    excerpt: "A field report from the last summer of free compute. Four labs — Google Gemini, OpenAI ChatGPT, Anthropic Claude, xAI Grok — and one orbital problem. They want you hooked before the rate card lands.",
  },
];

export async function fetchSubstackFeed(): Promise<SubstackPost[]> {
  try {
    const res = await fetch(
      "https://impostersyndromeenjoyer.substack.com/feed",
      { next: { revalidate: 3600 } }
    );
    const xml = await res.text();
    const dynamicPosts = parseSubstackXml(xml);
    return mergeAndSortSubstackPosts(dynamicPosts, CURATED_EXTRA_POSTS);
  } catch {
    return [...CURATED_EXTRA_POSTS];
  }
}
