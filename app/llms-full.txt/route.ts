import { siteConfig } from "@/lib/data";
import { workProjects } from "@/lib/work";
import { faqs } from "@/lib/faq";
export const dynamic = "force-static";
export function GET() {
  return new Response(
    `# Meow Creative Haus: extended reference

Meow Creative Haus designs digital products and media: websites, product interfaces, AI workflows, illustrations, social creative and video. Work can include design, implementation, launch preparation and agreed support after launch.
Canonical: ${siteConfig.url}/
Services: ${siteConfig.url}/services
Work: ${siteConfig.url}/work
Journal: ${siteConfig.url}/journal
Updates: ${siteConfig.url}/updates
Lab: ${siteConfig.url}/lab
AI automation and marketing: ${siteConfig.url}/ai-automation-digital-marketing-mangalore

## Work and status
${workProjects.map((p) => `- ${p.name}: ${p.description} Status: ${p.status}. ${siteConfig.url}/work/${p.slug}`).join("\n")}

## Project questions
${faqs.map((f) => `### ${f.question}\n${f.answer}\n${siteConfig.url}${f.href}\n`).join("\n")}

## Reading and historical resources
Zine archive: ${siteConfig.url}/tech-misc-larp
Issue 01: ${siteConfig.url}/tech-misc-larp/issue-01
September studio notes: ${siteConfig.url}/studio-notes-september-2026
Public skills: ${siteConfig.url}/lab/skills

Drafts and concepts are not delivered results. Local creation dates do not establish publication. Build descriptions do not assert ownership. Historical release records retain their original wording and must be read in their dated context. Illustrative scenarios do not establish client outcomes.

## Contact
Email: ${siteConfig.email}
Phone: ${siteConfig.phoneDisplay}
Instagram: ${siteConfig.social.instagram}
LinkedIn: ${siteConfig.social.linkedinPersonal}
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=86400",
      },
    },
  );
}
