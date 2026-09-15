import type { Metadata } from "next";
import SkillLibrary from "@/components/SkillLibrary";

export const metadata: Metadata = {
  title: "Public skill kit | Lab",
  description: "16 reusable AI workflows for writing, research, verification and recurring work. Explore examples, practical limits and free skill downloads.",
  alternates: { canonical: "/lab/skills" },
  openGraph: { title: "good habits, in small files | Meow Creative Haus", description: "A public skill kit with a three-chapter presentation, composite examples and reusable downloads.", url: "/lab/skills", type: "website" },
};

export default function SkillsPage() { return <SkillLibrary />; }
