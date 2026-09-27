# OPUS67 — Regulatory sources and asset traceability

Every asset presented as "official" in OPUS67 must have a demonstrable
official source. This document is the traceability record. Last verified:
**2026-09-27**.

## Assets in use

| ASSET | OFFICIAL SOURCE | OFFICIAL URL | REGULATION | PURPOSE | USAGE CONDITIONS | LOCAL FILE | DATE VERIFIED |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EU emblem (flag of the European Union), "Normal reproduction in colour – SVG" (EN) | European Union official portal (european-union.europa.eu) | Page: https://european-union.europa.eu/principles-countries-history/symbols/european-flag_en · File: https://european-union.europa.eu/document/download/8fd15c1e-c5b8-44e7-a9eb-824609d68150_en?filename=Normal%20reproduction%20in%20colour%20-%20SVG.zip | Symbol of the EU/Council of Europe; third-party use per administrative agreement OJ 2012/C 271/04 (08/09/2012) | Visual identification of the European regulatory framework referenced by OPUS67 on the home page | Third parties may use the EU emblem without written permission provided the use (a) implies no connection with EU/Council of Europe institutions, (b) implies no support, sponsorship, approval or consent, (c) is not unlawful or incompatible with EU aims. Conditions: https://european-union.europa.eu/legal-notice_en | `public/assets/eu/EU-emblem_RGB.svg` (byte-identical; SHA-256 `1ea120046b056c065cf76d830adbee1107dd9c4ddef06ccd641e4578143198b5`, pinned in `config/regulatory.ts` and verified by `tests/unit/regulatory.test.ts`) | 2026-09-27 |

## Official regulatory references (linked, not embedded)

| ASSET | OFFICIAL SOURCE | OFFICIAL URL | REGULATION | PURPOSE | USAGE CONDITIONS | LOCAL FILE | DATE VERIFIED |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EU AI Act — full text | EUR-Lex | https://eur-lex.europa.eu/eli/reg/2024/1689/oj | Regulation (EU) 2024/1689 | Regulatory framework reference (home, /legal/ai, governance matrix) | Public legal text; citation only | None (external link) | 2026-09-27 |
| GDPR — full text | EUR-Lex | https://eur-lex.europa.eu/eli/reg/2016/679/oj | Regulation (EU) 2016/679 | Regulatory framework reference (home, /legal/ai, governance matrix) | Public legal text; citation only | None (external link) | 2026-09-27 |
| AI Act Service Desk | European Commission | https://ai-act-service-desk.ec.europa.eu/ | Regulation (EU) 2024/1689 | Official implementation guidance entry point | Public information; link only | None (external link) | 2026-09-27 |
| Guidelines on Article 50 transparency obligations | European Commission (Digital Strategy) | https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations | Regulation (EU) 2024/1689, Art. 50 | Interpretive guidance for transparency obligations | Public information; link only | None (external link) | 2026-09-27 |
| Code of Practice on Transparency of AI-generated Content | European Commission (Digital Strategy) | https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content | Regulation (EU) 2024/1689, Art. 50(2)/(4)/(5) | Voluntary framework for marking/labelling AI content | Voluntary code; adherence does not constitute conclusive evidence of compliance | None (external link) | 2026-09-27 |
| European Data Protection Board (EDPB) | EDPB | https://www.edpb.europa.eu/ | Regulation (EU) 2016/679 | Supervisory authority resource for GDPR/RGPD | Public information; link only | None (external link) | 2026-09-27 |

## Official assets evaluated and intentionally NOT used

| ASSET | OFFICIAL SOURCE | OFFICIAL URL | REGULATION | PURPOSE | USAGE CONDITIONS | LOCAL FILE | DATE VERIFIED |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EU icons for labelling AI-generated content ("AI GENERATED" / "AI MODIFIED" / basic "AI") | European Commission — AI Office (Digital Strategy) | https://digital-strategy.ec.europa.eu/en/policies/eu-icons-labelling-ai-generated-content | Regulation (EU) 2024/1689, Art. 50(4)–(5) | Labelling of deepfakes and certain AI-generated/manipulated text | Free to use without attribution; **optional**; use does not establish legal compliance by itself; must not be used as an "EU AI Act compliance badge" | **None — NOT APPLICABLE: OPUS67 generates no AI content (active provider is the local no-op driver). Will be implemented only if in-scope content is ever generated.** | 2026-09-27 |
| European Commission logo (Berlaymont + modified emblem + wordmark) | European Commission visual identity | https://commission.europa.eu/resources/european-commission-visual-identity_en | Protected trademark of the European Commission | Institutional identification of the Commission | **Prior written permission required**; no likelihood of confusion; no implied endorsement | **None — NOT USED: permission has not been requested and there is no need; the EU emblem (above) is the correct asset for third parties.** | 2026-09-27 |
| "Funded by / Co-funded by the European Union" marks | European Commission | https://commission.europa.eu/funding-tenders/find-funding/eu-funding-programmes_en | EU funding visibility rules | Visibility of actual EU funding | Only for beneficiaries of EU funding | **None — NOT USED: OPUS67 has no documented EU funding.** | 2026-09-27 |

## Prohibited sources (never used)

AI-generated images (Qwen or others), Google Images, Freepik, Canva,
Flaticon, Wikipedia, third-party commercial seals, and any supposed
"EU AI Act Certified" badges. No such asset is present in this repository.

## Verification procedure

1. The EU emblem SVG was downloaded on 2026-09-27 from the official portal
   (URL above) and stored byte-identical in `public/assets/eu/`.
2. Its SHA-256 is pinned in `config/regulatory.ts` (`EU_EMBLEM.sha256`) and
   re-verified on every test run by `tests/unit/regulatory.test.ts`.
3. Any future asset presented as "official" must be added to this document
   with the same fields before it is used in the UI.
