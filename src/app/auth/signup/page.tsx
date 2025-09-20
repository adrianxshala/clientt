"use client";

import { useState, FormEvent, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const { user, loading, signUp } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    // Validation
    if (!email.trim() || !password || !confirmPassword) {
      setErrorMsg('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        switch (error.message) {
          case 'User already registered':
            setErrorMsg('An account with this email already exists. Please sign in instead.');
            break;
          case 'Password should be at least 6 characters':
            setErrorMsg('Password must be at least 6 characters long');
            break;
          default:
            setErrorMsg(error.message || 'An error occurred during signup. Please try again.');
        }
      } else {
        setSuccessMsg('Account created successfully! Please check your email to confirm your account.');
        // Clear form
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect authenticated users
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-pulse text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-purple-500/20">
        <h1 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">
          Create Account
        </h1>
        
        {errorMsg && (
          <div className="text-red-400 bg-red-900/20 rounded-lg p-3 mb-6 text-center border border-red-500/20">
            {errorMsg}
          </div>
        )}
        
        {successMsg && (
          <div className="text-green-400 bg-green-900/20 rounded-lg p-3 mb-6 text-center border border-green-500/20">
            {successMsg}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link 
            href="/auth/login" 
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}