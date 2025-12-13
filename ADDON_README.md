# AIMAS Site + API Add-on (drop-in)
This folder is designed to be copied into your **AIMAS** repo root (monorepo style).

It gives you:
- `apps/web`: a docs-first protocol website (Node.js.org-level structure), with **search-only homepage**.
- `apps/api`: a deterministic AIMAS Core API (no external AI), ready for Cloud Run.
- `packages/core`: shared protocol types + schema validation + deterministic CFS stub.
- CI templates + deployment notes (Vercel + Cloud Run + optional Firebase hosting).

> This is an **implementation scaffold** — it does not change your canonical spec; it makes it executable.
