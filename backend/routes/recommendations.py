from flask import Blueprint, request, jsonify
from models.recommendation import get_recommendations

recommendation_bp = Blueprint("recommendation", __name__)

@recommendation_bp.route("/recommendations/<user_id>", methods=["GET"])
def recommend_workout(user_id):
    """
    Provide AI-based workout recommendations.
    """
    recommendations = get_recommendations(user_id)
    return jsonify(recommendations), 200
