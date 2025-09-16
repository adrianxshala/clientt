// src/app/(auth)/layout.tsx
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10">
        {children}
      </div>
    </div>
  );
}
