import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const AddBook = () => {
  const { register, handleSubmit  } = useForm();
  const { user } = useAuth();
  const axiosSecure =useAxiosSecure()

  const onSubmit = (data) => {
    console.log("Submitted Book Data:", data);
    axiosSecure.post("/books",data)
    .then(res =>{
      if(res.data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your add Success",
          showConfirmButton: false,
          timer: 1500,
        });
 
      }
    });
     
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white">
            <h2 className="text-4xl font-bold text-center">Add New Book</h2>
            <p className="text-center mt-2 opacity-90">
              Fill in the details to add a book to the library
            </p>
          </div>

          {/* Form Body */}
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Book Title */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Book Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter book title"
                  {...register("bookName")}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              {/* Book Image URL */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Book Cover Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/book-cover.jpg"
                  {...register("bookImageUrl")}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Paste a direct link to the book cover image (e.g., from
                  Google, ImgBB, etc.)
                </p>
              </div>

              {/* Author */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Author Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  {...register("author")}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("status")}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition appearance-none bg-white"
                >
                  <option value="published">Published</option>
                  <option value="unpublished">Unpublished</option>
                </select>
                <p className="text-sm text-gray-600 mt-2">
                  Unpublished books will not appear on the All Books page.
                </p>
              </div>

              {/* Price */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Price (BDT) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="450"
                  {...register("price")}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              {/* Seller Name  */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Seller Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName || ""}
                  placeholder="Your name"
                  {...register("sellerName")}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              {/* Seller Email   */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Seller Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || ""}
                  placeholder="Your email"
                  {...register("sellerEmail")}
                  readOnly
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed"
                />
                <p className="text-sm text-gray-600 mt-2">
                  This email is taken from your account and cannot be changed.
                </p>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xl font-bold rounded-full hover:from-blue-700 hover:to-indigo-800 transform hover:scale-105 transition duration-300 shadow-2xl"
                >
                  Add Book to Library
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
