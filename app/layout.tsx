import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OPUS67",
    template: "%s — OPUS67",
  },
  description:
    "OPUS67 is a modular technology platform for working with AI systems: agents, tools, workflows, evidence and governance.",
};

// Applies the persisted theme before first paint to avoid a flash of the
// wrong theme. Defaults to dark when no preference is stored.
const themeScript = `(function(){try{var t=localStorage.getItem("opus67-theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-opus-cyan focus:px-4 focus:py-2 focus:text-opus-bg"
        >
          Skip to main content
        </a>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
