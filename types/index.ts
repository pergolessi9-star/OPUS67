/**
 * OPUS67 — Core domain types.
 *
 * These types are the single source of truth for the domain model.
 * Runtime validation lives in lib/validation/schemas.ts (Zod).
 * See docs/DATA_MODEL.md for the full entity reference.
 */

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------

export const AGENT_STATUSES = ["draft", "active", "paused", "disabled"] as const;
export type AgentStatus = (typeof AGENT_STATUSES)[number];

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  provider: string;
  model: string;
  systemInstructions: string;
  capabilities: string[];
  tools: string[];
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

// ---------------------------------------------------------------------------
// Tools
// ---------------------------------------------------------------------------

export const TOOL_STATUSES = [
  "AVAILABLE",
  "CONFIGURATION_REQUIRED",
  "DISABLED",
  "ERROR",
] as const;
export type ToolStatus = (typeof TOOL_STATUSES)[number];

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  status: ToolStatus;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Workflows
// ---------------------------------------------------------------------------

export const WORKFLOW_STATUSES = ["draft", "active", "paused", "disabled"] as const;
export type WorkflowStatus = (typeof WORKFLOW_STATUSES)[number];

export type WorkflowErrorPolicy = "abort" | "retry" | "continue" | "manual_review";

export interface WorkflowStep {
  id: string;
  name: string;
  agentId: string | null;
  toolId: string | null;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  dependsOn: string[];
  errorPolicy: WorkflowErrorPolicy;
}

export interface WorkflowTrigger {
  type: "manual" | "schedule" | "event";
  config: Record<string, unknown>;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  steps: WorkflowStep[];
  triggers: WorkflowTrigger[];
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const PROJECT_STATUSES = ["draft", "active", "archived"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Evidence & traceability
// ---------------------------------------------------------------------------

export const EVIDENCE_STATUSES = [
  "UNVERIFIED",
  "SYSTEM_GENERATED",
  "SOURCE_VERIFIED",
  "HUMAN_REVIEWED",
  "APPROVED",
  "REJECTED",
] as const;
export type EvidenceStatus = (typeof EVIDENCE_STATUSES)[number];

export interface Evidence {
  id: string;
  projectId: string | null;
  source: string;
  sourceType: string;
  timestamp: string;
  /** SHA-256 hex digest of the referenced artefact, when computed. */
  hash: string | null;
  metadata: Record<string, unknown>;
  status: EvidenceStatus;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Executions
// ---------------------------------------------------------------------------

export const EXECUTION_STATUSES = [
  "queued",
  "running",
  "completed",
  "failed",
  "cancelled",
] as const;
export type ExecutionStatus = (typeof EXECUTION_STATUSES)[number];

export interface Execution {
  id: string;
  projectId: string | null;
  workflowId: string | null;
  agentId: string | null;
  status: ExecutionStatus;
  startedAt: string;
  completedAt: string | null;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  error: string | null;
  provider: string | null;
  model: string | null;
  requestId: string;
}

// ---------------------------------------------------------------------------
// Governance
// ---------------------------------------------------------------------------

export const RISK_LEVELS = ["minimal", "limited", "high", "unacceptable"] as const;
export type RiskLevel = (typeof RISK_LEVELS)[number];

export interface AISystem {
  id: string;
  name: string;
  description: string;
  riskLevel: RiskLevel;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface Risk {
  id: string;
  aiSystemId: string;
  title: string;
  description: string;
  level: RiskLevel;
  createdAt: string;
  updatedAt: string;
}

export interface Control {
  id: string;
  riskId: string;
  title: string;
  description: string;
  status: "proposed" | "implemented" | "verified";
  createdAt: string;
  updatedAt: string;
}

export interface Decision {
  id: string;
  subject: string;
  rationale: string;
  decidedBy: string;
  createdAt: string;
}

export interface HumanReview {
  id: string;
  evidenceId: string;
  reviewerId: string;
  outcome: "approved" | "rejected" | "needs_changes";
  notes: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Audit log
// ---------------------------------------------------------------------------

export const AUDIT_ACTOR_TYPES = ["user", "system", "agent"] as const;
export type AuditActorType = (typeof AUDIT_ACTOR_TYPES)[number];

export interface AuditEvent {
  id: string;
  timestamp: string;
  actorType: AuditActorType;
  actorId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata: Record<string, unknown>;
  requestId: string;
}

// ---------------------------------------------------------------------------
// Providers / models
// ---------------------------------------------------------------------------

export interface AIProviderInfo {
  id: string;
  name: string;
  configured: boolean;
}

export interface AIModel {
  id: string;
  providerId: string;
  name: string;
}

// ---------------------------------------------------------------------------
// RBAC (future — documented, not enforced yet; see docs/SECURITY.md)
// ---------------------------------------------------------------------------

export const ROLES = ["OWNER", "ADMIN", "OPERATOR", "REVIEWER", "VIEWER"] as const;
export type Role = (typeof ROLES)[number];
