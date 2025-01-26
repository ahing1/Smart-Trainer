from models.db import workouts_collection

def recommend_exercises(user_id, goal):
    """
    Generate exercise recommendations based on user workout history and goals.
    :param user_id: ID of the user.
    :param goal: User's fitness goal (e.g., "strength", "endurance", "weight loss").
    :return: List of recommended exercises.
    """
    # Define basic exercise categories
    exercises_by_goal = {
        "strength": ["Deadlift", "Squat", "Bench Press", "Pull-up"],
        "endurance": ["Running", "Cycling", "Rowing", "Jump Rope"],
        "weight_loss": ["HIIT", "Burpees", "Mountain Climbers", "Jumping Jacks"],
    }

    # Fetch the user's workout history
    history = list(workouts_collection.find({"user_id": user_id}))

    # Get a count of performed exercises
    performed_exercises = {}
    for workout in history:
        exercise = workout["exercise"]
        performed_exercises[exercise] = performed_exercises.get(exercise, 0) + 1

    # Recommend exercises the user has done less often
    all_exercises = exercises_by_goal.get(goal, [])
    recommendations = sorted(
        all_exercises, key=lambda x: performed_exercises.get(x, 0)
    )

    return recommendations[:3]  # Return top 3 recommendations
