# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.7.0] 2026-08-31

### Added
- `public/screenshots/meow-ops/*.webp` (6): real captures from the running Meow Ops app, replacing the illustrated SVG mockups. Today, Ledger, Runs, Map, Sanctum, and a phone-width Today screen. Captured at 2x and 3x, cropped above any per-client spend row, and converted to WebP (roughly 46 to 71 KB each). The Map frame comes from the public `demo-spec.xlsx` import and is cropped above the raw run-log line.
- `components/Lab.tsx`: a Sanctum capture now sits inside the homepage lab card and anchors to the carousel below it.
- `components/LabPage.tsx`: a Ledger capture leads the `/lab` Meow Ops block.
- `app/page.tsx`: `ClientWebsites` mounted on the homepage between the logo marquee and the offers grid, so the live-work proof lands before the pitch. The hero's "See the Work" button now resolves to `#client-sites` instead of the services grid.

### Changed
- Every em dash and en dash removed from the repository, including rendered copy, JSX comments, `llms.txt`, `llms-full.txt`, docs, and SQL comments. Verified with a DOM text-node sweep across all seven pages and the four plain-text endpoints.
- `components/LoopEngineering.tsx`: section retitled from "Loop Ops" to "Meow Ops" with copy that states what the screens are and how they were sanitised. Raw `<img>` swapped for `next/image` with explicit intrinsic dimensions. The README block now describes what Meow Ops reads rather than only Loop Ops.
- `components/Authority.tsx`: the "multiply your Annual Recurring Revenue" pitch replaced with what the studio actually offers, which is one person who stays on the project. The old copy contradicted the v1.5.1 note about the homepage proving instead of bragging.
- `components/Offers.tsx`: heading changed from "Work you can click" (it listed services, not work) to "Four ways we get involved", plus a scoping sentence.
- `components/Lab.tsx`: stale `v1.3.0` badge corrected to `v1.2.0`; heading and body rewritten.
- `components/ShipLog.tsx`: v1.7.0 entry added, `LATEST` badge moved off v1.6.2, and a section subhead added.
- `components/Footer.tsx`: "Engineered for scale" replaced; the fake non-link "Chat on WhatsApp" line removed and the email turned into a real `mailto:` link.
- `lib/data.ts`: Meow Ops tagline, description, and stat chips rewritten around what it reads and reports; four offer descriptions tightened.

### Fixed
- `components/Offers.tsx`, `components/LoopEngineering.tsx`: section headers were permanently invisible under `prefers-reduced-motion: reduce`. Framer Motion's hidden state was server-rendered, then the reduced-motion branch passed `initial`/`whileInView` as `undefined`, so nothing ever cleared the inline `opacity: 0`. The reveal now always runs and collapses to a zero-duration transition when reduced motion is requested.

### Removed
- `public/screenshots/loop-ops/*.svg` (5): illustrated mockups superseded by real captures.
- `components/LabPage.tsx`: `ClientWebsites` unmounted from `/lab` now that it lives on the homepage, avoiding the same section on two indexed pages.

---

## [Unreleased]

### Added
- `components/LabPage.tsx`: Meow Ops 1.2.0 inbox cut: Today, Review, Ledger, Sanctum, Learn, focus timer chip, local article on sales loops that wait for a human.
- `components/ShipLog.tsx`: public v1.2.0 ship note for the inbox cut (2026-08-31).
- `public/screenshots/loom/*`: replaced with live 1.2.0 captures of the five surfaces.
- `components/LabPage.tsx`: expanded the public Meow Ops feature and specs block to cover the owner-governed project learning control plane, Builder's Journey, Companion Project Intelligence, native-agent context adapters, and the local-only privacy boundary.
- `components/WildPopup.tsx`: homepage popup linking out to the **meow.wild** scroll story (opens in its own window). Attention is guided by two reduced-motion-safe visual-illusion mechanisms: gaze-cueing cat eyes that blink and dart toward the CTA, and a rotating conic halo (peripheral-motion pop-out).
- `lib/data.ts`: `siteConfig.meowWild` link.
- Cross-repo auto-redeploy hook: a workflow in the `meow-wild` repo triggers an MCH production redeploy when meow.wild updates (keeps the attachment fresh).

### Changed
- `components/LabPage.tsx`: field note rewritten from the July-August sales motion: how signals are found, qualified, receipted, drafted, queued, human-approved, and scored weekly.
- `components/LoopEngineering.tsx`: replaced the pinned vertical scroll-scrub (which jump-cut between frames) with a native horizontal scroll-snap carousel: swipe / arrows / clickable steps + dots, active frame tracked via IntersectionObserver. Smoother and more intuitive; no scroll-hijacking.

### Removed
- `components/AnimatedTabs.tsx`: dead code after the Loop Ops carousel rewrite (was the old frame switcher / reduced-motion fallback).

## [1.6.2] - 2026-07-26

### Added
- `components/ShipLog.tsx`: added complete SemVer labels to public ship notes and a visible version key: major for architecture, minor for capability, patch for refinement.
- `components/ShipLog.tsx`: replaced the incomplete Companion release claim with a source-backed record of the Scrying Sanctum build and refinement from 12 April through 4 May 2026.

### Changed
- July Builder's Journey and owner-governed project-learning entries are now identified as `v1.6.2` and `v1.6.1`.
- June and April ship notes now use complete `major.minor.patch` labels.

## [1.5.0] - 2026-06-14

### Added
- `components/ScrollStage.tsx`: reusable pinned scroll-track primitive; exposes a 0→1 progress MotionValue (computed from `getBoundingClientRect` on a rAF tick, not framer `useScroll`, to avoid measurement races) plus a reduced-motion flag
- `components/PinnedPanels.tsx`: Scale-style layered 3D glass-panel stack that rotates flat and scales as scroll progresses (transform/opacity only)
- `components/RevenueDashboard.tsx`: self-contained "revenue engine" dashboard mock used as the hero's front panel (inline SVG/markup, no external images)
- `components/ScrollProgress.tsx`: fixed top progress rail bound to whole-page scroll (teal→gold)
- `components/ScrollReveal.tsx`: single tuned entrance reveal; content always in the DOM, skipped under reduced motion
- Embedded subsetted **Space Grotesk** (weights 400/700) into the five `public/screenshots/loop-ops/*.svg` frames so the product mockups render in Space Grotesk even as `<img>`

### Changed
- `components/Hero.tsx`: rebuilt into a pinned 3D stage: headline recedes as the layered dashboard panels rotate flat and rise
- `components/LoopEngineering.tsx`: Loop Ops becomes a scroll-scrubbed five-frame walkthrough (Map→Lanes→Inspector→Runs→Mobile); `AnimatedTabs` retained as the reduced-motion fallback
- `components/Offers.tsx`: higher-contrast cards with a tuned staggered reveal (not pinned: avoids a blank lead-in)
- `components/LenisProvider.tsx`: smoothing `lerp`, in-page anchor glide, shared `useLenis` context, hard `prefers-reduced-motion` opt-out
- `components/Navigation.tsx`: scroll-aware nav (blur/border/shrink past 40px); removed `mix-blend-difference` overlap; logo anchors to `#hero`
- `components/ShipLog.tsx`: accurate Vercel-sourced dates; added v1.5 entry, versioned the v1.4 entry
- `app/globals.css`: `prefers-reduced-motion` CSS guard + `.cv-auto` content-visibility utility

### Fixed
- `public/screenshots/loop-ops/loop-ops-03-inspector.svg`: right-panel description lines clipped past the viewBox after the Space Grotesk swap (wider metrics); shortened copy + reduced font-size

## [1.4.0] - 2026-06-12

### Added
- `components/LoopEngineering.tsx`: Loop Engineering homepage section: magnified five-frame tour of The Loom via `AnimatedTabs`, expandable README card
- `components/AnimatedTabs.tsx`: tab viewer metamorphosed to site tokens (mono labels, teal spring-pill, blur-in transition)
- `app/patherle/page.tsx` + `components/PatherleTease.tsx`: Patherle teaser page: vector-field backdrop, scroll-tilt reveal, five redacted stills, build-log roadmap
- `components/PatherleTeaser.tsx`: homepage FILE // 003 band linking /patherle
- `components/ShipLog.tsx`: homepage ship-log section (this list, in public)
- `components/VectorField.tsx`, `components/ContainerScroll.tsx`, `components/PatherleRoadmap.tsx`
- `public/screenshots/loom/*` (5) and `public/screenshots/patherle/*` (5): annotated, sanitized captures

### Changed
- `lib/data.ts`: Meow Operations re-souled: "The control room for the agentic era"; The Loom added to stats

### Removed
- `components/InfiniteGallery.tsx` + three.js stack (superseded by AnimatedTabs; drops transitive fast-xml-parser advisories)


## [1.3.0] - 2026-04-15

### Added
- `public/screenshots/manipal-aerosports.png`: local hero screenshot for Manipal Aerosports web design card
- `public/screenshots/jb-co-law.png`: local hero screenshot for JB & Co Law web design card
- `public/canter-club-logo.png`: Canter Club Bengaluru circular logo (drop file to activate)
- `lib/data.ts`: Canter Club added to `clientLogos` marquee (`scale: 1.6`, `noInvert: true`)

### Changed
- `lib/data.ts`: Manipal Aerosports screenshot switched from `image.thum.io` URL to local `/screenshots/manipal-aerosports.png`
- `lib/data.ts`: JB & Co Law screenshot switched from `image.thum.io` URL to local `/screenshots/jb-co-law.png`
- `components/LabPage.tsx`: `ClientWebsites` ("Brands built to convert") promoted above `ShortsShowcase` ("Every second earned")

## [1.2.1] - 2026-04-14

### Changed
- `components/LabPage.tsx`: `VideoShowcase` promoted to first section slot (replaces `AIModelsShowcase`)
- `components/LabPage.tsx`: `ClientWebsites` follows `VideoShowcase`

### Removed
- `AIModelsShowcase`: removed from `/lab` page (placeholder-only, superseded by `VideoShowcase`)
- `ArticleShowcase`: removed from `/lab` page

## [1.2.0] - 2026-04-14

### Added
- `components/VideoShowcase.tsx`: new **Video & Media Production** carousel section on `/lab` page
  - 6 client videos across three tagged categories: `Video Marketing`, `AI Model`, `AI Podcast`
  - Sub-section card selector UI: four interactive cards (All Formats / Video Marketing / AI Model / AI Podcast) each with eyebrow, label, descriptor, and active top-bar indicator
  - `AnimatePresence`-driven body copy that swaps in on category change
  - FocusRail 3D landscape carousel wired to active filter; `key` prop forces remount + index reset on switch
  - Inline YouTube nocookie embed on center-card click; fallback to `hqdefault.jpg` thumbnail on `maxresdefault` 404
- `lib/data.ts`: `ClientVideo` type and `clientVideos` array
  - Active Power × 2 (`kkSUicrnRHM`, `2HWmE4hRqR4`) tagged `Video Marketing`
  - Asset Mantle × 1 (`5CYGxM9emo4`) tagged `AI Model`
  - Ingrained Logic × 1 (`gBlE3XpGmwU`) tagged `Video Marketing`
  - Mantle Works × 2 (`--3EhPjznAg`, `WroSa1eiUbU`) tagged `AI Podcast`

### Changed
- `components/LabPage.tsx`: import and mount `<VideoShowcase />` after `<ClientWebsites />`
- `lib/data.ts`: Manipal Aerosports screenshot upgraded to 16:9 crop (`width/1200/crop/675`) for cinematic hero framing
- `lib/data.ts`: JB & Co Law screenshot upgraded to taller crop (`width/1200/crop/840`) to expose more above-the-fold content
- `VideoShowcase` section copy: headline *"Content at every frequency."*, premium sub-section descriptors, CTA copy *"Get a production brief →"*

## [1.1.0] - 2026-04-09

### Removed
- `components/ui/hero-shutter-text.tsx`: never imported after initial scaffold; only consumer of `lucide-react`

### Changed
- Enable `noUnusedLocals` and `noUnusedParameters` in `tsconfig.json` for build-time dead code enforcement

### Added
- `CHANGELOG.md`: project history in Keep a Changelog format
- `ROLLBACK.md`: documented rollback strategies for Vercel and git
- `db/`: forward-looking migration scaffolding (Supabase/PostgreSQL)
  - `db/migrations/0001_initial_schema.sql`: contacts + waitlist tables
  - `db/migrations/0002_leads_crm.sql`: leads table for acquisition funnel
  - `db/migrate.sh`: idempotent migration runner
  - `db/README.md`: migration workflow documentation

## [1.0.0] - 2026-04-07

### Added
- Comprehensive README with project documentation and deployment guide

### Changed
- Previous README replaced with full project overview

## [0.4.0] - 2026-03-05

### Added
- BergLabs.ai logo to client marquee
- Teal glow effect on logo hover

### Changed
- Logo marquee simplified to single row, right-to-left direction
- Increased logo sizes for Manipal Aerosports and Active Power (1.8×)
- Increased logo sizes for Asset Mantle and Mantle Works (1.4×); added background for Mantle Works

## [0.3.0] - 2026-02-27

### Added
- GitHub link in footer and mobile navigation

### Changed
- GitHub link updated to `merak3i`
- Logo marquee invert filter applied to remove white backgrounds

## [0.2.0] - 2026-02-25

### Added
- Vismay avatar in Authority section
- BackgroundPaths, GradientButton UI components from 21st.dev

### Changed
- Hero shutter text removed; scroll indicator repositioned to right-center
- Logo marquee fixed

## [0.1.0] - 2026-02-25

### Added
- Initial commit: Next.js 14 acquisition engine site
- Hero, Navigation, Footer, Offers, ClientMarquee, Authority, SubstackFeed sections
- `lib/data.ts`: siteConfig, clientLogos, offers, Substack feed fetcher
