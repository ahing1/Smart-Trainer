from flask import Blueprint, request, jsonify
from models.workout import log_workout, get_workout_history

workout_bp = Blueprint("workout", __name__)

@workout_bp.route("/workouts", methods=["POST"])
def add_workout():
    """
    Log a new workout.
    """
    data = request.get_json()
    required_fields = ["user_id", "exercise", "sets", "reps", "weight"]

    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    workout_id = log_workout(
        data["user_id"], data["exercise"], data["sets"], data["reps"], data["weight"]
    )

    return jsonify({"message": "Workout logged", "workout_id": workout_id}), 201

@workout_bp.route("/workouts/<user_id>", methods=["GET"])
def get_user_workouts(user_id):
    """
    Retrieve a user's workout history.
    """
    workouts = get_workout_history(user_id)
    return jsonify({"workouts": workouts}), 200
