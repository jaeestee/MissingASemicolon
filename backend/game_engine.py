"""This serves as the main entry point for the game engine."""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


@app.get("/")
def read_root():
    return {"message": "Welcome to the Game Engine API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/wheel/spin")
def spin_wheel(request: WheelSystemRequest):
    if request.request_type == "SpinWheel":
        outcome = SpinWheel()
        return {"outcome": outcome.value}
    return {"error": "Invalid request type"}


@app.post("/scoring/add")
def add_score(request: ScoringSystemRequest):
    if request.request_type == "AddScore" and request.player and request.points:
        result = AddScore(request.player, request.points)
        return {"message": result, "player": request.player, "points": request.points}
    return {"error": "Invalid request"}


@app.post("/scoring/subtract")
def subtract_score(request: ScoringSystemRequest):
    if request.request_type == "SubtractScore" and request.player and request.points:
        result = SubtractScore(request.player, request.points)
        return {"message": result, "player": request.player, "points": request.points}
    return {"error": "Invalid request"}


@app.post("/scoring/bankrupt")
def apply_bankrupt(request: ScoringSystemRequest):
    if request.request_type == "ApplyBankrupt" and request.player:
        result = ApplyBankrupt(request.player)
        return {"message": result, "player": request.player}
    return {"error": "Invalid request"}


@app.get("/scoring/{player}")
def get_score(player: str):
    score = GetScore(player)
    return {"player": player, "score": score}


@app.get("/scoring/winner")
def get_winner():
    winner = DetermineWinner()
    if winner:
        return {"winner": winner}
    return {"winner": None, "message": "No clear winner yet"}


@app.post("/question/load")
def load_questions():
    result = question_service.LoadQuestions()
    return {"message": result}


@app.post("/question/save")
def save_questions():
    result = question_service.SaveQuestions()
    return {"message": result}


@app.get("/question/categories")
def get_categories():
    result = question_service.GetCategories()
    return {"message": result, "categories": question_service.categories}


@app.get("/question/random/{category}")
def get_random_question(category: str):
    try:
        question = question_service.GetRandomQuestion(category)
        return {"category": category, "question": question}
    except ValueError as e:
        return {"error": str(e)}


@app.post("/question/mark-used/{category}/{question}")
def mark_question_used(category: str, question: str):
    result = question_service.MarkQuestionUsed(category, question)
    return {"message": result}


@app.post("/question/create")
def create_question(category: str, question: str, answer_choices: UpdateAnswerChoices):
    result = question_service.CreateQuestion(category, question, answer_choices)
    return {"message": result}


@app.put("/question/update")
def update_question(category: str, question: str, answer_choices: UpdateAnswerChoices):
    result = question_service.UpdateQuestion(category, question, answer_choices)
    return {"message": result}


@app.delete("/question/delete/{category}/{question_id}")
def delete_question(category: str, question_id: str):
    result = question_service.DeleteQuestion(category, question_id)
    return {"message": result}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)