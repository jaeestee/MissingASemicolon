all: format

format:
	uv format
	uv run ruff check --select I --fix
.PHONY: format
