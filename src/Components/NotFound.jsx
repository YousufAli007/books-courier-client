import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
      <div className="bg-white/90 dark:bg-gray-800/90 p-10 rounded-3xl shadow-2xl text-center max-w-md animate-fadeIn">
        <h1 className="text-8xl font-extrabold text-purple-700 mb-4">404</h1>
        <p className="text-xl text-gray-700 dark:text-gray-200 mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
