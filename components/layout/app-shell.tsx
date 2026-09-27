"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { OpusLogo } from "@/components/brand/opus-logo";
import { ModuleGlyph } from "@/components/brand/module-glyph";
import { SpectralLine } from "@/components/spectral/spectral-line";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MODULES, MODULE_ACCENTS } from "@/config/modules";

/**
 * OPUS67 AppShell — persistent navigation structure.
 * Desktop (≥1024px): full sidebar. Tablet (768–1023px): compact icon rail.
 * Mobile (<768px): top bar + drawer. Never hides module names from
 * assistive technology: labels stay in the DOM, visually collapsed on
 * tablet only.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  function NavList({ compact }: { compact: boolean }) {
    return (
      <ul className="flex flex-col gap-0.5">
        {MODULES.map((mod) => {
          const active = isActive(mod.href);
          return (
            <li key={mod.slug}>
              <Link
                href={mod.href}
                aria-current={active ? "page" : undefined}
                title={compact ? mod.name : undefined}
                onClick={() => setDrawerOpen(false)}
                className={`group relative flex items-center gap-3 px-3 py-2 transition-colors ${
                  compact ? "justify-center" : ""
                } ${
                  active
                    ? "bg-opus-elevated text-opus-text"
                    : "text-opus-steel hover:text-opus-text"
                }`}
              >
                {/* Spectral edge on the active item */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-1 left-0 w-px"
                  style={{
                    background: active
                      ? `linear-gradient(to bottom, var(--opus-chartreuse), var(--opus-cyan), var(--opus-ultraviolet), var(--opus-coral))`
                      : "transparent",
                  }}
                />
                <ModuleGlyph slug={mod.slug as keyof typeof MODULE_ACCENTS} size={16} />
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
                    compact ? "sr-only" : ""
                  }`}
                >
                  {mod.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  const footer = (
    <div className="mt-auto border-t border-opus-border px-3 py-4">
      <Link
        href="/legal/ai"
        onClick={() => setDrawerOpen(false)}
        className="block text-[11px] text-opus-muted transition-colors hover:text-opus-steel hover:underline"
      >
        AI Legal Notice
      </Link>
      <p className="mt-2 text-[10px] leading-relaxed text-opus-muted">
        Evidence · Traceability · Governance
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-opus-bg text-opus-text">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-opus-border bg-opus-bg/95 px-4 backdrop-blur md:hidden">
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
          className="flex h-8 w-8 items-center justify-center border border-opus-border text-opus-steel hover:border-opus-cyan hover:text-opus-cyan"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <Link href="/" aria-label="OPUS67 home">
          <OpusLogo variant="monogram" />
        </Link>
        <ThemeToggle />
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-black/60"
            onClick={() => setDrawerOpen(false)}
          />
          <nav
            aria-label="Primary"
            className="absolute inset-y-0 left-0 flex w-60 flex-col border-r border-opus-border bg-opus-surface"
          >
            <div className="flex h-12 items-center justify-between border-b border-opus-border px-4">
              <Link href="/" aria-label="OPUS67 home" onClick={() => setDrawerOpen(false)}>
                <OpusLogo variant="wordmark" />
              </Link>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setDrawerOpen(false)}
                className="flex h-8 w-8 items-center justify-center border border-opus-border text-opus-steel hover:border-opus-cyan hover:text-opus-cyan"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <SpectralLine />
            <div className="py-3">
              <NavList compact={false} />
            </div>
            {footer}
          </nav>
        </div>
      )}

      {/* Sidebar: compact rail on tablet, full on desktop */}
      <nav
        aria-label="Primary"
        className="fixed inset-y-0 left-0 z-30 hidden w-16 flex-col border-r border-opus-border bg-opus-surface md:flex lg:w-60"
      >
        <div className="flex h-14 items-center border-b border-opus-border px-3 lg:px-4">
          <Link href="/" aria-label="OPUS67 home">
            <span className="hidden lg:block">
              <OpusLogo variant="wordmark" />
            </span>
            <span className="lg:hidden">
              <OpusLogo variant="monogram" />
            </span>
          </Link>
        </div>
        <SpectralLine />
        <div className="py-3">
          <span className="hidden lg:block">
            <NavList compact={false} />
          </span>
          <span className="lg:hidden">
            <NavList compact={true} />
          </span>
        </div>
        <div className="mt-auto hidden lg:block">{footer}</div>
        <div className="mt-auto flex justify-center border-t border-opus-border py-3 lg:hidden">
          <ThemeToggle />
        </div>
      </nav>

      {/* Content column */}
      <div className="flex min-h-screen flex-col md:pl-16 lg:pl-60">
        <div className="hidden items-center justify-end gap-3 border-b border-opus-border px-6 py-2 md:flex">
          <p className="mr-auto font-mono text-[10px] uppercase tracking-[0.24em] text-opus-muted">
            AI Systems Platform · MVP
          </p>
          <span className="hidden lg:inline">
            <ThemeToggle />
          </span>
        </div>
        <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:py-10">
          {children}
        </main>
        <footer className="border-t border-opus-border px-6 py-4 md:hidden">
          <p className="text-[11px] text-opus-muted">
            <span className="font-mono tracking-widest text-opus-steel">OPUS67</span> — modular AI
            systems platform.{" "}
            <Link href="/legal/ai" className="hover:text-opus-steel hover:underline">
              AI Legal Notice
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
