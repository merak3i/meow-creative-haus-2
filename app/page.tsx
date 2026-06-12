import Hero from "@/components/Hero";
import ClientMarquee from "@/components/ClientMarquee";
import Offers from "@/components/Offers";
import Lab from "@/components/Lab";
import LoopEngineering from "@/components/LoopEngineering";
import PatherleTeaser from "@/components/PatherleTeaser";
import ShipLog from "@/components/ShipLog";
import Authority from "@/components/Authority";
import SubstackFeed from "@/components/SubstackFeed";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <Offers />
      <Lab />
      <LoopEngineering />
      <PatherleTeaser />
      <ShipLog />
      <Authority />
      <SubstackFeed />
    </>
  );
}
