// src/components/Header.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaPlus,
  FaBook,
  FaBookReader,
} from "react-icons/fa";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-[#330066] text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link to="/" className="text-2xl font-bold">
          E-Library App
        </Link>
      </div>

      {/* Navigation items */}
      <div className="flex items-center space-x-8 mx-auto">
        {user && (
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-neon-green flex items-center">
                <FaBook className="inline mr-1" aria-hidden="true" /> All Books
              </Link>
            </li>
            <li>
              <Link
                to="/add-book"
                className="hover:text-neon-green flex items-center"
              >
                <FaPlus className="inline mr-1" aria-hidden="true" /> Add E-book
              </Link>
            </li>
            <li>
              <Link
                to="/my-books"
                className="hover:text-neon-green flex items-center"
              >
                <FaBook className="inline mr-1" aria-hidden="true" /> View My
                E-books
              </Link>
            </li>
            <li>
              <Link
                to="/my-borrowed-books"
                className="hover:text-neon-green flex items-center"
              >
                <FaBookReader className="inline mr-1" aria-hidden="true" /> My
                Borrowed Books
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* User and Logout */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <div className="flex space-x-4">
            <Link to="/login" className="hover:text-neon-green">
              <FaSignInAlt className="inline mr-1" aria-hidden="true" /> Login
            </Link>
            <Link to="/register" className="hover:text-neon-green">
              <FaUserPlus className="inline mr-1" aria-hidden="true" /> Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="text-yellow-300">Hello, {user.username}</span>
            <button
              onClick={logout}
              className="hover:text-neon-green flex items-center"
            >
              <FaSignOutAlt className="inline mr-1" aria-hidden="true" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
