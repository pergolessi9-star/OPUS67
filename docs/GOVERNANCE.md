# OPUS67 — AI governance

## Position statement

OPUS67 provides **governance support** and **compliance-oriented controls**.
It does not claim EU AI Act compliance: conformity is an organisational
property that software can support but not confer. UI and documentation use
precise wording: "governance support", "compliance-oriented controls",
"evidence management", "human oversight records".

## Model

```
AI System → Risk → Control
AI output → Evidence → Human Review → Decision → Audit Event
```

- **AISystem**: inventory entry with owner and risk level
  (minimal / limited / high / unacceptable — vocabulary aligned with the
  EU AI Act risk tiers, used here as a classification aid only).
- **Risk / Control**: risks attach to systems; controls attach to risks
  with proposed → implemented → verified states.
- **Evidence**: provenance + SHA-256 fingerprint + explicit review states
  (see `docs/DATA_MODEL.md`). Evidence is never auto-promoted to APPROVED.
- **HumanReview / Decision**: oversight is a first-class, auditable entity.
- **AuditEvent**: actor, action, resource, requestId — never secrets.

## Logging for governance

Structured logs (`lib/observability/logger.ts`) carry `requestId` so an
execution can be correlated across components. Future work: persist
`AuditEvent` records alongside executions and evidence (see
`docs/ROADMAP.md`).

## Prompt safety

`lib/ai/messages.ts` enforces channel separation between system
instructions, user input, untrusted external content and tool output, as a
conceptual defence against prompt injection, tool misuse and secret
exfiltration. Untrusted content is wrapped with explicit delimiters and
labelled as data, never as instructions.
