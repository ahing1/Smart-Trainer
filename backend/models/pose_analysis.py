def analyze_pose_keypoints(keypoints):
    """
    Analyze pose keypoints to provide feedback.
    :param keypoints: List of keypoints with x, y, z, and visibility.
    :return: List of feedback messages.
    """
    feedback = []

    # Convert keypoints into a dictionary for easier access
    keypoint_map = {kp["id"]: kp for kp in keypoints}

    # Example: Check squat depth (hip below knee)
    if 23 in keypoint_map and 24 in keypoint_map and 25 in keypoint_map:
        left_hip = keypoint_map[23]
        right_hip = keypoint_map[24]
        left_knee = keypoint_map[25]
        right_knee = keypoint_map[26]

        # Average hip and knee positions
        avg_hip_y = (left_hip["y"] + right_hip["y"]) / 2
        avg_knee_y = (left_knee["y"] + right_knee["y"]) / 2

        if avg_hip_y > avg_knee_y:
            feedback.append("Go lower in your squat for better form.")

    # Example: Check back alignment (shoulders and hips aligned)
    if 11 in keypoint_map and 12 in keypoint_map and 23 in keypoint_map and 24 in keypoint_map:
        left_shoulder = keypoint_map[11]
        right_shoulder = keypoint_map[12]
        left_hip = keypoint_map[23]
        right_hip = keypoint_map[24]

        avg_shoulder_x = (left_shoulder["x"] + right_shoulder["x"]) / 2
        avg_hip_x = (left_hip["x"] + right_hip["x"]) / 2

        if abs(avg_shoulder_x - avg_hip_x) > 0.05:
            feedback.append("Keep your back straight during the exercise.")

    return feedback
