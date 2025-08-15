

import axios from "axios";

export const AuthAPI = axios.create({
  baseURL: "http://localhost:5300/api/auth",
});

// Attach token
AuthAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup = (userData) => AuthAPI.post("/signup", userData);
export const login = (userData) => AuthAPI.post("/login", userData);
