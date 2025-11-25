"use client";

import Image from "next/image";

export default function ForgotPasswordModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[30000]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 w-[500px] max-w-[95%] rounded-xl shadow-xl p-8 relative"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Forgot Password
        </h2>

        {/* IMAGE */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/security.png"
            width={150}
            height={150}
            alt="security"
          />
        </div>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
          Enter your email below. We will send you a password reset link.
        </p>

        {/* INPUT EMAIL */}
        <div className="mb-6">
          <label className="font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-4 py-2 mt-1 outline-none focus:border-blue-500"
          />
        </div>

        {/* BUTTON */}
        <button className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-2 rounded-lg">
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
