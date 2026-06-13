import type { Metadata } from "next";
import PatherleTease from "@/components/PatherleTease";

export const metadata: Metadata = {
  title: "Patherle: the AI business OS we're building in the dark | MCH",
  description:
    "A WhatsApp-first AI business OS for Indian MSMEs. Live for early businesses; private automation details stay withheld.",
};

export default function PatherlePage() {
  return <PatherleTease />;
}
