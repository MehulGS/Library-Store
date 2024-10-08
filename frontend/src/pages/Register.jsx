// src/pages/Register.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaTwitter, FaLinkedinIn } from "react-icons/fa"; // Importing icons

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(""); // State for error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      await register(formData.username, formData.email, formData.password);
      navigate("/"); // Redirect to homepage after registration
    } catch (error) {
      // Set the error message from the server or display a generic message
      setError(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#d1b3ff]">
      <div className="bg-[#330066] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#ff5500]">Register</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
            />
          </div>
          <button
            type="submit"
            className="w-full border border-[#d1b3ff] text-white py-2 rounded-md font-semibold hover:bg-[#d1b3ff] hover:text-[#330066] transition duration-300"
          >
            Sign up
          </button>
        </form>
        <p className="text-center text-white mt-4">
          Have an account?{" "}
          <Link to="/login" className="text-[#ff5500]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
