import React from "react";

const MyProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          My Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Current Profile Info Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              Current Information
            </h2>

            <div className="flex flex-col items-center space-y-6">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                />
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-green-500 rounded-full border-4 border-white"></div>
              </div>

              {/* User Details */}
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-bold text-gray-800">
                  Rahim Uddin
                </h3>
                <p className="text-lg text-gray-600">rahim@gmail.com</p>
                <p className="text-sm text-gray-500">
                  Member since December 2024
                </p>
              </div>

              {/* Stats (Optional) */}
              <div className="grid grid-cols-3 gap-6 mt-8 w-full">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-gray-600">Books Sold</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">8</p>
                  <p className="text-sm text-gray-600">Books Bought</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">4.8</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Update Profile Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Update Profile
            </h2>

            <form className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Rahim Uddin"
                  placeholder="Enter your name"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-gray-50"
                />
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value="rahim@gmail.com"
                  readOnly
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Email cannot be changed
                </p>
              </div>

              {/* Profile Picture Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Current"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                  />
                  <label className="cursor-pointer">
                    <span className="px-6 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md">
                      Choose New Photo
                    </span>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg text-lg"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
