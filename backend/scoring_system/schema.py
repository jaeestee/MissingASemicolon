"""This file contains the schema for the ScoringSystem service."""

from typing import Literal

from pydantic import BaseModel


class ScoringSystemRequest(BaseModel):
    """Request model for the ScoringSystem."""

    request_type: Literal[
        "AddScore",
        "SubtractScore",
        "ApplyBankrupt",
        "DoublePointValue",
        "GetScore",
        "DetermineWinner",
    ]
    player: str | None = None
    points: int | None = None
