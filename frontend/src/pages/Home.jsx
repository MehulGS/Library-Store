import React, { useEffect, useState } from "react";
import api from "../api/api"; // Ensure API instance is imported
import BookCard from "../components/BookCard"; // Import BookCard component

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for filters
  const [filterGenre, setFilterGenre] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Fetch all books from backend API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        setBooks(response.data); // Store fetched books in state
        setLoading(false);
      } catch (err) {
        setError("Error fetching books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on genre, author, and publication date
  const filteredBooks = books.filter((book) => {
    const matchGenre = filterGenre
      ? book.genre.toLowerCase().includes(filterGenre.toLowerCase())
      : true;
    const matchAuthor = filterAuthor
      ? book.author.toLowerCase().includes(filterAuthor.toLowerCase())
      : true;
    const matchDate = filterDate
      ? new Date(book.publicationDate).getFullYear() === parseInt(filterDate)
      : true;

    return matchGenre && matchAuthor && matchDate;
  });

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="bg-[#d1b3ff] py-16 h-screen">
        <div className="bg-[#d1b3ff] h-auto">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
              Explore Our Popular Books
            </h2>

            {/* Dark Filter Section */}
            <div className="bg-[#330066] shadow p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                Filter Books
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Filter by Genre */}
                <div>
                  <label className="block mb-2 text-[#ff5500]">
                    Filter by Genre
                  </label>
                  <input
                    type="text"
                    value={filterGenre}
                    onChange={(e) => setFilterGenre(e.target.value)}
                    placeholder="Enter genre"
                    className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Filter by Author */}
                <div>
                  <label className="block mb-2 text-[#ff5500]">
                    Filter by Author
                  </label>
                  <input
                    type="text"
                    value={filterAuthor}
                    onChange={(e) => setFilterAuthor(e.target.value)}
                    placeholder="Enter author"
                    className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Filter by Publication Date */}
                <div>
                  <label className="block mb-2 text-[#ff5500]">
                    Filter by Year of Publication
                  </label>
                  <input
                    type="number"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    placeholder="Enter year"
                    className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Books Listing */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-4">
              {filteredBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            {/* No books found */}
            {filteredBooks.length === 0 && (
              <div className="text-center text-gray-500">No books found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
