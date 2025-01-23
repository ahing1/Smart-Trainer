from flask import Flask
from flask_cors import CORS
from routes.pose import pose_bp

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(pose_bp)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)