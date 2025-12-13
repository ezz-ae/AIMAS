# AIMAS Protocol Website — Canonical Sitemap

Target: an authority-grade protocol site with a strict entry rule:

- `/` is Search only (intent declaration). No nav.
- After first search, the visitor enters Protocol Surface Mode (docs terminal).
- No AI assistant, no recommendations, no browsing UX loops.

---

## A) UX State Machine

### State 0 — Visitor
Route: `/`
- One UI element: search bar.
- On submit: redirect to `/terminal?q=<encoded>`

### State 1 — Protocol Surface Mode
Route: `/terminal?q=...`
- Left: documentation tree
- Center: document renderer (MD/MDX)
- Right: “Protocol Facts” panel (version, RFC set, schema links, conformance status)
- Global: search remains available at top (new intent = new session)

---

## B) Route Map (Surface Mode only)

### 1) Getting Started
- `/terminal/start` — What AIMAS is (protocol terms)
- `/terminal/quickstart` — “Intent → Fit Matrix” walkthrough (no AI)
- `/terminal/architecture` — Deterministic core + optional adapters

### 2) Protocol (RFC Corpus)
- `/terminal/rfc` (index)
- `/terminal/rfc/0001-aimas-core`
- `/terminal/rfc/0002-cfs`
- `/terminal/rfc/0003-nyk`
- `/terminal/rfc/0004-force-notes`
- `/terminal/rfc/0005-was`
- `/terminal/rfc/0006-fairness`
- `/terminal/rfc/0007-binding` (kept under AIMAS naming externally)

### 3) Schemas
- `/terminal/schemas` (index)
- `/terminal/schemas/intent-capsule`
- `/terminal/schemas/fit-matrix`
- `/terminal/schemas/nyk`
- `/terminal/schemas/force-note`
- `/terminal/schemas/was-feedback`

### 4) Conformance
- `/terminal/conformance` — Compliance definition
- `/terminal/conformance/tests` — Test vectors (JSON fixtures)
- `/terminal/conformance/attestation` — Issuing attestations

### 5) Compliance
- `/terminal/compliance`
- `/terminal/compliance/examples`

### 6) Governance
- `/terminal/governance`
- `/terminal/security`
- `/terminal/changelog`
- `/terminal/releases`

### 7) Tools (no AI)
- `/terminal/tools/schema-validator`
- `/terminal/tools/conformance-runner`

---

## C) “Node.js-grade” requirements

- Every page: definition → rules → examples → edge cases → references
- Every RFC: MUST/SHOULD/MAY language, dependencies, change log
- Every schema: JSON schema + valid/invalid examples
- Conformance: fixtures + expected outputs + version pinning
