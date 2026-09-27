/**
 * OPUS67 — Regulatory identity configuration.
 *
 * Single source of truth for the regulatory references, legal texts and
 * official assets shown in the UI. Rules enforced here and by
 * tests/unit/regulatory.test.ts:
 *
 *  - Legal texts are mandated verbatim — do not paraphrase.
 *  - No certification claims: never "EU AI Act Certified", "GDPR Certified",
 *    "100% compliant", "EU APPROVED" or similar.
 *  - Assets presented as "official" must have a demonstrable official source
 *    (see docs/REGULATORY-SOURCES.md). The EU emblem below is the official
 *    reproduction downloaded from european-union.europa.eu and is stored
 *    byte-identical (SHA-256 pinned).
 */

export const EU_EMBLEM = {
  /** Local byte-identical copy of the official asset (public/). */
  localFile: "/assets/eu/EU-emblem_RGB.svg",
  alt: "Flag of the European Union — official reproduction",
  /** Official page offering the download (european-union.europa.eu). */
  sourcePage:
    "https://european-union.europa.eu/principles-countries-history/symbols/european-flag_en",
  /** Exact official file downloaded ("Normal reproduction in colour - SVG", EN). */
  sourceFile:
    "https://european-union.europa.eu/document/download/8fd15c1e-c5b8-44e7-a9eb-824609d68150_en?filename=Normal%20reproduction%20in%20colour%20-%20SVG.zip",
  /** SHA-256 of the local SVG, verified against the downloaded official file. */
  sha256:
    "1ea120046b056c065cf76d830adbee1107dd9c4ddef06ccd641e4578143198b5",
  dateVerified: "2026-09-27",
  /**
   * Usage conditions (administrative agreement with the Council of Europe,
   * OJ 2012/C 271/04): third parties may use the EU emblem without written
   * permission provided the use implies no connection, support, sponsorship,
   * approval or consent by EU institutions and is not unlawful.
   */
  usageConditions: "https://european-union.europa.eu/legal-notice_en",
} as const;

export const REGULATIONS = {
  aiAct: {
    label: "EU AI Act",
    citation: "Regulation (EU) 2024/1689",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
  },
  gdpr: {
    label: "GDPR / RGPD",
    citation: "Regulation (EU) 2016/679",
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
  },
} as const;

/** Mandated legal framework statement (verbatim). */
export const LEGAL_FRAMEWORK_STATEMENT =
  "OPUS67 is an MVP designed with a compliance-oriented architecture aligned with key governance and transparency principles of Regulation (EU) 2024/1689 and privacy-by-design principles under Regulation (EU) 2016/679.";

/**
 * OPUS67's own informative badges. They are the platform's own design and
 * must never appear to be certifications issued by the European Union.
 */
export const OWN_BADGES = [
  { label: "AI ACT", sublabel: "COMPLIANCE-ORIENTED", href: "/governance#eu-ai-act" },
  { label: "GDPR / RGPD", sublabel: "PRIVACY-BY-DESIGN", href: "/governance#gdpr-rgpd" },
  { label: "HUMAN OVERSIGHT", sublabel: null, href: "/governance#human-oversight" },
  { label: "TRANSPARENCY", sublabel: null, href: "/governance#transparency" },
  { label: "TRACEABILITY", sublabel: null, href: "/governance#traceability" },
  { label: "EVIDENCE GOVERNANCE", sublabel: null, href: "/governance#evidence" },
] as const;

/** Mandated project status board (verbatim labels and values). */
export const PROJECT_STATUS = [
  { label: "Version", value: "MVP" },
  { label: "Product stage", value: "Minimum Viable Product" },
  { label: "Application", value: "Operational" },
  { label: "Regulatory architecture", value: "Implemented" },
  { label: "Regulatory assessment", value: "Ongoing" },
  { label: "AI Act classification", value: "Requires documented assessment" },
  { label: "GDPR assessment", value: "Ongoing" },
] as const;

export const AUTHOR = {
  heading: "AUTHOR & DEVELOPMENT",
  name: "Prof. Manuel Gago Fernández",
} as const;

/**
 * Official EU transparency resources (Article 50 AI Act). OPUS67 currently
 * generates NO AI content (the active provider is the local no-op driver),
 * so the EU AI-content icons are documented but intentionally not displayed.
 */
export const AI_TRANSPARENCY_RESOURCES = {
  euIcons: {
    label: "EU icons for labelling AI-generated content",
    url: "https://digital-strategy.ec.europa.eu/en/policies/eu-icons-labelling-ai-generated-content",
  },
  codeOfPractice: {
    label: "Code of Practice on Transparency of AI-generated Content",
    url: "https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content",
  },
  article50Guidelines: {
    label: "Commission Guidelines on Article 50 transparency obligations",
    url: "https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations",
  },
  aiActServiceDesk: {
    label: "AI Act Service Desk",
    url: "https://ai-act-service-desk.ec.europa.eu/",
  },
  edpb: {
    label: "European Data Protection Board (EDPB)",
    url: "https://www.edpb.europa.eu/",
  },
} as const;
