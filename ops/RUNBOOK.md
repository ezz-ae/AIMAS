# Ops Runbook (Minimum)

## Local dev
- `pnpm -r install`
- `pnpm -C apps/api dev`
- `pnpm -C apps/site dev`

## API expectations
- Listen on `process.env.PORT`
- Provide:
  - `GET /healthz` -> 200 { ok:true }
  - `GET /version` -> 200 { version, commit, status }

## Deployment
- Cloud Run: use `BUILDKIT/cloudrun/deploy.sh`
- Vercel: deploy `apps/site` (Next.js)

## Common failure fixes
### pnpm workspace missing
Ensure root has:
- `pnpm-workspace.yaml`
- `package.json` with `"packageManager": "pnpm@..."`

### API build missing deps
If API uses `morgan`, `ajv`, `uuid`, they MUST exist in `apps/api/package.json`.
