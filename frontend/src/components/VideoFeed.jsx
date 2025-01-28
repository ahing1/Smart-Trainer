import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import {API} from "../services/api";

const VideoFeed = () => {
  const webcamRef = useRef(null);
  const [feedback, setFeedback] = useState([]);
  const [keypoints, setKeypoints] = useState([]);

  const captureFrame = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      try {
        const blob = await fetch(imageSrc).then((res) => res.blob());
        const formData = new FormData();
        formData.append("file", blob, "frame.jpg");

        const response = await API.post("/analyze_pose", formData);
        setKeypoints(response.data.keypoints); // Update keypoints
        setFeedback(response.data.feedback); // Update feedback messages
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
        backgroundColor: "#f8f9fa",
      }}
    >
      <h1 style={{ marginBottom: "20px", fontSize: "2rem", color: "#343a40" }}>
        Smart Personal Trainer
      </h1>

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

        {keypoints && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {keypoints.map((keypoint) => (
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
        }}
      >
        Analyze Pose
      </button>

      <div style={{ marginTop: "20px", textAlign: "center", width: "80%" }}>
        <h2>Feedback:</h2>
        {feedback.length > 0 ? (
          <ul>
            {feedback.map((msg, index) => (
              <li key={index} style={{ color: "green", fontWeight: "bold" }}>
                {msg}
              </li>
            ))}
          </ul>
        ) : (
          <p>No feedback yet. Perform an exercise to see feedback.</p>
        )}
      </div>
    </div>
  );
};

export default VideoFeed;
