// src/pages/EditBook.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api"; // Axios instance for API requests

const EditBook = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    availableCopies: 1,
  });
  const [image, setImage] = useState(null); // State for storing the new image
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the current book details using the book ID
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        const book = response.data;
        setFormData({
          title: book.title,
          author: book.author,
          genre: book.genre,
          publicationDate: book.publicationDate.split("T")[0], // Format for date input
          availableCopies: book.availableCopies,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Failed to load book details.");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change for the image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("author", formData.author);
    updatedData.append("genre", formData.genre);
    updatedData.append("publicationDate", formData.publicationDate);
    updatedData.append("availableCopies", formData.availableCopies);

    if (image) {
      updatedData.append("image", image); // Append the image only if it's updated
    }

    try {
      await api.put(`/books/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data", // For handling file uploads
        },
      });
      navigate("/my-books"); // Redirect to "My Books" page after successful update
    } catch (error) {
      console.error("Error updating the book:", error);
      setError("Failed to update the book. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d1b3ff]">
      <div className="bg-[#330066] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#ff5500]">Edit Book</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              required
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              required
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              required
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Publication Date</label>
            <input
              type="date"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              required
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Available Copies</label>
            <input
              type="number"
              name="availableCopies"
              value={formData.availableCopies}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Upload New Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#d1b3ff]"
            />
          </div>
          <button
            type="submit"
            className="w-full border border-[#d1b3ff] text-white py-2 rounded-md font-semibold hover:bg-[#d1b3ff] hover:text-[#330066] transition duration-300"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
