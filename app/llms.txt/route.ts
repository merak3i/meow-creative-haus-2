import { siteConfig } from "@/lib/data";
export const dynamic = "force-static";
export function GET() {
  return new Response(
    `# Meow Creative Haus
> Digital products & media for founders and businesses. Websites, AI systems and visual stories, with support after launch.

Canonical: ${siteConfig.url}/

## Useful pages
- [Work](${siteConfig.url}/work): grouped clients, builds and labelled concepts
- [Services](${siteConfig.url}/services): scope and capabilities
- [Before we start](${siteConfig.url}/#before-we-start): project questions and direct answers
- [Lab](${siteConfig.url}/lab): tools, motion studies and original art
- [Patherle build](${siteConfig.url}/work/patherle): selected interfaces, beta status
- [1ClickWebsite India build](${siteConfig.url}/work/1clickwebsite-india): alpha workflow exploration
- [Journal](${siteConfig.url}/journal): writing and permanent archive links
- [Zine](${siteConfig.url}/tech-misc-larp): Tech / Misc / Larp archive and Issue 01
- [Studio notes](${siteConfig.url}/studio-notes-september-2026): September 2026
- [Updates](${siteConfig.url}/updates): complete dated release records
- [Skills](${siteConfig.url}/lab/skills): editable public skills
- [AI automation and marketing](${siteConfig.url}/ai-automation-digital-marketing-mangalore): retained service page
- [Privacy](${siteConfig.url}/privacy)
- [Extended reference](${siteConfig.url}/llms-full.txt)

Drafts, concepts and illustrative scenarios are labelled. Build pages do not assert ownership. Historical release statements describe their original date, not current capability. Source links are evidence of the linked record, not a performance guarantee.
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=86400",
      },
    },
  );
}
