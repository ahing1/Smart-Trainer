import React, { useEffect, useState } from "react";
import {API} from "../services/api";
import { getAuthHeaders } from "../services/auth";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [streakData, setStreakData] = useState({ current_streak: 0, longest_streak: 0 });

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await API.get("/achievements", { headers: getAuthHeaders() });
        setAchievements(response.data.achievements);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    const fetchStreak = async () => {
      try {
        const response = await API.get("/workouts", { headers: getAuthHeaders() });
        if (response.data.streak_data) {
          setStreakData(response.data.streak_data);
        }
      } catch (error) {
        console.error("Error fetching streak data:", error);
      }
    };

    fetchAchievements();
    fetchStreak();
  }, []);

  return (
    <div style={{ marginTop: "20px", width: "80%" }}>
      <h2>Achievements & Streaks</h2>
      <p>🔥 Current Streak: {streakData.current_streak} days</p>
      <p>🏆 Longest Streak: {streakData.longest_streak} days</p>

      {achievements.length > 0 ? (
        <ul>
          {achievements.map((achievement, index) => (
            <li key={index} style={{ color: "green", fontWeight: "bold" }}>
              {achievement}
            </li>
          ))}
        </ul>
      ) : (
        <p>No achievements yet. Keep working out!</p>
      )}
    </div>
  );
};

export default Achievements;
