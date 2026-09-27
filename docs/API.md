# OPUS67 — API reference

Base URL: deployment origin. Responses never include environment values,
credentials or internal paths.

## GET /api/health

Liveness/readiness signal, safe and minimal. Reports the ACTIVE drivers —
the platform is always configured: defaults are the explicit local drivers
(`memory` storage, `null` provider); external services are opt-in via
server-side env vars.

```json
{
  "status": "ok",
  "service": "OPUS67",
  "checks": {
    "application": "healthy",
    "storage": "memory",
    "aiProvider": "null"
  }
}
```

- `storage`: `memory` (default driver) | `postgresql` (when `DATABASE_URL`
  is set; the value is never exposed).
- `aiProvider`: `null` (default no-op driver, generation disabled by
  design) | the external provider name (when `AI_PROVIDER` is set).

## POST /api/tools/execute

Executes a built-in system tool. Only tools registered in
`lib/tools/built-in-tools.ts` are executable (`system.sha256`,
`system.sanitize-text`, `system.time-now`); anything else returns 404.

Request:

```json
{ "tool": "system.sha256", "input": { "text": "hello" } }
```

Response (200):

```json
{
  "status": "ok",
  "result": {
    "tool": "system.sha256",
    "requestId": "uuid",
    "durationMs": 0,
    "output": { "sha256": "2cf24dba…" }
  }
}
```

Errors: 400 invalid envelope or tool input; 404 unknown tool. Error bodies
are generic and never expose internal details.

## GET /api/status

Aggregate platform status.

```json
{
  "status": "ok",
  "service": "OPUS67",
  "modules": [{ "slug": "dashboard", "status": "operational" }],
  "counts": {
    "projects": 0,
    "agents": 0,
    "tools": 3,
    "workflows": 0,
    "evidence": 0,
    "executions": 0
  }
}
```

Counts come from the live store; on the in-memory adapter they are
process-local and reset on restart. `tools` starts at 3 because the
built-in system tools register automatically.

## Error format

```json
{ "error": "Public safe message" }
```

Unknown internal errors always map to `500 { "error": "Internal server error" }`.
