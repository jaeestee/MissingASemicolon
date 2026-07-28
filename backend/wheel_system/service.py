"""This module contains the service functions for the wheel system."""

import logging
import random

from .schema import WheelOutcome

logger = logging.getLogger("uvicorn")


def SpinWheel():
    """Spins the wheel and returns a random outcome."""

    outcome = random.choice(list(WheelOutcome))
    logger.info("Spinning the wheel - outcome: %s", outcome)
    return outcome
