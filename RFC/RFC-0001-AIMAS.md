# RFC-0001: AIMAS Core Protocol and Fitting Agent Lifecycle

**Status:** REQUIRED

## 1) Definition
AIMAS defines a neutral protocol for converting user-distributed intent into verifiable intent states and monetizable certainty outputs (**Fit Matrix**). It is orchestrated by the **Fitting Agent**.

## 2) Native Anatomy
- **NYK** — Identity Core / first decision layer
- **Force Notes** — immutable nervous ledger
- **Was** — private reflex feedback (confidence calibration)
- **Triggers** — pulse/activation system
- **CFS** — calculated fitting system (brain core)
- **Monetization Engine** — constructs free baseline + accelerator paths

## 3) Mandatory lifecycle
When processing an Intent Capsule (IC), the Fitting Agent MUST execute:

1. Capture intent → normalize into `Intent Capsule` (features-only; see RFC-0007)
2. Consult NYK → identity prior
3. Load Force Notes → historical patterns
4. Evaluate Triggers → activation (wish/plan/active/urgent)
5. Apply Was → confidence calibration
6. Run CFS → compute Fit Matrix
7. Construct offers → MUST include at least one free_baseline path
8. Fulfill & update → append-only updates (Force Notes / Was / NYK Understanding)

## 4) Output law
AIMAS MUST NOT return a ranked list as the primary response unit. The primary response is the Fit Matrix.
