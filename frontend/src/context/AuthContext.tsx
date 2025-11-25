"use client";
import React, { createContext, useState, useEffect } from "react";
import api from "../lib/axios";

// Define context type
interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (fullName: string, phone: string, email: string, password: string) => Promise<void>;  // ⭐ ADDED
}

// Context
export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);

  // ⭐ ADDED — Tự gán Authorization header nếu có token
  const attachToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  };

  // 🔧 FIXED — login
  async function login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);

    // ⭐ ADDED — gán token vào axios
    attachToken();

    setUser(res.data.user);
  }

  async function logout() {
    localStorage.removeItem("token");

    // ⭐ ADDED — xoá header Authorization
    delete api.defaults.headers.common["Authorization"];

    setUser(null);
  }

  // ⭐ ADDED — register account
  async function register(fullName: string, phone: string, email: string, password: string) {
    const res = await api.post("/auth/register", {
      fullName,
      phoneNumber: phone,
      email,
      password,
    });

    // ⭐ OPTIONAL — tự động login sau khi đăng ký
    localStorage.setItem("token", res.data.token);
    attachToken();
    setUser(res.data.user);
  }

  async function loadUser() {
    const token = localStorage.getItem("token");
    if (token) {
      // ⭐ ADDED — gán lại token vào axios khi reload trang
      attachToken();

      try {
      //   // ❌ Backend chưa có API này → comment lại
      // const res = await api.get("/auth/me");
      // setUser(res.data);

      console.log("Token exists but /auth/me is not implemented");
      } catch (error) {
        console.log("Not logged in");
      }
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}> 
      {/* ⭐ register ADDED HERE */}
      {children}
    </AuthContext.Provider>
  );
}
