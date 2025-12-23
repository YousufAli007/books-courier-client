import React, { useState, useEffect } from "react";
import Container from "../../Components/Container";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

const BookDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Fetch book details
  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["bookDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-details/${id}`);
      return res.data;
    },
  });

  const { author, bookImageUrl, bookName, price, sellerEmail, status, _id } =
    book;

  // Fetch latest 3 reviews
  const fetchReviews = async () => {
    const res = await axiosSecure.get(`/review-rating/${id}`);
    setReviews(res.data);
  };

  useEffect(() => {
    if (id) fetchReviews();
  }, [id]);

  // Add to wishlist
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

  // Place order
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
      }
    });

    reset();
    document.getElementById("order_modal").close();
  };

  // Submit review
  const handleReviewSubmit = (data) => {
    if (!rating) {
      Swal.fire({ icon: "warning", title: "Please give a rating" });
      return;
    }

    const reviewData = {
      bookId: id,
      userName: user?.displayName,
      userEmail: user?.email,
      rating,
      reviewText: data.reviewText,
    };

    axiosSecure.post("/review-rating", reviewData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Review submitted",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        setRating(0);
        setHover(0);
        fetchReviews(); // refresh reviews
      }
    });
  };

  if (isLoading)
    return (
      <Container>
        <div className="flex justify-center items-center h-[60vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </Container>
    );

  return (
    <Container>
      {/* Book Details */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex justify-center">
            <img
              src={bookImageUrl}
              alt={bookName}
              className="max-w-sm rounded-xl shadow-lg hover:scale-105 transition"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{bookName}</h2>
            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-outline">✍ Author: {author}</span>
              <span className="badge badge-success capitalize">{status}</span>
            </div>
            <div className="divider" />
            <p>
              <span className="font-semibold">Seller Email:</span> {sellerEmail}
            </p>
            <div className="divider" />
            <p className="text-3xl font-bold text-primary">৳ {price}</p>
            <div className="flex flex-wrap space-x-3">
              <button
                onClick={() =>
                  document.getElementById("order_modal").showModal()
                }
                className="btn btnStyle btn-wide mt-4"
              >
                🛒 Order Now
              </button>
              <button
                onClick={handleWishlist}
                className="btn btnStyle btn-wide mt-4"
              >
                Add Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <dialog id="order_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-1">🛍 Place Your Order</h3>
          <p className="text-gray-500 mb-4">
            Please provide delivery information
          </p>
          <form onSubmit={handleSubmit(handleOrder)} className="space-y-4">
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              {...register("name")}
              className="input input-bordered w-full bg-gray-100"
            />
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              {...register("email")}
              className="input input-bordered w-full bg-gray-100"
            />
            <input
              type="text"
              placeholder="01XXXXXXXXX"
              {...register("phone", { required: true })}
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Enter full delivery address"
              {...register("address", { required: true })}
              className="textarea textarea-bordered w-full"
            />
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

      {/* Review Section */}
      <div className="bg-base-100 p-6 rounded-2xl shadow-xl mb-14">
        <h3 className="text-2xl font-bold mb-4">⭐ Leave a Review</h3>
        <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-4">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <FaStar
                  key={index}
                  size={30}
                  className={`cursor-pointer transition-colors ${
                    starValue <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(starValue)}
                />
              );
            })}
          </div>
          <textarea
            placeholder="Write your review here..."
            {...register("reviewText", { required: true })}
            className="textarea textarea-bordered w-full"
            rows={4}
          />
          <button type="submit" className="btn btnStyle btn-wide">
            Submit Review
          </button>
        </form>

        {/* Display latest 3 reviews */}
        <div className="mt-8">
          <h4 className="text-xl font-bold mb-4">Latest Reviews</h4>
          {reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet.</p>
          )}
          {reviews.map((r) => (
            <div key={r._id} className="border-b py-3">
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={16}
                    className={
                      i < r.rating ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="font-semibold">{r.userName}</p>
              <p className="text-gray-600">{r.reviewText}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BookDetails;
