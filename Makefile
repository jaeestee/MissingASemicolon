all: format

format:
	uv format
	uv run ruff check --select I --fix
.PHONY: format

start_backend:
	uv run python backend/main.py
.PHONY: start_backend
