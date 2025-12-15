---
title: "Tutorial: Normalize Intent"
---

1. Collect the raw declaration.
2. Call `/api/adapter/normalize` (UI server route) or reproduce the schema converter internally.
3. Inspect the JSON capsule; ensure no raw text remains.
4. Attach `channel_ref` and `compliance_tag` if needed.
5. Log only the normalized capsule; delete the raw payload.
