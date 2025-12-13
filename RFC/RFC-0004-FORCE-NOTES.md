# RFC-0004: Force Notes — Immutable Nervous Ledger

**Status:** REQUIRED

## 1) Role
Force Notes is an append-only ledger recording intent events, cycles, and fulfillment outcomes.

## 2) Immutability
- Records MUST NOT be deleted
- Corrections MUST be done by `re_effective` entries that reference `supersedes`

## 3) Minimum event types
- want
- skip
- cycle
- fulfilled
- aborted
- re_effective
