import React, { useState } from "react";
import logoImg from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import { FaSun, FaMoon } from "react-icons/fa"; // React Icons
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";

const Navber = ({ theme, setTheme }) => {
 const [logOutDropdwon, setLogOutDropdown] = useState(false);
const { user, logOut } = useAuth();

const handleLogOut = () => {
  console.log('hello');
  
  logOut()
    .then(() => {
      setLogOutDropdown(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Log Out Success",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

  

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const link = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/books">Books</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="container mx-auto">
        <div  className="navbar z-9999">
          {/* Navbar Start */}
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {link}
              </ul>
            </div>

            <Link to="/">
              <img
                className="w-[70px] h-[70px] overflow-hidden"
                src={logoImg}
                alt="logo"
              />
            </Link>
          </div>

          {/* Navbar Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{link}</ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end flex items-center gap-3">
            {/* 🌙 Light/Dark Toggle with React Icons */}
            <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
              {theme === "light" ? (
                <FaMoon className="text-xl" />
              ) : (
                <FaSun className="text-xl text-yellow-400" />
              )}
            </button>

            {/* Login Button */}
            <div className="relative">
              {user ? (
                <img
                  onClick={() => setLogOutDropdown(!logOutDropdwon)}
                  referrerPolicy="no-referrer"
                  className="w-[50px] rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
              ) : (
                <Link to="/login" className="btn btnStyle text-black">
                  Login
                </Link>
              )}
              {logOutDropdwon && (
                <div className=" shadow-lg rounded-sm p-2 absolute top-17 w-[150px] right-1">
                  <button onClick={handleLogOut} className="btn btnStyle">Log Out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navber;
