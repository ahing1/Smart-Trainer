import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import {API} from "../services/api";

const VideoFeed = () => {
  const webcamRef = useRef(null); // Reference to the webcam
  const [feedback, setFeedback] = useState(null); // Store pose feedback

  // Capture a frame from the webcam and send it to the backend
  const captureFrame = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot(); // Capture a frame as base64
      try {
        // Convert base64 image to blob
        const blob = await fetch(imageSrc).then((res) => res.blob());

        // Create FormData and send to backend
        const formData = new FormData();
        formData.append("file", blob, "frame.jpg");

        const response = await API.post("/analyze_pose", formData);
        setFeedback(response.data.keypoints); // Update feedback with keypoints
      } catch (error) {
        console.error("Error analyzing pose:", error);
      }
    }
  }, [webcamRef]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa", // Light background for contrast
        textAlign: "center",
      }}
    >

      {/* Webcam container */}
      <div
        style={{
          position: "relative",
          width: "640px",
          height: "480px",
          border: "2px solid #dee2e6",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Overlay for feedback */}
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
                  width: "8px",
                  height: "8px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Analyze Pose button */}
      <button
        onClick={captureFrame}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        Analyze Pose
      </button>
    </div>
  );
};

export default VideoFeed;
