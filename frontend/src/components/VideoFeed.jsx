import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";

const VideoFeed = () => {
  const webcamRef = useRef(null);
  const [feedback, setFeedback] = useState([]);
  const [keypoints, setKeypoints] = useState([]);

  useEffect(() => {
    const runPoseDetection = async () => {
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
      );

      const interval = setInterval(async () => {
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
          const video = webcamRef.current.video;
          const poses = await detector.estimatePoses(video);

          if (poses.length > 0) {
            setKeypoints(poses[0].keypoints);
            analyzePose(poses[0].keypoints);
          }
        }
      }, 200);

      return () => clearInterval(interval);
    };

    runPoseDetection();
  }, []);

  const analyzePose = (keypoints) => {
    let feedbackMessages = [];

    // Extract required keypoints
    const leftHip = keypoints.find((kp) => kp.name === "left_hip");
    const rightHip = keypoints.find((kp) => kp.name === "right_hip");
    const leftKnee = keypoints.find((kp) => kp.name === "left_knee");
    const rightKnee = keypoints.find((kp) => kp.name === "right_knee");
    const leftShoulder = keypoints.find((kp) => kp.name === "left_shoulder");
    const rightShoulder = keypoints.find((kp) => kp.name === "right_shoulder");
    const leftElbow = keypoints.find((kp) => kp.name === "left_elbow");
    const rightElbow = keypoints.find((kp) => kp.name === "right_elbow");

    /*** SQUAT ANALYSIS ***/
    if (leftHip && rightHip && leftKnee && rightKnee) {
      const avgHipY = (leftHip.y + rightHip.y) / 2;
      const avgKneeY = (leftKnee.y + rightKnee.y) / 2;

      if (avgHipY > avgKneeY) {
        feedbackMessages.push("Go lower in your squat for better form.");
      }

      const kneeDistance = Math.abs(leftKnee.x - rightKnee.x);
      const hipDistance = Math.abs(leftHip.x - rightHip.x);
      if (kneeDistance > hipDistance * 1.2) {
        feedbackMessages.push("Keep your knees aligned with your feet.");
      }
    }

    /*** PUSH-UP ANALYSIS ***/
    if (leftShoulder && rightShoulder && leftElbow && rightElbow) {
      const avgShoulderY = (leftShoulder.y + rightShoulder.y) / 2;
      const avgElbowY = (leftElbow.y + rightElbow.y) / 2;

      if (avgShoulderY > avgElbowY) {
        feedbackMessages.push("Lower yourself more in the push-up.");
      }

      if (Math.abs(leftElbow.x - rightElbow.x) < 0.1) {
        feedbackMessages.push("Widen your arms for better push-up form.");
      }
    }

    /*** POSTURE ANALYSIS (SHOULDER ALIGNMENT) ***/
    if (leftShoulder && rightShoulder && leftHip && rightHip) {
      const shoulderAlignment = Math.abs(leftShoulder.y - rightShoulder.y);
      const hipAlignment = Math.abs(leftHip.y - rightHip.y);

      if (shoulderAlignment > 0.05) {
        feedbackMessages.push("Keep your shoulders level.");
      }

      if (hipAlignment > 0.05) {
        feedbackMessages.push("Keep your hips balanced.");
      }
    }

    setFeedback(feedbackMessages);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Smart Personal Trainer (Real-Time AI)</h1>

      <div style={{ position: "relative", width: "640px", height: "480px" }}>
        <Webcam
          ref={webcamRef}
          style={{ width: "100%", height: "100%", border: "2px solid black" }}
        />

        {/* Overlay for Keypoints */}
        {keypoints && (
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
            {keypoints.map((keypoint, index) => (
              <div
                key={index}
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

      {/* Feedback Messages */}
      <div style={{ marginTop: "20px", color: "green" }}>
        {feedback.length > 0 ? (
          <ul>
            {feedback.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        ) : (
          <p>No feedback yet. Move in front of the camera!</p>
        )}
      </div>
    </div>
  );
};

export default VideoFeed;
