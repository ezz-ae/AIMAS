# AIMAS Protocol

**AI Intent Monetization System — Fulfillment Certainty Standard**

**Status:** Canonical Specification  
**Current tag:** v1.0.1 (patch release)  
**Maintainer / Author:** Mahmoud Ezz  
**Scope:** Protocol · Data Contracts · Conformance · Governance · Reference API + Website Scaffolding

---

## Executive Summary

AIMAS is a protocol-level standard for transforming human intent into deterministic, monetizable certainty.

Unlike marketplaces, search engines, or recommender systems, AIMAS does **not** rank options or sell visibility.
It computes resolution paths using a fitting model and monetizes:

- **Time compression (ETA)**
- **Success probability**
- **Confidence and handling guarantees**
- **Sensitivity-aware routing**

The output of AIMAS is **not a list** — it is a **Fit Matrix**.

---

## What’s in this repository

This repo is **specification-first**. It defines what must be true, then provides enough scaffolding to ship:

- **RFCs**: the canonical protocol (RFC-0001..RFC-0007)
- **Schemas**: JSON data contracts (Intent Capsule, Fit Matrix, NYK, Force Notes, Was)
- **Compliance + conformance**: forbidden patterns, violation examples, conformance rules
- **Governance**: change control and integrity rules
- **Reference builds (minimal, optional)**:
  - `apps/api` — a deterministic API skeleton (Cloud Run-ready)
  - `apps/site` — a docs website scaffold with a **search-only** home terminal

---

## The AIMAS non-negotiables

- **Fit Matrix is the primary response unit** (no “ranked results as truth”).
- **Free Baseline Path is mandatory** for every intent (Fairness Rule).
- **No surveillance monetization** (no selling visibility, no tracking-for-ads).
- **No raw intent archival** (store derived features; raw payload is transient by design).
- **Auditability** through append-only lineage (re-effective supersession, never deletion).

---

## Repository map

- `/RFC` — canonical specifications
- `/schemas` — JSON schemas (machine contracts)
- `/compliance` — forbidden patterns + violation handling
- `/conformance` — conformance requirements + fixtures
- `/docs` — institutional context, terminology, and adoption notes
- `/math` — formal equations / constraints
- `/apps/site` — protocol website scaffold (Next.js)
- `/apps/api` — reference API scaffold (Node/TS, deterministic core)

---

## Quickstart (website)

```bash
cd apps/site
npm i
npm run dev
# optional static export:
npm run export
```

The home page is intentionally a **single search terminal**. Every visitor enters the protocol through intent.

---

## Quickstart (API)

```bash
cd apps/api
npm i
npm run dev
# Cloud Run build:
docker build -t aim
docker run -p 8080:8080 aim
```

This API is deterministic by default. Optional AI adapters are isolated and disabled unless explicitly enabled.

---

## Authorship & Copyright

© 2025 Mahmoud Ezz. All rights reserved.

This repository defines a canonical protocol specification. Implementations must conform to the published RFCs and schemas.

---

## Closing statement

AIMAS does not optimize for engagement. It optimizes for **resolution**.  
AIMAS does not predict behavior. It computes **certainty**.  
AIMAS does not remember everything. It remembers only what is **safe to remember**.
