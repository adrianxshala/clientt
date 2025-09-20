"use client";

import { useState, FormEvent, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for URL error parameters
  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'callback_error') {
      setErrorMsg('There was an error processing your login. Please try again.');
    }
  }, [searchParams]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    // Basic validation
    if (!email.trim() || !password) {
      setErrorMsg('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        // Handle specific error types
        switch (error.message) {
          case 'Invalid login credentials':
            setErrorMsg('Invalid email or password. Please check your credentials and try again.');
            break;
          case 'Email not confirmed':
            setErrorMsg('Please check your email and click the confirmation link before signing in.');
            break;
          case 'Too many requests':
            setErrorMsg('Too many login attempts. Please wait a moment before trying again.');
            break;
          default:
            setErrorMsg(error.message || 'An error occurred during login. Please try again.');
        }
      } else {
        // Success - redirect will be handled by middleware
        router.push('/dashboard');
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
          Welcome Back
        </h1>
        
        {errorMsg && (
          <div className="text-red-400 bg-red-900/20 rounded-lg p-3 mb-6 text-center border border-red-500/20">
            {errorMsg}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link 
            href="/auth/forgot-password" 
            className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
          >
            Forgot your password?
          </Link>
        </div>
        
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link 
            href="/auth/signup" 
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}