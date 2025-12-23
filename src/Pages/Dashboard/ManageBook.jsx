import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageBook = () => {
  const axiosSecure = useAxiosSecure();

  // Books fetch
  const { data: books = [], refetch } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });

  // Status update
  const handleStatusChange = async (bookId, newStatus) => {
    try {
      await axiosSecure.patch(`/books/status/${bookId}`, { status: newStatus });
      Swal.fire("Updated!", `Book status updated to ${newStatus}`, "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  // Delete book & its orders
  const handleDeleteBook = async (bookId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Deleting this book will remove all associated orders!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        // 1️⃣ Delete all orders by this book
        await axiosSecure.delete(`/orders-by-book/${bookId}`);
        // 2️⃣ Delete the book itself
        await axiosSecure.delete(`/books/${bookId}`);

        Swal.fire(
          "Deleted!",
          "Book and its orders have been deleted.",
          "success"
        );
        refetch();
      } catch (error) {
        Swal.fire("Error", "Failed to delete book or orders", "error");
        console.error(error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Books</h2>

      {/* Large screen */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Book</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Seller</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="p-2 border">
                  <img
                    src={book.bookImageUrl}
                    alt={book.bookName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 border">{book.bookName}</td>
                <td className="p-2 border">{book.author}</td>
                <td className="p-2 border">৳ {book.price}</td>
                <td className="p-2 border">{book.sellerName}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      book.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="p-2 border space-x-2">
                  <select
                    value={book.status}
                    onChange={(e) =>
                      handleStatusChange(book._id, e.target.value)
                    }
                    className="px-2 py-1 border rounded text-sm"
                  >
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
                  </select>
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    className="px-2 py-1 bg-red-500 text-white text-sm rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Small screen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col"
          >
            <img
              src={book.bookImageUrl}
              alt={book.bookName}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-bold mt-2 text-lg">{book.bookName}</h3>
            <p className="text-sm">Author: {book.author}</p>
            <p className="text-sm">Price: ৳{book.price}</p>
            <p className="text-sm">Seller: {book.sellerName}</p>
            <span
              className={`mt-2 px-2 py-1 text-sm rounded-full font-semibold w-fit ${
                book.status === "published"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {book.status}
            </span>
            <div className="flex justify-between mt-3 items-center">
              <select
                value={book.status}
                onChange={(e) => handleStatusChange(book._id, e.target.value)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>
              <button
                onClick={() => handleDeleteBook(book._id)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBook;
