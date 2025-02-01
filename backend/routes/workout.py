from flask import Blueprint, request, jsonify
from models.workout import log_workout, get_workout_history
from models.user import update_streak, get_achievements
from flask_jwt_extended import jwt_required, get_jwt_identity

workout_bp = Blueprint("workout", __name__)

@workout_bp.route("/workouts", methods=["POST"])
@jwt_required()
def add_workout():
    """
    Log a new workout.
    """
    current_user = get_jwt_identity()
    data = request.get_json()
    required_fields = ["exercise", "sets", "reps", "weight"]

    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    workout_id = log_workout(
        current_user, data["exercise"], data["sets"], data["reps"], data["weight"]
    )
    
    streak_data = update_streak(current_user)

    return jsonify({
        "message": "Workout logged",
        "workout_id": workout_id,
        "streak_data": streak_data
    }), 201
    
@workout_bp.route("/workouts/<user_id>", methods=["GET"])
def get_user_workouts(user_id):
    """
    Retrieve a user's workout history.
    """
    workouts = get_workout_history(user_id)
    return jsonify({"workouts": workouts}), 200

@workout_bp.route("/achievements", methods=["GET"])
@jwt_required()
def achievements():
    current_user = get_jwt_identity()
    achievements_list = get_achievements(current_user)
    return jsonify({"achievements": achievements_list}), 200