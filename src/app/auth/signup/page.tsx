"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { user, loading, signUp } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const { error } = await signUp(email, password);
    if (error) {
      setErrorMsg(error.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="animate-pulse text-white text-2xl">Loading...</div>
    </div>
  );
  if (user) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-purple-500/20">
        <h1 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">
          Create Account
        </h1>
        {errorMsg && (
          <p className="text-red-400 bg-red-900/20 rounded-lg p-3 mb-6 text-center animate-pulse">
            {errorMsg}
          </p>
        )}
        <div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>
            <button
              type="button"
              onClick={handleSignup}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
          <p className="mt-6 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <a href="/auth/login" className="text-purple-400 hover:text-purple-300 transition-colors">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}