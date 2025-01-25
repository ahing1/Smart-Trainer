from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["fitness_app"]

# Access the workouts collection
workouts_collection = db["workouts"]
