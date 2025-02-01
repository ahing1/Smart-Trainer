from flask import Blueprint, request, jsonify
from models.recommendation import get_recommendations
from flask_jwt_extended import jwt_required, get_jwt_identity

recommendation_bp = Blueprint("recommendation", __name__)

@recommendation_bp.route("/recommendations/<user_id>", methods=["GET"])
@jwt_required()
def recommend_workout():
    """
    Provide AI-based workout recommendations.
    """
    current_user = get_jwt_identity()
    recommendations = get_recommendations(current_user)
    return jsonify(recommendations), 200
