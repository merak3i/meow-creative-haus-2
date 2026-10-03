import type { Metadata } from "next";
import LabPage from "@/components/LabPage";
export const metadata: Metadata = {
  title: "Historical Lab view",
  description:
    "Preserved Meow Creative Haus Lab walkthrough, media rails and detailed release views.",
  alternates: { canonical: "/lab/archive" },
  openGraph: { url: "/lab/archive", images: ["/opengraph-image"] },
};
export default function Archive() {
  return <LabPage />;
}
