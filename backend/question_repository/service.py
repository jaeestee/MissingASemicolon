"""This module contains the service functions for the question repository"""


def LoadQuestions():
    """This function loads the questions"""

    return "Loaded the questions!"


def SaveQuestions():
    """This function saves the questions"""

    return "Saved the questions!"


def GetCategories():
    """This function gets the categories"""

    return "Got the categories!"


def GetQuestion(category):
    """This function gets the questions for a given category"""

    return f"Got the questions for category: {category}"


def GetRandomQuestion(category):
    """This function gets a random question for a given category"""

    return f"Got a random question for category: {category}"


def MarkQuestionUsed(category, question_id):
    """This function marks a question as used for a given category"""

    return f"Marked question with id: {question_id} as used for category: {category}"


def CreateQuestion(category, question):
    """This function creates a new question for a given category"""

    return f"Created a new question for category: {category} with question: {question}"


def UpdateQuestion(category, question_id, question):
    """This function updates a question for a given category"""

    return f"Updated question with id: {question_id} for category: {category} with question: {question}"


def DeleteQuestion(category, question_id):
    """This function deletes a question for a given category"""

    return f"Deleted question with id: {question_id} for category: {category}"
