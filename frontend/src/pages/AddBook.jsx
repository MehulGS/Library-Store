// src/pages/AddBook.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // Import your Axios instance for API requests

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    availableCopies: 1,
    image: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Create form data object to handle image file
    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("genre", formData.genre);
    data.append("publicationDate", formData.publicationDate);
    data.append("availableCopies", formData.availableCopies);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      // Send POST request to add book to backend API
      await api.post("/books", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Book added successfully!");
      navigate("/my-books"); // Redirect to the My Books page after successful submission
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d1b3ff]">
      <div className="bg-[#330066] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#ff5500]">
          Add a New Book
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Publication Date
            </label>
            <input
              type="date"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Available Copies
            </label>
            <input
              type="number"
              name="availableCopies"
              value={formData.availableCopies}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border border-white rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Book Cover Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
            />
          </div>
          <button
            type="submit"
            className="w-full border border-[#d1b3ff] text-white py-2 rounded-lg font-semibold hover:bg-[#d1b3ff] hover:text-[#330066] transition duration-300"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
