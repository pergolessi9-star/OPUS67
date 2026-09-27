# OPUS67 — Roadmap

Status legend: DONE / IN PROGRESS / PLANNED / HOLD.

## Phase 1 — Core (current milestone)

- DONE — Next.js App Router scaffold, strict TypeScript, Tailwind.
- DONE — Module registry with honest statuses.
- DONE — Domain model + strict Zod validation.
- DONE — In-memory repository behind interfaces.
- DONE — AI provider abstraction (NullProvider degradation).
- DONE — Evidence hashing (SHA-256 fingerprinting).
- DONE — `/api/health`, `/api/status`.
- DONE — CI workflow, PR/issue templates, secret scanning.
- DONE — Documentation set.

## Phase 2 — Persistence & execution

- PLANNED — PostgreSQL adapter (Neon/Supabase) with reversible migrations.
- PLANNED — CRUD API routes + forms for projects/agents/tools/workflows.
- PLANNED — Workflow execution engine (sequential steps, error policies,
  execution records). Deliberately not a distributed orchestrator.
- HOLD — Playwright E2E suite (see `tests/e2e/README.md`).

## Phase 3 — Providers & governance depth

- PLANNED — First real AI provider adapter behind `AIProvider`
  (server-side keys only).
- PLANNED — Persistent AuditEvent store correlated by requestId.
- PLANNED — Governance workflows: assessments, incidents, technical
  documentation generation from the registry.

## Phase 4 — Access control

- PLANNED — Authentication (provider TBD by owner decision).
- PLANNED — RBAC enforcement of OWNER/ADMIN/OPERATOR/REVIEWER/VIEWER.

## Open owner decisions

- LICENSE choice (no license file shipped until decided).
- AI provider(s) to integrate first.
- Authentication provider.
