"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const { error } = await signOut();
      if (error) {
        console.error('Sign out error:', error);
        // Still redirect even if there's an error
      }
      router.push("/");
    } catch (error) {
      console.error('Unexpected sign out error:', error);
      router.push("/");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-pulse text-white text-2xl">Loading...</div>
      </div>
    );
  }

  // This should be handled by middleware, but as a fallback
  if (!user) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                Welcome, {user.email}
              </span>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Welcome Card */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              Welcome Back!
            </h2>
            <p className="text-gray-300">
              You&apos;re successfully authenticated and can access protected content.
            </p>
          </div>

          {/* User Info Card */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              Account Info
            </h2>
            <div className="space-y-2 text-gray-300">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Last Sign In:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              Security
            </h2>
            <p className="text-gray-300 mb-4">
              Your session is secure and protected by middleware.
            </p>
            <div className="flex items-center text-green-400">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1L5 6v4c0 5.55 3.84 9.74 9 9.74S19 15.55 19 10V6l-5-5-4 0z" clipRule="evenodd" />
              </svg>
              Session Active
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}