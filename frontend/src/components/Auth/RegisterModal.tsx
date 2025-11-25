"use client";

import React, { useState, useContext } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "@/context/AuthContext";
import GoogleRegisterButton from "@/components/Auth/GoogleRegisterButton";

export default function RegisterModal({
  onClose,
  onOpenLogin,
}: {
  onClose: () => void;
  onOpenLogin?: () => void;
}) {
  const auth = useContext(AuthContext);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister() {
    try {
      const fullName = `${name} ${surname}`.trim();

      await auth?.register(fullName, phoneNumber, email, password);
      alert("Register successful!");

      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || "Register failed");
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[30000]"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 w-[650px] max-w-[95%] rounded-xl shadow-xl p-10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-3xl font-semibold mb-6 text-center">
          Sign up as a member!
        </h2>

        {/* ---------------- GOOGLE REGISTER ---------------- */}
        <div className="mb-8 text-center">
          

          <GoogleRegisterButton
            onSuccess={(data: any) => {
              alert("Google Register successful!");
              console.log("Google Registered user:", data);
              onClose();
            }}
          />
        </div>

        {/* Separator */}
       

        {/* Form */}
        <div className="grid gap-4 mb-4">
          <div>
            <label className="font-medium">Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 mt-1 outline-none focus:border-blue-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">Surname</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 mt-1 outline-none focus:border-blue-500"
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="font-medium">Phone number</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 mt-1 outline-none focus:border-blue-500"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="font-medium">Email</label>
          <input
            type="email"
            placeholder="Use a real email for authentication."
            className="w-full border rounded-lg px-4 py-2 mt-1 outline-none focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="font-medium">Password</label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="At least 6 characters"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:border-blue-500 pr-12"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 mb-6">
          <input type="checkbox" className="mt-1" />
          <p className="text-sm">
            I accept the{" "}
            <span className="text-blue-600 cursor-pointer">Usage agreement</span>{" "}
            and{" "}
            <span className="text-blue-600 cursor-pointer">
              Security regulations
            </span>{" "}
            of JobNest.
          </p>
        </div>

        {/* Submit */}
        <button
          onClick={handleRegister}
          className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600"
        >
          Register
        </button>

        {/* Login link */}
        <div className="mt-6 text-center text-sm">
          Already a member?
          <span
            className="text-blue-600 cursor-pointer ml-1"
            onClick={() => {
              onClose();
              onOpenLogin?.();
            }}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
