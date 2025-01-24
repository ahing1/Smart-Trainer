import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { API } from "../services/api.jsx";

const VideoFeed = () => {
  const webcamRef = useRef(null); // Reference to the webcam
  const [feedback, setFeedback] = useState(null); // Store pose feedback

  // Define the function to capture a frame and send it to the backend
  const captureFrame = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot(); // Capture a frame as base64

      try {
        // Convert the base64 image to a blob
        const blob = await fetch(imageSrc).then((res) => res.blob());

        // Create a FormData object to send the image
        const formData = new FormData();
        formData.append("file", blob, "frame.jpg");

        // Send the frame to the backend for pose analysis
        const response = await API.post("/analyze_pose", formData);

        // Update feedback with pose keypoints
        setFeedback(response.data.keypoints);
      } catch (error) {
        console.error("Error analyzing pose:", error);
      }
    }
  }, [webcamRef]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Webcam feed */}
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Overlay feedback (keypoints or corrections) */}
      {feedback && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {feedback.map((keypoint) => (
            <div
              key={keypoint.id}
              style={{
                position: "absolute",
                left: `${keypoint.x * 100}%`,
                top: `${keypoint.y * 100}%`,
                width: "10px",
                height: "10px",
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Button to capture frame */}
      <button
        onClick={captureFrame}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Analyze Pose
      </button>
    </div>
  );
};

export default VideoFeed;
