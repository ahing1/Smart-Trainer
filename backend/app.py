from flask import Flask
from flask_cors import CORS
from routes.pose import pose_bp
from routes.workout import workout_bp
from routes.recommendations import recommendations_bp

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(pose_bp)
app.register_blueprint(workout_bp)
app.register_blueprint(recommendations_bp)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)