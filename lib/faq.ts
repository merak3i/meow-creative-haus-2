export const faqs = [
  {
    id: "what-we-build",
    question: "What does Meow Creative Haus design and build?",
    answer:
      "Meow Creative Haus designs websites, product interfaces, AI workflows, illustrations, social creative and video. Work can connect the story, visual system and implementation; the portfolio shows each example’s status.",
    href: "/work",
    link: "Explore the work",
  },
  {
    id: "website-and-media",
    question: "Can one project include a website and branded media?",
    answer:
      "Yes. A website can share its visual direction with illustrations, social posts, campaign artwork and motion. Tender Moments brings several formats together. We agree the deliverables before starting.",
    href: "/work/tender-moments",
    link: "See Tender Moments",
  },
  {
    id: "social-and-video",
    question: "What kinds of social content and video can you create?",
    answer:
      "Examples include illustrated posts, editorial carousels, short videos, AI-assisted presenters, podcasts and motion studies. We choose formats around the message. Drafts and concepts stay distinct from verified published work.",
    href: "/work?discipline=Social",
    link: "Browse social work",
  },
  {
    id: "preserve-content",
    question: "Can you improve an existing website without losing its content?",
    answer:
      "We inventory pages, media, links and history before changing the site. Copy, navigation and loading can improve while original files and older destinations remain accessible, with a backup and rollback plan.",
    href: "/services#product-web",
    link: "Website services",
  },
  {
    id: "ai-review",
    question: "How do you use AI, and what receives human review?",
    answer:
      "AI can assist research, image exploration, editing, code and automation. Human review checks facts, attribution, visual choices and working behaviour before release. Illustrative and AI-generated work receives appropriate labels.",
    href: "/lab",
    link: "Inside the Lab",
  },
  {
    id: "search-ai-visibility",
    question: "Do you offer SEO, AEO and GEO services?",
    answer:
      "Yes. We work on search visibility (SEO), answer engine optimisation (AEO) and generative engine optimisation (GEO): clear page structure, structured data, citeable answers and consistent brand details, so search engines and AI assistants can find and describe your business accurately. Nobody controls rankings or AI answers, so we agree checks we can measure instead of promising positions.",
    href: "/services#visibility",
    link: "Search & AI visibility",
  },
  {
    id: "backlinking",
    question: "How do you approach backlinking and brand mentions?",
    answer:
      "We earn links and mentions through useful publishing, relevant directory and partner listings, digital PR and credible profiles. We do not buy links or use link networks. You receive a record of what was earned, where it points and why it is relevant.",
    href: "/services#visibility",
    link: "Visibility services",
  },
  {
    id: "scope-and-pricing",
    question: "How are project scope, timelines and pricing agreed?",
    answer:
      "We discuss your goal, existing material, deliverables and constraints, then agree a written scope, milestones and price. Timing depends on the work and review process; changes are discussed before proceeding.",
    href: "/services",
    link: "Explore services",
  },
  {
    id: "after-launch",
    question: "What support is available after launch?",
    answer:
      "Support can include content updates, fixes, performance review and further design or development. We agree responsibilities and the support scope before launch, so you know what is included.",
    href: "/services#product-web",
    link: "Discuss ongoing support",
  },
  {
    id: "start-project",
    question: "How do I start a project?",
    answer:
      "Send a short note about what you need, who it is for and any existing material. Add a deadline or budget range if available. We’ll discuss scope and next steps.",
    href: "/#contact",
    link: "Start a project",
  },
] as const;

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};
