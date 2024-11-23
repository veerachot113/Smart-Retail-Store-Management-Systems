import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-100"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1830&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // URL ของภาพพื้นหลัง
      }}
    >
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          SMART <span className="bg-[#f84525] text-white px-2 rounded-md">RETAIL STORE</span>
        </h1>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block font-medium text-sm text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-sm text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <i className="bx bx-hide text-lg"></i>
                ) : (
                  <i className="bx bx-show text-lg"></i>
                )}
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" />
              <span className="ml-2 text-sm text-gray-600">Remember Me</span>
            </label>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#f84525] text-white rounded-md hover:bg-red-800 transition"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
