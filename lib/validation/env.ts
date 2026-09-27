import { PLATFORM } from "@/config/platform";

/**
 * OPUS67 — Environment access (server-only).
 *
 * Centralises every process.env read so that:
 *  - no secret is ever exposed to the client bundle;
 *  - the application boots without any variable set;
 *  - configuration state is reported honestly.
 *
 * The platform is ALWAYS configured: when an optional external service is
 * not selected, the explicit default driver from config/platform.ts is
 * active (storage: "memory", AI provider: "null"). External services are
 * opt-in upgrades, never a requirement to boot.
 */

export interface EnvironmentStatus {
  /** Whether an external PostgreSQL is selected via DATABASE_URL. */
  database: "configured" | "not_configured";
  /** Active storage driver: "memory" (default) or "postgresql". */
  databaseDriver: "memory" | "postgresql";
  /** Whether an external AI provider is selected via AI_PROVIDER. */
  aiProvider: "configured" | "not_configured";
  /** Active provider driver id: "null" (default no-op) or the external name. */
  aiProviderDriver: string;
  /** Human-readable active provider name. */
  aiProviderName: string;
}

export function getDatabaseUrl(): string | null {
  const value = process.env.DATABASE_URL;
  return value && value.length > 0 ? value : null;
}

export function getAiProviderName(): string {
  const value = process.env.AI_PROVIDER;
  return value && value.length > 0 ? value : "none";
}

export function getEnvironmentStatus(): EnvironmentStatus {
  const databaseUrl = getDatabaseUrl();
  const providerName = getAiProviderName();
  const externalProvider = providerName !== "none";
  return {
    database: databaseUrl ? "configured" : "not_configured",
    databaseDriver: databaseUrl ? "postgresql" : PLATFORM.drivers.storage,
    aiProvider: externalProvider ? "configured" : "not_configured",
    aiProviderDriver: externalProvider ? providerName : PLATFORM.drivers.aiProvider,
    aiProviderName: externalProvider ? providerName : PLATFORM.drivers.aiProvider,
  };
}
