import unittest
from app import app

class TestWorkoutRoutes(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_add_workout(self):
        response = self.app.post(
            "/workouts",
            json={
                "user_id": "123",
                "exercise": "Squat",
                "sets": 3,
                "reps": 10,
                "weight": 225,
            },
        )
        self.assertEqual(response.status_code, 201)
        self.assertIn("workout_id", response.get_json())

    def test_get_all_workouts(self):
        response = self.app.get("/workouts")
        self.assertEqual(response.status_code, 200)
        self.assertIn("workouts", response.get_json())

if __name__ == "__main__":
    unittest.main()
