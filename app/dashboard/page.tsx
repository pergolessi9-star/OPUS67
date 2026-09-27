import type { Metadata } from "next";
import Link from "next/link";
import { MODULES } from "@/config/modules";
import { getStore } from "@/lib/db/repository";
import { getEnvironmentStatus } from "@/lib/validation/env";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

const statusTone = {
  operational: "green",
  configuration_required: "amber",
  planned: "slate",
} as const;

export default function DashboardPage() {
  const store = getStore();
  const env = getEnvironmentStatus();

  const counts = [
    { label: "Projects", value: store.projects.list().length, href: "/projects" },
    { label: "Agents", value: store.agents.list().length, href: "/agents" },
    { label: "Tools", value: store.tools.list().length, href: "/tools" },
    { label: "Workflows", value: store.workflows.list().length, href: "/workflows" },
    { label: "Evidence records", value: store.evidence.list().length, href: "/evidence" },
    { label: "Executions", value: store.executions.list().length, href: "/workflows" },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Operational view of the platform. Counts reflect the live in-memory store only — nothing here is simulated."
      />

      <section aria-labelledby="system-state" className="mb-10">
        <h2 id="system-state" className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          System state
        </h2>
        <dl className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-ink-700 bg-ink-900/50 p-4">
            <dt className="text-xs text-slate-500">Application</dt>
            <dd className="mt-1">
              <Badge tone="green">Healthy</Badge>
            </dd>
          </div>
          <div className="rounded-lg border border-ink-700 bg-ink-900/50 p-4">
            <dt className="text-xs text-slate-500">Database (PostgreSQL)</dt>
            <dd className="mt-1">
              <Badge tone={env.database === "configured" ? "green" : "amber"}>
                {env.database === "configured" ? "Configured" : "Not configured"}
              </Badge>
              <p className="mt-2 text-xs text-slate-500">
                Persistence adapter pending; current data is process-local.
              </p>
            </dd>
          </div>
          <div className="rounded-lg border border-ink-700 bg-ink-900/50 p-4">
            <dt className="text-xs text-slate-500">AI provider</dt>
            <dd className="mt-1">
              <Badge tone={env.aiProvider === "configured" ? "green" : "amber"}>
                {env.aiProvider === "configured" ? env.aiProviderName : "Not configured"}
              </Badge>
              <p className="mt-2 text-xs text-slate-500">
                Generation is disabled until server-side credentials are provided.
              </p>
            </dd>
          </div>
          <div className="rounded-lg border border-ink-700 bg-ink-900/50 p-4">
            <dt className="text-xs text-slate-500">Alerts</dt>
            <dd className="mt-1 text-sm text-slate-300">No alerts.</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="entity-counts" className="mb-10">
        <h2 id="entity-counts" className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Registered entities
        </h2>
        <ul className="mt-3 grid gap-4 sm:grid-cols-3">
          {counts.map((c) => (
            <li key={c.label}>
              <Link
                href={c.href}
                className="block rounded-lg border border-ink-700 bg-ink-900/50 p-4 hover:border-accent/60"
              >
                <p className="text-2xl font-semibold text-white">{c.value}</p>
                <p className="mt-1 text-xs text-slate-500">{c.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="module-status">
        <h2 id="module-status" className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Module status
        </h2>
        <ul className="mt-3 divide-y divide-ink-700 rounded-lg border border-ink-700">
          {MODULES.map((mod) => (
            <li key={mod.slug} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
              <div>
                <Link href={mod.href} className="text-sm font-medium text-white hover:text-accent">
                  {mod.name}
                </Link>
                <p className="text-xs text-slate-500">{mod.statusNote}</p>
              </div>
              <Badge tone={statusTone[mod.status]}>
                {mod.status === "operational"
                  ? "Operational"
                  : mod.status === "configuration_required"
                    ? "Configuration required"
                    : "Planned"}
              </Badge>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
