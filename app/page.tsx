import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ClientMarquee from "@/components/ClientMarquee";
import ClientWebsites from "@/components/ClientWebsites";
import Offers from "@/components/Offers";
import Lab from "@/components/Lab";
import LoopEngineering from "@/components/LoopEngineering";
import PatherleTeaser from "@/components/PatherleTeaser";
import ShipLog from "@/components/ShipLog";
import Authority from "@/components/Authority";
import SubstackFeed from "@/components/SubstackFeed";
import WildPopup from "@/components/WildPopup";
import ZineTeaser from "@/components/ZineTeaser";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <ClientWebsites />
      <Offers />
      <Lab />
      <LoopEngineering />
      <PatherleTeaser />
      <ShipLog />
      <Authority />
      <ZineTeaser />
      <section className="border-b border-surface-border bg-black px-6 py-16 md:px-12">
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-teal">field notes / september 2026</p>
          <h2 className="max-w-3xl text-display-md">my laptop has a skill issue</h2>
          <p className="my-6 max-w-2xl text-body-md text-text-muted">The useful kind. A local-history audit of the AI skills behind the work, with S and A tiers, a few specialist rescues, and the limits of the evidence.</p>
          <a href="/skills-field-notes" className="inline-block border border-accent-teal px-5 py-3 text-sm text-accent-teal transition-colors hover:bg-accent-teal hover:text-surface">read the field notes →</a>
        </div>
      </section>
      <SubstackFeed />
      <WildPopup />
    </>
  );
}
