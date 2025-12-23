import React from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const AddBook = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      status: "unpublished",
    },
  });

  const onSubmit = async (data) => {
    const bookData = {
      ...data,
      sellerEmail: user?.email,
    };

    const res = await axiosSecure.post("/books", bookData);

    if (res.data?.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Book Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      reset();
      navigate("/dashboard/my-book");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Book Name */}
        <div>
          <label className="label">Book Name</label>
          <input
            {...register("bookName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Book name"
          />
        </div>

        {/* Image */}
        <div>
          <label className="label">Book Image URL</label>
          <input
            {...register("bookImageUrl", { required: true })}
            className="input input-bordered w-full"
            placeholder="Image URL"
          />
        </div>

        {/* Author */}
        <div>
          <label className="label">Author</label>
          <input
            {...register("author", { required: true })}
            className="input input-bordered w-full"
            placeholder="Author name"
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">Price</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="input input-bordered w-full"
            placeholder="Price"
          />
        </div>

        {/* Publish / Unpublish */}
        <div>
          <label className="label">Status</label>
          <select
            {...register("status", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        <button className="btn btn-primary w-full mt-4">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
