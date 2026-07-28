"""This module contains the service functions for the scoring system."""

import logging
from typing import Dict, Optional

logger = logging.getLogger("uvicorn")

_scores: Dict[str, int] = {}


def AddScore(player, points):
    """Adds points to a player's score."""

    _scores[player] = _scores.get(player, 0) + points
    logger.info("Adding %d points to player '%s'", points, player)
    return f"Added {points} points to {player}."


def SubtractScore(player, points):
    """Subtracts points from a player's score."""

    _scores[player] = _scores.get(player, 0) - points
    logger.info("Subtracting %d points from player '%s'", points, player)
    return f"Subtracted {points} points from {player}."


def ApplyBankrupt(player):
    """Resets a player's score to zero and marks them bankrupt."""

    _scores[player] = 0
    logger.info("Applying bankrupt to player '%s'", player)
    return f"Applied bankruptcy to {player}."


def GetScore(player):
    """Gets the current score for a player."""

    score = _scores.get(player, 0)
    logger.info("Getting score for player '%s': %d", player, score)
    return score


def DetermineWinner() -> Optional[str]:
    """Determines the current winner if there is one."""

    if not _scores:
        logger.info("No players with scores, cannot determine winner")
        return None

    top_player = max(_scores, key=_scores.get)
    top_score = _scores[top_player]

    if sum(1 for score in _scores.values() if score == top_score) > 1:
        logger.info("Tie detected, no clear winner")
        return None

    logger.info("Determined winner: '%s' with %d points", top_player, top_score)
    return top_player
