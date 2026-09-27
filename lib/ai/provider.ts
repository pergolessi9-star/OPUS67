import { getAiProviderName } from "@/lib/validation/env";
import type { ChannelMessage } from "@/lib/ai/messages";

/**
 * OPUS67 — AI provider abstraction.
 *
 * All model access goes through the AIProvider interface. The application
 * never couples to a specific vendor SDK outside this directory.
 *
 * The active provider is ALWAYS configured: by default it is the explicit
 * local no-op adapter ("null"), which refuses to generate by design and
 * makes no external calls. Setting AI_PROVIDER (plus the corresponding
 * server-side key) selects an external adapter instead. This is an
 * intentional configuration, not a stub pretending to work.
 */

export interface GenerateRequest {
  messages: ChannelMessage[];
  model: string;
  maxOutputTokens?: number;
}

export interface GenerateResult {
  text: string;
  model: string;
  provider: string;
  requestId: string;
}

export interface ProviderHealth {
  provider: string;
  state: "ok" | "not_configured" | "error";
  detail: string;
}

export interface AIProvider {
  readonly id: string;
  generate(request: GenerateRequest): Promise<GenerateResult>;
  stream(request: GenerateRequest): AsyncIterable<string>;
  healthCheck(): Promise<ProviderHealth>;
}

/**
 * Explicit local no-op provider — the configured default driver.
 * It is healthy and behaves exactly as configured: generation is disabled
 * by design and no external AI calls are made.
 */
export class NullProvider implements AIProvider {
  readonly id = "null";

  async generate(): Promise<GenerateResult> {
    throw new Error(
      "AI generation is disabled: the active provider is the local no-op default. " +
        "Set AI_PROVIDER and a server-side API key to enable an external provider. See .env.example.",
    );
  }

  async *stream(): AsyncIterable<string> {
    throw new Error(
      "AI generation is disabled: the active provider is the local no-op default. " +
        "Set AI_PROVIDER and a server-side API key to enable an external provider. See .env.example.",
    );
  }

  async healthCheck(): Promise<ProviderHealth> {
    return {
      provider: this.id,
      state: "ok",
      detail:
        "Local no-op provider active (explicit default). Generation is disabled by design; no external AI calls are made.",
    };
  }
}

const registry = new Map<string, AIProvider>();
const nullProvider = new NullProvider();
registry.set(nullProvider.id, nullProvider);

export function registerProvider(provider: AIProvider): void {
  registry.set(provider.id, provider);
}

export function getProvider(id?: string): AIProvider {
  const name = id ?? getAiProviderName();
  if (name === "none" || name === nullProvider.id) {
    return nullProvider;
  }
  return registry.get(name) ?? nullProvider;
}

export async function getActiveProviderHealth(): Promise<ProviderHealth> {
  return getProvider().healthCheck();
}
