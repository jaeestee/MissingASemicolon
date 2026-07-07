"""This file contains the schema for the QuestionRepository service."""

from typing import Literal

from pydantic import BaseModel


class QuestionRepositoryRequest(BaseModel):
    """Request model for the QuestionRepository."""

    request_type: Literal[
        "LoadQuestions",
        "SaveQuestions",
        "GetCategories",
        "GetQuestion",
        "GetRandomQuestion",
        "MarkQuestionUsed",
        "CreateQuestion",
        "UpdateQuestion",
        "DeleteQuestion",
    ]
