---
title: "Architecture"
subtitle: "Surfaces, gates, flows."
---

## Surfaces

1. **Input Gate** – receives L0 text, immediately normalizes, discards original signal.
2. **Capsule Store (L1)** – append-only map keyed by `intent_id`.
3. **Deterministic Evaluator** – applies fairness math to produce Fit Matrix.
4. **Audit Bus** – streams issued Fit Matrices + headers to downstream compliance stores.

## Zero-Leakage Path

```
Raw Input → Normalize (OpenAI adapter optional) → Intent Capsule → AIMAS Gate → Fit Matrix → Client Decision Logic
```

## Deployment

- Cloud Run container (`apps/api`) listening on `$PORT`.
- Required env: `AIMAS_PROTOCOL_VERSION`, `AIMAS_COMMIT_SHA`, `AIMAS_ALLOW_CORS`, `CORS_ORIGIN`.
- Probes: `GET /`, `/healthz`, `/readyz`, `/livez`.

## Headers

Every response includes:

- `X-AIMAS-Version`: protocol version string.
- `X-AIMAS-Tier`: service tier label (baseline/contract).
- `X-Rate-Limit-Limit` / `X-Rate-Limit-Remaining` / `X-Rate-Limit-Reset`.
- `X-AIMAS-Run-Id`: audit token for traceability.
