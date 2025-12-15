---
title: "Protocol Overview"
subtitle: "What AIMAS does for decision platforms."
---

## Definition

AIMAS is a pre-decision boundary. It receives declared intent, enforces zero-leakage normalization, computes a deterministic Fit Matrix, and returns at least one Free Baseline Path. It never ranks people or predict outcomes.

## Buyer Value

- **Platforms** insert AIMAS before any recommendation or marketplace logic to remove unfair pressure from the raw channel.
- **Institutions** use AIMAS to prove that upstream steps are audited and reversible without deleting history.
- **Market operators** gain a contract that states "decisions are capped, not guided".

## Inputs

- One raw declaration (L0) per request.
- Optional control metadata (`channel_ref`, `jurisdiction`, `compliance_tag`).

## Outputs

- Fit Matrix (ETA, success probability, confidence, sensitivity, paths[]).
- Audit capsule with protocol version, issuance time, and gate identifier.

## Guarantees

1. Free Baseline Path is always included.
2. Sensitivity never downgrades downstream.
3. No raw text is archived. Normalized capsules are append-only.
4. Every response is reproducible given the same capsule and protocol version.
