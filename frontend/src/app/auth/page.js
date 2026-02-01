"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const emailTrim = (email || "").trim();
      const passwordTrim = (password || "").trim();

      // Admin login (env with fallback so it works when .env isn't loaded)
      const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@siyaas.com").trim();
      const ADMIN_PASSWORD = (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123").trim();
      const ADMIN_TOKEN = (process.env.NEXT_PUBLIC_ADMIN_TOKEN || "admin-token").trim();

      if (emailTrim === ADMIN_EMAIL && passwordTrim === ADMIN_PASSWORD) {
        localStorage.setItem("user", JSON.stringify({ _id: "admin", fullName: "Admin", email: ADMIN_EMAIL }));
        localStorage.setItem("token", ADMIN_TOKEN);
        localStorage.setItem("authToken", ADMIN_TOKEN);
        alert("Admin login successful!");
        router.push("/admin");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailTrim, password: passwordTrim }),
      });

      if (response.ok) {
        const data = await response.json();
        const userWithId = {
          ...data.user,
          _id: data.user.id || data.user._id
        };
        localStorage.setItem("user", JSON.stringify(userWithId));
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        router.push("/profile");
      } else {
        const data = await response.json();
        setError(data.error || data.message || "Login failed");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // TODO: integrate with backend signup endpoint
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: name, email, password }),
      });

      if (response.ok) {
        // Backend returns just a message on signup, auto-login after
        const data = await response.json();
        alert("Signup successful! Please log in.");
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setName("");
        setConfirmPassword("");
      } else {
        const data = await response.json();
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-32 pb-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                }}
                className={`pb-4 font-medium text-sm transition-all ${
                  isLogin
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                }}
                className={`pb-4 font-medium text-sm transition-all ${
                  !isLogin
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign Up
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition-all disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-sm text-gray-600">
                  Forgot password?{" "}
                  <Link href="#" className="text-black font-medium hover:underline">
                    Reset here
                  </Link>
                </p>
              </form>
            ) : (
              /* Signup Form */
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition-all disabled:opacity-50"
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>

                <p className="text-center text-sm text-gray-600">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="text-black font-medium hover:underline">
                    Terms of Service
                  </Link>
                </p>
              </form>
            )}
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-black transition-all"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
