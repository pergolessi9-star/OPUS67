import { getAiProviderName } from "@/lib/validation/env";
import type { ChannelMessage } from "@/lib/ai/messages";

/**
 * OPUS67 — AI provider abstraction.
 *
 * All model access goes through the AIProvider interface. The application
 * never couples to a specific vendor SDK outside this directory.
 *
 * Current state: no external provider is wired. When AI_PROVIDER (and the
 * corresponding server-side key) are not configured, the registry returns a
 * NullProvider that reports "not_configured" and refuses to generate.
 * This is intentional degradation, not a stub pretending to work.
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

/** Provider used when no real provider is configured. */
export class NullProvider implements AIProvider {
  readonly id = "none";

  async generate(): Promise<GenerateResult> {
    throw new Error(
      "No AI provider configured. Set AI_PROVIDER and the provider API key (server-side env). See .env.example.",
    );
  }

  async *stream(): AsyncIterable<string> {
    throw new Error(
      "No AI provider configured. Set AI_PROVIDER and the provider API key (server-side env). See .env.example.",
    );
  }

  async healthCheck(): Promise<ProviderHealth> {
    return {
      provider: this.id,
      state: "not_configured",
      detail: "No AI provider configured. Generation is disabled until credentials are provided.",
    };
  }
}

const registry = new Map<string, AIProvider>();

export function registerProvider(provider: AIProvider): void {
  registry.set(provider.id, provider);
}

export function getProvider(id?: string): AIProvider {
  const name = id ?? getAiProviderName();
  return registry.get(name) ?? new NullProvider();
}

export async function getActiveProviderHealth(): Promise<ProviderHealth> {
  return getProvider().healthCheck();
}
