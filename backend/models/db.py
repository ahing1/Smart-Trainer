import os
from pymongo import MongoClient

# Get MongoDB URI from environment variables (for Docker compatibility)
mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/fitness_app")
client = MongoClient(mongo_uri)

# Access the database
db = client["fitness_app"]

# Define the workouts collection
workouts_collection = db["workouts"]
