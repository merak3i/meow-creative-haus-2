import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: { canonical: "/studio-notes-september-2026" },
};

export default function StudioNotesIssueLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
