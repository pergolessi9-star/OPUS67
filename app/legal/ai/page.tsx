import type { Metadata } from "next";
import Link from "next/link";
import { PLATFORM } from "@/config/platform";
import { REGULATORY_DISCLAIMER } from "@/config/governance";
import {
  AI_TRANSPARENCY_RESOURCES,
  AUTHOR,
  EU_EMBLEM,
  LEGAL_FRAMEWORK_STATEMENT,
  REGULATIONS,
} from "@/config/regulatory";

export const metadata: Metadata = { title: "Artificial Intelligence Legal Notice" };

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="spectral-card p-6"
    >
      <h2 id={id} className="text-lg font-semibold text-opus-text">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm text-opus-steel">{children}</div>
    </section>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-opus-cyan hover:underline"
    >
      {children}
    </a>
  );
}

export default function AiLegalNoticePage() {
  return (
    <div className="space-y-8">
      <header className="pt-2">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-opus-cyan">
          Legal
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-opus-text">
          Artificial Intelligence Legal Notice
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-opus-steel">
          {LEGAL_FRAMEWORK_STATEMENT}
        </p>
      </header>

      <Section id="european-ai-governance" title="European AI Governance">
        <p>
          OPUS67 is designed with a compliance-oriented architecture: governance,
          transparency, traceability, human oversight and risk management are
          treated as design requirements, not as afterthoughts. The verifiable
          state of every control is published on the{" "}
          <Link href="/governance" className="text-opus-cyan hover:underline">
            Governance
          </Link>{" "}
          page (IMPLEMENTED / PARTIAL / PLANNED / REQUIRES ASSESSMENT — never an
          automatic &quot;COMPLIANT&quot;).
        </p>
      </Section>

      <Section id="eu-ai-act" title="EU AI Act">
        <p>
          The regulatory framework considered in the design of OPUS67 includes{" "}
          <ExternalLink href={REGULATIONS.aiAct.url}>
            {REGULATIONS.aiAct.citation}
          </ExternalLink>{" "}
          (EU AI Act). OPUS67 has not undergone a conformity assessment; its AI
          Act classification is <strong>requires documented assessment</strong>.
          No certification, approval or endorsement by the European Union is
          claimed or implied.
        </p>
        <p>
          Official resources:{" "}
          <ExternalLink href={AI_TRANSPARENCY_RESOURCES.aiActServiceDesk.url}>
            AI Act Service Desk
          </ExternalLink>
          {" · "}
          <ExternalLink href={AI_TRANSPARENCY_RESOURCES.article50Guidelines.url}>
            Commission Guidelines on Article 50
          </ExternalLink>
        </p>
      </Section>

      <Section id="gdpr-rgpd" title="GDPR / RGPD">
        <p>
          OPUS67 incorporates privacy-by-design and data-governance principles
          intended to support operation aligned with{" "}
          <ExternalLink href={REGULATIONS.gdpr.url}>
            {REGULATIONS.gdpr.citation}
          </ExternalLink>{" "}
          (GDPR/RGPD). The GDPR assessment is <strong>ongoing</strong>; current
          control states are published on the Governance page. Supervisory
          resources:{" "}
          <ExternalLink href={AI_TRANSPARENCY_RESOURCES.edpb.url}>
            European Data Protection Board (EDPB)
          </ExternalLink>
          .
        </p>
      </Section>

      <Section id="human-oversight" title="Human Oversight">
        <p>
          Relevant AI operations are designed to remain under human oversight.
          The active AI provider is the local no-op driver (generation disabled
          by design), so no autonomous AI generation takes place in the current
          MVP. Control state: PARTIAL — see{" "}
          <Link href="/governance#human-oversight" className="text-opus-cyan hover:underline">
            Governance
          </Link>
          .
        </p>
      </Section>

      <Section id="transparency" title="Transparency">
        <p>
          Platform capabilities, module states and empty states are shown
          honestly: nothing is simulated and no metric is invented. The active
          drivers are reported by <code className="font-mono text-xs">/api/health</code>{" "}
          and on the{" "}
          <Link href="/settings" className="text-opus-cyan hover:underline">
            Settings
          </Link>{" "}
          page.
        </p>
      </Section>

      <Section id="ai-generated-content" title="AI-generated content">
        <p>
          OPUS67 currently generates <strong>no</strong> AI content: the active
          provider is the explicit local no-op driver, so no deepfake,
          synthetic media or AI-generated text is produced. The EU icons for
          labelling AI-generated content (
          <ExternalLink href={AI_TRANSPARENCY_RESOURCES.euIcons.url}>
            official download and conditions
          </ExternalLink>
          ) are therefore <strong>not applicable and not displayed</strong>. If
          an external provider is enabled in the future and OPUS67 generates
          content within the scope of Article 50 of the AI Act, the applicable
          official icon and disclosure will be implemented where required —
          never as a &quot;compliance badge&quot;.
        </p>
        <p>
          When direct interaction with an AI system is enabled, OPUS67 displays
          the notice &quot;You are interacting with an AI system.&quot; at the
          point of interaction. With the default no-op provider there is no AI
          interaction, so the notice is intentionally not shown.
        </p>
      </Section>

      <Section id="data-governance" title="Data Governance">
        <p>
          The default storage driver is process-local memory (non-persistent by
          design); an external PostgreSQL is an opt-in upgrade. Data-governance
          controls are documented in the regulatory traceability matrix on the{" "}
          <Link href="/governance#data-governance" className="text-opus-cyan hover:underline">
            Governance
          </Link>{" "}
          page. Control state: PLANNED.
        </p>
      </Section>

      <Section id="risk-management" title="Risk Management">
        <p>
          Security and risk practices are documented in the repository
          (SECURITY.md, OPERATIONS.md): strict input validation, sanitised
          errors, no secrets in logs, security headers and dependency auditing.
          Control state: PARTIAL — a documented risk-management system under
          Article 9 of the AI Act has not been established.
        </p>
      </Section>

      <Section id="evidence" title="Evidence">
        <p>
          OPUS67 includes an Evidence module with SHA-256 fingerprinting so
          that artefacts can be registered and verified. Control state:
          IMPLEMENTED — see{" "}
          <Link href="/governance#evidence" className="text-opus-cyan hover:underline">
            Governance
          </Link>
          .
        </p>
      </Section>

      <Section id="auditability" title="Auditability">
        <p>
          Structured JSON logs with request identifiers and secret redaction
          provide the basis for audit events. Long-term retention and
          independent audit procedures are not yet implemented. Control state:
          PARTIAL.
        </p>
      </Section>

      <Section id="mvp-status" title="MVP Status">
        <p>
          {PLATFORM.name} {PLATFORM.version} — {PLATFORM.stage} (
          {PLATFORM.stageLabel}). {PLATFORM.stageNote}
        </p>
      </Section>

      <Section id="regulatory-disclaimer" title="Regulatory Disclaimer">
        <p>{REGULATORY_DISCLAIMER}</p>
        <p>
          The EU emblem shown on the home page is the official reproduction
          published at{" "}
          <ExternalLink href={EU_EMBLEM.sourcePage}>
            european-union.europa.eu
          </ExternalLink>
          , used under the{" "}
          <ExternalLink href={EU_EMBLEM.usageConditions}>
            conditions for third-party use of the EU emblem
          </ExternalLink>{" "}
          (administrative agreement published in OJ 2012/C 271/04). Its display
          implies no connection with, or support, sponsorship, approval or
          consent by, any institution of the European Union.
        </p>
      </Section>

      <footer className="border-t border-opus-border pt-6 text-xs text-opus-muted">
        <p>
          {AUTHOR.heading}: {AUTHOR.name}
        </p>
      </footer>
    </div>
  );
}
