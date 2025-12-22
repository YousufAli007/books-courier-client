import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { refetch, data: myOrders = []} = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
      return res.data;
    },
  });
  const handleOrderDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/order/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>

      {/* Responsive Table Container - Scrollbar Hidden */}
      <div className="overflow-x-auto scrollbar-hide bg-white rounded-xl shadow-md">
        <table className="table table-zebra">
          {/* Table Head */}
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="text-left">#</th>
              <th className="text-left">Book Title</th>
              <th className="text-left">Order Date</th>
              <th className="text-left">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {myOrders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td>{index + 1}</td>
                <td className="font-medium text-gray-800">{order.bookName}</td>
                <td className="text-gray-600">
                  {new Date(order.createAT).toLocaleDateString("en-GB")}
                </td>
                <td>
                  <span
                    className={`badge badge-lg ${
                      order.paymentStatus === "paid"
                        ? "badge-success"
                        : order.paymentStatus === "cancelled"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {order.paymentStatus || "pending"}
                  </span>
                </td>
                <td className="text-center">
                  {order.paymentStatus === "pending" ? (
                    <div className="flex justify-center gap-2 flex-wrap">
                      <Link to={`/payment/${order._id}`}>
                        <button className="btn btn-sm btn-success">
                          Pay Now
                        </button>
                      </Link>
                      <button
                        onClick={() => handleOrderDelete(order._id)}
                        className="btn btn-sm btn-error"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
