"""This file contains the schema for the QuestionRepository service."""

from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


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


class QuestionAndAnswer(BaseModel):
    """Model for a question and its answer."""

    model_config = ConfigDict(validate_by_alias=True)

    category: str = Field(
        ..., description="The category of the question", alias="Category"
    )
    question: str = Field(..., description="The question text", alias="Question")
    correct_choice: str = Field(
        ..., description="The correct choice for the question", alias="Correct Choice"
    )
    choice_b: str = Field(
        ..., description="The second choice for the question", alias="Choice B"
    )
    choice_c: str = Field(
        ..., description="The third choice for the question", alias="Choice C"
    )
    used: bool = Field(
        default=False, description="Whether the question has been used", alias="Used"
    )


class UpdateAnswerChoices(BaseModel):
    """Model for updating answer choices of a question."""

    model_config = ConfigDict(validate_by_alias=True)

    correct_choice: str | None = Field(
        None,
        description="The new correct choice for the question",
        alias="Correct Choice",
    )
    choice_b: str | None = Field(
        None, description="The new second choice for the question", alias="Choice B"
    )
    choice_c: str | None = Field(
        None, description="The new third choice for the question", alias="Choice C"
    )
