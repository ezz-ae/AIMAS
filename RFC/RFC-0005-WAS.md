# RFC-0005: Was — Reflex Feedback Protocol

**Status:** REQUIRED

## 1) Role
Was captures private post-fulfillment signals to calibrate confidence and success probability.

## 2) Privacy
Was MUST never be public (no stars, reviews, or public ratings).

## 3) Inputs
- explicit micro-signal (e.g., 70/100)
- implicit behavioral inference (repeat/abandon)

## 4) Output
Was produces `confidence_delta` used by calibration logic (CFS).
