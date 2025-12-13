# RFC-0003: NYK — Now Your Key (Identity Organ)

**Status:** REQUIRED

## 1) Role
NYK is the identity anchor used to filter and prioritize intents. Every intent MUST pass NYK before fitting.

## 2) Understandings (re-effective edits)
NYK is immutable in-place. Updates create **Understandings**:
- v1 preserved
- v2 becomes active
- history remains accessible to the user

## 3) Required traits (minimum)
- speed_bias (0–100)
- value_bias (0–100)
- risk_tolerance (0–100)
- sensitivity_profile (array)

PII minimization is mandatory.
