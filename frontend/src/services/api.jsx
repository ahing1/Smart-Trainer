import axios from "axios"

export const API = axios.create({ baseURL: "http://127.0.0.1:5000" });

export const checkHealth = async () => {
    try{
        const response = await API.get("/health");
        return response.data;
    } catch (error) {
        console.error("Health check failed: ", error);
    }
}