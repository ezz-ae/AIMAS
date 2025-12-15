---
title: "Dev: Environment Setup"
---

1. Clone AIMAS and AIMAS-UI.
2. Run `git submodule update --init --recursive` so the UI can read docs.
3. Install deps with `pnpm install` in each repo.
4. Set `.env.local` in AIMAS-UI:
   - `NEXT_PUBLIC_AIMAS_API_BASE`
   - `AIMAS_DOCS_PATH`
   - `OPENAI_API_KEY` (server-only)
5. Run `pnpm docs:verify` before any dev server session.
