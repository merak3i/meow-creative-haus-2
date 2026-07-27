import { siteConfig } from "@/lib/data";

export const dynamic = "force-static";

export function GET() {
  const body = `# Meow Creative Haus: extended reference

## Identity

Meow Creative Haus is a product, web, and experience studio based in Udupi, Karnataka, India. The studio builds websites, digital products, practical AI systems, interactive experiences, and go-to-market infrastructure.

Canonical website: ${siteConfig.url}/
Services: ${siteConfig.url}/services
AI automation and AI-backed digital marketing: ${siteConfig.url}/ai-automation-digital-marketing-udupi
Lab and public work: ${siteConfig.url}/lab

## What the studio does

### Product and web

Meow Creative Haus designs and develops marketing websites and digital product interfaces. Work can include information architecture, interface design, development, integrations, launch preparation, and iteration after release.

### Interactive experiences

The studio creates scroll-led stories, motion systems, campaign experiences, and other interactive web work where narrative and implementation need to ship together.

### AI systems

The studio builds multilingual assistants, agent-operated tools, workflow automation, and operational control surfaces. Human oversight and inspectable evidence are part of the delivery approach.

### Go-to-market systems

The studio connects positioning, organic content workflows, outreach operations, and pipeline infrastructure to the product or website being launched.

## Public projects

- Meow Operations: local-first command deck for agent work — https://github.com/merak3i/meow-ops
- Patherle: WhatsApp-first AI business system — https://www.patherle.com/
- BergLabs: public client website and platform work — https://berglabs.ai/

## Geographic context

The studio is based at ${siteConfig.location.streetAddress}, ${siteConfig.location.locality}, ${siteConfig.location.region} ${siteConfig.location.postalCode}, India. It is open ${siteConfig.location.hours} and works with businesses in India and beyond.

## Contact

- Email: ${siteConfig.email}
- Instagram: ${siteConfig.social.instagram}
- LinkedIn: ${siteConfig.social.linkedinPersonal}
- X: ${siteConfig.social.twitter}
- GitHub: ${siteConfig.social.github}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
