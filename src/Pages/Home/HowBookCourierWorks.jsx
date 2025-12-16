import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Truck,
  ShieldCheck,
  Star,
  Gift,
  Sparkles,
} from "lucide-react";

// ==========================
// COMPONENT 1: HowBookCourierWorks
// ==========================
export const HowBookCourierWorks = () => {
  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-slate-200 py-20 px-5 md:px-10 lg:px-20 rounded-2xl">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-slate-800 mb-6"
        >
          How BookCourier Works
        </motion.h2>

        <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-16">
          Fast, secure, and premium service — delivering your favorite books
          directly to your doorstep.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl transition-all"
          >
            <BookOpen className="w-14 h-14 text-indigo-500 mx-auto mb-5" />
            <h3 className="text-xl font-semibold mb-2">Choose Your Books</h3>
            <p className="text-slate-600">
              Browse thousands of books and pick your favorites effortlessly.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl transition-all"
          >
            <Truck className="w-14 h-14 text-teal-500 mx-auto mb-5" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-slate-600">
              Premium courier partners ensure fast and safe book delivery.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl transition-all"
          >
            <ShieldCheck className="w-14 h-14 text-emerald-500 mx-auto mb-5" />
            <h3 className="text-xl font-semibold mb-2">Secure Packaging</h3>
            <p className="text-slate-600">
              We pack your books with extra care for maximum protection.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
