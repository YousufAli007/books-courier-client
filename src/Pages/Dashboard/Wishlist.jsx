import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();

  const { data: books = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await axiosSecure.get("/wishlist");
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">My Wishlist ❤️</h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">Wishlist empty 😔</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="border rounded-lg shadow-md hover:shadow-lg transition"
            >
              <img
                src={book.bookImageUrl}
                alt={book.bookName}
                className="w-full h-52 object-cover rounded-t-lg"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold">{book.bookName}</h3>

                <p className="text-sm text-gray-600">Author: {book.author}</p>

                <p className="text-sm text-gray-600">Price: ৳ {book.price}</p>

                <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {book.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
