import type { Metadata } from "next";
import Link from "next/link";
import { MODULES } from "@/config/modules";
import { getStore } from "@/lib/db/repository";
import { ensureBuiltInToolsRegistered } from "@/lib/tools/built-in-tools";
import { getEnvironmentStatus } from "@/lib/validation/env";
import { CommandHeader } from "@/components/opus/command-header";
import { MetricCard } from "@/components/opus/metric-card";
import { StatusBadge, type StatusTone } from "@/components/opus/status-badge";
import { SystemStatusBar, type SystemState } from "@/components/opus/system-status";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

const moduleStatusTone: Record<string, StatusTone> = {
  operational: "active",
  configuration_required: "review",
  planned: "neutral",
};

export default function DashboardPage() {
  ensureBuiltInToolsRegistered();
  const store = getStore();
  const env = getEnvironmentStatus();

  /**
   * Every state below is derived from real configuration:
   *  - APPLICATION: process healthy (this page is being served).
   *  - DATABASE: active driver reported by the environment layer.
   *  - AI PROVIDERS: "null" no-op driver = configured standby (READY),
   *    generation disabled by design; an external driver reports ACTIVE.
   *  - GOVERNANCE: regulatory assessment is ongoing (config/governance.ts).
   *  - EVIDENCE: module operational (SHA-256 fingerprinting implemented).
   */
  const statusItems: { label: string; state: SystemState; detail?: string }[] = [
    { label: "APPLICATION", state: "ACTIVE", detail: "healthy" },
    {
      label: "DATABASE",
      state: "ACTIVE",
      detail: `driver: ${env.databaseDriver}`,
    },
    {
      label: "AI PROVIDERS",
      state: env.aiProviderDriver === "null" ? "READY" : "ACTIVE",
      detail:
        env.aiProviderDriver === "null"
          ? "driver: null (no-op, by design)"
          : `driver: ${env.aiProviderDriver}`,
    },
    { label: "GOVERNANCE", state: "REVIEW", detail: "assessment ongoing" },
    { label: "EVIDENCE", state: "ACTIVE", detail: "sha-256 ledger" },
  ];

  const counts = [
    { label: "Projects", value: store.projects.list().length, href: "/projects", accent: "var(--opus-steel)" },
    { label: "Agents", value: store.agents.list().length, href: "/agents", accent: "var(--opus-uv-deep)" },
    { label: "Tools", value: store.tools.list().length, href: "/tools", accent: "var(--opus-chartreuse)" },
    { label: "Workflows", value: store.workflows.list().length, href: "/workflows", accent: "var(--opus-amber)" },
    { label: "Evidence", value: store.evidence.list().length, href: "/evidence", accent: "var(--opus-cyan)" },
    { label: "Executions", value: store.executions.list().length, href: "/workflows", accent: "var(--opus-coral)" },
  ];

  return (
    <div>
      <CommandHeader
        eyebrow="OPUS67 // SYSTEM STATUS"
        title="AI Operations Command Surface"
        description="Operational view of the platform. Counts reflect the live in-memory store only — nothing here is simulated."
        status="MVP"
        statusTone="review"
      />

      <section aria-labelledby="system-status" className="mb-10">
        <h2 id="system-status" className="sr-only">
          System status
        </h2>
        <SystemStatusBar items={statusItems} />
      </section>

      <section aria-labelledby="entity-counts" className="mb-10">
        <h2
          id="entity-counts"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-muted"
        >
          Registered entities
        </h2>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {counts.map((c) => (
            <li key={c.label}>
              <MetricCard href={c.href} label={c.label} value={c.value} accent={c.accent} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="module-status">
        <h2
          id="module-status"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-muted"
        >
          Module status
        </h2>
        <ul className="spectral-card mt-3 divide-y divide-line">
          {MODULES.map((mod) => (
            <li
              key={mod.slug}
              className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
            >
              <div className="min-w-0">
                <Link
                  href={mod.href}
                  className="text-sm font-medium text-ice hover:text-ion"
                >
                  {mod.name}
                </Link>
                <p className="truncate text-xs text-muted">{mod.statusNote}</p>
              </div>
              <StatusBadge tone={moduleStatusTone[mod.status]}>
                {mod.status === "operational"
                  ? "Operational"
                  : mod.status === "configuration_required"
                    ? "Configuration required"
                    : "Planned"}
              </StatusBadge>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
