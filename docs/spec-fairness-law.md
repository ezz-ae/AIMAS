---
title: "Fairness Law"
subtitle: "Constraints enforced by AIMAS."
---

1. **Free Baseline Mandate** – No Fit Matrix leaves the gate without a zero-cost path that satisfies the declared intent.
2. **Outcome Capping** – AIMAS only outputs deterministic matrices; no ranking or predictive views are exposed.
3. **Sensitivity Inheritance** – Downstream actors cannot reduce the declared sensitivity tag.
4. **Decision Separation** – AIMAS stops at Fit Matrix generation. Client systems remain fully responsible for final decisions.
5. **Auditability** – Every response carries `X-AIMAS-Run-Id` and `audit` payloads. Missing audit data invalidates the protocol guarantee.
