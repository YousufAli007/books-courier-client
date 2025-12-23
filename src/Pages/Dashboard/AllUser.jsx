import React from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // 🔴 Make Admin with confirmation
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Make ${user.email} an Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Admin",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/admin/${user._id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "User is now Admin", "success");
          refetch();
        }
      }
    });
  };

  // 🔵 Make Librarian with confirmation
  const handleMakeLibrarian = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Make ${user.email} a Librarian?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Librarian",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/librarian/${user._id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "User is now Librarian", "success");
          refetch();
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, index) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 capitalize">{u.role}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(u)}
                      className="btn btn-sm"
                    >
                      <MdAdminPanelSettings size={18} />
                    </button>
                  )}
                  {u.role !== "librarian" && (
                    <button
                      onClick={() => handleMakeLibrarian(u)}
                      className="btn btn-sm"
                    >
                      <IoLibraryOutline size={18} />
                    </button>
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

export default AllUser;
