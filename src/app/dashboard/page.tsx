"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Redirect to login if user is not logged in and not signing out
  useEffect(() => {
    if (!loading && !user && !isSigningOut) {
      router.push("/login");
    }
  }, [loading, user, router, isSigningOut]);

  if (loading || (!user && !isSigningOut)) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="animate-pulse text-white text-2xl">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-purple-500/20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
          Welcome, {user?.email}!
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          This is your dashboard.
        </p>
        <button
          onClick={async () => {
            setIsSigningOut(true);
            await signOut();
            router.push("/");
          }}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
}