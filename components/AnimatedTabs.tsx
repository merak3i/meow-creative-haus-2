"use client";

// Magnified tab viewer — metamorphosed from the glassy rounded original into
// MCH's language: hairline borders, sharp corners, mono labels, a teal
// spring-pill for the active tab. The blur-in spring transition is the part
// of the original's soul we kept.
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: AnimatedTab[];
  defaultTab?: string;
  className?: string;
}

const AnimatedTabs = ({ tabs, defaultTab, className }: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full flex flex-col gap-y-2", className)}>
      <div className="flex gap-1 flex-wrap bg-surface-elevated/80 backdrop-blur-sm p-1 border border-surface-border w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-4 py-2 font-mono text-label-sm tracking-wider uppercase outline-none transition-colors duration-300 text-text-muted hover:text-text"
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-accent-teal/10 border border-accent-teal/40"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className={cn("relative z-10", activeTab === tab.id && "text-accent-teal")}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-surface-elevated/80 backdrop-blur-sm border border-surface-border">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, scale: 0.985, x: -10, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.985, x: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "circInOut", type: "spring" }}
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export { AnimatedTabs };
