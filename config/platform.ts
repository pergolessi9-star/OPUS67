/**
 * OPUS67 — Platform configuration.
 *
 * Single source of truth for product identity and the ACTIVE infrastructure
 * drivers. Every driver has an explicit, working default, so the platform is
 * always fully configured: external services (PostgreSQL, external AI
 * providers) are OPTIONAL upgrades selected via server-side env vars.
 *
 * Honesty rule: these defaults describe exactly what the code does today.
 * - storage "memory": process-local repository, non-persistent by design.
 * - aiProvider "null": local no-op adapter; generation disabled by design.
 */

export const PLATFORM = {
  name: "OPUS67",
  version: "0.1.0",
  /** Product stage shown publicly. OPUS67 is an MVP under active validation. */
  stage: "MVP",
  stageLabel: "Minimum Viable Product",
  stageNote:
    "OPUS67 is currently an MVP under active technical, security and governance validation.",
  drivers: {
    /** Active storage driver when DATABASE_URL is not set. */
    storage: "memory",
    storageLabel: "In-memory repository (default driver)",
    /** Active AI provider when AI_PROVIDER is not set. */
    aiProvider: "null",
    aiProviderLabel: "Local no-op provider (default driver)",
  },
} as const;

export type PlatformConfig = typeof PLATFORM;
