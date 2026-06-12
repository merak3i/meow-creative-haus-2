# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

## [1.4.0] - 2026-06-12

### Added
- `components/LoopEngineering.tsx` — Loop Engineering homepage section: magnified five-frame tour of The Loom via `AnimatedTabs`, expandable README card
- `components/AnimatedTabs.tsx` — tab viewer metamorphosed to site tokens (mono labels, teal spring-pill, blur-in transition)
- `app/patherle/page.tsx` + `components/PatherleTease.tsx` — Patherle teaser page: vector-field backdrop, scroll-tilt reveal, five redacted stills, build-log roadmap
- `components/PatherleTeaser.tsx` — homepage FILE // 003 band linking /patherle
- `components/ShipLog.tsx` — homepage ship-log section (this list, in public)
- `components/VectorField.tsx`, `components/ContainerScroll.tsx`, `components/PatherleRoadmap.tsx`
- `public/screenshots/loom/*` (5) and `public/screenshots/patherle/*` (5) — annotated, sanitized captures

### Changed
- `lib/data.ts` — Meow Operations re-souled: "The control room for the agentic era"; The Loom added to stats

### Removed
- `components/InfiniteGallery.tsx` + three.js stack (superseded by AnimatedTabs; drops transitive fast-xml-parser advisories)


## [1.3.0] - 2026-04-15

### Added
- `public/screenshots/manipal-aerosports.png` — local hero screenshot for Manipal Aerosports web design card
- `public/screenshots/jb-co-law.png` — local hero screenshot for JB & Co Law web design card
- `public/canter-club-logo.png` — Canter Club Bengaluru circular logo (drop file to activate)
- `lib/data.ts` — Canter Club added to `clientLogos` marquee (`scale: 1.6`, `noInvert: true`)

### Changed
- `lib/data.ts` — Manipal Aerosports screenshot switched from `image.thum.io` URL to local `/screenshots/manipal-aerosports.png`
- `lib/data.ts` — JB & Co Law screenshot switched from `image.thum.io` URL to local `/screenshots/jb-co-law.png`
- `components/LabPage.tsx` — `ClientWebsites` ("Brands built to convert") promoted above `ShortsShowcase` ("Every second earned")

## [1.2.1] - 2026-04-14

### Changed
- `components/LabPage.tsx` — `VideoShowcase` promoted to first section slot (replaces `AIModelsShowcase`)
- `components/LabPage.tsx` — `ClientWebsites` follows `VideoShowcase`

### Removed
- `AIModelsShowcase` — removed from `/lab` page (placeholder-only, superseded by `VideoShowcase`)
- `ArticleShowcase` — removed from `/lab` page

## [1.2.0] - 2026-04-14

### Added
- `components/VideoShowcase.tsx` — new **Video & Media Production** carousel section on `/lab` page
  - 6 client videos across three tagged categories: `Video Marketing`, `AI Model`, `AI Podcast`
  - Sub-section card selector UI: four interactive cards (All Formats / Video Marketing / AI Model / AI Podcast) each with eyebrow, label, descriptor, and active top-bar indicator
  - `AnimatePresence`-driven body copy that swaps in on category change
  - FocusRail 3D landscape carousel wired to active filter; `key` prop forces remount + index reset on switch
  - Inline YouTube nocookie embed on center-card click; fallback to `hqdefault.jpg` thumbnail on `maxresdefault` 404
- `lib/data.ts` — `ClientVideo` type and `clientVideos` array
  - Active Power × 2 (`kkSUicrnRHM`, `2HWmE4hRqR4`) tagged `Video Marketing`
  - Asset Mantle × 1 (`5CYGxM9emo4`) tagged `AI Model`
  - Ingrained Logic × 1 (`gBlE3XpGmwU`) tagged `Video Marketing`
  - Mantle Works × 2 (`--3EhPjznAg`, `WroSa1eiUbU`) tagged `AI Podcast`

### Changed
- `components/LabPage.tsx` — import and mount `<VideoShowcase />` after `<ClientWebsites />`
- `lib/data.ts` — Manipal Aerosports screenshot upgraded to 16:9 crop (`width/1200/crop/675`) for cinematic hero framing
- `lib/data.ts` — JB & Co Law screenshot upgraded to taller crop (`width/1200/crop/840`) to expose more above-the-fold content
- `VideoShowcase` section copy: headline *"Content at every frequency."*, premium sub-section descriptors, CTA copy *"Get a production brief →"*

## [1.1.0] - 2026-04-09

### Removed
- `components/ui/hero-shutter-text.tsx` — never imported after initial scaffold; only consumer of `lucide-react`

### Changed
- Enable `noUnusedLocals` and `noUnusedParameters` in `tsconfig.json` for build-time dead code enforcement

### Added
- `CHANGELOG.md` — project history in Keep a Changelog format
- `ROLLBACK.md` — documented rollback strategies for Vercel and git
- `db/` — forward-looking migration scaffolding (Supabase/PostgreSQL)
  - `db/migrations/0001_initial_schema.sql` — contacts + waitlist tables
  - `db/migrations/0002_leads_crm.sql` — leads table for acquisition funnel
  - `db/migrate.sh` — idempotent migration runner
  - `db/README.md` — migration workflow documentation

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
- `lib/data.ts` — siteConfig, clientLogos, offers, Substack feed fetcher
