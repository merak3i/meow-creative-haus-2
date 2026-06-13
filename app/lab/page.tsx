import type { Metadata } from "next";
import LabPage from "@/components/LabPage";

export const metadata: Metadata = {
  title: "Lab — Meow Creative Haus",
  description:
    "Open tools, public systems, and ship notes from the lab. Meow Operations, Loop Ops, client work, and the build log.",
  openGraph: {
    title: "Lab — Meow Creative Haus",
    description:
      "Open tools, internal systems, and ship notes from the lab floor.",
    type: "website",
  },
};

export default function Lab() {
  return <LabPage />;
}
