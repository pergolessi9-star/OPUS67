import type { Config } from "tailwindcss";

/**
 * OPUS67 SPECTRAL SYSTEM — Tailwind mapping.
 * Colors reference the CSS design tokens in app/globals.css so that
 * dark/light theming works through a single `data-theme` attribute.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        opus: {
          bg: "var(--opus-bg)",
          surface: "var(--opus-surface)",
          elevated: "var(--opus-surface-elevated)",
          border: "var(--opus-border)",
          "border-strong": "var(--opus-border-strong)",
          text: "var(--opus-text)",
          steel: "var(--opus-steel)",
          muted: "var(--opus-muted)",
          chartreuse: "var(--opus-chartreuse)",
          cyan: "var(--opus-cyan)",
          coral: "var(--opus-coral)",
          amber: "var(--opus-amber)",
          ultraviolet: "var(--opus-ultraviolet)",
          "ultraviolet-hi": "var(--opus-ultraviolet-hi)",
          success: "var(--opus-success)",
          warning: "var(--opus-warning)",
          danger: "var(--opus-danger)",
          info: "var(--opus-info)",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
