import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  // Redirect to book details on click
  const handleClick = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#330066] rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      {/* Book Image */}
      <img
        src={
          book.imageUrl
            ? `http://localhost:7890${book.imageUrl}`
            : "/no-image.png"
        }
        alt={book.title}
        className="w-full h-96 object-cover"
      />

      {/* Book Details */}
      <div className="p-6 text-left">
        <h3 className="text-2xl font-semibold text-[#ff5500] mb-2">
          {book.title}
        </h3>
        <p className="text-white mb-1 font-medium">By: {book.author}</p>
        <p className="text-white mb-1">Genre: {book.genre}</p>
        <p className="text-white mb-1">
          Published: {new Date(book.publicationDate).toLocaleDateString()}
        </p>
        <p className="text-white mb-4">
          Available Copies: {book.availableCopies}
        </p>

        {/* Button */}
        <button className="text-[#d1b3ff] font-medium border border-[#d1b3ff] rounded-full py-2 px-6 hover:bg-[#d1b3ff] hover:text-[#330066] transition duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;
