import {API} from "./api";

export const registerUser = async (username, password) => {
  return API.post("/register", { username, password });
};

export const loginUser = async (username, password) => {
  const response = await API.post("/login", { username, password });
  localStorage.setItem("token", response.data.access_token);
  return response.data;
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
