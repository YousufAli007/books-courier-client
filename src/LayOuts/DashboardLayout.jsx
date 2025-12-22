import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import { IoCartSharp } from "react-icons/io5";
import { FaAddressBook, FaBook, FaFileInvoiceDollar, FaUserPlus } from "react-icons/fa";
import { BsFillCartDashFill } from "react-icons/bs";
import logoImg from'../assets/logo.png'
import useAuth from "../Hook/useAuth";
import { FaBookSkull, FaUsers } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/useAxiosSecure";
const DashboardLayout = () => {
  const {user}=useAuth()
  const [open, setOpen] = useState(false);
  const axiosSecure =useAxiosSecure()
  const {data:users =[]}=useQuery({
    queryKey:['user'.user?.email],
    queryFn:async ()=>{
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data
    }
  })
  const userRole =users[0]
   
  
  const DASHBOARD_TITLE = (
    <Link to='/'>
      <img className="w-[100px]" src={logoImg} alt="" />
    </Link>
  );

const menuItems = (
  <>
    {userRole?.role === "user" && (
      <li>
        <NavLink
          to="/dashboard/my-orders"
          className={({ isActive }) =>
            `text-xl font-semibold w-full   px-4 py-2 rounded-lg transition flex items-center  gap-3
          ${
            isActive
              ? "bg-gray-700 text-white"
              : "text-gray-700 hover:bg-green-100"
          }`
          }
        >
          <IoCartSharp size={25} />
          <p>My Order</p>
        </NavLink>
      </li>
    )}

    {userRole?.role === "user" && (
      <li>
        <NavLink
          to="/dashboard/invoice"
          end
          className={({ isActive }) =>
            `text-xl font-semibold w-full   px-4 py-2 rounded-lg transition flex items-center  gap-3
          
          ${
            isActive
              ? "bg-gray-700 text-white"
              : "text-gray-700 hover:bg-green-100"
          }`
          }
        >
          <FaFileInvoiceDollar />
          Invoices
        </NavLink>
      </li>
    )}

    {userRole?.role === "user" && (
      <li>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `text-xl font-semibold w-full  px-4 py-2 rounded-lg transition flex items-center  gap-3
          ${
            isActive
              ? "bg-gray-700 text-white"
              : "text-gray-700 hover:bg-green-100"
          }`
          }
        >
          <FaUserPlus /> Profile
        </NavLink>
      </li>
    )}
    {userRole?.role === "librarian" && (
      <li>
        <NavLink
          to="/dashboard/add-book"
          className={({ isActive }) =>
            `text-xl font-semibold w-full  px-4 py-2 rounded-lg transition flex items-center  gap-3
          ${
            isActive
              ? "bg-gray-700 text-white"
              : "text-gray-700 hover:bg-green-100"
          }`
          }
        >
          <FaBook /> Add Book
        </NavLink>
      </li>
    )}
    {userRole?.role === "librarian" && (
      <li>
        <NavLink
          to="/dashboard/my-book"
          className={({ isActive }) =>
            `text-xl font-semibold w-full  px-4 py-2 rounded-lg transition flex items-center  gap-3
          ${
            isActive
              ? "bg-gray-700 text-white"
              : "text-gray-700 hover:bg-green-100"
          }`
          }
        >
          <FaAddressBook /> My Book
        </NavLink>
      </li>
    )}
    {userRole?.role === "librarian" && (
      <li>
        <NavLink
          to="/dashboard/order"
          className={({ isActive }) =>
            `text-xl font-semibold w-full  px-4 py-2 rounded-lg transition flex items-center  gap-3
          ${
            isActive
              ? "bg-gray-700 text-white"
              : "text-gray-700 hover:bg-green-100"
          }`
          }
        >
          <BsFillCartDashFill /> Order
        </NavLink>
      </li>
    )}
    {userRole?.role === "admin" && (
      <li>
        <NavLink
          to="/dashboard/all-user"
          className={({ isActive }) =>
            `text-xl font-semibold w-full  px-4 py-2 rounded-lg transition flex items-center  gap-3
          ${
            isActive
              ? "bg-gray-700 text-white"
              : "text-gray-700 hover:bg-green-100"
          }`
          }
        >
          <FaUsers /> All User
        </NavLink>
      </li>
    )}
    {userRole?.role === "admin" && (
      <li>
        <NavLink
          to="/dashboard/all-user"
          className={({ isActive }) =>
            `text-xl font-semibold w-full  px-4 py-2 rounded-lg transition flex items-center  gap-3
          ${
            isActive
              ? "bg-gray-700 text-white"
              : "text-gray-700 hover:bg-green-100"
          }`
          }
        >
          <FaBookSkull /> Manage Book
        </NavLink>
      </li>
    )}
  </>
);


  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ================= Desktop Sidebar ================= */}
      <aside className="hidden md:flex md:w-64 bg-white shadow-lg flex-col">
        <div className="  flex items-center justify-center border-b">
          {DASHBOARD_TITLE}
        </div>

        <nav className="flex-1 p-4 space-y-3 text-gray-600 flex flex-col">
          {/* {menuItems.map((item, index) => (
            <p key={index} className="hover:text-purple-600 cursor-pointer">
              {item}
            </p>
          ))} */}
          <ul className="space-y-3 flex-1">{menuItems}</ul>
          <div className="flex justify-between">
            <button className="text-xl font-bold btn bg-green-700">
              <Link to="/">Home </Link>
            </button>
            <button className="text-xl font-bold btn bg-green-700">
              LogOut
            </button>
          </div>
        </nav>
      </aside>

      {/* ================= Mobile Sidebar ================= */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* drawer */}
        <aside
          className={`absolute left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <h1 className="text-lg font-bold text-purple-600">
              {DASHBOARD_TITLE}
            </h1>
            <button onClick={() => setOpen(false)}>
              <FiX size={22} />
            </button>
          </div>

          <nav className="p-4 space-y-3 text-gray-600">
            {/* {menuItems.map((item, index) => (
              <p
                key={index}
                className="hover:text-purple-600 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                {item}
              </p>
            ))} */}
            <ul className="space-y-3">{menuItems}</ul>
          </nav>
        </aside>
      </div>

      {/* ================= Main Content ================= */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 md:m-5 md:rounded-2xl bg-white shadow flex items-center justify-between px-4">
          <button onClick={() => setOpen(true)} className="md:hidden">
            <FiMenu size={22} />
          </button>

          <h2 className="text-3xl  font-bold text-gray-700">Dashboard</h2>

          {/* <div className="w-8 h-8 rounded-full bg-purple-500" /> */}
          <img className="w-12 rounded-full" src={user.photoURL} alt="" />
        </header>

        {/* Page Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
