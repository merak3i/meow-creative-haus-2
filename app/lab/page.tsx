import type { Metadata } from "next";
import LabPage from "@/components/LabPage";

export const metadata: Metadata = {
  title: "AI Systems & Open-Source Product Lab",
  description:
    "Explore open-source AI operations tools, product experiments, client work, and public ship notes from the Meow Creative Haus lab.",
  alternates: {
    canonical: "/lab",
  },
  openGraph: {
    title: "AI Systems & Open-Source Product Lab | Meow Creative Haus",
    description:
      "Open-source AI operations tools, product experiments, client work, and public ship notes from the Meow Creative Haus lab.",
    url: "/lab",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Meow Creative Haus product, web, and AI studio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Systems & Open-Source Product Lab | Meow Creative Haus",
    description:
      "Open-source AI operations tools, product experiments, client work, and public ship notes.",
    images: ["/opengraph-image"],
  },
};

export default function Lab() {
  return <LabPage />;
}
