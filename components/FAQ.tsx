import Link from "next/link";
import { faqs, faqSchema } from "@/lib/faq";

export default function FAQ() {
  return (
    <section id="before-we-start" className="portfolio-section faq-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">A little clarity</p>
          <h2>Before we start.</h2>
        </div>
        <p>What the work can include, and how we approach it.</p>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <details key={faq.id} id={faq.id} open={index < 2}>
            <summary>
              {faq.question}
              <span aria-hidden="true">+</span>
            </summary>
            <div className="faq-answer">
              <p>{faq.answer}</p>
              <Link href={faq.href}>
                {faq.link} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
