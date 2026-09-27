import type { Config } from "tailwindcss";

/**
 * OPUS67 SPECTRAL SYSTEM — Tailwind mapping.
 *
 * Every color maps to a design token (CSS custom property) defined in
 * app/globals.css. Components must use these semantic classes — no
 * hardcoded hex values, no default palette colors for UI surfaces.
 * Dark is the primary experience; [data-theme="light"] redefines the tokens.
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
        // Base nocturna
        obsidian: "var(--opus-bg)",
        carbon: "var(--opus-surface)",
        graphite: "var(--opus-elevated)",
        // Neutros
        ice: "var(--opus-text)",
        steel: "var(--opus-steel)",
        muted: "var(--opus-muted)",
        line: "var(--opus-border)",
        "line-strong": "var(--opus-border-strong)",
        // Acentos espectrales (jerarquía: acción / datos / alerta / revisión / agentes)
        chartreuse: {
          DEFAULT: "var(--opus-chartreuse)",
          dim: "var(--opus-chartreuse-dim)",
        },
        ion: {
          DEFAULT: "var(--opus-cyan)",
          dim: "var(--opus-cyan-dim)",
        },
        coral: {
          DEFAULT: "var(--opus-coral)",
          dim: "var(--opus-coral-dim)",
        },
        solar: {
          DEFAULT: "var(--opus-amber)",
          dim: "var(--opus-amber-dim)",
        },
        uv: {
          DEFAULT: "var(--opus-uv)",
          deep: "var(--opus-uv-deep)",
          dim: "var(--opus-uv-dim)",
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
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        opus: "var(--opus-radius)",
      },
      transitionTimingFunction: {
        opus: "cubic-bezier(0.2, 0.6, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
