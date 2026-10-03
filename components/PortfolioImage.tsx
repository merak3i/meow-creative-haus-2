"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Waits until the page's largest paint has happened (or the load event, where
// the paint API is missing) so below-the-fold covers never compete with the hero.
function afterFirstPaint(run: () => void) {
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    observer?.disconnect();
    removeEventListener("load", onLoad);
    requestAnimationFrame(() => setTimeout(run, 0));
  };
  const onLoad = () => go();
  let observer: PerformanceObserver | undefined;
  try {
    observer = new PerformanceObserver((list) => {
      if (list.getEntries().length) go();
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    observer = undefined;
  }
  if (document.readyState === "complete") go();
  else addEventListener("load", onLoad);
  return () => {
    done = true;
    observer?.disconnect();
    removeEventListener("load", onLoad);
  };
}

export default function PortfolioImage({
  src,
  alt,
  sizes,
  className = "",
  defer = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  defer?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(!defer);
  useEffect(() => {
    if (ready) return;
    return afterFirstPaint(() => setReady(true));
  }, [ready]);
  if (failed)
    return (
      <span className="image-fallback">
        Preview unavailable
        <br />
        <small>The title and source are kept below.</small>
      </span>
    );
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      unoptimized={src.startsWith("https://")}
      onError={() => setFailed(true)}
      // Hidden (so the lazy image is not fetched) until the first paint; the
      // stylesheet shows it straight away when scripting is off.
      data-deferred={ready ? undefined : ""}
    />
  );
}
