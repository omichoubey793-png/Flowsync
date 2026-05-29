import { useState } from "react";
import axios from "axios";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
} from "lucide-react";

import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login({ setIsLoggedIn }) {

  const [showPassword, setShowPassword] =
    useState(false);

  const [isSignup, setIsSignup] =
    useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleToggleMode = (signUpMode) => {
    setIsSignup(signUpMode);
    setError("");
    setFullName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
      const payload = isSignup 
        ? { fullName, email, password } 
        : { email, password };

      const response = await axios.post(`${API_URL}${endpoint}`, payload);
      
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Auth error:", err);
      const errMsg = err.response?.data?.msg || err.message || "An authentication error occurred";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-black flex overflow-hidden">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">

        {/* GLOW */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-red-600/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-red-500/20 blur-[120px] rounded-full"></div>

        {/* CONTENT */}
        <motion.div

          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.8,
          }}

          className="relative z-10 max-w-xl px-12"
        >

          {/* DOG */}
          <img
            src="/doglogo.jpeg"
            alt="FlowSync"
            className="w-24 h-24 rounded-full object-cover border-4 border-red-500/30 shadow-[0_0_50px_rgba(255,0,0,0.3)]"
          />

          {/* TEXT */}
          <h1 className="mt-8 text-7xl font-black leading-none text-white">

            FlowSync

          </h1>

          <p className="mt-6 text-xl text-gray-400 leading-relaxed">

            Discover creative inspirations,
            cinematic aesthetics, and modern
            digital experiences in one immersive platform.

          </p>

          {/* TAGS */}
          <div className="mt-10 flex flex-wrap gap-4">

            <div className="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white">
              Pinterest Inspired
            </div>

            <div className="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white">
              Cinematic UI
            </div>

            <div className="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white">
              Creative Platform
            </div>

          </div>

        </motion.div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">

        {/* GLOW */}
        <div className="absolute top-[10%] right-[-100px] w-[300px] h-[300px] bg-red-600/20 blur-[100px] rounded-full"></div>

        {/* CARD */}
        <motion.div

          initial={{
            opacity: 0,
            scale: 0.9,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          transition={{
            duration: 0.7,
          }}

          className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-[0_10px_80px_rgba(255,0,0,0.15)]"
        >

          {/* MOBILE LOGO */}
          <div className="lg:hidden flex flex-col items-center mb-8">

            {/* DOG LOGO */}
            <img
              src="/doglogo.jpeg"
              alt="FlowSync Dog"
              className="relative w-12 h-12 rounded-2xl object-cover border border-red-500/30 shadow-[0_0_20px_rgba(255,0,0,0.35)] group-hover:scale-105 transition-all duration-300"
            />

            <h1 className="mt-4 text-4xl font-black text-white">
              FlowSync
            </h1>

          </div>

          {/* HEADING */}
          <div>

            <h2 className="text-4xl font-black text-white">

              {isSignup
                ? "Create Account"
                : "Welcome Back"}

            </h2>

            <p className="mt-3 text-gray-400">

              {isSignup
                ? "Start your cinematic creative journey."
                : "Login to continue exploring inspirations."}

            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold text-center"
              >
                {error}
              </motion.div>
            )}

          </div>

          {/* TOGGLE */}
          <div className="mt-8 flex rounded-2xl bg-white/5 p-1 border border-white/10">

            <button
              type="button"
              onClick={() => handleToggleMode(false)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                !isSignup
                  ? "bg-red-500 text-white shadow-lg"
                  : "text-gray-400"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => handleToggleMode(true)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                isSignup
                  ? "bg-red-500 text-white shadow-lg"
                  : "text-gray-400"
              }`}
            >
              Signup
            </button>

          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* NAME */}
            {isSignup && (

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full rounded-2xl bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white outline-none focus:border-red-500/50 transition-all"
                />

              </div>
            )}

            {/* EMAIL */}
            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white outline-none focus:border-red-500/50 transition-all"
              />

            </div>

            {/* PASSWORD */}
            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl bg-white/5 border border-white/10 py-4 pl-12 pr-14 text-white outline-none focus:border-red-500/50 transition-all"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >

                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}

              </button>

            </div>

            {/* OPTIONS */}
            {!isSignup && (

              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-gray-400 cursor-pointer">

                  <input type="checkbox" className="rounded border-white/10 bg-white/5 accent-red-500" />

                  Remember me

                </label>

                <button type="button" className="text-red-400 hover:text-red-300 transition">
                  Forgot Password?
                </button>

              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-[0_10px_40px_rgba(255,0,0,0.35)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                isSignup ? "Create Account" : "Login to FlowSync"
              )}
            </button>

          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-8">

            <div className="flex-1 h-px bg-white/10"></div>

            <span className="text-sm text-gray-500">
              OR
            </span>

            <div className="flex-1 h-px bg-white/10"></div>

          </div>

          {/* SOCIALS */}
          <div className="space-y-4">

            <button className="w-full py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all">

              Continue with Google

            </button>

            <button className="w-full py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all">

              Continue with GitHub

            </button>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Login;