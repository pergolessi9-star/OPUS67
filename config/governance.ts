/**
 * OPUS67 — Governance & regulatory configuration.
 *
 * Verifiable control states and the regulatory traceability matrix.
 *
 * TRUTH RULE (SUPERPROMPT §10): no compliance claim without evidence.
 * "COMPLIANT" is never used as an automatic state. Every row cites the
 * concrete artefact that evidences it, or states explicitly that none
 * exists yet. LAST REVIEW dates mark when each row was last reviewed;
 * 2026-09-27 is the date this matrix was compiled.
 */

export const CONTROL_STATUSES = [
  "IMPLEMENTED",
  "PARTIAL",
  "PLANNED",
  "NOT_APPLICABLE",
  "REQUIRES_ASSESSMENT",
] as const;

export type ControlStatus = (typeof CONTROL_STATUSES)[number];

export interface GovernanceControl {
  slug: string;
  name: string;
  status: ControlStatus;
  summary: string;
}

/** Top-level governance areas shown on /governance. */
export const GOVERNANCE_CONTROLS: GovernanceControl[] = [
  {
    slug: "eu-ai-act",
    name: "EU AI Act",
    status: "REQUIRES_ASSESSMENT",
    summary:
      "Compliance-oriented architecture (risk, transparency, oversight, logging). No conformity assessment has been performed; none is claimed.",
  },
  {
    slug: "gdpr-rgpd",
    name: "GDPR / RGPD",
    status: "PLANNED",
    summary:
      "Privacy-by-design principles adopted in the architecture. Records of processing and data-subject-rights workflows are not implemented yet.",
  },
  {
    slug: "human-oversight",
    name: "Human Oversight",
    status: "PARTIAL",
    summary:
      "HumanReview and Decision are first-class entities. Enforcement (authentication, authorisation) is a future milestone — not claimed today.",
  },
  {
    slug: "risk-management",
    name: "Risk Management",
    status: "PARTIAL",
    summary:
      "Risk and control entities with proposed → implemented → verified states are implemented. No systems are registered yet.",
  },
  {
    slug: "transparency",
    name: "Transparency",
    status: "PARTIAL",
    summary:
      "Honest module, driver and provider status reporting is implemented (/api/status, /api/health). Model-level documentation is planned.",
  },
  {
    slug: "traceability",
    name: "Traceability",
    status: "IMPLEMENTED",
    summary:
      "SHA-256 evidence fingerprinting and structured, secret-redacting logging are implemented and tested.",
  },
  {
    slug: "evidence",
    name: "Evidence",
    status: "IMPLEMENTED",
    summary:
      "Evidence entity with provenance, hashes and explicit review states (UNVERIFIED → … → APPROVED/REJECTED).",
  },
  {
    slug: "audit-events",
    name: "Audit Events",
    status: "PARTIAL",
    summary:
      "Structured audit event model and logger implemented. A persistent audit store is planned; events are process-local today.",
  },
  {
    slug: "data-governance",
    name: "Data Governance",
    status: "PLANNED",
    summary:
      "Lawful basis, minimisation, retention and data-subject rights are documented as design principles; controls are pending implementation.",
  },
];

export interface RegulatoryMatrixRow {
  regulation: string;
  requirement: string;
  control: string;
  status: ControlStatus;
  evidence: string;
  humanReview: string;
  lastReview: string; // ISO date
}

/**
 * REGULATION → REQUIREMENT → CONTROL → IMPLEMENTATION STATUS → EVIDENCE →
 * HUMAN REVIEW → LAST REVIEW.
 *
 * Article references are pointers to the legal texts (Regulation (EU)
 * 2024/1689 and Regulation (EU) 2016/679) for orientation; they do not
 * constitute a legal assessment.
 */
export const REGULATORY_MATRIX: RegulatoryMatrixRow[] = [
  {
    regulation: "EU AI Act",
    requirement: "Risk management system (Art. 9)",
    control: "Risk and control entities with explicit lifecycle states",
    status: "PARTIAL",
    evidence: "types/index.ts; lib/validation/schemas.ts",
    humanReview: "Required — not yet recorded",
    lastReview: "2026-09-27",
  },
  {
    regulation: "EU AI Act",
    requirement: "Record-keeping / logging (Art. 12)",
    control: "Structured JSON logger with secret redaction; audit event model",
    status: "PARTIAL",
    evidence: "lib/observability/logger.ts; types/index.ts (AuditEvent)",
    humanReview: "Required — not yet recorded",
    lastReview: "2026-09-27",
  },
  {
    regulation: "EU AI Act",
    requirement: "Transparency and information to users (Art. 13)",
    control: "Honest module/driver/provider status reporting; explicit empty states",
    status: "PARTIAL",
    evidence: "config/modules.ts; app/api/status/route.ts; app/api/health/route.ts",
    humanReview: "Required — not yet recorded",
    lastReview: "2026-09-27",
  },
  {
    regulation: "EU AI Act",
    requirement: "Human oversight (Art. 14)",
    control: "HumanReview and Decision entities in the domain model",
    status: "PARTIAL",
    evidence: "types/index.ts (HumanReview, Decision)",
    humanReview: "Required — not yet recorded",
    lastReview: "2026-09-27",
  },
  {
    regulation: "EU AI Act",
    requirement: "Conformity assessment (Art. 43)",
    control: "None — external organisational process outside this software",
    status: "REQUIRES_ASSESSMENT",
    evidence: "None — no assessment performed",
    humanReview: "Required — not yet recorded",
    lastReview: "2026-09-27",
  },
  {
    regulation: "GDPR / RGPD",
    requirement: "Data protection by design and by default (Art. 25)",
    control: "No tracking, secret redaction in logs, input sanitisation, generic error responses",
    status: "PARTIAL",
    evidence: "lib/observability/logger.ts; lib/security/sanitize.ts; next.config.ts",
    humanReview: "Required — not yet recorded",
    lastReview: "2026-09-27",
  },
  {
    regulation: "GDPR / RGPD",
    requirement: "Records of processing activities (Art. 30)",
    control: "Not implemented",
    status: "PLANNED",
    evidence: "None — pending implementation",
    humanReview: "Required — not yet recorded",
    lastReview: "2026-09-27",
  },
  {
    regulation: "GDPR / RGPD",
    requirement: "Data subject rights (Art. 15–22)",
    control: "Not implemented",
    status: "PLANNED",
    evidence: "None — pending implementation",
    humanReview: "Required — not yet recorded",
    lastReview: "2026-09-27",
  },
  {
    regulation: "GDPR / RGPD",
    requirement: "Security of processing (Art. 32)",
    control: "Security headers, Zod input validation, error sanitisation, no secrets in logs",
    status: "PARTIAL",
    evidence: "next.config.ts; lib/validation/schemas.ts; lib/security/sanitize.ts",
    humanReview: "Required — not yet recorded",
    lastReview: "2026-09-27",
  },
];

/**
 * Regulatory disclaimer shown on the home page, the governance page and the
 * AI legal notice. Mandated verbatim — do not paraphrase.
 */
export const REGULATORY_DISCLAIMER =
  "References to EU legislation describe the regulatory framework considered in the design of OPUS67 and do not constitute certification, conformity assessment, endorsement or approval by the European Union, the European Commission or a supervisory authority.";
