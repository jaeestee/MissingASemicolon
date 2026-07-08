import unittest

from backend.game_engine.service import build_turn_payload
from backend.question_repository.service import QuestionService


class GameEngineTurnTests(unittest.TestCase):
    def test_build_turn_payload_returns_question_and_choices(self):
        question_service = QuestionService()
        question_service.GetCategories()
        question_service.SaveQuestions()

        payload = build_turn_payload(
            outcome="Category1",
            question_service=question_service,
            category="Math",
        )

        self.assertEqual(payload["category"], "Math")
        self.assertTrue(payload["question"])
        self.assertEqual(len(payload["choices"]), 3)
        self.assertTrue(payload["correct_choice"])


if __name__ == "__main__":
    unittest.main()
