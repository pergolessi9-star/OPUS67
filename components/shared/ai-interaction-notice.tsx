import { getEnvironmentStatus } from "@/lib/validation/env";

/**
 * AI interaction notice (Article 50(1) AI Act orientation).
 *
 * Rendered ONLY when direct interaction with an AI system is actually
 * enabled, i.e. an external AI provider is configured. With the explicit
 * default local no-op provider ("null") there is no AI interaction and no
 * AI generation, so this component intentionally renders nothing.
 */
export function AiInteractionNotice() {
  const env = getEnvironmentStatus();
  const aiInteractionEnabled =
    env.aiProviderDriver !== "null" && env.aiProviderDriver !== "none";

  if (!aiInteractionEnabled) {
    return null;
  }

  return (
    <div
      role="status"
      className="mb-4 rounded-md border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm text-blue-200"
    >
      You are interacting with an AI system.
    </div>
  );
}
