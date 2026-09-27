import type { Metadata } from "next";
import { MODULES } from "@/config/modules";
import { getStore } from "@/lib/db/repository";
import { ensureBuiltInToolsRegistered } from "@/lib/tools/built-in-tools";
import { getEnvironmentStatus } from "@/lib/validation/env";
import { CommandHeader } from "@/components/dashboard/command-header";
import { SystemStatus, type SystemStatusItem } from "@/components/dashboard/system-status";
import { MetricCard } from "@/components/cards/metric-card";
import { ModuleCard } from "@/components/cards/module-card";
import type { ModuleSlug, ModuleStatus } from "@/config/modules";
import type { StatusTone } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

const moduleTone: Record<ModuleStatus, StatusTone> = {
  operational: "chartreuse",
  configuration_required: "amber",
  planned: "neutral",
};

const moduleStatusLabel: Record<ModuleStatus, string> = {
  operational: "Operational",
  configuration_required: "Configuration required",
  planned: "Planned",
};

export default function DashboardPage() {
  ensureBuiltInToolsRegistered();
  const store = getStore();
  const env = getEnvironmentStatus();

  // Status bar: every state derives from real configuration.
  // APPLICATION: this page rendered, so the app is up.
  // DATABASE: memory driver is the explicit, working default (READY);
  //           an external PostgreSQL driver is ACTIVE when selected.
  // AI PROVIDERS: the no-op default means generation is disabled by design
  //           (REVIEW — nothing is running); external provider = ACTIVE.
  // GOVERNANCE: controls exist in verifiable states; several still require
  //           assessment (REVIEW — see /governance).
  // EVIDENCE: SHA-256 fingerprinting implemented and tested (READY).
  const statusItems: SystemStatusItem[] = [
    { label: "Application", state: "ACTIVE" },
    {
      label: "Database",
      state: env.databaseDriver === "memory" ? "READY" : "ACTIVE",
      note: env.databaseDriver === "memory" ? "in-memory (default)" : env.databaseDriver,
    },
    {
      label: "AI Providers",
      state: env.aiProviderDriver === "null" ? "NOT CONFIGURED" : "ACTIVE",
      note:
        env.aiProviderDriver === "null"
          ? "no-op driver — generation disabled by design"
          : env.aiProviderName,
    },
    { label: "Governance", state: "REVIEW", note: "assessment required" },
    { label: "Evidence", state: "READY", note: "SHA-256 fingerprinting" },
  ];

  const counts = [
    { label: "Projects", value: store.projects.list().length, href: "/projects", accent: "var(--opus-chartreuse)" },
    { label: "Agents", value: store.agents.list().length, href: "/agents", accent: "var(--opus-ultraviolet)" },
    { label: "Tools", value: store.tools.list().length, href: "/tools", accent: "var(--opus-cyan)" },
    { label: "Workflows", value: store.workflows.list().length, href: "/workflows", accent: "var(--opus-cyan)" },
    { label: "Evidence", value: store.evidence.list().length, href: "/evidence", accent: "var(--opus-cyan)" },
    { label: "Executions", value: store.executions.list().length, href: "/workflows", accent: "var(--opus-amber)" },
  ];

  return (
    <div>
      <CommandHeader
        title="AI Operations Command Surface"
        subtitle="Operational view of the platform. Counts reflect the live store only — nothing here is simulated."
      />

      <SystemStatus items={statusItems} />

      <section aria-labelledby="entity-counts" className="mt-10">
        <h2
          id="entity-counts"
          className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-opus-muted"
        >
          Registered Entities
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {counts.map((c) => (
            <li key={c.label}>
              <MetricCard label={c.label} value={c.value} href={c.href} accent={c.accent} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="module-status" className="mt-10">
        <h2
          id="module-status"
          className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-opus-muted"
        >
          Module Status
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.filter((m) => m.slug !== "dashboard").map((mod) => (
            <li key={mod.slug}>
              <ModuleCard
                slug={mod.slug as ModuleSlug}
                name={mod.name}
                description={mod.statusNote}
                href={mod.href}
                status={moduleTone[mod.status]}
                statusLabel={moduleStatusLabel[mod.status]}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
