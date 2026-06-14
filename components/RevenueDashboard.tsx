"use client";

// Self-contained "revenue engine" dashboard mock used as the hero's front
// panel. No external images — pure markup + inline SVG so it never breaks and
// stays crisp at any scale. Mirrors the studio's pitch: pipeline → booked → ARR.

const BARS = [38, 52, 47, 63, 71, 66, 84, 92];
const MAX = 100;

export default function RevenueDashboard() {
  return (
    <div className="flex h-full w-full flex-col bg-surface-elevated">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-surface-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[11px] tracking-wide text-text-dim">
          acquisition-engine / live
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-accent-teal">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-teal" />
          syncing
        </span>
      </div>

      {/* Metric row */}
      <div className="grid grid-cols-3 gap-px bg-surface-border">
        {[
          { k: "Pipeline", v: "$2.4M", d: "+18%" },
          { k: "Booked Calls", v: "146", d: "+32%" },
          { k: "Locked ARR", v: "$880K", d: "+24%" },
        ].map((m) => (
          <div key={m.k} className="bg-surface-elevated px-4 py-4 md:px-6 md:py-5">
            <div className="text-[10px] uppercase tracking-[0.16em] text-text-dim">
              {m.k}
            </div>
            <div className="mt-1.5 text-xl font-semibold text-text md:text-2xl">
              {m.v}
            </div>
            <div className="mt-0.5 text-[11px] font-medium text-accent-teal">
              {m.d}
            </div>
          </div>
        ))}
      </div>

      {/* Chart + pipeline */}
      <div className="grid flex-1 grid-cols-1 gap-px bg-surface-border md:grid-cols-5">
        {/* Bar chart */}
        <div className="bg-surface-elevated p-4 md:col-span-3 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Monthly Revenue
            </span>
            <span className="font-mono text-[11px] text-text-dim">FY26</span>
          </div>
          <div className="flex h-[120px] items-end gap-2 border-b border-white/10 md:h-[150px]">
            {BARS.map((h, i) => {
              const isLast = i === BARS.length - 1;
              const isRecent = i >= BARS.length - 3;
              return (
                <div key={i} className="flex h-full flex-1 flex-col justify-end">
                  <div
                    className="w-full rounded-t-sm"
                    style={{
                      height: `${(h / MAX) * 100}%`,
                      background: isLast
                        ? "linear-gradient(180deg,#5fd6c7,#49c5b6)"
                        : isRecent
                          ? "linear-gradient(180deg,#49c5b6aa,#49c5b655)"
                          : "linear-gradient(180deg,#5a5e66,#3a3d44)",
                      boxShadow: isLast ? "0 0 24px rgba(73,197,182,0.45)" : "none",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Pipeline list */}
        <div className="bg-surface-elevated p-4 md:col-span-2 md:p-6">
          <span className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
            Live Pipeline
          </span>
          <ul className="mt-4 space-y-3">
            {[
              { n: "Enterprise SaaS", s: "Proposal", c: "text-accent-gold" },
              { n: "Series-B Fintech", s: "Booked", c: "text-accent-teal" },
              { n: "DTC Brand", s: "Nurture", c: "text-text-dim" },
              { n: "B2B Robotics", s: "Closed", c: "text-accent-teal" },
            ].map((r) => (
              <li key={r.n} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[13px] text-text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  {r.n}
                </span>
                <span className={`text-[11px] font-medium ${r.c}`}>{r.s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
