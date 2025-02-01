import React, { useEffect, useState } from "react";
import {API} from "../services/api";
import { getAuthHeaders } from "../services/auth";

const WorkoutHistory = ({ userId }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await API.get("/workouts", { headers: getAuthHeaders() });
        setWorkouts(response.data.workouts);
      } catch (error) {
        console.error("Error fetching workout history:", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div style={{ marginTop: "20px", width: "80%" }}>
      <h2>Your Workout History</h2>
      {workouts.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "2px solid black", padding: "8px" }}>Date</th>
              <th style={{ borderBottom: "2px solid black", padding: "8px" }}>Exercise</th>
              <th style={{ borderBottom: "2px solid black", padding: "8px" }}>Sets</th>
              <th style={{ borderBottom: "2px solid black", padding: "8px" }}>Reps</th>
              <th style={{ borderBottom: "2px solid black", padding: "8px" }}>Weight</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id}>
                <td style={{ padding: "8px", borderBottom: "1px solid gray" }}>{workout.date}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid gray" }}>{workout.exercise}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid gray" }}>{workout.sets}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid gray" }}>{workout.reps}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid gray" }}>{workout.weight} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No workouts logged yet.</p>
      )}
    </div>
  );
};

export default WorkoutHistory;
