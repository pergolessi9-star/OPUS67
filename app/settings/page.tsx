import type { Metadata } from "next";
import { getModule } from "@/lib/utils/module";
import { getEnvironmentStatus } from "@/lib/validation/env";
import { PLATFORM } from "@/config/platform";
import { CommandHeader } from "@/components/opus/command-header";
import { StatusBadge } from "@/components/opus/status-badge";

export const metadata: Metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

export default function SettingsPage() {
  const mod = getModule("settings");
  const env = getEnvironmentStatus();

  return (
    <div>
      <CommandHeader
        eyebrow="OPUS67 // SETTINGS"
        title={mod.name}
        description={mod.description}
        status="Operational"
        statusTone="active"
      />

      <section aria-labelledby="platform-config">
        <h2
          id="platform-config"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-muted"
        >
          Platform configuration
        </h2>
        <p className="mt-1 text-xs text-muted">
          OPUS67 is always fully configured: every driver has an explicit working default.
          External services are optional upgrades selected via server-side environment
          variables. Values are never displayed — only configuration state.
        </p>
        <dl className="spectral-card mt-3 divide-y divide-line">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
            <dt className="text-sm text-steel">Product stage</dt>
            <dd>
              <StatusBadge tone="review">
                {PLATFORM.stage} — {PLATFORM.stageLabel}
              </StatusBadge>
            </dd>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
            <dt className="text-sm text-steel">Storage driver</dt>
            <dd className="text-right">
              <StatusBadge tone="active">Configured: {env.databaseDriver}</StatusBadge>
              <p className="mt-1 max-w-md text-xs text-muted">
                {env.databaseDriver === "memory"
                  ? "Default in-memory repository active (process-local, non-persistent by design). PostgreSQL optional via DATABASE_URL."
                  : "External PostgreSQL selected via DATABASE_URL."}
              </p>
            </dd>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
            <dt className="text-sm text-steel">AI provider driver</dt>
            <dd className="text-right">
              <StatusBadge tone={env.aiProviderDriver === "null" ? "info" : "active"}>
                Configured: {env.aiProviderDriver}
              </StatusBadge>
              <p className="mt-1 max-w-md text-xs text-muted">
                {env.aiProviderDriver === "null"
                  ? "Local no-op provider active: generation disabled by design, no external AI calls. External provider optional via AI_PROVIDER + server-side key."
                  : `External provider selected: ${env.aiProviderName}.`}
              </p>
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="auth-note" className="mt-8">
        <h2
          id="auth-note"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-muted"
        >
          Authentication &amp; authorisation
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-steel">
          Not implemented yet. RBAC roles (OWNER, ADMIN, OPERATOR, REVIEWER, VIEWER) are
          modelled in the type system for a future milestone — no fictitious
          authorisation is enforced or claimed. See docs/SECURITY.md.
        </p>
      </section>
    </div>
  );
}
