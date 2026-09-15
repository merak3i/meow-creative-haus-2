import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Meow Creative Haus",
    short_name: "MCH",
    description:
      "Product, web, and experience studio building interactive websites, AI systems, and digital products.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d10",
    theme_color: "#0b0d10",
    lang: "en-IN",
  };
}
