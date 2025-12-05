"use client";
import React, { createContext, useState, useEffect } from "react";
import api from "../lib/axios";
import { User, LoginRequest, RegisterRequest, AuthResponse } from "@/types/user";

// Define context type
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  refreshToken: () => Promise<void>;
  isLoading: boolean;
}

// Context
export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Attach token to axios headers
  const attachToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  };

  // Login function
  async function login(credentials: LoginRequest) {
    const res = await api.post<AuthResponse>("/auth/login", credentials);

    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);

    attachToken();
    setUser(res.data.account);
  }

  // Logout function
  async function logout() {
    const refreshTok = localStorage.getItem("refreshToken");
    
    try {
      await api.post("/auth/logout", { refreshToken: refreshTok });
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  }

  // Register function
  async function register(data: RegisterRequest) {
    await api.post("/auth/register", data);
    // Registration successful - user needs to verify email before logging in
    // Do NOT store tokens or set user
  }

  // Refresh token function
  async function refreshToken() {
    const refreshTok = localStorage.getItem("refreshToken");
    if (!refreshTok) return;

    try {
      const res = await api.post<AuthResponse>("/auth/refresh", { refreshToken: refreshTok });
      
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      
      attachToken();
      setUser(res.data.account);
    } catch (error) {
      console.error("Refresh token failed:", error);
      logout();
    }
  }

  // Load user on mount
  async function loadUser() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      attachToken();

      try {
        const res = await api.get<User>("/auth/me");
        setUser(res.data);
      } catch (error: any) {
        // Only log non-401 errors (401 is expected when not logged in)
        if (error.response?.status !== 401) {
          console.error("Failed to load user:", error);
        }
        
        // Try to refresh token if we have one
        const refreshTok = localStorage.getItem("refreshToken");
        if (refreshTok) {
          try {
            await refreshToken();
          } catch (refreshError) {
            // Refresh failed, clear tokens
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            delete api.defaults.headers.common["Authorization"];
          }
        } else {
          // No refresh token, clear access token
          localStorage.removeItem("accessToken");
          delete api.defaults.headers.common["Authorization"];
        }
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, refreshToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
