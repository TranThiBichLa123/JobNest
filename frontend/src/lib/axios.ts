import axios, { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// FIXED interceptor type
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // prevent SSR crash
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
