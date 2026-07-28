"""Main entry point to run the FastAPI application."""

import logging

import uvicorn
from backend.game_engine.service import app

logger = logging.getLogger("uvicorn")

if __name__ == "__main__":
    logger.info("Starting the uvicorn server on 0.0.0.0:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
