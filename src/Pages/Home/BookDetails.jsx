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

  /* ================= Order Form ================= */
  const {
    register: orderRegister,
    handleSubmit: handleOrderSubmit,
    reset: resetOrder,
  } = useForm();

  /* ================= Review Form ================= */
  const {
    register: reviewRegister,
    handleSubmit: handleReviewSubmitForm,
    reset: resetReview,
  } = useForm();

  /* ================= Fetch Book ================= */
  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["bookDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-details/${id}`);
      return res.data;
    },
  });

  const { author, bookImageUrl, bookName, price, sellerEmail, status, _id } =
    book;

  /* ================= Wishlist ================= */
  const handleWishlist = () => {
    const wishlistBook = {
      author,
      bookImageUrl,
      bookName,
      price,
      sellerEmail,
      status,
      bookId: _id,
    };

    axiosSecure.post("/wishlist", wishlistBook).then((res) => {
      Swal.fire({
        position: "top-end",
        icon: res.data.insertedId ? "success" : "info",
        title: res.data.insertedId
          ? "Wishlist added successfully"
          : res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  /* ================= Order Submit ================= */
  const handleOrder = (data) => {
    const orderInfo = {
      ...data,
      bookId: id,
      bookName,
      price,
      sellerEmail,
      buyerName: user?.displayName,
      buyerEmail: user?.email,
    };

    axiosSecure.post("/orders", orderInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Order successful",
          showConfirmButton: false,
          timer: 1500,
        });
        resetOrder();
        document.getElementById("order_modal").close();
      }
    });
  };

  /* ================= Fetch Latest Reviews ================= */
  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  /* ================= Review Submit ================= */
  const handleReviewSubmit = (data) => {
    const reviewInfo = {
      bookId: id,
      bookName,
      rating: data.rating,
      review: data.review,
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      reviewerPhoto: user?.photoURL,
    };

    axiosSecure.post("/review", reviewInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Review submitted",
          showConfirmButton: false,
          timer: 1500,
        });
        resetReview();
        refetchReviews(); // reload latest 4 reviews
      }
    });
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
      {/* ================= Book Details ================= */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <img
            src={bookImageUrl}
            alt={bookName}
            className="max-w-sm rounded-xl shadow-lg mx-auto"
          />

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{bookName}</h2>

            <span className="badge badge-outline">✍ {author}</span>
            <span className="badge badge-success capitalize ml-2">
              {status}
            </span>

            <p>
              <b>Seller:</b> {sellerEmail}
            </p>

            <p className="text-3xl font-bold text-primary">৳ {price}</p>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  document.getElementById("order_modal").showModal()
                }
                className="btn btnStyle"
              >
                🛒 Order Now
              </button>

              <button onClick={handleWishlist} className="btn btnStyle">
                ❤️ Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Order Modal ================= */}
      <dialog id="order_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-4">🛍 Place Order</h3>

          <form onSubmit={handleOrderSubmit(handleOrder)} className="space-y-4">
            <input
              defaultValue={user?.displayName}
              readOnly
              {...orderRegister("name")}
              className="input input-bordered w-full bg-gray-100"
            />

            <input
              defaultValue={user?.email}
              readOnly
              {...orderRegister("email")}
              className="input input-bordered w-full bg-gray-100"
            />

            <input
              placeholder="01XXXXXXXXX"
              {...orderRegister("phone", { required: true })}
              className="input input-bordered w-full"
            />

            <textarea
              placeholder="Delivery address"
              {...orderRegister("address", { required: true })}
              className="textarea textarea-bordered w-full"
            />

            <div className="modal-action">
              <button className="btn btnStyle">Confirm</button>
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

      {/* ================= Review Form ================= */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-4">📝 Add Review</h3>

        <form
          onSubmit={handleReviewSubmitForm(handleReviewSubmit)}
          className="space-y-5 bg-base-100 p-6 rounded-xl shadow-md"
        >
          <select
            {...reviewRegister("rating", { required: true })}
            className="select select-bordered w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select rating
            </option>
            <option value="1">1 - Very Bad</option>
            <option value="2">2 - Bad</option>
            <option value="3">3 - Average</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </select>

          <textarea
            {...reviewRegister("review", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Write your review..."
          />

          <button className="btn btnStyle w-full">Submit Review</button>
        </form>
      </div>

      {/* ================= Latest Reviews (4 only, side by side) ================= */}
      <div className="mt-10 my-6">
        <h3 className="text-2xl font-bold mb-4">⭐ Latest Reviews</h3>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews
              .slice(-4) // latest 4
              .reverse() // newest first
              .map((rev) => (
                <div
                  key={rev._id}
                  className="bg-base-100 p-4 rounded-xl shadow-md"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={rev.reviewerPhoto}
                      alt={rev.reviewerName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{rev.reviewerName}</h4>
                      <p className="text-sm text-gray-500">
                        Rating: ⭐ {rev.rating}/5
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700">{rev.review}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default BookDetails;
