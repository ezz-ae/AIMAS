# Cloud Run Deployment (API) — Scripts

This folder assumes:
- API lives in `apps/api`
- Node runtime
- Container listens on `$PORT` (Cloud Run injects it)

You get:
- `Dockerfile` (Cloud Run compatible)
- `cloudbuild.yaml` (build + deploy via Cloud Build)
- `deploy.sh` (one-command local deploy using gcloud)

## Required env vars (set in Cloud Run)
- `AIMAS_PROTOCOL_VERSION` (e.g., v1.0.1)
- `AIMAS_COMMIT_SHA` (short sha)
- `AIMAS_ALLOW_CORS=1` (only if you need cross-origin access)
- `CORS_ORIGIN` (origin allowed when `AIMAS_ALLOW_CORS=1`)
- `AIMAS_SERVICE_TIER` (baseline/contract/sovereign)
- `AIMAS_RATE_LIMIT` (e.g., 60)
- `AIMAS_RATE_WINDOW` (seconds, e.g., 60)
- `AIMAS_GATE_ID` (identifier used in audit payloads)

## Health + status endpoints
- `GET /` → `{ service, protocol_version, commit }`
- `GET /healthz` → basic health
- `GET /readyz` → readiness probe
- `GET /livez` → liveness probe
- `GET /v1/status` → emits `{ protocol_version, commit, uptime_seconds }`
- `GET /openapi.yaml` → serves the canonical OpenAPI spec
