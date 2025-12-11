import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom"; // Updated import for modern React Router
import GoogleLogin from "./GoogleLogin";
import useAuth from "../../Hook/useAuth";

export default function LoginPage() {
  const navagite =useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 const {signInUser} =useAuth();
  const onSubmit = (data) => {
    console.log(data);  
    signInUser(data.email,data.password)
    .then(res =>{
      console.log(res)
      navagite('/')
    })
    .catch(err =>{
      console.log(err)
    })
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-cyan-950 to-black flex items-center justify-center p-4">
        {/* Main Card */}
        <div className="w-full max-w-md bg-black/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-cyan-500/30 p-10">
          {/* Logo / Title */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              PetCourier
            </h1>
            <p className="text-gray-400 mt-3 text-lg">
              Welcome back! Please login
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            {/* Floating Label Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="peer w-full px-5 py-5 bg-white/5 border border-cyan-500/40 rounded-2xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-5 top-5 text-gray-400 text-base transition-all duration-300 
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
                peer-focus:top-[-10px] peer-focus:text-cyan-400 peer-focus:text-sm peer-focus:bg-gray-950 peer-focus:px-2
                peer-valid:top-[-10px] peer-valid:text-cyan-400 peer-valid:text-sm peer-valid:bg-gray-950 peer-valid:px-2"
              >
                Email Address
              </label>
              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Floating Label Password */}
            <div className="relative">
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password should be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message: "Must include 1 uppercase, 1 lowercase & 1 number",
                  },
                })}
                className="peer w-full px-5 py-5 bg-white/5 border border-cyan-500/40 rounded-2xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-5 top-5 text-gray-400 text-base transition-all duration-300 
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
                peer-focus:top-[-10px] peer-focus:text-cyan-400 peer-focus:text-sm peer-focus:bg-gray-950 peer-focus:px-2
                peer-valid:top-[-10px] peer-valid:text-cyan-400 peer-valid:text-sm peer-valid:bg-gray-950 peer-valid:px-2"
              >
                Password
              </label>
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm mt-1">
                  Password should be at least 6 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 text-sm mt-1">
                  Must include 1 uppercase, 1 lowercase & 1 number
                </p>
              )}
            </div>

            {/* Premium Gradient Button */}
            <button
              type="submit"
              className="w-full py-5 rounded-2xl font-bold text-lg text-black relative overflow-hidden group
                bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500
                hover:from-emerald-500 hover:via-cyan-500 hover:to-teal-600
                shadow-xl shadow-cyan-500/40
                transform hover:scale-[1.02] transition-all duration-500"
            >
              <span className="relative z-10 text-black">Sign In</span>
              <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Google Button */}
         
          <GoogleLogin/>

          {/* Register Link */}
          <p className="text-center mt-8 text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-400 font-bold hover:text-teal-300 transition"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
