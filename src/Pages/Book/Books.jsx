import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Container from "../../Components/Container";
import { Link } from "react-router-dom";

const Books = () => {
  const axiosSecure = useAxiosSecure();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });

  // Search & Sort states
  const [searchName, setSearchName] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // '', 'lowToHigh', 'highToLow'

  // Filter by name
  const filteredBooks = books.filter((book) =>
    book.bookName?.toLowerCase().includes(searchName.toLowerCase())
  );

  // Sort by price
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOrder === "lowToHigh") return Number(a.price) - Number(b.price);
    if (sortOrder === "highToLow") return Number(b.price) - Number(a.price);
    return 0;
  });

  return (
    <Container>
      {/* Header */}
      <div className="text-center my-12">
        <h1 className="text-4xl font-bold text-gray-800">All Books</h1>
        <p className="text-gray-600 mt-2">
          Total: {books.length} books available
        </p>
      </div>

      {/* Search & Sort Bar */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Search Input */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Search by Book Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter book name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full px-5 py-4 pl-12 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Sort Select */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Sort by Price
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 1rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em",
                }}
              >
                <option value="">Default Order</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-10">
          {sortedBooks.length > 0
            ? `Showing ${sortedBooks.length} book${
                sortedBooks.length > 1 ? "s" : ""
              }`
            : "No books found"}
        </h2>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading books...</p>
          </div>
        ) : sortedBooks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No books match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col h-full"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={book.bookImageUrl}
                    alt={book.bookName}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                    {book.bookName}
                  </h3>
                  <p className="text-gray-600 mt-2">by {book.author}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Seller: {book.sellerName}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-2xl font-bold text-blue-600">
                      ৳ {book.price}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <div className="px-6 pb-6">
                  <Link to={`/book-details/${book._id}`}>
                    <button className="w-full btn btnStyle shadow-lg">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Books;
