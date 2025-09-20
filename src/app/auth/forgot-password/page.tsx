"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    if (!email.trim()) {
      setErrorMsg('Please enter your email address');
      setIsSubmitting(false);
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        setErrorMsg(error.message || 'An error occurred. Please try again.');
      } else {
        setSuccessMsg('Password reset email sent! Please check your inbox and follow the instructions.');
        setEmail('');
      }
    } catch (error) {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-purple-500/20">
        <h1 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">
          Reset Password
        </h1>
        
        <p className="text-gray-300 text-center mb-6">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
        
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
        
        <form className="space-y-6" onSubmit={handleResetPassword}>
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
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-400 text-sm">
          Remember your password?{" "}
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