"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

function leadMethod(href: string) {
  if (href.startsWith("https://wa.me/")) return "whatsapp";
  if (href.includes("calendly.com/")) return "calendly";
  if (href.startsWith("mailto:")) return "email";
  return null;
}

export default function Analytics() {
  useEffect(() => {
    if (!measurementId) return;

    const trackLeadClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const method = leadMethod(anchor.href);
      if (!method) return;

      window.gtag?.("event", "generate_lead", {
        method,
        link_url: anchor.href,
        link_text: anchor.textContent?.trim().slice(0, 100),
      });
    };

    document.addEventListener("click", trackLeadClick);
    return () => document.removeEventListener("click", trackLeadClick);
  }, []);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            anonymize_ip: true,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
