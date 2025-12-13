# AIMAS — Firebase Hosting (Site) + Cloud Run (API)

This repository is a **starter build** for deploying:
- **Protocol Website** on **Firebase Hosting** (static Next.js export)
- **AIMAS Core API** on **Google Cloud Run** (Node.js/TypeScript)

It is intentionally **spec-first** and **LLM-optional**:
- The API computes and returns a **Fit Matrix** (no ranked recommendations).
- Enforced constraints:
  - **Fairness Gate:** at least one `free_baseline` path must exist.
  - **Zero-raw gate:** rejects archival fields like `intent_text` / transcripts.
  - **Append-only Force Notes:** no destructive updates (starter uses an in-memory store; swap later).

---

## Repo layout

- `apps/site/` — Protocol site (Next.js static export) with **search-only** homepage.
- `apps/api/` — AIMAS API (Express) ready for Cloud Run.
- `schemas/` — Canonical JSON Schemas used by API validators.
- `RFC/` — RFC documents (drop in your canonical set here).
- `conformance/` — Sample vectors + validator notes.
- `adapters/wordpress/` — WordPress plugin skeleton (shortcode: `[aimas_search]`).
- `packages/sdk/` — Node SDK stub (types + client).

---

## 1) Prereqs

- Node.js 20+
- Firebase CLI (`npm i -g firebase-tools`)
- gcloud CLI

---

## 2) Local dev

### API
```bash
cd apps/api
npm i
npm run dev
# API: http://localhost:8080
```

### Site
```bash
cd apps/site
npm i
npm run dev
# Site: http://localhost:3000
```

Set the site to call your API:
- `apps/site/.env.local` → `NEXT_PUBLIC_AIMAS_API_BASE=http://localhost:8080`

---

## 3) Deploy API to Cloud Run

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com

cd apps/api
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/aimas-api
gcloud run deploy aimas-api   --image gcr.io/YOUR_PROJECT_ID/aimas-api   --region us-central1   --allow-unauthenticated   --set-env-vars AIMAS_ALLOW_CORS=1
```

---

## 4) Deploy Site to Firebase Hosting

```bash
cd apps/site
echo "NEXT_PUBLIC_AIMAS_API_BASE=https://YOUR_CLOUD_RUN_URL" > .env.production
npm i
npm run export

cd ../../
firebase login
firebase use --add
firebase deploy --only hosting
```

© 2025 Mahmoud Ezz. All rights reserved.
