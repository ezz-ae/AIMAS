---
title: "Tutorial: Compute Fit Matrix"
---

```bash
curl -X POST "$AIMAS_API/v1/fit/$INTENT_ID" \
  -H "content-type: application/json"
```

Response sample:

```json
{
  "intent_id": "b8e1...",
  "eta_minutes": 120,
  "success_probability": 76,
  "confidence_level": "medium",
  "sensitivity_tag": "high",
  "paths": [
    {
      "path_id": "baseline",
      "type": "free_baseline",
      "eta_minutes": 240,
      "success_probability": 58,
      "free_baseline": true,
      "price": null,
      "guarantees": ["baseline_access"]
    },
    {
      "path_id": "accelerator",
      "type": "paid_accelerator",
      "eta_minutes": 90,
      "success_probability": 82,
      "free_baseline": false,
      "price": {"amount": 250, "currency": "USD"},
      "guarantees": ["priority_routing", "audit_log"]
    }
  ],
  "audit": {
    "protocol_version": "v1.2",
    "issued_at": "2025-01-12T12:00:00Z",
    "gate_id": "aimas-gate-us-central"
  }
}
```

Persist both the JSON and the response headers.
