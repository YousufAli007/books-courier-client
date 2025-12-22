import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  // get single book
  const { isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      reset(res.data); // auto fill form
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const res = await axiosSecure.put(`/books/${id}`, data);

    if (res.data?.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your update Success",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard/my-book");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Book Name */}
        <div>
          <label className="label">Book Name</label>
          <input
            {...register("bookName", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Image */}
        <div>
          <label className="label">Book Image URL</label>
          <input
            {...register("bookImageUrl")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Author */}
        <div>
          <label className="label">Author</label>
          <input
            {...register("author")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">Price</label>
          <input
            {...register("price")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Status */}
        <div>
          <label className="label">Status</label>
          <select
            {...register("status")}
            className="select select-bordered w-full"
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        <button className="btn btn-primary w-full mt-4">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
