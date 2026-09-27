# OPUS67 — Architecture

## Overview

OPUS67 is a modular platform for working with AI systems. The architecture
prioritises, in this order: correctness → security → traceability →
modularity → testability → UX → scalability.

## Layers

```
UI (app/, components/)
  → services / validation (lib/validation/, Zod at every boundary)
  → repository / data access (lib/db/)
  → database (PostgreSQL adapter: planned; in-memory adapter: active)

AI access:
UI / services → lib/ai/provider.ts (AIProvider interface) → vendor adapter
```

### Directory map

- `app/` — Next.js App Router. Pages are Server Components by default;
  client components only where interactivity requires them.
- `app/api/` — API routes (`/api/health`, `/api/status`, `/api/tools/execute`).
- `components/` — `ui` (primitives), `layout`, `shared`.
- `lib/ai/` — provider abstraction, prompt channel separation.
- `lib/db/` — repository interfaces + in-memory store.
- `lib/security/` — sanitisation, safe error mapping.
- `lib/validation/` — Zod schemas (mirror `types/`), environment access.
- `lib/observability/` — structured logger with secret redaction.
- `config/modules.ts` — module registry (navigation + honest statuses).
- `types/` — core domain types, single source of truth.

## Architectural decisions (ADR summary)

### ADR-1: Next.js App Router, single build contract
`npm run build` → `next build`. No intermediate build scripts.
`output: "standalone"` enables the multi-stage Dockerfile.

### ADR-2: No `vercel.json`
Vercel's native Next.js conventions are sufficient. Adding `vercel.json`
would risk contradictory configuration without adding value. Revisit only
with a documented technical need.

### ADR-3: In-memory repository first, PostgreSQL-ready
The store is process-local and empty by default — no seeded demo data.
The `Repository<TEntity, TCreate>` interface isolates the future
PostgreSQL adapter (Neon/Supabase) so no React component ever touches SQL.

### ADR-4: Provider-agnostic AI layer
All model access goes through the `AIProvider` interface
(`generate`, `stream`, `healthCheck`). The active provider is always
configured: by default it is the explicit local no-op adapter (`null`),
which is healthy, refuses to generate by design and makes no external
calls. Setting `AI_PROVIDER` plus a server-side key selects an external
adapter. Degradation is explicit, never simulated.

### ADR-5: Validation at boundaries with strict Zod schemas
Create-schemas are `.strict()` so server-generated fields (id, timestamps)
cannot be injected by callers.

### ADR-6: Vitest over heavier test stacks
Unit/integration tests run in Node with Vitest; API route handlers are
invoked directly. E2E (Playwright) is documented as HOLD rather than
declared without execution.

### ADR-7: Single CI workflow, no deploy job
`.github/workflows/ci.yml` runs checkout → install → lint → typecheck →
test → build → secret scan with minimal permissions (`contents: read`).
Deployments belong exclusively to the Vercel Git Integration to avoid two
competing deploy systems.

## Module registry

`config/modules.ts` is the single source of truth for module status
(`operational` / `configuration_required` / `planned`). The dashboard and
navigation render from it, so statuses cannot drift between pages.
