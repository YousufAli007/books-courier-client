import React from "react";
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-200 z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Animated circle loader */}
        <div className="relative w-20 h-20">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-full border-4 border-primary/30"
              animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
              transition={{
                duration: 1.5,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <motion.p
          className="text-sm font-medium text-base-content/70"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingPage;
