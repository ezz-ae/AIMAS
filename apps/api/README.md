# AIMAS API (Reference Skeleton)

This is a minimal deterministic API scaffold to make the protocol **runnable** without external AI.

## Endpoints

- `POST /v1/intent` → returns `intent_id`
- `GET /v1/intent/:id/fit` → returns Fit Matrix (always includes `free_baseline`)

## Run

```bash
npm i
npm run dev
```

## Cloud Run

```bash
docker build -t aimas-api .
docker run -p 8080:8080 aimas-api
```
