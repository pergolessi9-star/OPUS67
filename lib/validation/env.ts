/**
 * OPUS67 — Environment access (server-only).
 *
 * Centralises every process.env read so that:
 *  - no secret is ever exposed to the client bundle;
 *  - the application boots without any variable set;
 *  - configuration state can be reported honestly (configured / not configured)
 *    without leaking values.
 */

export interface EnvironmentStatus {
  database: "configured" | "not_configured";
  aiProvider: "configured" | "not_configured";
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
  return {
    database: getDatabaseUrl() ? "configured" : "not_configured",
    aiProvider: getAiProviderName() !== "none" ? "configured" : "not_configured",
    aiProviderName: getAiProviderName(),
  };
}
