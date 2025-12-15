---
title: "Dev: CI Workflows"
---

GitHub Actions jobs:

- **verify** (UI): checkout + submodules → `pnpm docs:verify` → `pnpm check:secrets` → `pnpm lint` → `pnpm build`.
- **api-verify** (suggested): run unit tests + lint inside `apps/api` and curl health routes.

Rules:
- Submodules must stay in sync; CI fails if the docs source is missing.
- Any secret committed to the repo fails CI.
- Pull requests without passing verify cannot merge.
