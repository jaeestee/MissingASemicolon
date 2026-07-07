all: format lint

format:
	uv format
	uv run ruff check --select I --fix
.PHONY: format
