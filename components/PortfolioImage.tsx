"use client";
import Image from "next/image";
import { useState } from "react";
export default function PortfolioImage({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="image-fallback">
      Preview unavailable
      <br />
      <small>The title and source are kept below.</small>
    </span>
  ) : (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      unoptimized={src.startsWith("https://")}
      onError={() => setFailed(true)}
    />
  );
}
