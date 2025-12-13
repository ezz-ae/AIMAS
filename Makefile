.PHONY: validate

validate:
	python tools/validate_repo.py
	python tools/validate_event.py examples/valid/intent_capsule.json schemas/intent_capsule.json
	python tools/validate_event.py examples/valid/fit_matrix.json schemas/fit_matrix.json
