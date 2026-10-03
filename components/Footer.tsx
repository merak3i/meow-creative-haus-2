import Link from "next/link";
import { siteConfig } from "@/lib/data";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="wordmark" href="/">
          MCH<span>.</span>
        </Link>
        <p>
          Digital products &amp; media.
          <br />
          Made with care. Kept in good company.
        </p>
      </div>
      <nav aria-label="Footer">
        <Link href="/work">All work</Link>
        <Link href="/updates">Release archive</Link>
        <Link href="/tech-misc-larp">Tech / Misc / Larp</Link>
        <Link href="/lab/skills">Skills library</Link>
        <Link href="/privacy">Privacy</Link>
        <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
          Instagram ↗
        </a>
      </nav>
      <p className="footer-bottom">
        © {new Date().getFullYear()} Meow Creative Haus ·{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>
    </footer>
  );
}
