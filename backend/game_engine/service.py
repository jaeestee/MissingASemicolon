"""This serves as the main entry point for the game engine."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.game_engine.schema import (
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
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

question_service = QuestionService()


@app.get("/", response_model=dict)
def read_root():
    return {"message": "Welcome to the Game Engine API"}


@app.get("/health", response_model=HealthResponse)
def health_check():
    return {"status": "healthy"}


@app.post("/wheel/spin", response_model=WheelSpinResponse)
def spin_wheel(request: WheelSystemRequest):
    if request.request_type == "SpinWheel":
        outcome = SpinWheel()
        return {"outcome": outcome}
    return {"outcome": "Lose Turn"}


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
