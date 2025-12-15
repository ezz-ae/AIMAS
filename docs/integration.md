---
title: "Integration"
subtitle: "How platforms embed AIMAS."
---

1. **Normalize intent** using the provided adapter or an internal deterministic process.
2. **Register capsule** via `POST /v1/intent` and store the returned `intent_id`.
3. **Request Fit Matrix** via `POST /v1/fit/{intent_id}`.
4. **Store audit payload + headers** with the Fit Matrix.
5. **Feed Fit Matrix** into downstream policy engines. Never alter or re-rank the matrix itself.
6. **Monitor** using `/healthz`, `/readyz`, `/livez`, and `/` root metadata.

### Rate limiting
- Baseline: 60 req/min.
- Contract: 250 req/min.
- All responses contain `X-Rate-Limit-*` headers. Exceeding the limit produces `429` with `Retry-After`.

### Versioning
- `X-AIMAS-Version` communicates the active gate version.
- Upgrade path: deploy new container, update `AIMAS_PROTOCOL_VERSION`, run conformance tests, then cut traffic.
