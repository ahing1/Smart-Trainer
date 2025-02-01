import bcrypt
from models.db import db
from datetime import datetime, timedelta

users_collection = db["users"]  # Collection for user data
workouts_collection = db["workouts"]

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

def update_streak(username):
    """
    Update the workout streak for the user.
    """
    user = users_collection.find_one({"username": username})
    today = datetime.utcnow().date()

    last_workout_date = user.get("last_workout_date")
    current_streak = user.get("current_streak", 0)
    longest_streak = user.get("longest_streak", 0)

    if last_workout_date:
        last_date = datetime.strptime(last_workout_date, "%Y-%m-%d").date()
        if today == last_date + timedelta(days=1):
            current_streak += 1  # Continue streak
        elif today != last_date:
            current_streak = 1  # Reset streak
    else:
        current_streak = 1  # First workout

    longest_streak = max(longest_streak, current_streak)

    # Update user data
    users_collection.update_one(
        {"username": username},
        {
            "$set": {
                "current_streak": current_streak,
                "longest_streak": longest_streak,
                "last_workout_date": today.strftime("%Y-%m-%d"),
            }
        },
    )

    return {"current_streak": current_streak, "longest_streak": longest_streak}


def get_achievements(username):
    """
    Return achievements based on workout history and streaks.
    """
    user = users_collection.find_one({"username": username})
    streak = user.get("longest_streak", 0)

    achievements = []
    if streak >= 5:
        achievements.append("5-Day Streak Badge")
    if streak >= 10:
        achievements.append("10-Day Streak Badge")

    # Check for personal best
    max_weight = workouts_collection.find({"user_id": username}).sort("weight", -1).limit(1)
    for workout in max_weight:
        achievements.append(f"Personal Best: {workout['exercise']} ({workout['weight']} kg)")

    return achievements