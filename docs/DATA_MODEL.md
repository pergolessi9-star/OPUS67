# OPUS67 — Data model

Entities are defined in `types/index.ts` (compile-time) and validated by
`lib/validation/schemas.ts` (runtime, Zod, strict create-schemas).

## Entities

| Entity | Key fields | Notes |
| --- | --- | --- |
| Project | id, name, description, status(draft/active/archived), owner | Groups agents, workflows, executions, evidence |
| Agent | id, name, status(draft/active/paused/disabled), provider, model, systemInstructions, capabilities, tools | Execution requires a configured provider |
| Tool | id, name, category, status(AVAILABLE/CONFIGURATION_REQUIRED/DISABLED/ERROR), inputSchema, outputSchema, permissions | Never declared AVAILABLE unless actually wired |
| Workflow | id, name, status, steps[], triggers[] | Step: agentId, toolId, input, output, dependsOn, errorPolicy(abort/retry/continue/manual_review) |
| Execution | id, projectId, workflowId, agentId, status(queued/running/completed/failed/cancelled), startedAt, completedAt, input, output, error, provider, model, requestId | Lifecycle record of a run |
| Evidence | id, projectId, source, sourceType, timestamp, hash(SHA-256 hex, nullable), metadata, status | States: UNVERIFIED → SYSTEM_GENERATED → SOURCE_VERIFIED → HUMAN_REVIEWED → APPROVED/REJECTED. Never auto-promoted to APPROVED |
| AISystem | id, name, riskLevel(minimal/limited/high/unacceptable), owner | Governance inventory |
| Risk | id, aiSystemId, title, level | Linked to AISystem |
| Control | id, riskId, status(proposed/implemented/verified) | Linked to Risk |
| Decision | id, subject, rationale, decidedBy | Human decision record |
| HumanReview | id, evidenceId, reviewerId, outcome(approved/rejected/needs_changes), notes | Oversight record |
| AuditEvent | id, timestamp, actorType(user/system/agent), actorId, action, resourceType, resourceId, metadata, requestId | Never records secrets |

## Persistence

- **Current adapter**: in-memory (`lib/db/repository.ts`), process-local,
  non-persistent, empty by default.
- **Planned adapter**: PostgreSQL (Neon/Supabase-compatible) implementing
  the same `Repository` interface. Suggested table-per-entity mapping
  follows the field lists above; JSON columns for `inputSchema`,
  `outputSchema`, `input`, `output`, `metadata`.
- No destructive migration will ever run automatically.

## Hashing scope

`lib/utils/hash.ts` computes SHA-256 fingerprints of artefact payloads.
This provides integrity checking of stored content. It does **not**
constitute an immutable ledger; immutability claims are out of scope until
an append-only store is implemented.
