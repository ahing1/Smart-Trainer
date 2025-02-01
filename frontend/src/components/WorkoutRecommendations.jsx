import React, { useEffect, useState } from "react";
import {API} from "../services/api";

const WorkoutRecommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await API.get(`/recommendations/${userId}`);
        setRecommendations(response.data.recommended_workouts || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div style={{ marginTop: "20px", width: "80%" }}>
      <h2>Workout Recommendations</h2>
      {recommendations.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "2px solid black", padding: "8px" }}>Exercise</th>
              <th style={{ borderBottom: "2px solid black", padding: "8px" }}>Sets</th>
              <th style={{ borderBottom: "2px solid black", padding: "8px" }}>Reps</th>
              <th style={{ borderBottom: "2px solid black", padding: "8px" }}>Weight</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((workout, index) => (
              <tr key={index}>
                <td style={{ padding: "8px", borderBottom: "1px solid gray" }}>{workout.exercise}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid gray" }}>{workout.sets}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid gray" }}>{workout.reps}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid gray" }}>{workout.weight} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No recommendations yet. Log workouts to receive suggestions!</p>
      )}
    </div>
  );
};

export default WorkoutRecommendations;
