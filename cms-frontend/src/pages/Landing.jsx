import React from "react";
import { motion } from "framer-motion";

const Landing = ({ setShowFeed }) => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

      {/* Red Glow */}
      <div className="absolute w-[500px] h-[500px] bg-red-600/20 blur-[150px] rounded-full"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >

        <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
          FlowSync
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Discover stunning ideas, inspirations, gaming setups,
          anime worlds, futuristic aesthetics and more.
        </p>

        <button
          onClick={() => setShowFeed(true)}
          className="px-8 py-4 rounded-full bg-red-600 hover:bg-red-500 transition text-white font-bold text-lg shadow-lg shadow-red-600/30"
        >
          Explore Feed
        </button>

      </motion.div>
    </div>
  );
};

export default Landing;