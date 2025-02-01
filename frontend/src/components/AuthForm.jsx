import React, { useState } from "react";
import { registerUser, loginUser } from "../services/auth";

const AuthForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await registerUser(username, password);
    alert("Registered successfully!");
  };

  const handleLogin = async () => {
    const userData = await loginUser(username, password);
    setUser(userData);
  };

  return (
    <div>
      <h2>Login / Register</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AuthForm;
 