import React from "react";

const WorkoutTable = ({ workouts }) => {
  return (
    <div>
      <h2>Logged Workouts</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>User ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Exercise</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Sets</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Reps</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Weight</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {workout.user_id}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {workout.exercise}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {workout.sets}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {workout.reps}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {workout.weight}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutTable;
