import axios from "axios"

export const backendURL = import.meta.env.VITE_BACKEND_URL;

export const API = axios.create({ baseURL: `${backendURL}` });
