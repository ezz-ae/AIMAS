#!/usr/bin/env python3
import json, sys, re
from pathlib import Path

FORBIDDEN_IN_IC = {"intent_text","transcript","raw_text","raw_payload"}
REQUIRED_FILES = [
  "RFC/RFC-0007-FCT-HMR-BINDING.md",
  "schemas/intent_capsule.json",
  "schemas/fit_matrix.json",
  "schemas/was_feedback.json",
  "CONFORMANCE.md",
  "conformance/rules.yaml"
]

def read_json(p: Path):
    return json.loads(p.read_text(encoding="utf-8"))

def fail(msg: str):
    print(f"FAIL: {msg}", file=sys.stderr)
    sys.exit(1)

def main():
    root = Path(__file__).resolve().parents[1]

    for rel in REQUIRED_FILES:
        if not (root / rel).exists():
            fail(f"Missing required file: {rel}")

    ic = read_json(root / "schemas/intent_capsule.json")
    ic_txt = json.dumps(ic)
    for f in FORBIDDEN_IN_IC:
        if re.search(rf'"{re.escape(f)}"\s*:', ic_txt):
            fail(f'Forbidden field present in Intent Capsule schema: "{f}"')

    fm = read_json(root / "schemas/fit_matrix.json")
    paths = fm.get("properties",{}).get("fit_matrix",{}).get("properties",{}).get("paths",{})
    items = paths.get("items",{}).get("properties",{})
    if "free_baseline" not in items:
        fail("Fit Matrix schema missing per-path field: free_baseline")

    # Lightweight check: ensure enum contains free_baseline
    enum = items.get("type",{}).get("enum",[])
    if "free_baseline" not in enum:
        fail("Fit Matrix path.type must include 'free_baseline'")

    print("OK: repo passes structural checks (AIMAS/FCT binding present).")

if __name__ == "__main__":
    main()
