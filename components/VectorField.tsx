"use client";

// Futuretech vector backdrop: a receding perspective grid, a drifting node
// constellation, and one slow scan beam. Pure SVG + CSS keyframes, no canvas,
// no per-frame JS. Sits absolutely behind content; honors reduced motion.
export default function VectorField({ accent = "#ECD06F" }: { accent?: string }) {
  // Deterministic constellation. Same field every render, no hydration drift.
  const nodes = Array.from({ length: 24 }, (_, i) => {
    const x = ((i * 137.5) % 100);
    const y = ((i * 61.8 + 13) % 86) + 6;
    return { x, y, r: 1 + ((i * 7) % 3) * 0.5, delay: (i % 8) * 0.9 };
  });
  const links = nodes.slice(0, 14).map((n, i) => {
    const m = nodes[(i + 5) % nodes.length];
    return { x1: n.x, y1: n.y, x2: m.x, y2: m.y };
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.5]"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Receding floor grid */}
        <g stroke="#1a1a1a" strokeWidth="0.08">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={`h${i}`} x1="0" x2="100" y1={58 + i * i * 0.32} y2={58 + i * i * 0.32} />
          ))}
          {Array.from({ length: 17 }, (_, i) => (
            <line key={`v${i}`} x1={i * 6.25} y1="58" x2={(i - 8) * 14 + 50} y2="100" />
          ))}
        </g>

        {/* Node constellation */}
        <g>
          {links.map((l, i) => (
            <line
              key={`l${i}`}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke={accent} strokeOpacity="0.07" strokeWidth="0.08"
            />
          ))}
          {nodes.map((n, i) => (
            <circle
              key={`n${i}`}
              cx={n.x} cy={n.y} r={n.r * 0.18}
              fill={accent}
              className="vf-node"
              style={{ animationDelay: `${n.delay}s` }}
            />
          ))}
        </g>

        {/* Scan beam */}
        <rect className="vf-beam" x="-30" y="0" width="14" height="100" fill={`url(#vf-beam-grad)`} />
        <defs>
          <linearGradient id="vf-beam-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={accent} stopOpacity="0" />
            <stop offset="0.5" stopColor={accent} stopOpacity="0.05" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Vignette so content stays the loudest thing on the page */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a0a_85%)]" />

      <style>{`
        .vf-node {
          animation: vf-pulse 6s ease-in-out infinite;
          opacity: 0.25;
        }
        .vf-beam {
          animation: vf-sweep 14s linear infinite;
        }
        @keyframes vf-pulse {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.55; }
        }
        @keyframes vf-sweep {
          from { transform: translateX(0); }
          to { transform: translateX(160px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vf-node, .vf-beam { animation: none; }
        }
      `}</style>
    </div>
  );
}
