#!/usr/bin/env python3
import json, sys
from pathlib import Path

try:
    import jsonschema
except ImportError:
    print("Missing dependency: jsonschema. Install with: pip install jsonschema", file=sys.stderr)
    sys.exit(2)

def main():
    if len(sys.argv) != 3:
        print("Usage: validate_event.py <event.json> <schema.json>", file=sys.stderr)
        sys.exit(2)

    event_path = Path(sys.argv[1])
    schema_path = Path(sys.argv[2])

    event = json.loads(event_path.read_text(encoding="utf-8"))
    schema = json.loads(schema_path.read_text(encoding="utf-8"))

    jsonschema.validate(instance=event, schema=schema)
    print(f"OK: {event_path} validates against {schema_path}")

if __name__ == "__main__":
    main()
