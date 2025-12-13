# RFC-0007: FCT/HMR Binding — Zero-Memory + E-State Separation (Non-circumvention)

**Status:** REQUIRED (Binding)

## 1) Invariant
AIMAS memory is persistence through **hashed meaning + deltas**, not stored raw events.

## 2) E-States
- **E0/E1:** raw text/transcripts/media and short-term events
  - MUST NOT be stored in canonical schemas
  - may exist only as a transient `raw_payload_ref` with strict TTL
- **E2/E3:** derived artifacts (feature vectors, Fit Matrices, ledger events)
  - MAY be stored long-term

## 3) Canonical schema constraints
- `Intent Capsule` MUST NOT include raw text
- raw payloads must be referenced only via `raw_payload_ref` (nullable) and MUST expire

## 4) Recall law: relocation
Any “retrieval” is reconstructive: systems relocate into present context using E2/E3 meaning, not E0/E1 archives.

## 5) Audit
Implementations MUST prove:
- TTL policy enforcement for E0/E1
- append-only Force Notes
- Was is private
- Fit Matrix fairness guarantee
