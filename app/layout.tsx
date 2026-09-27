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

/**
 * Theme bootstrap: applies the persisted theme before first paint to avoid
 * a flash. Dark is the default experience (tokens in globals.css).
 */
const themeInit = `(function(){try{var t=localStorage.getItem('opus67-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-chartreuse focus:px-4 focus:py-2 focus:text-obsidian"
        >
          Skip to main content
        </a>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
