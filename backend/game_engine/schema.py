"""Response schemas for the API endpoints."""

from pydantic import BaseModel

from backend.wheel_system.schema import WheelOutcome


class HealthResponse(BaseModel):
    status: str


class WheelSpinResponse(BaseModel):
    outcome: WheelOutcome


class ScoreOperationResponse(BaseModel):
    message: str
    player: str
    points: int | None = None


class BankruptResponse(BaseModel):
    message: str
    player: str


class ScoreResponse(BaseModel):
    player: str
    score: int


class WinnerResponse(BaseModel):
    winner: str | None
    message: str | None = None


class QuestionResponse(BaseModel):
    message: str


class CategoriesResponse(BaseModel):
    message: str
    categories: list[str]


class RandomQuestionResponse(BaseModel):
    category: str
    question: str | None = None
    error: str | None = None
