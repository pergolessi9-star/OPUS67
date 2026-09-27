"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MODULES } from "@/config/modules";
import { cn } from "@/lib/utils/cn";
import { OpusLogo } from "@/components/opus/opus-logo";
import { ThemeToggle } from "@/components/opus/theme-toggle";
import {
  AgentsIcon,
  CloseIcon,
  DashboardIcon,
  EvidenceIcon,
  GovernanceIcon,
  LegalIcon,
  MenuIcon,
  ProjectsIcon,
  SettingsIcon,
  ToolsIcon,
  WorkflowsIcon,
} from "@/components/opus/icons";

/**
 * AppShell — OPUS67 navigation shell.
 * Sidebar: persistent on desktop (lg, 240px), compact on tablet (md, 64px),
 * drawer on mobile. Active route carries the Spectral Line on its edge.
 * Module status dots reflect the REAL registry state (config/modules.ts).
 */

const NAV_ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  dashboard: DashboardIcon,
  projects: ProjectsIcon,
  agents: AgentsIcon,
  tools: ToolsIcon,
  workflows: WorkflowsIcon,
  evidence: EvidenceIcon,
  governance: GovernanceIcon,
  settings: SettingsIcon,
};

const STATUS_DOT: Record<string, string> = {
  operational: "bg-chartreuse",
  configuration_required: "bg-solar",
  planned: "bg-steel",
};

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className="space-y-1">
      {MODULES.map((mod) => {
        const Icon = NAV_ICONS[mod.slug] ?? DashboardIcon;
        const active = pathname === mod.href || pathname.startsWith(`${mod.href}/`);
        return (
          <li key={mod.slug}>
            <Link
              href={mod.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              title={mod.name}
              className={cn(
                "group relative flex min-h-11 items-center gap-3 rounded-opus px-3 py-2.5 text-sm transition-colors duration-150 ease-opus",
                active
                  ? "bg-graphite text-ice"
                  : "text-steel hover:bg-graphite/60 hover:text-ice",
              )}
            >
              {/* Spectral Line on the active edge */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-2 left-0 w-px",
                  active ? "spectral-line-v" : "bg-transparent",
                )}
              />
              <span className={cn("shrink-0", active ? "text-chartreuse" : "text-muted group-hover:text-steel")}>
                <Icon />
              </span>
              <span className="min-w-0 flex-1 truncate md:max-lg:hidden">{mod.name}</span>
              <span
                aria-hidden="true"
                title={`Module status: ${mod.status.replaceAll("_", " ")}`}
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full md:max-lg:absolute md:max-lg:right-1 md:max-lg:top-1",
                  STATUS_DOT[mod.status] ?? "bg-steel",
                )}
              />
              <span className="sr-only">{` (${mod.status.replaceAll("_", " ")})`}</span>
            </Link>
          </li>
        );
      })}
      <li>
        <Link
          href="/legal/ai"
          onClick={onNavigate}
          title="AI Legal Notice"
          className={cn(
            "flex min-h-11 items-center gap-3 rounded-opus px-3 py-2.5 text-sm transition-colors duration-150 ease-opus",
            pathname === "/legal/ai"
              ? "bg-graphite text-ice"
              : "text-steel hover:bg-graphite/60 hover:text-ice",
          )}
        >
          <span className="shrink-0 text-muted">
            <LegalIcon />
          </span>
          <span className="truncate md:max-lg:hidden">AI Legal Notice</span>
        </Link>
      </li>
    </ul>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile topbar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-carbon/95 px-4 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation"
          aria-expanded={drawerOpen}
          aria-controls="opus-sidebar"
          className="inline-flex h-11 w-11 items-center justify-center rounded-opus text-steel hover:text-ice"
        >
          <MenuIcon />
        </button>
        <OpusLogo />
        <ThemeToggle />
      </div>

      {/* Drawer overlay (mobile) */}
      {drawerOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-obsidian/70 md:hidden"
        />
      ) : null}

      {/* Sidebar: drawer on mobile, compact on tablet, persistent on desktop */}
      <aside
        id="opus-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-line bg-carbon transition-transform duration-200 ease-opus md:sticky md:top-0 md:z-auto md:h-screen md:w-16 md:translate-x-0 lg:w-60",
          drawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-line px-4">
          <span className="md:max-lg:hidden">
            <OpusLogo />
          </span>
          <span className="hidden md:max-lg:block">
            <OpusLogo monogram />
          </span>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-opus text-steel hover:text-ice md:hidden"
          >
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-3 py-4">
          <NavItems onNavigate={() => setDrawerOpen(false)} />
        </nav>
        <div className="hidden items-center justify-between border-t border-line px-4 py-3 md:flex">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted md:max-lg:hidden">
            MVP
          </span>
          <ThemeToggle />
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col pt-14 md:pt-0">
        <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="border-t border-line py-5">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>
              <span className="font-mono tracking-widest">
                <span className="text-ice">OPUS</span>
                <span className="text-chartreuse">67</span>
              </span>{" "}
              — AI Systems Platform
            </p>
            <p>
              <Link href="/legal/ai" className="hover:text-steel hover:underline">
                AI Legal Notice
              </Link>{" "}
              · Evidence · Traceability · Governance
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
