# OPUS67 — API reference

Base URL: deployment origin. All endpoints are read-only in this milestone.
Responses never include environment values, credentials or internal paths.

## GET /api/health

Liveness/readiness signal, safe and minimal.

```json
{
  "status": "ok",
  "service": "OPUS67",
  "checks": {
    "application": "healthy",
    "database": "not_configured",
    "aiProvider": "not_configured"
  }
}
```

- `database`: `configured` | `not_configured` (derived from presence of
  `DATABASE_URL`; the value is never exposed).
- `aiProvider`: `configured` | `not_configured`.

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
    "tools": 0,
    "workflows": 0,
    "evidence": 0,
    "executions": 0
  }
}
```

Counts come from the live store; on the in-memory adapter they are
process-local and reset on restart.

## Error format

```json
{ "error": "Public safe message" }
```

Unknown internal errors always map to `500 { "error": "Internal server error" }`.
