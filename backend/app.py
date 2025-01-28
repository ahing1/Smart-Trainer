from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes.pose import pose_bp
from routes.workout import workout_bp
from routes.recommendations import recommendations_bp
from routes.auth import auth_bp

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "your_secret_key"
jwt = JWTManager(app)

# Register routes
app.register_blueprint(pose_bp)
app.register_blueprint(workout_bp)
app.register_blueprint(recommendations_bp)
app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)