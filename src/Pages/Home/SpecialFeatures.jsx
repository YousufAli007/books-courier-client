import { motion } from "framer-motion";
import { Star, Gift, Sparkles } from "lucide-react";
export const SpecialFeatures = () => {
  return (
    <div className="w-full py-20 px-5 md:px-10 lg:px-20 my-10 rounded-2xl bg-[#29B6F6]">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
        >
          Special Features
        </motion.h2>

        <p className="text-slate-700 max-w-2xl mx-auto text-lg mb-16">
          These unique features make BookCourier stand out from every other
          online bookstore.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-slate-300 hover:shadow-2xl transition-all"
          >
            <Star className="w-14 h-14 text-yellow-500 mx-auto mb-5" />
            <h3 className="text-xl font-semibold mb-2">Verified Quality</h3>
            <p className="text-slate-600">
              Every book is checked to ensure top-notch quality.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-slate-300 hover:shadow-2xl transition-all"
          >
            <Gift className="w-14 h-14 text-pink-500 mx-auto mb-5" />
            <h3 className="text-xl font-semibold mb-2">Exclusive Offers</h3>
            <p className="text-slate-600">
              Enjoy special discounts, combo packs, and limited deals.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-slate-300 hover:shadow-2xl transition-all"
          >
            <Sparkles className="w-14 h-14 text-purple-500 mx-auto mb-5" />
            <h3 className="text-xl font-semibold mb-2">Premium Experience</h3>
            <p className="text-slate-600">
              A stylish and smooth UI designed specially for book lovers.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
