from flask import Blueprint, request, jsonify
import cv2
import numpy as np
from models.pose_estimation import estimate_pose

pose_bp = Blueprint("pose", __name__)

@pose_bp.route("/analyze_pose", methods=["POST"])
def analyze_pose():
    """
    Analyze the pose from an uploaded image.
    :return: JSON response with pose keypoints.
    """
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    # Read the image file
    npimg = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    # Perform pose estimation
    keypoints = estimate_pose(image)

    return jsonify({"keypoints": keypoints}), 200
