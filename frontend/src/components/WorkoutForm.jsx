import React, { useState } from "react";
import {API} from "../services/api";

const WorkoutForm = ({ onWorkoutLogged }) => {
  const [formData, setFormData] = useState({
    user_id: "",
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/workouts", formData);
      alert("Workout logged successfully!");
      onWorkoutLogged(response.data); // Notify parent about the new workout
      setFormData({
        user_id: "",
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
      });
    } catch (error) {
      console.error("Error logging workout:", error);
      alert("Failed to log workout.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Log a Workout</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>User ID:</label>
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Exercise:</label>
        <input
          type="text"
          name="exercise"
          value={formData.exercise}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Sets:</label>
        <input
          type="number"
          name="sets"
          value={formData.sets}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Reps:</label>
        <input
          type="number"
          name="reps"
          value={formData.reps}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Weight:</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>
      <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
        Log Workout
      </button>
    </form>
  );
};

export default WorkoutForm;
