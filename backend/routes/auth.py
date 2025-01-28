from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from models.user import create_user, authenticate_user

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    """
    Register a new user.
    """
    data = request.get_json()
    if "username" not in data or "password" not in data:
        return jsonify({"error": "Username and password are required"}), 400

    result = create_user(data["username"], data["password"])
    if "error" in result:
        return jsonify(result), 400

    return jsonify({"message": "User registered successfully", "user_id": result["user_id"]}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    """
    Log in a user and return a JWT.
    """
    data = request.get_json()
    if "username" not in data or "password" not in data:
        return jsonify({"error": "Username and password are required"}), 400

    user = authenticate_user(data["username"], data["password"])
    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    # Generate JWT
    access_token = create_access_token(identity=user["username"])
    return jsonify({"access_token": access_token}), 200

@auth_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    """
    A protected route requiring authentication.
    """
    return jsonify({"message": "You are viewing a protected route"}), 200
