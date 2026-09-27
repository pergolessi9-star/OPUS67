import type { Metadata } from "next";
import { getModule } from "@/lib/utils/module";
import { getEnvironmentStatus } from "@/lib/validation/env";
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

      <section aria-labelledby="env-status">
        <h2 id="env-status" className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Environment configuration
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Values are never displayed — only configuration state. See .env.example for variable names.
        </p>
        <dl className="mt-3 divide-y divide-ink-700 rounded-lg border border-ink-700">
          <div className="flex items-center justify-between px-4 py-3">
            <dt className="text-sm text-slate-300">DATABASE_URL (PostgreSQL)</dt>
            <dd>
              <Badge tone={env.database === "configured" ? "green" : "amber"}>
                {env.database === "configured" ? "Configured" : "Not configured"}
              </Badge>
            </dd>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <dt className="text-sm text-slate-300">AI_PROVIDER</dt>
            <dd>
              <Badge tone={env.aiProvider === "configured" ? "green" : "amber"}>
                {env.aiProvider === "configured" ? env.aiProviderName : "Not configured"}
              </Badge>
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
