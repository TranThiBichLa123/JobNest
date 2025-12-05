"use client";

import { GoogleLogin } from "@react-oauth/google";
import api from "@/lib/axios";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function GoogleRegisterButton({ 
  role = "CANDIDATE",
  onSuccess 
}: { 
  role?: "CANDIDATE" | "EMPLOYER";
  onSuccess: (data: any) => void;
}) {
  const auth = useContext(AuthContext);

  return (
    <div className="flex justify-center">
      <GoogleLogin
        theme="outline"         // nền trắng viền xám chuẩn Google
        shape="rectangular"
        size="large"
        width="260"
        text="signup_with"      // ⭐ Nút Google: "Sign up with Google"

        onSuccess={async (res) => {
          try {
            const result = await api.post("/auth/google/verify", {
              credential: res.credential,   // ⭐ gửi đúng format cho backend
              role: role                     // ⭐ send user's selected role
            });

            // Store tokens from response
            const { accessToken, refreshToken, account } = result.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            
            // Update auth context
            if (auth) {
              auth.refreshToken();
            }

            onSuccess(result.data);
          } catch (err) {
            console.error(err);
            alert("Google Register Failed!");
          }
        }}

        onError={() => {
          alert("Google Register Failed!");
        }}
      />
    </div>
  );
}
