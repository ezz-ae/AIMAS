---
title: "Tutorial: Submit Intent"
---

```bash
curl -X POST "$AIMAS_API/v1/intent" \
  -H "content-type: application/json" \
  -H "x-client-system: demo-platform" \
  -d '{
    "capsule_type": "transactional",
    "intent_features": {
      "capsule_type": "transactional",
      "normalized_intent": "Expedite verified listing onboarding",
      "sensitivity": "high",
      "derived_tags": ["onboarding", "priority"],
      "context_vectors": {"urgency": 0.8, "regulatory": 0.6}
    }
  }'
```

Response body:

```json
{ "intent_id": "b8e1..." }
```

Store `intent_id` and the accompanying headers for audit.
