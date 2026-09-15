import { publicSkills, skillMarkdown } from "@/lib/public-skills";

export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() { return publicSkills.map((skill) => ({ slug: skill.id })); }

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = publicSkills.find((entry) => entry.id === slug);
  if (!skill) return new Response("Skill not found", { status: 404 });
  return new Response(skillMarkdown(skill), { headers: {
    "Content-Type": "text/markdown; charset=utf-8",
    "Content-Disposition": 'attachment; filename="SKILL.md"',
    "X-Content-Type-Options": "nosniff",
  } });
}
