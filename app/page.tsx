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
      <SubstackFeed />
      <WildPopup />
    </>
  );
}
