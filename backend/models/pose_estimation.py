import cv2
import numpy as np
import mediapipe as mp

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5, min_tracking_confidence=0.5)

def estimate_pose(image):
    """
    Estimate pose keypoints from an image.
    :param image: Input image as a NumPy array.
    :return: List of keypoints as (x, y) coordinates.
    """
    # Convert the image to RGB
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Perform pose estimation
    results = pose.process(image_rgb)

    # Extract keypoints if any pose landmarks are detected
    if results.pose_landmarks:
        keypoints = [
            {
                "id": idx,
                "x": lm.x,
                "y": lm.y,
                "z": lm.z,
                "visibility": lm.visibility,
            }
            for idx, lm in enumerate(results.pose_landmarks.landmark)
        ]
        return keypoints
    else:
        return []
