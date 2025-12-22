import React from "react";
import { Link } from "react-router";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyBook = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: books = [], refetch } = useQuery({
    queryKey: ["my-books", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/books?email=${user.email}`);
      return res.data;
    },
  });

  // publish / unpublish
  const handleStatusToggle = async (id, currentStatus) => {
    await axiosSecure.patch(`/books/status/${id}`, {
      status: currentStatus === "published" ? "unpublished" : "published",
    });
    refetch();
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Added Books</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Book Name</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="hover">
                <td>{index + 1}</td>

                <td>
                  <img
                    src={book.image}
                    alt={book.bookName}
                    className="w-14 h-20 object-cover rounded"
                  />
                </td>

                <td className="font-medium">{book.bookName}</td>

                <td>
                  <span
                    className={`badge ${
                      book.status === "published"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {book.status || "unpublished"}
                  </span>
                </td>

                <td className="text-center">
                  <div className="flex gap-2 justify-center">
                    <Link to={`/dashboard/edite-book/${book._id}`}>
                      <button className="btn btn-sm btn-info">Edit</button>
                    </Link>

                    <button
                      onClick={() => handleStatusToggle(book._id, book.status)}
                      className="btn btn-sm btn-outline"
                    >
                      {book.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No books added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBook;
