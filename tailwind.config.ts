import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0a0a0a",
        "surface-elevated": "#111111",
        "surface-border": "#1a1a1a",
        text: "#f5f5f5",
        "text-muted": "#a0a0a0",
        "text-dim": "#858585",
        accent: {
          teal: "#49c5b6",
          gold: "#ECD06F",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(3rem, 8vw, 7.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-lg": [
          "clamp(2.5rem, 6vw, 5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-md": [
          "clamp(1.75rem, 4vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "body-lg": [
          "clamp(1.125rem, 1.5vw, 1.375rem)",
          { lineHeight: "1.6", fontWeight: "300" },
        ],
        "body-md": [
          "clamp(0.9375rem, 1.2vw, 1.125rem)",
          { lineHeight: "1.6", fontWeight: "400" },
        ],
        "label-sm": [
          "0.75rem",
          { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "500" },
        ],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
