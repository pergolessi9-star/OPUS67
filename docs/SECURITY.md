# OPUS67 — Security model

## Threat model (basic)

| Threat | Mitigation |
| --- | --- |
| Secret leakage via git | `.gitignore` for env files, `scripts/check-secrets.sh` in CI |
| Secret leakage via logs | `lib/observability/logger.ts` redacts secret-shaped keys |
| Secret exposure to browser | Server-only env access via `lib/validation/env.ts`; no `NEXT_PUBLIC_*` secrets |
| XSS via user input | React escaping by default; `sanitizeText` strips control chars at boundaries |
| Stack trace leakage | `toPublicError` maps unknown errors to a generic 500 payload |
| Prompt injection | Channel separation (`lib/ai/messages.ts`): system / user / external_untrusted / tool_output are never blindly concatenated; untrusted content is explicitly delimited |
| Dependency vulnerabilities | Lockfile pinning, `npm audit` in operations, minimal dependency set |
| Clickjacking / MIME sniffing | Security headers in `next.config.ts` (X-Frame-Options DENY, nosniff, HSTS, Referrer-Policy, Permissions-Policy) |

## Secret management

- Secrets live only in environment variables (local `.env.local`, or
  Vercel env vars per environment).
- `.env.example` contains names and inert placeholders only.
- Audit events and logs must never record passwords, tokens, API keys or
  secret values.

## Attack surfaces

- API routes (`/api/health`, `/api/status`): read-only, return minimal
  safe payloads without env values or internal paths.
- Future write endpoints must validate with the strict Zod schemas and
  map errors via `toPublicError`.
- Future AI execution: tool execution must respect the `permissions`
  declared on each Tool; untrusted external content uses the
  `external_untrusted` channel.

## Authentication & authorisation (current state: NOT IMPLEMENTED)

No auth layer exists in this milestone and none is claimed. The RBAC role
set (OWNER, ADMIN, OPERATOR, REVIEWER, VIEWER) is modelled in `types/`
for a future milestone. Until then, the application must be treated as
suitable for a trusted single-operator context only.

## Logging

Structured JSON logs: timestamp, level, event, requestId, component.
No personal data beyond necessity; no secrets (enforced by redaction).

## Incident response

1. Contain: revoke affected credentials, redeploy last known-good.
2. Assess: identify scope via logs and audit events.
3. Eradicate: patch, rotate secrets.
4. Recover: redeploy, verify `/api/health`.
5. Learn: document timeline and corrective actions in a post-incident note.

## Dependency policy

Minimal set, lockfile-pinned. `npm audit` results are classified
informational / low / moderate / high / critical; major version upgrades
are never applied automatically.
