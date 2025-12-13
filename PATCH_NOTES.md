# Patch Notes — Add-on Pack (Website + API scaffolds)

This package adds two buildable artifacts to the AIMAS Protocol repo:

1) `apps/site` — protocol website scaffold (search-only home terminal)  
2) `apps/api` — deterministic API skeleton (Cloud Run-ready)

It also refreshes the root README to be institutional + implementer-friendly, without changing the RFC meaning.

## Minimal workflow (local)

### Site
- `cd apps/site && npm i && npm run dev`
- `npm run export` creates `apps/site/out` (static)

### API
- `cd apps/api && npm i && npm run dev`
- `GET http://localhost:8080/health`
- `POST http://localhost:8080/v1/intent`
- `GET http://localhost:8080/v1/intent/{id}/fit`

## Firebase (optional)
Root `firebase.json` assumes you will export the site to `apps/site/out`.
If you are deploying to Vercel, ignore Firebase hosting and just deploy `apps/site`.
