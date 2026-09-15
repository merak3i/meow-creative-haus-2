import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Meow Creative Haus handles website analytics, enquiry links, and personal information.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <section className="px-6 pb-24 pt-36 md:px-12 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-[840px]">
        <p className="mb-5 text-label-sm uppercase tracking-[0.2em] text-accent-teal">
          Privacy
        </p>
        <h1 className="text-display-xl">A plain-language privacy note.</h1>
        <p className="mt-8 text-body-lg text-text-muted">
          This website presents the work of Meow Creative Haus and helps people
          start a conversation with the studio. We collect only the information
          needed to understand website use and respond to enquiries.
        </p>

        <div className="mt-16 space-y-12 text-body-md text-text-muted">
          <section>
            <h2 className="text-display-md text-text">Website analytics</h2>
            <p className="mt-4">
              When analytics is enabled, the site may use Google Analytics to
              measure page visits, navigation, and clicks on contact links.
              Analytics data is used to improve the website and understand which
              services people are looking for. Browser settings and content
              blockers can be used to limit analytics cookies.
            </p>
          </section>

          <section>
            <h2 className="text-display-md text-text">Enquiries</h2>
            <p className="mt-4">
              WhatsApp, Calendly, email, and social links take you to third-party
              services with their own privacy terms. If you contact us, we use
              the details you provide to respond, scope work, and maintain the
              resulting business relationship.
            </p>
          </section>

          <section>
            <h2 className="text-display-md text-text">Sharing and retention</h2>
            <p className="mt-4">
              We do not sell personal information. Information may be processed
              by the tools needed to host the website, measure performance, or
              respond to your request. Enquiry records are kept only while they
              remain useful for the conversation, project, or legal and
              accounting obligations.
            </p>
          </section>

          <section>
            <h2 className="text-display-md text-text">Contact</h2>
            <p className="mt-4">
              To ask about your information or request a correction or deletion,
              email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent-teal underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>

        <p className="mt-16 text-sm text-text-dim">
          Last updated: 28 July 2026
        </p>
      </div>
    </section>
  );
}
