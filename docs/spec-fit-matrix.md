---
title: "Fit Matrix"
subtitle: "Structured response returned by AIMAS."
---

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `intent_id` | UUID | Echo of the capsule reference. |
| `eta_minutes` | integer | Deterministic ETA bound. |
| `success_probability` | integer | 0–100 probability band (rounded). |
| `confidence_level` | enum | `low`, `medium`, `high`. |
| `sensitivity_tag` | enum | Mirrors capsule sensitivity (never downgrades). |
| `paths[]` | array | List of viable fulfillment paths. |
| `audit` | object | `{ protocol_version, issued_at, gate_id }`. |

## Paths object

Each path contains:

- `path_id`
- `type` (`free_baseline`, `paid_accelerator`, `governed_partner`)
- `eta_minutes`
- `success_probability`
- `free_baseline` (boolean)
- `price` (nullable amount + currency)
- `guarantees[]`

At least one path sets `free_baseline = true`.

## Headers

Responses include rate-limit headers and `X-AIMAS-Run-Id`. Downstream systems must persist the Fit Matrix + audit headers together.
