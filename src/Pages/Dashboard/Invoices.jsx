import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";

const Invoices = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-6">My Invoices</h2>

      {paymentHistory.length === 0 ? (
        <p className="text-center text-gray-500">No payment history found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paymentHistory.map((payment, index) => (
            <div
              key={payment._id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Invoice No */}
              <p className="text-sm text-gray-500 mb-1">Invoice #{index + 1}</p>

              {/* Payment ID */}
              <p className="text-xs break-all mb-2">
                <span className="font-semibold">Payment ID:</span>{" "}
                {payment.transactionId}
              </p>

              {/* Amount */}
              <p className="text-lg font-bold text-primary mb-1">
                ${payment.amount}
              </p>

              {/* Date */}
              <p className="text-sm text-gray-600">
                Date: {new Date(payment.createAT).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Invoices;
