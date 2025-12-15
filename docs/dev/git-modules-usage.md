---
title: "Dev: Git Modules"
---

- `vendor/aimas` is the canonical submodule path consumed by AIMAS-UI.
- `AIMAS` (root) may also appear as a gitlink for tooling. Both point to this repository.
- Never edit docs inside AIMAS-UI; update them here and run `git submodule update` there.
- To bump AIMAS within AIMAS-UI: `git submodule update --remote vendor/aimas` then commit the new SHA.
