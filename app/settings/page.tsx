import type { Metadata } from "next";
import { getModule } from "@/lib/utils/module";
import { getEnvironmentStatus } from "@/lib/validation/env";
import { PLATFORM } from "@/config/platform";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

export default function SettingsPage() {
  const mod = getModule("settings");
  const env = getEnvironmentStatus();

  return (
    <div>
      <PageHeader
        title={mod.name}
        description={mod.description}
        status={mod.status}
        statusNote={mod.statusNote}
      />

      <section aria-labelledby="platform-config">
        <h2 id="platform-config" className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Platform configuration
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          OPUS67 is always fully configured: every driver has an explicit working default.
          External services are optional upgrades selected via server-side environment
          variables. Values are never displayed — only configuration state.
        </p>
        <dl className="mt-3 divide-y divide-ink-700 rounded-lg border border-ink-700">
          <div className="flex items-center justify-between px-4 py-3">
            <dt className="text-sm text-slate-300">Product stage</dt>
            <dd>
              <Badge tone="amber">
                {PLATFORM.stage} — {PLATFORM.stageLabel}
              </Badge>
            </dd>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <dt className="text-sm text-slate-300">Storage driver</dt>
            <dd className="text-right">
              <Badge tone="green">Configured: {env.databaseDriver}</Badge>
              <p className="mt-1 text-xs text-slate-500">
                {env.databaseDriver === "memory"
                  ? "Default in-memory repository active (process-local, non-persistent by design). PostgreSQL optional via DATABASE_URL."
                  : "External PostgreSQL selected via DATABASE_URL."}
              </p>
            </dd>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <dt className="text-sm text-slate-300">AI provider driver</dt>
            <dd className="text-right">
              <Badge tone={env.aiProviderDriver === "null" ? "blue" : "green"}>
                Configured: {env.aiProviderDriver}
              </Badge>
              <p className="mt-1 text-xs text-slate-500">
                {env.aiProviderDriver === "null"
                  ? "Local no-op provider active: generation disabled by design, no external AI calls. External provider optional via AI_PROVIDER + server-side key."
                  : `External provider selected: ${env.aiProviderName}.`}
              </p>
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="auth-note" className="mt-8">
        <h2 id="auth-note" className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Authentication &amp; authorisation
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Not implemented yet. RBAC roles (OWNER, ADMIN, OPERATOR, REVIEWER, VIEWER) are
          modelled in the type system for a future milestone — no fictitious
          authorisation is enforced or claimed. See docs/SECURITY.md.
        </p>
      </section>
    </div>
  );
}
