// src/pages/BookDetails.js
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api"; // Import API instance
import { AuthContext } from "../context/AuthContext"; // Import AuthContext for user

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBorrowed, setIsBorrowed] = useState(false); // Track if the user has borrowed the book
  const { user } = useContext(AuthContext); // Get the logged-in user (can be null if not logged in)

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/books/${id}`); // Fetch book details by ID
        setBook(response.data);
        setLoading(false);

        // Check if the book is borrowed by the current user (if user is logged in)
        if (user && response.data.borrowedBy.includes(user._id)) {
          setIsBorrowed(true); // If the user has already borrowed the book
        }
      } catch (err) {
        setError("Error fetching book details");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, user]);

  // Handle Borrow Book action (only for logged-in users)
  const handleBorrow = async () => {
    try {
      await api.post(`/books/${id}/borrow`);
      setIsBorrowed(true); // Update state to reflect the book has been borrowed
      setBook((prevBook) => ({
        ...prevBook,
        availableCopies: prevBook.availableCopies - 1,
      }));
    } catch (err) {
      setError("Error borrowing book");
    }
  };

  // Handle Return Book action (only for logged-in users)
  const handleReturn = async () => {
    try {
      await api.post(`/books/${id}/return`);
      setIsBorrowed(false); // Update state to reflect the book has been returned
      setBook((prevBook) => ({
        ...prevBook,
        availableCopies: prevBook.availableCopies + 1,
      }));
    } catch (err) {
      setError("Error returning book");
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Loading book details...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-[#d1b3ff] text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-500 mb-4">Book Details</h1>
          <p className="text-black text-xl">Discover the story behind this book</p>
        </div>

        {book && (
          <div className="flex flex-col lg:flex-row items-center bg-[#330066] rounded-lg shadow-lg p-6">
            {/* Book Image - Right Side on Large Screens */}
            <div className="lg:w-1/3 w-full flex justify-center mb-6 lg:mb-0">
              <div className="relative p-6 border-8 border-orange-500 rounded">
                <img
                  src={
                    book.imageUrl
                      ? `http://localhost:7890${book.imageUrl}`
                      : "/no-image.png"
                  }
                  alt={book.title}
                  className="w-full h-auto object-cover rounded"
                />
              </div>
            </div>

            {/* Book Details - Left Side on Large Screens */}
            <div className="lg:w-2/3 w-full lg:pl-10">
              <h2 className="text-3xl font-bold mb-4 text-orange-500">{book.title}</h2>
              <p className="text-xl font-semibold mb-4">By {book.author}</p>

              <div className="mb-6">
                <p className="text-lg">
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p className="text-lg">
                  <strong>Published:</strong> {new Date(book.publicationDate).toLocaleDateString()}
                </p>
                <p className="text-lg">
                  <strong>Available Copies:</strong> {book.availableCopies}
                </p>
              </div>

              <p className="text-lg mb-6">{book.description}</p>

              {/* Borrow or Return Book Buttons */}
              {user && (
                <div className="mt-4">
                  {isBorrowed ? (
                    <button
                      onClick={handleReturn}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition duration-300"
                    >
                      Return Book
                    </button>
                  ) : book.availableCopies > 0 ? (
                    <button
                      onClick={handleBorrow}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded transition duration-300"
                    >
                      Borrow Book
                    </button>
                  ) : (
                    <p className="text-red-500 text-lg">No copies available for borrowing</p>
                  )}
                </div>
              )}

              {/* If user is not logged in */}
              {!user && (
                <p className="text-yellow-400 text-lg mt-4">
                  Please log in to borrow this book.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
