"""This serves as the main entry point for the game engine."""

import random

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class AnswerSubmissionRequest(BaseModel):
    player: str
    answer: str
    correct_choice: str
    points: int = 100


class TurnPayload(BaseModel):
    category: str
    question: str
    choices: list[str]
    correct_choice: str
    outcome: str

from backend.api_responses import (
    HealthResponse,
    WheelSpinResponse,
    ScoreOperationResponse,
    BankruptResponse,
    ScoreResponse,
    WinnerResponse,
    QuestionResponse,
    CategoriesResponse,
    RandomQuestionResponse,
)
from backend.question_repository.schema import UpdateAnswerChoices
from backend.question_repository.service import QuestionService
from backend.scoring_system.schema import ScoringSystemRequest
from backend.scoring_system.service import (
    AddScore,
    SubtractScore,
    ApplyBankrupt,
    GetScore,
    DetermineWinner,
)
from backend.wheel_system.schema import WheelSystemRequest
from backend.wheel_system.service import SpinWheel

app = FastAPI(debug=True)

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

question_service = QuestionService()


class StartGameRequest(BaseModel):
    players: list[str]


class SpinWheelRequest(BaseModel):
    category: str | None = None


def build_turn_payload(outcome: str, question_service: QuestionService, category: str | None = None):
    question_service.categories = []
    question_service.questions = []
    question_service.GetCategories()
    question_service.SaveQuestions()

    available_categories = sorted({q.category for q in question_service.all_questions})
    selected_category = category if category in available_categories else available_categories[0]

    candidate_questions = [
        item for item in question_service.questions if item.category == selected_category and not getattr(item, "used", False)
    ]

    if not candidate_questions:
        fallback_category = next((cat for cat in available_categories if cat != selected_category), available_categories[0])
        candidate_questions = [
            item for item in question_service.questions if item.category == fallback_category and not getattr(item, "used", False)
        ]
        selected_category = fallback_category

    if not candidate_questions:
        fallback_question = next((item for item in question_service.questions if not getattr(item, "used", False)), None)
        if fallback_question is None:
            fallback_question = question_service.questions[0] if question_service.questions else None
        if fallback_question is None:
            return {
                "category": selected_category,
                "question": "No questions available",
                "choices": ["N/A"],
                "correct_choice": "N/A",
                "outcome": outcome,
            }
        q = fallback_question
        selected_category = q.category
    else:
        q = random.choice(candidate_questions)

    choices = [q.correct_choice, q.choice_b, q.choice_c]
    return {
        "category": selected_category,
        "question": q.question,
        "choices": choices,
        "correct_choice": q.correct_choice,
        "outcome": outcome,
    }


@app.get("/", response_model=dict)
def read_root():
    return {"message": "Welcome to the Game Engine API"}


@app.get("/health", response_model=HealthResponse)
def health_check():
    return {"status": "healthy"}


@app.post("/start-game")
def start_game(request: StartGameRequest):
    return {"message": "Game started", "players": request.players}


@app.post("/wheel/spin", response_model=WheelSpinResponse)
def spin_wheel(request: WheelSystemRequest):
    if request.request_type == "SpinWheel":
        outcome = SpinWheel()
        return {"outcome": outcome}
    return {"outcome": "Lose Turn"}


@app.post("/turn", response_model=TurnPayload)
def create_turn(request: SpinWheelRequest):
    outcome = SpinWheel()
    return build_turn_payload(str(outcome), question_service, request.category)


@app.post("/spin-wheel", response_model=WheelSpinResponse)
def spin_wheel_compat(request: WheelSystemRequest):
    return spin_wheel(request)


@app.post("/answer")
def submit_answer(request: AnswerSubmissionRequest):
    if request.answer == request.correct_choice:
        AddScore(request.player, request.points)
        return {"correct": True, "message": "Correct answer!", "player": request.player}

    return {"correct": False, "message": "Incorrect answer.", "player": request.player}


@app.post("/scoring/add", response_model=ScoreOperationResponse)
def add_score_endpoint(request: ScoringSystemRequest):
    if request.request_type == "AddScore" and request.player and request.points:
        result = AddScore(request.player, request.points)
        return {"message": result, "player": request.player, "points": request.points}
    return {"message": "Invalid request", "player": request.player or "unknown"}


@app.post("/scoring/subtract", response_model=ScoreOperationResponse)
def subtract_score_endpoint(request: ScoringSystemRequest):
    if request.request_type == "SubtractScore" and request.player and request.points:
        result = SubtractScore(request.player, request.points)
        return {"message": result, "player": request.player, "points": request.points}
    return {"message": "Invalid request", "player": request.player or "unknown"}


@app.post("/scoring/bankrupt", response_model=BankruptResponse)
def apply_bankrupt_endpoint(request: ScoringSystemRequest):
    if request.request_type == "ApplyBankrupt" and request.player:
        result = ApplyBankrupt(request.player)
        return {"message": result, "player": request.player}
    return {"message": "Invalid request", "player": request.player or "unknown"}


@app.get("/scoring/{player}", response_model=ScoreResponse)
def get_score_endpoint(player: str):
    score = GetScore(player)
    return {"player": player, "score": score}


@app.get("/scoring/winner", response_model=WinnerResponse)
def get_winner_endpoint():
    winner = DetermineWinner()
    if winner:
        return {"winner": winner}
    return {"winner": None, "message": "No clear winner yet"}


@app.post("/question/load", response_model=QuestionResponse)
def load_questions():
    result = question_service.LoadQuestions()
    return {"message": result}


@app.post("/question/save", response_model=QuestionResponse)
def save_questions():
    result = question_service.SaveQuestions()
    return {"message": result}


@app.get("/question/categories", response_model=CategoriesResponse)
def get_categories():
    result = question_service.GetCategories()
    return {"message": result, "categories": question_service.categories}


@app.get("/question/random/{category}", response_model=RandomQuestionResponse)
def get_random_question(category: str):
    try:
        question = question_service.GetRandomQuestion(category)
        return {"category": category, "question": question}
    except ValueError as e:
        return {"category": category, "question": None, "error": str(e)}


@app.post("/question/mark-used/{category}/{question}", response_model=QuestionResponse)
def mark_question_used(category: str, question: str):
    result = question_service.MarkQuestionUsed(category, question)
    return {"message": result}


@app.post("/question/create", response_model=QuestionResponse)
def create_question(category: str, question: str, answer_choices: UpdateAnswerChoices):
    result = question_service.CreateQuestion(category, question, answer_choices)
    return {"message": result}


@app.put("/question/update", response_model=QuestionResponse)
def update_question(category: str, question: str, answer_choices: UpdateAnswerChoices):
    result = question_service.UpdateQuestion(category, question, answer_choices)
    return {"message": result}


@app.delete("/question/delete/{category}/{question_id}", response_model=QuestionResponse)
def delete_question(category: str, question_id: str):
    result = question_service.DeleteQuestion(category, question_id)
    return {"message": result}
