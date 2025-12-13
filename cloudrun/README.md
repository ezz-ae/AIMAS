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
- `CORS_ORIGIN` (your site origin)

## Health endpoints
- `GET /healthz`
- `GET /version`
