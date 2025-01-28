import bcrypt
from models.db import db

users_collection = db["users"]  # Collection for user data

def create_user(username, password):
    """
    Create a new user with a hashed password.
    """
    # Check if the username already exists
    if users_collection.find_one({"username": username}):
        return {"error": "Username already exists"}

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    # Insert the user into the database
    user = {"username": username, "password": hashed_password.decode("utf-8")}
    result = users_collection.insert_one(user)

    return {"user_id": str(result.inserted_id)}

def authenticate_user(username, password):
    """
    Authenticate a user by verifying their password.
    """
    # Fetch the user from the database
    user = users_collection.find_one({"username": username})
    if not user:
        return None

    # Verify the password
    if bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
        return user

    return None
