import React, { useState, useEffect } from "react";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutTable from "./components/WorkoutTable";
import VideoFeed from "./components/VideoFeed";
import {API} from "./services/api";

function App() {
  const [workouts, setWorkouts] = useState([]);

  // Fetch workouts from the backend
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await API.get("/workouts");
        setWorkouts(response.data.workouts);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchWorkouts();
  }, []);

  // Add a new workout to the table
  const handleWorkoutLogged = (newWorkout) => {
    setWorkouts((prev) => [...prev, newWorkout]);
  };

  return (
    <>
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#343a40" }}>
        Smart Personal Trainer
      </h1>
      <VideoFeed />
    </div>
    <div style={{ padding: "20px" }}>
      <h1>Workout Tracker</h1>
      <WorkoutForm onWorkoutLogged={handleWorkoutLogged} />
      <WorkoutTable workouts={workouts} />
    </div>
    </>
  );
}

export default App;
