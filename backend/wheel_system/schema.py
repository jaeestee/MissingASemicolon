"""This file contains the schema for the WheelSystem service."""

from enum import Enum
from typing import Literal

from pydantic import BaseModel


class WheelOutcome(str, Enum):
    """Possible values returned by the wheel."""

    CATEGORY1 = "Category1"
    CATEGORY2 = "Category2"
    CATEGORY3 = "Category3"
    CATEGORY4 = "Category4"
    CATEGORY5 = "Category5"
    CATEGORY6 = "Category6"
    LOSE_TURN = "Lose Turn"
    FREE_SPIN = "Free Spin"
    BANKRUPT = "Bankrupt"
    PLAYER_CHOICE = "Player's Choice"
    OPPONENT_CHOICE = "Opponent's Choice"


class WheelSystemRequest(BaseModel):
    """Request model for the WheelSystem."""

    request_type: Literal["SpinWheel"]
