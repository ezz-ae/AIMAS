# RFC-0002: Calculated Fitting System (CFS)

**Status:** REQUIRED

## 1) Purpose
CFS is the mathematical core that produces **quantified certainty**. It replaces “options lists” with measurable resolution paths.

## 2) Canonical formula (conceptual)
Fit is computed from organ-derived inputs and inversely weighted by time:

Fit = (Intent × NYK × Context × ForceNotes × Was) ÷ Time

Time in the denominator is the monetization lever: users pay for time compression / higher certainty.

## 3) Output contract: Fit Matrix
The output MUST comply with `schemas/fit_matrix.json`:
- `success_probability` in **0–100**
- `confidence` in **0–100**
- `eta_hours` numeric
- `paths[]` includes at least one `{ type: "free_baseline" }`

## 4) No-surveillance clause
CFS inputs MUST be derived features, not raw payloads. Persisted artifacts MUST be E2/E3 only (see RFC-0007).
