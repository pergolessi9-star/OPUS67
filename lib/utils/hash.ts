import { createHash } from "crypto";

/**
 * Computes the SHA-256 hex digest of a string payload.
 * Used by the evidence module to fingerprint artefacts.
 * NOTE: this provides integrity fingerprinting, not a blockchain-style
 * immutable ledger. See docs/GOVERNANCE.md for the exact claim scope.
 */
export function sha256Hex(payload: string): string {
  return createHash("sha256").update(payload, "utf8").digest("hex");
}
