---
title: "Lifecycle"
subtitle: "State transitions for intents and fits."
---

1. **Declare** – External system submits raw text to `/api/adapter/normalize` (optional) or directly normalizes to the Intent Capsule schema.
2. **Register** – Capsule is posted to `/v1/intent`. AIMAS assigns `intent_id` and stores the capsule.
3. **Compute** – Client invokes `/v1/fit/{intent_id}` to receive the Fit Matrix. Re-computation with the same capsule yields identical results.
4. **Audit** – Client stores Fit Matrix + headers for later verification.
5. **Supersede** – If the declared intent changes, submit a new capsule referencing prior `intent_id`. Old versions remain immutable.
