"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { confirmPassword, ...userData } = formData;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Registration failed");
    } else {
      router.push("/login"); // redirect to login page
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto mt-10 p-4 border rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <input
        name="fullname"
        placeholder="Full Name"
        onChange={handleChange}
        required
        className="w-full p-2 border"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="w-full p-2 border"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        required
        className="w-full p-2 border"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="w-full p-2 border"
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        required
        className="w-full p-2 border"
      />

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Register
      </button>
    </form>
  );
}
