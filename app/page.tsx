import Link from "next/link";
import { MODULES } from "@/config/modules";
import { Badge } from "@/components/ui/badge";

const statusTone = {
  operational: "green",
  configuration_required: "amber",
  planned: "slate",
} as const;

export default function HomePage() {
  return (
    <div className="space-y-14">
      <section aria-labelledby="intro" className="pt-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          AI systems platform
        </p>
        <h1 id="intro" className="mt-3 font-mono text-4xl font-bold tracking-widest text-white sm:text-5xl">
          OPUS<span className="text-accent">67</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          OPUS67 is a modular technology platform for working with artificial
          intelligence systems: agents, tools, workflows, evidence and
          governance — built for traceability and human oversight.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-muted"
          >
            Open dashboard
          </Link>
          <Link
            href="/governance"
            className="rounded-md border border-ink-600 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-ink-800"
          >
            Governance model
          </Link>
        </div>
      </section>

      <section aria-labelledby="modules">
        <h2 id="modules" className="text-lg font-semibold text-white">
          Modules
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.filter((m) => m.slug !== "dashboard").map((mod) => (
            <li key={mod.slug}>
              <Link
                href={mod.href}
                className="block h-full rounded-lg border border-ink-700 bg-ink-900/50 p-4 transition-colors hover:border-accent/60"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-white">{mod.name}</h3>
                  <Badge tone={statusTone[mod.status]}>
                    {mod.status === "operational"
                      ? "Operational"
                      : mod.status === "configuration_required"
                        ? "Config required"
                        : "Planned"}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-slate-400">{mod.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="principles" className="rounded-lg border border-ink-700 bg-ink-900/40 p-6">
        <h2 id="principles" className="text-lg font-semibold text-white">
          Design principles
        </h2>
        <ul className="mt-3 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
          <li>Correctness before features.</li>
          <li>Security and traceability by design.</li>
          <li>No simulated functionality presented as real.</li>
          <li>Explicit empty states instead of invented metrics.</li>
          <li>Human oversight over relevant AI operations.</li>
          <li>Compliance-oriented controls — no automatic compliance claims.</li>
        </ul>
      </section>
    </div>
  );
}
