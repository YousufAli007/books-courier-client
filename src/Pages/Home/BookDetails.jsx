import React from "react";
import Container from "../../Components/Container";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["bookDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-details/${id}`);
      return res.data;
    },
  });

  const handleOrder = (data) => {
    const orderInfo = {
      ...data,
      bookId: id,
      bookName: book.bookName,
      price: book.price,
      sellerEmail: book.sellerEmail,
      buyerName: user?.displayName,
      buyerEmail: user?.email,
    };

    // console.log("Order Info:", orderInfo);
    axiosSecure.post("/orders",orderInfo)
    .then(res =>{
      if(res.data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "orders successfull",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

    // axiosSecure.post('/orders', orderInfo)

    reset();
    document.getElementById("order_modal").close();
  };

  if (isLoading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-[60vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {/* ===== Page Header ===== */}
      <div className="text-center mt-10 mb-10">
        <h1 className="text-4xl font-bold">📚 Book Details</h1>
        <p className="text-gray-500 mt-2">
          View complete book information & order easily
        </p>
      </div>

      {/* ===== Book Details Card ===== */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Book Image */}
          <div className="flex justify-center">
            <img
              src="https://img.drz.lazcdn.com/static/bd/p/38f9c430b252e2efd4b9f354b5211386.jpg_720x720q80.jpg"
              alt={book.bookName}
              className="max-w-sm rounded-xl shadow-lg hover:scale-105 transition"
            />
          </div>

          {/* Book Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{book.bookName}</h2>

            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-outline">
                ✍ Author: {book.author}
              </span>
              <span className="badge badge-success capitalize">
                {book.status}
              </span>
            </div>

            <div className="divider" />

            <p>
              <span className="font-semibold">Seller Name:</span>{" "}
              {book.sellerName}
            </p>
            <p>
              <span className="font-semibold">Seller Email:</span>{" "}
              {book.sellerEmail}
            </p>

            <div className="divider" />

            <p className="text-3xl font-bold text-primary">৳ {book.price}</p>

            <button
              onClick={() => document.getElementById("order_modal").showModal()}
              className="btn btnStyle btn-wide mt-4"
            >
              🛒 Order Now
            </button>
          </div>
        </div>
      </div>

      {/* ===== Order Modal ===== */}
      <dialog id="order_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-1">🛍 Place Your Order</h3>
          <p className="text-gray-500 mb-4">
            Please provide delivery information
          </p>

          <form onSubmit={handleSubmit(handleOrder)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label font-semibold">Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                {...register("name")}
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                {...register("email")}
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="label font-semibold">Phone Number</label>
              <input
                type="text"
                placeholder="01XXXXXXXXX"
                {...register("phone", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Address */}
            <div>
              <label className="label font-semibold">Delivery Address</label>
              <textarea
                placeholder="Enter full delivery address"
                {...register("address", { required: true })}
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* Buttons */}
            <div className="modal-action">
              <button type="submit" className="btn btnStyle">
                Confirm Order
              </button>

              <button
                type="button"
                className="btn btn-outline"
                onClick={() => document.getElementById("order_modal").close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </Container>
  );
};

export default BookDetails;
