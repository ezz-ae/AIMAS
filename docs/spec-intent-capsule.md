---
title: "Intent Capsule"
subtitle: "L1 schema for deterministic evaluation."
---

## Required fields

| Field | Type | Notes |
| --- | --- | --- |
| `intent_id` | UUID | Assigned by AIMAS if absent. |
| `capsule_type` | enum | `transactional`, `advisory`, `verification`, or `governance`. |
| `normalized_intent` | string | Short, protocol tone summary. Raw wording never stored. |
| `sensitivity` | enum | `low`, `medium`, `high`, `critical`. |
| `derived_tags` | string[] | Lowercase descriptors (max 12). |
| `context_vectors` | map<string, number> | Float scores 0–1 for internal routing dimensions. |

## Optional metadata

- `actor_ref`: opaque identifier (no PII).
- `channel_ref`: source system pointer (append-only).
- `compliance_tag`: jurisdiction or audit regime label.

## Rejection conditions

Requests are rejected with `400` if:

- Any field contains raw transcripts.
- Derived tags exceed 12 items or include uppercase letters.
- Context vector values exceed 1 or drop below 0.

## Lifecycle

- Capsule IDs never recycle.
- Updates append a new capsule version referencing prior `intent_id`.
- Deletion is disallowed; supersession is the only correction path.
