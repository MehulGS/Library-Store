// src/pages/Login.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(""); // State for error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!formData.email || !formData.password) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate("/"); // Redirect to homepage after login
    } catch (error) {
      // Set the error message from the server or display a generic message
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#d1b3ff]">
      <div className="bg-[#330066] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#ff5500]">Login</h2>
        <p className="text-center text-white mb-4">
          Welcome back! Please login to your account.
        </p>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="w-full border border-[#d1b3ff] text-white py-2 rounded-md font-semibold hover:bg-[#d1b3ff] hover:text-[#330066] transition duration-300"
          >
            Log in
          </button>
        </form>
        <p className="text-center text-white mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#ff5500]">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
