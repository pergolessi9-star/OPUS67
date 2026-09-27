import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-ink-700 bg-ink-900/60">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-mono text-lg font-semibold tracking-widest text-white"
          aria-label="OPUS67 home"
        >
          OPUS<span className="text-accent">67</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 text-sm">
            <li>
              <Link
                href="/dashboard"
                className="rounded px-3 py-2 text-slate-300 hover:bg-ink-700 hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/governance"
                className="rounded px-3 py-2 text-slate-300 hover:bg-ink-700 hover:text-white"
              >
                Governance
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="rounded px-3 py-2 text-slate-300 hover:bg-ink-700 hover:text-white"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
