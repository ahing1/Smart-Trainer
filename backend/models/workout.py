from models.db import db
from bson.objectid import ObjectId
import datetime

workouts_collection = db["workouts"]

def log_workout(user_id, exercise, sets, reps, weight):
    """
    Log a new workout session into the database.
    """
    workout = {
        "user_id": user_id,
        "exercise": exercise,
        "sets": sets,
        "reps": reps,
        "weight": weight,
        "date": datetime.datetime.utcnow()
    }
    result = workouts_collection.insert_one(workout)
    return str(result.inserted_id)

def get_workout_history(user_id):
    """
    Retrieve past workout history for a user.
    """
    workouts = list(workouts_collection.find({"user_id": user_id}).sort("date", -1))
    for workout in workouts:
        workout["_id"] = str(workout["_id"])
        workout["date"] = workout["date"].strftime("%Y-%m-%d %H:%M:%S")
    return workouts
