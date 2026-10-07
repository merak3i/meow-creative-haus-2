import Image from "next/image";
import { siteConfig } from "@/lib/data";

export default function Hero() {
  return (
    <section id="hero" className="studio-hero">
      <div className="studio-hero-copy">
        <p className="studio-eyebrow">Meow Creative Haus · Studio</p>
        <h1>
          Digital products
          <br />
          <span>&amp;</span> media.
        </h1>
        <p className="studio-deck">
          Designing &amp; building software/media <strong>worth feeling.</strong>
        </p>
        <p className="studio-description">
          Digital products &amp; media for founders and businesses. Websites, AI
          systems and visual stories, with support after launch.
        </p>
        <div className="studio-actions">
          <a className="studio-button studio-button-quiet" href="#client-sites">
            View work
          </a>
          <a
            className="studio-button studio-button-primary"
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            Start a project
          </a>
        </div>
        <ol className="studio-steps" aria-label="Our process">
          <li><span>01</span> Sketch the idea</li>
          <li><span>02</span> Set the structure</li>
          <li><span>03</span> Build the interface</li>
          <li><span>04</span> Carry it into media</li>
        </ol>
        <p className="studio-signoff">From the first sketch to the working thing.</p>
      </div>

      <figure className="studio-hero-visual">
        <figcaption><span>Frame : Home</span><span>Selected work / 01</span></figcaption>
        <div className="studio-work-frame">
          <Image
            src="/screenshots/manipal-aerosports.webp"
            alt="The Manipal Aerosports website, designed and built by Meow Creative Haus"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 54vw"
          />
          <span className="studio-frame-index">01 / 04</span>
        </div>
        <div className="studio-visual-footer">
          <span>Product, web &amp; experience</span>
          <a href="#client-sites">Explore the work</a>
        </div>
      </figure>
      <a href="#client-sites" className="studio-scroll">Scroll to explore</a>
    </section>
  );
}
