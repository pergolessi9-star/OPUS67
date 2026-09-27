# OPUS67 — Operations

## Local operation

```bash
npm ci
npm run dev        # development
npm run build      # production build
npm start          # serve production build
```

## Verification commands

| Command | Purpose |
| --- | --- |
| `npm run lint` | ESLint |
| `npm run typecheck` | strict TypeScript |
| `npm run test` | Vitest unit + integration |
| `npm run check` | lint + typecheck + tests |
| `npm run check:secrets` | repository secret scan |
| `npm audit` | dependency vulnerability report |

## Health monitoring

`GET /api/health` — use as the uptime probe. It reports the active drivers
(application healthy / storage `memory`|`postgresql` / provider `null` or
external name) without leaking configuration values. The defaults are
explicit working drivers, so a fresh boot is fully configured.

## Logging

Single-line JSON records to stdout: timestamp, level, event, requestId,
component, fields (secret-shaped keys redacted). Forward stdout to your
log platform; a future OTel sink can replace the default writer in
`lib/observability/logger.ts`.

## Dependency audit

Run `npm audit` regularly. Classify findings (informational / low /
moderate / high / critical). Do not apply automatic major upgrades;
evaluate changelogs and open a dedicated PR.

## Incident response

See `docs/SECURITY.md` § Incident response.
