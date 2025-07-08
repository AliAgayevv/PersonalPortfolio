"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/services/authService";
import { setItem } from "@/utils/localStorage";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const { token } = await loginAdmin(username, password);
      setItem("adminToken", token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login error");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          autoComplete="username"
          autoFocus
          className="w-full border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
