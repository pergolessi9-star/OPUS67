import { z } from "zod";

/**
 * OPUS67 — Runtime validation schemas (Zod).
 * Mirrors types/index.ts. Use these at every system boundary
 * (API routes, external content, repository writes).
 */

const isoDateTime = z
  .string()
  .refine((v) => !Number.isNaN(Date.parse(v)), { message: "Invalid ISO date-time" });

const jsonRecord = z.record(z.string(), z.unknown());

// --- Agents ---------------------------------------------------------------

export const agentStatusSchema = z.enum(["draft", "active", "paused", "disabled"]);

export const agentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  status: agentStatusSchema,
  provider: z.string().min(1).max(100),
  model: z.string().min(1).max(100),
  systemInstructions: z.string().max(20000),
  capabilities: z.array(z.string().min(1).max(100)),
  tools: z.array(z.string().min(1)),
  createdAt: isoDateTime,
  updatedAt: isoDateTime,
});

export const createAgentSchema = agentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();

// --- Tools ----------------------------------------------------------------

export const toolStatusSchema = z.enum([
  "AVAILABLE",
  "CONFIGURATION_REQUIRED",
  "DISABLED",
  "ERROR",
]);

export const toolSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  category: z.string().min(1).max(100),
  status: toolStatusSchema,
  inputSchema: jsonRecord,
  outputSchema: jsonRecord,
  permissions: z.array(z.string().min(1).max(100)),
  createdAt: isoDateTime,
  updatedAt: isoDateTime,
});

export const createToolSchema = toolSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();

// --- Workflows --------------------------------------------------------------

export const workflowStatusSchema = z.enum(["draft", "active", "paused", "disabled"]);

export const workflowErrorPolicySchema = z.enum([
  "abort",
  "retry",
  "continue",
  "manual_review",
]);

export const workflowStepSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  agentId: z.string().min(1).nullable(),
  toolId: z.string().min(1).nullable(),
  input: jsonRecord,
  output: jsonRecord,
  dependsOn: z.array(z.string().min(1)),
  errorPolicy: workflowErrorPolicySchema,
});

export const workflowTriggerSchema = z.object({
  type: z.enum(["manual", "schedule", "event"]),
  config: jsonRecord,
});

export const workflowSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  status: workflowStatusSchema,
  steps: z.array(workflowStepSchema),
  triggers: z.array(workflowTriggerSchema),
  createdAt: isoDateTime,
  updatedAt: isoDateTime,
});

export const createWorkflowSchema = workflowSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();

// --- Projects ---------------------------------------------------------------

export const projectStatusSchema = z.enum(["draft", "active", "archived"]);

export const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  status: projectStatusSchema,
  owner: z.string().min(1).max(200),
  createdAt: isoDateTime,
  updatedAt: isoDateTime,
});

export const createProjectSchema = projectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();

// --- Evidence -----------------------------------------------------------------

export const evidenceStatusSchema = z.enum([
  "UNVERIFIED",
  "SYSTEM_GENERATED",
  "SOURCE_VERIFIED",
  "HUMAN_REVIEWED",
  "APPROVED",
  "REJECTED",
]);

export const evidenceSchema = z.object({
  id: z.string().min(1),
  projectId: z.string().min(1).nullable(),
  source: z.string().min(1).max(500),
  sourceType: z.string().min(1).max(100),
  timestamp: isoDateTime,
  hash: z
    .string()
    .regex(/^[a-f0-9]{64}$/, "hash must be a lowercase SHA-256 hex digest")
    .nullable(),
  metadata: jsonRecord,
  status: evidenceStatusSchema,
  createdAt: isoDateTime,
});

export const createEvidenceSchema = evidenceSchema.omit({
  id: true,
  createdAt: true,
}).strict();

// --- Executions -----------------------------------------------------------------

export const executionStatusSchema = z.enum([
  "queued",
  "running",
  "completed",
  "failed",
  "cancelled",
]);

export const executionSchema = z.object({
  id: z.string().min(1),
  projectId: z.string().min(1).nullable(),
  workflowId: z.string().min(1).nullable(),
  agentId: z.string().min(1).nullable(),
  status: executionStatusSchema,
  startedAt: isoDateTime,
  completedAt: isoDateTime.nullable(),
  input: jsonRecord,
  output: jsonRecord,
  error: z.string().max(5000).nullable(),
  provider: z.string().max(100).nullable(),
  model: z.string().max(100).nullable(),
  requestId: z.string().min(1),
});

// --- Governance -----------------------------------------------------------------

export const riskLevelSchema = z.enum(["minimal", "limited", "high", "unacceptable"]);

export const aiSystemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  riskLevel: riskLevelSchema,
  owner: z.string().min(1).max(200),
  createdAt: isoDateTime,
  updatedAt: isoDateTime,
});

export const riskSchema = z.object({
  id: z.string().min(1),
  aiSystemId: z.string().min(1),
  title: z.string().min(1).max(200),
  description: z.string().max(5000),
  level: riskLevelSchema,
  createdAt: isoDateTime,
  updatedAt: isoDateTime,
});

export const controlSchema = z.object({
  id: z.string().min(1),
  riskId: z.string().min(1),
  title: z.string().min(1).max(200),
  description: z.string().max(5000),
  status: z.enum(["proposed", "implemented", "verified"]),
  createdAt: isoDateTime,
  updatedAt: isoDateTime,
});

export const decisionSchema = z.object({
  id: z.string().min(1),
  subject: z.string().min(1).max(500),
  rationale: z.string().max(10000),
  decidedBy: z.string().min(1).max(200),
  createdAt: isoDateTime,
});

export const humanReviewSchema = z.object({
  id: z.string().min(1),
  evidenceId: z.string().min(1),
  reviewerId: z.string().min(1),
  outcome: z.enum(["approved", "rejected", "needs_changes"]),
  notes: z.string().max(5000),
  createdAt: isoDateTime,
});

// --- Audit ----------------------------------------------------------------------

export const auditEventSchema = z.object({
  id: z.string().min(1),
  timestamp: isoDateTime,
  actorType: z.enum(["user", "system", "agent"]),
  actorId: z.string().min(1),
  action: z.string().min(1).max(200),
  resourceType: z.string().min(1).max(100),
  resourceId: z.string().min(1),
  metadata: jsonRecord,
  requestId: z.string().min(1),
});

export type CreateAgentInput = z.infer<typeof createAgentSchema>;
export type CreateToolInput = z.infer<typeof createToolSchema>;
export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type CreateEvidenceInput = z.infer<typeof createEvidenceSchema>;
