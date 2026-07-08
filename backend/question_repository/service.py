"""This module contains the service functions for the question repository."""

import csv
import random

from backend.question_repository.schema import QuestionAndAnswer, UpdateAnswerChoices


class QuestionService:
    """This class contains the service functions for the question repository."""

    number_of_categories: int = 6
    all_questions: list[QuestionAndAnswer] = list()
    categories: list[str] = list()
    questions: list[QuestionAndAnswer] = list()

    def __init__(self):
        self.LoadQuestions()

    def LoadQuestions(self):
        """This function loads all the questions + answers into the database."""

        with open(
            "backend/question_repository/question-and-answers.csv",
            mode="r",
            encoding="utf-8",
        ) as file:
            reader = csv.DictReader(file)
            self.all_questions = [QuestionAndAnswer(**row) for row in reader]

        return "Loaded the questions and answers!"

    def SaveQuestions(self):
        """This function saves the 5 questions for each of the 6 categories into the database."""
        for category in self.categories:
            category_questions = [
                question
                for question in self.all_questions
                # if the category of the question is one of the 6 categories,
                # then add it to the list of questions
                if question.category == category
            ]
            self.questions.extend(random.sample(category_questions, 5))

        return "Saved the 5 questions for all 6 categories!"

    def GetCategories(self):
        """This function chooses 6 random categories and stores them in the database."""

        # Get all the unique categories from the questions
        categories = sorted({question.category for question in self.all_questions})
        # Choose {self.number_of_categories} random categories from the list of unique categories
        self.categories = random.sample(categories, self.number_of_categories)

        return f"Got the 6 categories: {', '.join(self.categories)}!"

    def GetRandomQuestion(self, category):
        """This function gets a random question for a given category."""

        for q in self.questions:
            if q.category == category:
                self.MarkQuestionUsed(category, q.question)
                break
        else:
            raise ValueError(f"No question found for category: {category}")

        return q.question

    def MarkQuestionUsed(self, category, question):
        """This function marks a question as used for a given category"""

        for q in self.questions:
            if q.category == category and q.question == question:
                q.used = True
                break
        else:
            raise ValueError(
                f"No question found for category: {category} and question: {question}"
            )

        return f"Marked question [{q.question}] as used for category: {category}"

    def CreateQuestion(self, category, question, answer_choices: UpdateAnswerChoices):
        """This function creates a new question for a given category"""

        new_question = QuestionAndAnswer(
            category=category,
            question=question,
            correct_choice=answer_choices.correct_choice or "",
            choice_b=answer_choices.choice_b or "",
            choice_c=answer_choices.choice_c or "",
        )
        self.all_questions.append(new_question)

        return (
            f"Created a new question for category: {category} with question: {question}"
        )

    def UpdateQuestion(self, category, question, answer_choices: UpdateAnswerChoices):
        """This function updates a question for a given category"""

        for q in self.all_questions:
            if q.category == category and q.question == question:
                q.correct_choice = answer_choices.correct_choice or q.correct_choice
                q.choice_b = answer_choices.choice_b or q.choice_b
                q.choice_c = answer_choices.choice_c or q.choice_c                    
                break
        else:
            raise ValueError(
                f"No question found for category: {category} and question: {question}"
            )

        return f"Updated question [{question}] for category: {category} with answer choices: {answer_choices}"

    def DeleteQuestion(self, category, question_id):
        """This function deletes a question for a given category"""

        for q in self.all_questions:
            if q.category == category and q.question == question_id:
                self.all_questions.remove(q)
                break
        else:
            raise ValueError(
                f"No question found for category: {category} and question id: {question_id}"
            )

        return f"Deleted question with id: {question_id} for category: {category}"
