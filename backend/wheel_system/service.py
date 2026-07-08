"""This module contains the service functions for the wheel system."""

import random

from backend.wheel_system.schema import WheelOutcome


def SpinWheel():
    """Spins the wheel and returns a random outcome."""

    return random.choice(list(WheelOutcome))
