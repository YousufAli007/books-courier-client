import React from "react";
import Container from "../../Components/Container";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";

const BookDetails = () => {
  const {user}=useAuth()
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: book = {} } = useQuery({
    queryKey: ["bookDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-details/${id}`);
      return res.data;
    },
  });

  return (
    <Container>
      {/* ===== Page Header ===== */}
      <div className="text-center mt-10 mb-8">
        <h1 className="text-4xl font-bold">📚 Book Details</h1>
        <p className="text-gray-500 mt-2">
          View complete information before placing your order
        </p>
      </div>

      {/* ===== Book Card ===== */}
      <div className="card bg-base-100 shadow-xl p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="https://wafilife-media.wafilife.com/uploads/2015/03/salatur-rasul-250x374.jpg"
              alt={book.bookName}
              className=" max-w-md rounded-2xl shadow-md hover:scale-105 transition"
            />
          </div>

          {/* Info Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{book.bookName}</h2>

            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-outline">Author: {book.author}</span>
              <span className="badge badge-success">{book.status}</span>
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

            <p className="text-2xl font-bold text-primary">৳ {book.price}</p>

            <button
              className="btn btnStyle btn-wide mt-4"
              onClick={() => document.getElementById("order_modal").showModal()}
            >
              Order Now 🚀
            </button>
          </div>
        </div>
      </div>

      {/* ===== Order Modal ===== */}
      <dialog id="order_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-2">🛒 Place Your Order</h3>
          <p className="text-gray-500 mb-4">
            Please fill in the required information
          </p>

          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="label font-semibold">Name</label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="label font-semibold">Phone Number</label>
              <input
                type="text"
                placeholder="01XXXXXXXXX"
                className="input input-bordered w-full"
              />
            </div>

            {/* Address */}
            <div>
              <label className="label font-semibold">Delivery Address</label>
              <textarea
                placeholder="Enter your full address"
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* Buttons */}
            <div className="modal-action">
              <button className="btn btnStyle">Confirm Order</button>
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
