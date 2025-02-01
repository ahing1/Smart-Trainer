import React, { useState } from "react";
import VideoFeed from "./components/VideoFeed";
import WorkoutHistory from "./components/WorkoutHistory";
import WorkoutRecommendations from "./components/WorkoutRecommendations";

const App = () => {
  const [userId] = useState("123"); // Replace with real authentication logic

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1>Smart Personal Trainer</h1>
      <VideoFeed />
      <WorkoutHistory userId={userId} />
      <WorkoutRecommendations userId={userId} />
    </div>
  );
};

export default App;
