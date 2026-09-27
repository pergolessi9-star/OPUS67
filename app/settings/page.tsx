import type { Metadata } from "next";
import { getModule } from "@/lib/utils/module";
import { getEnvironmentStatus } from "@/lib/validation/env";
import { PLATFORM } from "@/config/platform";
import { StatusBadge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

function ConfigRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-opus-border/60 px-4 py-3 last:border-b-0">
      <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-opus-muted">
        {label}
      </dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}

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
        <h2
          id="platform-config"
          className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-opus-muted"
        >
          Platform Configuration
        </h2>
        <p className="mt-2 text-xs text-opus-muted">
          OPUS67 is always fully configured: every driver has an explicit working default.
          External services are optional upgrades selected via server-side environment
          variables. Values are never displayed — only configuration state.
        </p>
        <dl className="spectral-card mt-4">
          <ConfigRow label="Product Stage">
            <StatusBadge tone="amber">
              {PLATFORM.stage} · {PLATFORM.stageLabel}
            </StatusBadge>
          </ConfigRow>
          <ConfigRow label="Storage Driver">
            <StatusBadge tone="chartreuse">Configured · {env.databaseDriver}</StatusBadge>
            <p className="mt-1 max-w-md text-xs text-opus-muted">
              {env.databaseDriver === "memory"
                ? "Default in-memory repository active (process-local, non-persistent by design). PostgreSQL optional via DATABASE_URL."
                : "External PostgreSQL selected via DATABASE_URL."}
            </p>
          </ConfigRow>
          <ConfigRow label="AI Provider Driver">
            <StatusBadge tone={env.aiProviderDriver === "null" ? "cyan" : "chartreuse"}>
              Configured · {env.aiProviderDriver}
            </StatusBadge>
            <p className="mt-1 max-w-md text-xs text-opus-muted">
              {env.aiProviderDriver === "null"
                ? "Local no-op provider active: generation disabled by design, no external AI calls. External provider optional via AI_PROVIDER + server-side key."
                : `External provider selected: ${env.aiProviderName}.`}
            </p>
          </ConfigRow>
        </dl>
      </section>

      <section aria-labelledby="auth-note" className="mt-10">
        <h2
          id="auth-note"
          className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-opus-muted"
        >
          Authentication &amp; Authorisation
        </h2>
        <p className="mt-2 text-sm text-opus-steel">
          Not implemented yet. RBAC roles (OWNER, ADMIN, OPERATOR, REVIEWER, VIEWER) are
          modelled in the type system for a future milestone — no fictitious
          authorisation is enforced or claimed. See docs/SECURITY.md.
        </p>
      </section>
    </div>
  );
}
