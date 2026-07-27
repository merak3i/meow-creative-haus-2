# Meow Creative Haus Visibility Plan

Status date: 2026-07-28  
Target website supplied by owner: `https://meowcreativehouse.xyz`  
Current live website: `https://meowcreativehaus.vercel.app`

## Current decision gates

Three items must be settled before platform setup or production deployment:

1. **Domain:** `meowcreativehouse.xyz` does not currently return public DNS.
   Connect it to the production Vercel project before switching canonical URLs.
2. **Business name:** the established website and social identity use **Meow
   Creative Haus**. The requested Google profile name was **Meow Creative
   House**. Use the real-world name shown on the website, invoices, signage, and
   customer-facing material. Do not create a second spelling only for keywords.
3. **Location type:** the proposed address is **Surbhi 202, Doddanagudde, Udupi
   575101**. Show this as a storefront only if Meow Creative Haus has permanent
   signage, staff are present during listed hours, and customers can visit
   there. Otherwise create a service-area profile, verify using the real
   address, and hide the street address from the public listing.

## `/visibility-foundation`

Owner: Codex  
Cost: free  
Status: prepared on `feat/seo-aeo-geo`

- [x] Keep a crawlable `robots.txt` with the canonical sitemap.
- [x] Keep an XML sitemap and add the privacy page.
- [x] Generate `llms.txt` from the canonical domain.
- [x] Add a fuller `llms-full.txt` entity and services reference.
- [x] Make the canonical site URL deployment-configurable.
- [x] Keep page titles, descriptions, canonical tags, Open Graph, and X cards.
- [x] Add Organization, WebSite, ProfessionalService, Service, and FAQ schema.
- [x] Add Udupi and India as truthful service areas without claiming a public
  storefront.
- [x] Add answer-first service FAQs for AEO/GEO.
- [x] Add a privacy page before enabling Google Analytics.
- [x] Add Google Search Console and Bing verification hooks.
- [x] Add GA4 loading plus `generate_lead` events for WhatsApp, Calendly, and
  email clicks.
- [x] Replace the private LinkedIn admin URL in entity markup with the public
  company URL.
- [ ] Add the exact street address and `PostalAddress` schema only after the
  storefront/service-area decision is confirmed.
- [ ] Add a public phone number and opening hours only after the owner supplies
  the exact values used for the Google profile.

## `/connect-domain`

Owner: user + Codex  
Cost: domain already purchased; no additional paid tool required  
Gate: registrar/Vercel access

- [ ] Confirm whether `meowcreativehouse.xyz` is the intended spelling.
- [ ] Add the domain to the production Vercel project.
- [ ] Add the DNS records Vercel supplies at the domain registrar.
- [ ] Add a `www` record and redirect one hostname to the chosen canonical
  hostname.
- [ ] Confirm HTTPS, apex-to-canonical redirect, and no redirect loop.
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://meowcreativehouse.xyz`.
- [ ] Deploy, then recheck `/`, `/services`, `/lab`, `/patherle`, `/privacy`,
  `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt`.
- [ ] Keep the old Vercel hostname reachable but canonicalized to the `.xyz`
  domain; redirect it if the hosting setup permits.

## `/google-search-console`

Owner: user signs in; Codex can guide and verify  
Cost: free  
Gate: live domain and Google account

- [ ] Open Google Search Console.
- [ ] Add a **Domain property** for `meowcreativehouse.xyz`.
- [ ] Copy Google’s TXT verification record into DNS.
- [ ] Complete ownership verification.
- [ ] Submit `https://meowcreativehouse.xyz/sitemap.xml`.
- [ ] Inspect the homepage and request indexing once.
- [ ] Inspect `/services`, `/lab`, and `/patherle`; request indexing only when
  they are live and canonical.
- [ ] Check Page indexing, HTTPS, Core Web Vitals, Manual actions, and Security
  issues.
- [ ] Connect Search Console to GA4 after both properties exist.

Official guide:
`https://support.google.com/webmasters/answer/7451001`

## `/google-analytics`

Owner: user signs in; Codex installs and verifies  
Cost: free  
Gate: Google account

- [ ] Create a GA4 property named `Meow Creative Haus`.
- [ ] Use time zone `India Standard Time` and the business reporting currency.
- [ ] Create a Web data stream for the final canonical domain.
- [ ] Enable enhanced measurement.
- [ ] Copy the `G-` measurement ID into
  `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`.
- [ ] Deploy and verify a page view in Realtime.
- [ ] Verify `generate_lead` with methods `whatsapp`, `calendly`, and `email`.
- [ ] Mark `generate_lead` as a key event.
- [ ] Exclude internal/developer traffic only after a stable office IP exists;
  do not create brittle filters for changing home/mobile IPs.

Official guide:
`https://support.google.com/analytics/answer/14183469`

## `/bing-webmaster`

Owner: user signs in; Codex can guide and verify  
Cost: free  
Gate: verified Google Search Console property

- [ ] Open Bing Webmaster Tools.
- [ ] Use **Import from Google Search Console** to avoid a second ownership
  process and import the sitemap.
- [ ] Confirm the imported canonical property and sitemap.
- [ ] Run Site Scan and review Index Explorer.
- [ ] Submit the homepage only if it is not discovered after import.
- [ ] Add IndexNow later for fast update notifications once the domain and
  publishing workflow are stable.

Official guides:
`https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b`  
`https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed`

## `/google-business-profile`

Owner: user handles sign-in, verification, and any video/phone proof; Codex can
prepare copy and guide each screen  
Cost: free  
Gate: business eligibility and name/location decision

- [ ] Confirm the public name: default recommendation is **Meow Creative Haus**
  because that matches the established site.
- [ ] Confirm whether customers can visit the Doddanagudde address during
  staffed hours and see permanent Meow Creative Haus signage.
- [ ] If yes, use the exact storefront address and accurate opening hours.
- [ ] If no, create a service-area business, verify with the real address, hide
  the address, and list honest service areas such as Udupi and the cities
  actually served.
- [ ] Choose the closest available primary category. Likely starting point:
  `Website designer`; consider `Marketing agency` and `Software company` only
  when each accurately reflects active services.
- [ ] Add the canonical website, public phone number, WhatsApp/contact option,
  hours, services, and a factual business description.
- [ ] Upload the real logo, cover image, workplace/team proof, and public work.
- [ ] Complete Google’s required verification. The user must handle any video,
  phone, email, live call, or postcard proof.
- [ ] Ask real clients for honest reviews using Google’s review link. No
  incentives, review gating, or generated reviews.
- [ ] Publish one useful update after verification, then maintain the profile
  rather than creating posting volume for its own sake.

Official eligibility and address rules:
`https://support.google.com/business/answer/13763036`  
`https://support.google.com/business/answer/3038177`  
`https://support.google.com/business/answer/9157481`

## `/answer-engine-content`

Owner: Codex drafts; user approves public claims  
Cost: free  
Cadence: one strong page or update at a time

Use this page formula:

1. Buyer-shaped question as the title.
2. A direct 40-60-word answer immediately below it.
3. Who the answer is for and the operating context.
4. A clear process or decision framework.
5. Public, verifiable work examples.
6. Practical limitations and when the approach is not suitable.
7. Related FAQs.
8. Author, reviewed/updated date, and relevant source links.
9. Matching structured data where appropriate.
10. Internal links to the relevant service, proof, and contact route.

Priority zero-paid topics:

- [ ] Website design and product studio services in Udupi.
- [ ] What an AI product studio does for an Indian small business.
- [ ] When workflow automation is useful and when it is not.
- [ ] How multilingual assistants can support Indian customer journeys.
- [ ] How to plan an interactive website without sacrificing speed or
  accessibility.
- [ ] Public build notes for Meow Operations and Patherle.
- [ ] One evidence-backed page per approved client/public project rather than a
  logo-only showcase.

## `/technical-follow-through`

Owner: Codex  
Cost: free

- [ ] Add descriptive alternative text and explicit dimensions to meaningful
  images; keep decorative visuals out of accessibility text.
- [ ] Convert proof-heavy showcase items into indexable project detail pages.
- [ ] Add breadcrumbs to nested detail pages.
- [ ] Improve internal links between Home, Services, Lab, project evidence, and
  contact actions.
- [ ] Measure Core Web Vitals on the final domain and fix the largest
  real-world bottleneck first.
- [ ] Confirm the site works with JavaScript disabled enough for crawlers to
  read primary content.
- [ ] Keep titles unique and avoid creating thin pages for every keyword/city.
- [ ] Keep social profile names, bios, website links, and location spelling
  consistent.
- [ ] Add IndexNow after normal publishing is stable.

## `/monthly-visibility-check`

Owner: Codex + user  
Cost: free tiers/manual checks

- [ ] Record Google Search Console impressions, clicks, CTR, and indexed pages.
- [ ] Record Bing indexed pages and crawl/site-scan issues.
- [ ] Record GA4 engaged sessions and `generate_lead` events by method.
- [ ] Test a fixed set of buyer questions in Google and free LLM chat surfaces.
- [ ] Score answer presence, citation presence, description accuracy, and
  conversion path.
- [ ] Compare against the previous month and assign one owner to each fix.
- [ ] Keep all claims tied to the live site or approved brand evidence.

## Later, by design

- Link building and partnership outreach.
- Selective free/local citations only where the directory is credible and the
  submission effort is justified.
- Apple Business Connect or other map ecosystems if the Google profile proves
  worthwhile.

## Skip

- Paid SEO suites until free platform data creates a real need.
- “Submit to hundreds of search engines” services.
- Paid AI/LLM submission services.
- Mass directory submissions and duplicate city pages.
- Keyword stuffing in the business name or address.
- Fake locations, virtual offices, fake reviews, or review incentives.
- Claims that `llms.txt` guarantees inclusion or ranking in AI answers. It is a
  useful experimental reference file, not a substitute for crawlable,
  evidence-backed pages and real entity consistency.
