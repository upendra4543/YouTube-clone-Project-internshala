// services/videoService.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5300/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getVideos = async () => {
  return await API.get("/videos");
};
