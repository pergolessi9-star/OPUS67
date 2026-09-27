import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { REGULATORY_DISCLAIMER } from "@/config/governance";
import {
  AUTHOR,
  EU_EMBLEM,
  LEGAL_FRAMEWORK_STATEMENT,
  OWN_BADGES,
  PROJECT_STATUS,
  REGULATIONS,
} from "@/config/regulatory";

/**
 * Regulatory identity invariants. These tests make the legal truth rules
 * machine-checkable: mandated texts stay verbatim, no certification claim
 * can slip into the configuration, and the asset presented as the official
 * EU emblem remains byte-identical to the pinned official download.
 */

const FORBIDDEN_CLAIMS = [
  "EU AI Act Certified",
  "EU AI Act Compliant",
  "GDPR Certified",
  "100% compliant",
  "EU APPROVED",
  "Cumplida",
] as const;

const ALL_REGULATORY_TEXTS = [
  REGULATORY_DISCLAIMER,
  LEGAL_FRAMEWORK_STATEMENT,
  AUTHOR.heading,
  AUTHOR.name,
  ...OWN_BADGES.flatMap((b) => [b.label, b.sublabel ?? ""]),
  ...PROJECT_STATUS.flatMap((s) => [s.label, s.value]),
];

describe("regulatory disclaimer (mandated verbatim)", () => {
  it("denies certification, conformity assessment, endorsement and approval", () => {
    expect(REGULATORY_DISCLAIMER).toBe(
      "References to EU legislation describe the regulatory framework considered in the design of OPUS67 and do not constitute certification, conformity assessment, endorsement or approval by the European Union, the European Commission or a supervisory authority.",
    );
  });
});

describe("legal framework statement (mandated verbatim)", () => {
  it("references both regulations and the MVP stage", () => {
    expect(LEGAL_FRAMEWORK_STATEMENT).toContain("OPUS67 is an MVP");
    expect(LEGAL_FRAMEWORK_STATEMENT).toContain("Regulation (EU) 2024/1689");
    expect(LEGAL_FRAMEWORK_STATEMENT).toContain("Regulation (EU) 2016/679");
  });
});

describe("no certification claims anywhere in regulatory texts", () => {
  it("contains none of the forbidden claim strings", () => {
    for (const text of ALL_REGULATORY_TEXTS) {
      for (const forbidden of FORBIDDEN_CLAIMS) {
        expect(text).not.toContain(forbidden);
      }
    }
  });

  it("own badges never use CERTIFIED or COMPLIANT wording", () => {
    for (const badge of OWN_BADGES) {
      const text = `${badge.label} ${badge.sublabel ?? ""}`.toUpperCase();
      expect(text).not.toContain("CERTIFIED");
      expect(text).not.toContain("COMPLIANT");
    }
  });
});

describe("project status board (mandated entries)", () => {
  it("contains exactly the seven mandated label/value pairs", () => {
    expect(PROJECT_STATUS).toEqual([
      { label: "Version", value: "MVP" },
      { label: "Product stage", value: "Minimum Viable Product" },
      { label: "Application", value: "Operational" },
      { label: "Regulatory architecture", value: "Implemented" },
      { label: "Regulatory assessment", value: "Ongoing" },
      { label: "AI Act classification", value: "Requires documented assessment" },
      { label: "GDPR assessment", value: "Ongoing" },
    ]);
  });
});

describe("own badges", () => {
  it("are the six mandated badges", () => {
    expect(OWN_BADGES.map((b) => b.label)).toEqual([
      "AI ACT",
      "GDPR / RGPD",
      "HUMAN OVERSIGHT",
      "TRANSPARENCY",
      "TRACEABILITY",
      "EVIDENCE GOVERNANCE",
    ]);
  });

  it("link to governance anchors", () => {
    for (const badge of OWN_BADGES) {
      expect(badge.href.startsWith("/governance#")).toBe(true);
    }
  });
});

describe("regulation citations", () => {
  it("cite the official EUR-Lex ELI URLs", () => {
    expect(REGULATIONS.aiAct.citation).toBe("Regulation (EU) 2024/1689");
    expect(REGULATIONS.aiAct.url).toBe("https://eur-lex.europa.eu/eli/reg/2024/1689/oj");
    expect(REGULATIONS.gdpr.citation).toBe("Regulation (EU) 2016/679");
    expect(REGULATIONS.gdpr.url).toBe("https://eur-lex.europa.eu/eli/reg/2016/679/oj");
  });
});

describe("EU emblem provenance", () => {
  it("points to the official european-union.europa.eu sources", () => {
    expect(EU_EMBLEM.sourcePage).toContain("https://european-union.europa.eu/");
    expect(EU_EMBLEM.sourceFile).toContain("https://european-union.europa.eu/document/download/");
    expect(EU_EMBLEM.usageConditions).toBe(
      "https://european-union.europa.eu/legal-notice_en",
    );
  });

  it("local asset is byte-identical to the pinned official download (SHA-256)", () => {
    const filePath = join(process.cwd(), "public", "assets", "eu", "EU-emblem_RGB.svg");
    const hash = createHash("sha256").update(readFileSync(filePath)).digest("hex");
    expect(hash).toBe(EU_EMBLEM.sha256);
  });
});

describe("authorship", () => {
  it("declares exactly the mandated author, nothing more", () => {
    expect(AUTHOR.heading).toBe("AUTHOR & DEVELOPMENT");
    expect(AUTHOR.name).toBe("Prof. Manuel Gago Fernández");
  });
});
