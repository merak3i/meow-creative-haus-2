import type { Metadata } from "next";
import SkillLibrary from "@/components/SkillLibrary";

export const metadata: Metadata = {
  title: "Public skill resources | Lab",
  description: "16 reusable AI skill resources for writing, research, verification and recurring work. Explore examples, practical limits and free downloads.",
  alternates: { canonical: "/lab/skills" },
  openGraph: { title: "good habits, in small files | Meow Creative Haus", description: "A public skill resource library with a three-chapter presentation, composite examples and reusable downloads.", url: "/lab/skills", type: "website" },
};

export default function SkillsPage() { return <SkillLibrary />; }
