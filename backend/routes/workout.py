from flask import Blueprint, request, jsonify
from models.workout import log_workout, get_workouts

workout_bp = Blueprint("workout", __name__)

@workout_bp.route("/workouts", methods=["POST"])
def add_workout():
    """
    Log a new workout.
    Expects JSON payload: { "user_id": "123", "exercise": "Squat", "sets": 3, "reps": 10, "weight": 225 }
    """
    data = request.get_json()

    # Validate input data
    required_fields = ["user_id", "exercise", "sets", "reps", "weight"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Log the workout
    workout_id = log_workout(
        data["user_id"],
        data["exercise"],
        data["sets"],
        data["reps"],
        data["weight"],
    )

    return jsonify({"message": "Workout logged", "workout_id": workout_id}), 201


@workout_bp.route("/workouts", methods=["GET"])
def get_all_workouts():
    """
    Retrieve all logged workouts.
    """
    workouts = get_workouts()
    return jsonify({"workouts": workouts}), 200
