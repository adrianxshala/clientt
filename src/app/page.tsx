import Link from "next/link";
import ProductsPage from "./products/page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">MyApp</h1>
        <div className="flex gap-4">
          <Link href="/auth/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
          <Link href="/auth/signup">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8 gap-6">
        <h1 className="text-5xl font-bold text-gray-800 text-center">
          Welcome to My App
        </h1>
        <p className="text-gray-700 text-center max-w-xl">
          Your Next.js + Supabase Auth App. Log in or sign up to get started and manage your dashboard.
        </p>

        <div className="mt-6 flex gap-4">
          <Link href="/auth/signup">
            <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Get Started
            </button>
          </Link>
        </div>
      </main>
      <ProductsPage/>

      {/* Footer */}
      <footer className="w-full bg-white py-4 text-center text-gray-500 text-sm shadow-inner">
        © 2025 MyApp. All rights reserved.
      </footer>
    </div>
  );
}
