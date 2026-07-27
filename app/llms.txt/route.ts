import { siteConfig } from "@/lib/data";

export const dynamic = "force-static";

export function GET() {
  const body = `# Meow Creative Haus

> Meow Creative Haus is an India-based product, web, and experience studio. It designs and builds interactive websites, AI systems, digital products, and go-to-market systems for founders and businesses.

## Canonical pages

- Home: ${siteConfig.url}/
- Services: ${siteConfig.url}/services
- AI automation and AI-backed digital marketing: ${siteConfig.url}/ai-automation-digital-marketing-udupi
- Lab: ${siteConfig.url}/lab
- Patherle: ${siteConfig.url}/patherle
- Privacy: ${siteConfig.url}/privacy

## Services

- Interactive experiences and motion-led websites
- Product and web design and development
- AI systems, multilingual bots, agents, and workflow automation
- Go-to-market and outreach systems

## Location

- Based in Udupi, Karnataka, India
- Studio: ${siteConfig.location.streetAddress}, ${siteConfig.location.locality}, ${siteConfig.location.region} ${siteConfig.location.postalCode}
- Hours: ${siteConfig.location.hours}
- Works with clients in India and beyond

## Public work

- Meow Operations: https://github.com/merak3i/meow-ops
- Patherle: https://www.patherle.com/
- BergLabs: https://berglabs.ai/

## Contact and profiles

- Phone: ${siteConfig.phoneDisplay}
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
