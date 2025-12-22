import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";

const Order = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["seller-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller-orders?email=${user.email}`);
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    await axiosSecure.patch(`/orders/status/${id}`, { status });
    refetch();
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel order?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/orders/cancel/${id}`);
        refetch();
        Swal.fire("Cancelled!", "", "success");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Orders For My Books</h2>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="table w-full min-w-[600px] bg-white rounded-xl shadow">
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Buyer</th>
              <th>Phone</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td>{index + 1}</td>
                <td>{order.bookName}</td>
                <td>{order.buyerName}</td>
                <td>{order.phone}</td>
                <td>{order.price} ৳</td>

                <td>
                  <span className="badge badge-outline">{order.status}</span>
                </td>

                <td className="text-center flex flex-col sm:flex-row justify-center gap-2">
                  {order.status !== "cancelled" &&
                    order.status !== "delivered" && (
                      <>
                        <select
                          className="select select-sm select-bordered"
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>

                        <button
                          onClick={() => handleCancel(order._id)}
                          className="btn btn-sm btn-error"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
