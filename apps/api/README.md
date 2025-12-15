# AIMAS API (Reference Skeleton)

Deterministic Express server that exposes the minimum contract needed to make AIMAS executable without any external AI or personalization.

## Endpoints

| Method | Path                 | Purpose |
| ------ | -------------------- | ------- |
| GET    | `/`                  | Root metadata (service + version) |
| GET    | `/healthz`           | Health probe (used by Cloud Run/CI) |
| GET    | `/readyz`            | Readiness probe |
| GET    | `/livez`             | Liveness probe |
| GET    | `/v1/status`         | Build metadata (protocol version, commit, uptime) |
| POST   | `/v1/intent`         | Accepts derived intent capsule, returns `intent_id` |
| POST   | `/v1/fit/:intent_id` | Computes Fit Matrix (always includes `free_baseline` path) |
| POST   | `/v1/conformance/validate` | Runs canonical schema validation (rejects raw intent payloads) |
| GET    | `/v1/schemas`        | Lists available schema filenames |
| GET    | `/openapi.yaml`      | Serves the canonical OpenAPI spec |

All ingesting endpoints call `assertNoRawArchival`, guaranteeing raw L0 declarations never persist inside the API.

## Required environment

| Var | Description |
| --- | ----------- |
| `AIMAS_PROTOCOL_VERSION` | Tag/semantic version announced by `/v1/status` |
| `AIMAS_COMMIT_SHA` | Short git SHA announced by `/v1/status` |
| `AIMAS_ALLOW_CORS` | Set to `1` only when you need CORS (default off) |
| `PORT` | Cloud Run injects this automatically |

Optional: `CORS_ORIGIN` is documented in `cloudrun/README.md` as part of the deployment contract.

## Run locally

```bash
pnpm install
pnpm dev      # uses ts-node-dev
gor
pnpm start    # compiles + runs dist build
```

## Cloud Run / GCP

Use the scripts under `../../cloudrun`:

```bash
cd ../../cloudrun
./deploy.sh your-project your-service-name
```

That script builds via Cloud Build, deploys to Cloud Run, and wires the health/status endpoints above so probes pass instantly.

## Fairness + conformance guards

- `assertNoRawArchival` scans for any raw intent fields before writes.
- Fit Matrix output is validated against the canonical schema and must carry a `free_baseline` path.
- `/v1/conformance/validate` lets implementations test payloads without touching raw text storage.

Do **not** extend this service with personalization, ranking, or AI/LLM inference. That would violate protocol law.
