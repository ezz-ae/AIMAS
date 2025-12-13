# AIMAS Conformance

An implementation is AIMAS-compliant only if it satisfies all **binding invariants** (RFC-0007) and passes the conformance checks.

## Must-pass checks
- IC schema is feature-only (no raw intent persistence)
- FM schema uses 0–100 for probability/confidence
- FM includes at least one `free_baseline` path (`free_baseline: true`)
- Force Notes are append-only (no deletions; only `re_effective`)
- Was remains private (no public export)

## How to validate
```bash
python tools/validate_repo.py
python tools/validate_event.py examples/valid/intent_capsule.json schemas/intent_capsule.json
python tools/validate_event.py examples/valid/fit_matrix.json schemas/fit_matrix.json
```
