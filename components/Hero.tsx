import { siteConfig } from "@/lib/data";
import RevenueDashboard from "@/components/RevenueDashboard";

export default function Hero() {
  return (
    <section id="hero" className="terminal-hero">
      <div className="terminal-stars" aria-hidden="true"><span>✦</span><span>+</span><span>✧</span><span>+</span></div>
      <div className="terminal-intro">
        <p className="terminal-eyebrow">Product &amp; Experience Studio</p>
        <h1>We design and build <br />software worth feeling.</h1>
        <p className="terminal-description">
          A product and experience studio in Mangalore, working with founders
          and businesses across India and beyond. We build interfaces, AI
          systems, and websites, then keep shipping after launch.
        </p>
        <div className="terminal-actions">
          <a className="terminal-button terminal-primary" href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">Start a Project <span aria-hidden="true">↗</span></a>
          <a className="terminal-button" href="#client-sites">See the Work <span aria-hidden="true">↓</span></a>
          <a className="terminal-button" href="/lab/skills">Explore the Skills <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div className="terminal-machine">
        <div className="terminal-machine-label" aria-hidden="true"><span>MCH / CREATIVE SYSTEMS</span><span>EST. MANGALORE · SHIPPED EVERYWHERE</span></div>
        <div className="terminal-screen"><RevenueDashboard /></div>
        <div className="terminal-machine-footer" aria-hidden="true"><span>MEOW CREATIVE HAUS</span><span>▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪</span><span className="terminal-power">●</span></div>
      </div>
      <p className="terminal-caption">Every project on this page is live. Click any of them.</p>
      <a href="#client-sites" className="terminal-scroll">Scroll ↓</a>
    </section>
  );
}
