import React from "react";
import { FaShippingFast, FaBookOpen, FaHeadset, FaAward } from "react-icons/fa";

const whyChooseData = [
  {
    icon: <FaShippingFast className="text-white w-8 h-8" />,
    title: "Fast & Reliable Delivery",
    description:
      "Get your favorite books delivered at lightning speed, safely packaged, right to your doorstep.",
    bg: "bg-gradient-to-r from-cyan-500 to-blue-500",
  },
  {
    icon: <FaBookOpen className="text-white w-8 h-8" />,
    title: "Vast Collection",
    description:
      "Explore thousands of books from all genres. We bring the world of literature to you.",
    bg: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    icon: <FaHeadset className="text-white w-8 h-8" />,
    title: "24/7 Customer Support",
    description:
      "Our support team is always ready to assist you with queries, orders, and recommendations.",
    bg: "bg-gradient-to-r from-green-400 to-teal-500",
  },
  {
    icon: <FaAward className="text-white w-8 h-8" />,
    title: "Premium Quality Service",
    description:
      "We pride ourselves on excellence in service, ensuring a seamless and enjoyable experience.",
    bg: "bg-gradient-to-r from-yellow-400 to-orange-500",
  },
];

const WhyChooseBookCourier = () => {
  return (
    <section className="py-20 my-10 rounded-2xl bg-amber-200">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Why Choose <span className="text-blue-600">BookCourier</span>
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Discover why thousands of book lovers trust us for their reading
          needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseData.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-3xl shadow-lg transform transition-all duration-300 hover:scale-105 ${item.bg}`}
            >
              <div className="flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-white text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBookCourier;
