from flask import Blueprint, request, jsonify
from models.recommendation import recommend_exercises

recommendations_bp = Blueprint("recommendations", __name__)

@recommendations_bp.route("/recommendations", methods=["POST"])
def get_recommendations():
    """
    Fetch exercise recommendations for the user.
    Expects JSON payload: { "user_id": "123", "goal": "strength" }
    """
    data = request.get_json()

    # Validate input data
    if "user_id" not in data or "goal" not in data:
        return jsonify({"error": "Missing required fields"}), 400

    # Generate recommendations
    recommendations = recommend_exercises(data["user_id"], data["goal"])
    return jsonify({"recommendations": recommendations}), 200
