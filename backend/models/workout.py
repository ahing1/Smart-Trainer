from models.db import workouts_collection
from bson.objectid import ObjectId

def log_workout(user_id, exercise, sets, reps, weight):
    """
    Log a workout in the database.
    :param user_id: ID of the user logging the workout.
    :param exercise: Name of the exercise.
    :param sets: Number of sets.
    :param reps: Number of reps.
    :param weight: Weight used for the exercise.
    :return: The inserted workout's ID.
    """
    workout = {
        "user_id": user_id,
        "exercise": exercise,
        "sets": sets,
        "reps": reps,
        "weight": weight,
    }
    result = workouts_collection.insert_one(workout)
    return str(result.inserted_id)


def get_workouts():
    """
    Retrieve all workouts from the database.
    :return: List of workouts.
    """
    workouts = []
    for workout in workouts_collection.find():
        workout["_id"] = str(workout["_id"])  # Convert ObjectId to string
        workouts.append(workout)
    return workouts
