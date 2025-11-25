"use client";

import { GoogleLogin } from "@react-oauth/google";
import api from "@/lib/axios";

export default function GoogleRegisterButton({ onSuccess }: { onSuccess: (data: any) => void }) {
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
            });

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
