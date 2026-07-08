"""This module contains the service functions for the scoring system."""

from typing import Dict, Optional

_scores: Dict[str, int] = {}


def AddScore(player, points):
    """Adds points to a player's score."""

    _scores[player] = _scores.get(player, 0) + points
    return f"Added {points} points to {player}."


def SubtractScore(player, points):
    """Subtracts points from a player's score."""

    _scores[player] = _scores.get(player, 0) - points
    return f"Subtracted {points} points from {player}."


def ApplyBankrupt(player):
    """Resets a player's score to zero and marks them bankrupt."""

    _scores[player] = 0
    return f"Applied bankruptcy to {player}."


def GetScore(player):
    """Gets the current score for a player."""

    return _scores.get(player, 0)


def DetermineWinner() -> Optional[str]:
    """Determines the current winner if there is one."""

    if not _scores:
        return None

    top_player = max(_scores, key=_scores.get)
    top_score = _scores[top_player]

    if sum(1 for score in _scores.values() if score == top_score) > 1:
        return None

    return top_player
