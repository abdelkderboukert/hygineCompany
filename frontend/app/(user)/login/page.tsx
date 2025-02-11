"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as motion from "motion/react-client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/admin"); // Redirect to admin home
    } else {
      setError(data.message || "Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="h-screen flex flex-col justify-center items-center"
    >
      <h1 className="text-5xl font-bold select-none">Admin Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <motion.input
        type="email"
        value={email}
        whileHover={{ scale: 1.1 }}
        className="border border-black w-64 h-12 p-3 rounded-md my-4 shadow-lg"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <motion.input
        type="password"
        value={password}
        whileHover={{ scale: 1.1 }}
        className="border border-black w-64 h-12 p-3 rounded-md mb-4 shadow-lg"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="border border-black w-64 h-12 p-3 rounded-md mb-4 text-white font-bold bg-black shadow-lg"
        type="submit"
      >
        Login
      </motion.button>
    </form>
  );
}
