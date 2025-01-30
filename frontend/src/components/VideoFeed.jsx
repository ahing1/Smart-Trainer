import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import {API} from "../services/api";

const VideoFeed = () => {
  const webcamRef = useRef(null);
  const [keypoints, setKeypoints] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isProcessing) {
        captureFrame();
      }
    }, 2000); // Capture frame every 2 seconds

    return () => clearInterval(interval);
  }, [isProcessing]); // Run only when `isProcessing` state changes

  const captureFrame = async () => {
    if (webcamRef.current) {
      setIsProcessing(true); // Prevent multiple concurrent API calls
      const imageSrc = webcamRef.current.getScreenshot();

      try {
        const blob = await fetch(imageSrc).then((res) => res.blob());
        const formData = new FormData();
        formData.append("file", blob, "frame.jpg");

        const response = await API.post("/analyze_pose", formData);
        setKeypoints(response.data.keypoints);
        setFeedback(response.data.feedback);
      } catch (error) {
        console.error("Error analyzing pose:", error);
      }
      setIsProcessing(false);
    }
  };

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
        Smart Personal Trainer (Real-Time)
      </h1>

      {/* Webcam Feed */}
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

        {/* Pose Keypoints Overlay */}
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

      {/* Feedback Section */}
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
          <p>No feedback yet. Performing analysis...</p>
        )}
      </div>
    </div>
  );
};

export default VideoFeed;
