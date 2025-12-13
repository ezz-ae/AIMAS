# AIMAS Website Content Structure (what to write, where it lives)

This file is a writing blueprint. It tells you exactly what content blocks must exist so the site feels “institutional”.

## 1) The Home Page (Search-only)

Home has 3 content elements max:
1. Brand line: “AIMAS Protocol”
2. One-liner: “Fulfillment certainty standard. Fit Matrix outputs.”
3. Search input.

Nothing else. No menu.

## 2) Protocol Surface Mode Layout

Once the user searches, you render a 3-column “terminal”:

- Left: Docs tree
- Middle: Document content
- Right: Protocol Facts (read-only)

### Right Panel fields (always visible)
- Status: Canonical Specification
- Protocol version: vX.Y.Z (git tag)
- Commit SHA (short)
- RFC set: RFC-0001..0007
- Schemas: Intent Capsule / Fit Matrix / NYK / Force Note / Was Feedback
- Conformance: PASS/FAIL + last run timestamp (local/CI)
- Links: GitHub repo, Releases, Changelog

## 3) Required Documents (minimum “authority set”)

### Getting Started
- Start: what AIMAS is, what it replaces, what it outputs (Fit Matrix)
- Quickstart: a single end-to-end example with real JSON
- Architecture: deterministic core vs adapters (adapters optional)

### RFC Pages (each RFC must include these sections)
- Abstract
- Motivation (what failure it fixes)
- Terminology
- Data objects referenced (link to schema pages)
- Normative rules (MUST/SHOULD/MAY)
- Security / abuse considerations
- Conformance tests that validate it
- Versioning notes

### Schema Pages (each schema must include)
- Purpose
- JSON Schema (verbatim)
- 2 valid examples
- 2 invalid examples + error explanations
- Compatibility notes

### Conformance Pages
- What “AIMAS compliant” means
- Test vectors and expected outputs
- How to run locally and in CI
- Attestation format (text + hash)

### Compliance Pages
- Forbidden patterns: ranking-as-truth, paywall baseline, surveillance memory, deceptive offers
- Violation examples + required system response

## 4) Where to store content in this repo

Recommended (matches your current Next.js markdown renderer):
- Root markdown files for top-level docs:
  - README.md (short)
  - CHANGELOG.md
  - GOVERNANCE.md
  - SECURITY.md
- Folder-based docs:
  - /RFC/*.md
  - /schemas/*.json
  - /conformance/*.md
  - /compliance/*.md
  - /examples/*.json

The website should read from these folders and render them.
