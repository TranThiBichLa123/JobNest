"use client";
import React, { createContext, useState, useEffect } from "react";
import { api } from "../lib/axios";

// Define context type
interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Context
export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);

  async function login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  }

  async function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  async function loadUser() {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await api.get("/auth/me");
      setUser(res.data);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
