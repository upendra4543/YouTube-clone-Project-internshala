import axios from "axios";

export const VideoAPI = axios.create({
  baseURL: "http://localhost:5300/api/videos",
});

VideoAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Optionally export helper functions
export const fetchVideos = () => VideoAPI.get("/");
export const fetchVideoById = (videoId) => VideoAPI.get(`/${videoId}`);
