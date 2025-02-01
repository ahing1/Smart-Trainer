from models.db import db
import datetime

workouts_collection = db["workouts"]

def get_recommendations(user_id):
    """
    Generate personalized workout recommendations based on past history.
    """
    # Fetch user workout history (last 5 workouts)
    past_workouts = list(workouts_collection.find({"user_id": user_id}).sort("date", -1).limit(5))

    if not past_workouts:
        return {"message": "No past workouts found. Start logging workouts to receive recommendations!"}

    recommended_workouts = []

    # Basic AI logic: Suggest progressive overload (increase reps/weight)
    for workout in past_workouts:
        exercise = workout["exercise"]
        sets = workout["sets"]
        reps = workout["reps"]
        weight = workout["weight"]

        # Increase reps or weight based on history
        if reps < 12:
            reps += 2
        elif weight < 100:  # Simple threshold, can be personalized
            weight += 5

        recommended_workouts.append({
            "exercise": exercise,
            "sets": sets,
            "reps": reps,
            "weight": weight
        })

    return {"recommended_workouts": recommended_workouts}
