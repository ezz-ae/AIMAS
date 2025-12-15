---
title: "Dev: Testing & Conformance"
---

- `pnpm run test:schemas` validates JSON schemas with Ajv.
- `pnpm docs:verify` (UI) ensures doc registry + OpenAPI exist.
- `pnpm lint` plus `pnpm build` must pass before merge.
- Cloud Run deploy requires successful curl checks on `/healthz`, `/readyz`, `/livez`, `/openapi.yaml`.
- Conformance bundle is under `conformance/`; run `pnpm test:conformance` to assert fairness rules before shipping a new version.
