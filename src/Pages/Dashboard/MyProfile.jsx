import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  // রিয়েল-টাইম প্রিভিউয়ের জন্য photoURL watch করা
  const watchedPhotoURL = watch("photoURL");

  const onSubmit = async (data) => {
    const { name, photoURL } = data;

    const trimmedName = name.trim();
    const trimmedPhotoURL = photoURL.trim();

    // যদি কোনো চেঞ্জ না থাকে তাহলে কিছু করব না
    if (
      trimmedName === (user?.displayName || "") &&
      trimmedPhotoURL === (user?.photoURL || "")
    ) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);

    try {
      await updateUser({
        displayName: trimmedName,
        photoURL: trimmedPhotoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error.message || "Could not update profile. Try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          My Profile
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* View Mode */}
          {!isEditing ? (
            <div className="flex flex-col items-center text-center space-y-6">
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
              />

              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user?.displayName || "User Name"}
                </h2>
                <p className="text-gray-600 mt-1">
                  {user?.email || "No email"}
                </p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            /* Edit Mode */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Photo Preview - রিয়েল-টাইম আপডেট হবে */}
              <div className="flex flex-col items-center">
                <img
                  src={
                    watchedPhotoURL ||
                    user?.photoURL ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow mb-6"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your full name"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo URL
                </label>
                <input
                  type="url"
                  {...register("photoURL", {
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message:
                        "Enter a valid URL starting with http:// or https://",
                    },
                  })}
                  placeholder="https://example.com/your-photo.jpg"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                {errors.photoURL && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.photoURL.message}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Paste a direct image link (e.g., from ImgBB, Imgur, etc.)
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-5 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-md ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                  className="flex-1 py-3 bg-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
