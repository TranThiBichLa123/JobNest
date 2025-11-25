"use client";

import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function LoginModal({
  show,
  onClose,
  onOpenForgot,
  onOpenRegister,
}: {
  show: boolean;
  onClose: () => void;
  onOpenForgot: () => void;
  onOpenRegister: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[30000]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 w-[600px] max-w-[95%] rounded-xl shadow-xl p-8 relative"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6">Login to continue</h2>

        {/* Google */}
        <div className="mb-6 gap-3">
          <button className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 ">
            <Image src="/images/gg.png" width={22} height={22} alt="Google" />
            <span>with Google account</span>
          </button>
        </div>

        <div className="text-center text-gray-500 my-3">or login by email</div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-4 py-2 mt-1 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-medium">
              Password <span className="text-red-500">*</span>
            </label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:border-blue-500 pr-10"
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

            {/* Forgot password */}
            <div
              className="text-right mt-1 text-blue-600 text-sm cursor-pointer"
              onClick={() => {
                onClose();
                onOpenForgot();
              }}
            >
              Forgot password?
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button className="px-6 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800">
            Login
          </button>
        </div>

        <div className="mt-6 text-center text-sm">
          Don't have an account yet?
          <span
            className="text-blue-600 cursor-pointer ml-1"
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
}
