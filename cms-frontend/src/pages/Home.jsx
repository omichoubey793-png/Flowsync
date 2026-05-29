import { useState, useEffect } from "react";
import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import PinCard from "../components/PinCard";
import UploadModal from "../components/UploadModal";

import Masonry from "react-masonry-css";

import pins from "../data/pins";

function Home({ setIsLoggedIn }) {

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [showFeed, setShowFeed] = useState(false);
  const [uploadedPins, setUploadedPins] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchImages = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.get(`${API_URL}/api/images`);
      
      const formattedImages = response.data.map(img => ({
        id: img._id,
        image: img.imageUrl,
        title: img.title,
        description: img.description || "",
        category: "All",
        likesCount: img.likesCount || 0,
        ownerName: img.ownerName || "Anonymous",
        createdAt: img.createdAt
      }));
      setUploadedPins(formattedImages);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const breakpointColumnsObj = {
    default: 5,
    1400: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const handleExplore = () => {
    setShowFeed(true);
  };

  const allPins = [...uploadedPins, ...pins];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black transition-colors duration-500">

      {/* Glow */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-red-300/20 dark:bg-red-600/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-pink-300/20 dark:bg-red-500/20 blur-[120px] rounded-full"></div>

      {/* Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIsLoggedIn={setIsLoggedIn}
        onCreateClick={() => setShowUploadModal(true)}
      />

      {/* HERO */}
      <AnimatePresence mode="wait">

        {!showFeed && (

          <motion.section
            key="hero"

            initial={{
              opacity: 0,
              y: 40,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
            }}

            transition={{
              duration: 0.8,
            }}

            className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6"
          >

            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none text-black dark:text-white">

              Discover.
              <br />
              Create.
              <br />
              Inspire.

            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">

              Explore aesthetic inspirations, creative projects,
              and modern digital experiences with FlowSync.

            </p>

            {/* BUTTON */}
            <div className="mt-10">

              <button
                onClick={handleExplore}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-[0_10px_40px_rgba(255,0,0,0.35)] hover:scale-105 transition-all duration-300"
              >
                Explore Feed
              </button>

            </div>

          </motion.section>
        )}

      </AnimatePresence>

      {/* FEED */}
      {showFeed && (

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.8,
          }}

          className="relative z-10 min-h-screen pt-28"
        >


          {/* Feed */}
          <div className="px-6 md:px-10 pb-20">

            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex gap-4"
              columnClassName="space-y-4"
            >

              {allPins
                .filter((pin) => {

                  const matchesSearch =
                    pin.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());

                  const matchesCategory =
                    selectedCategory === "All" ||
                    pin.category === selectedCategory;

                  return (
                    matchesSearch &&
                    matchesCategory
                  );
                })

                .map((pin) => (
                  <PinCard
  key={pin.id}
  image={pin.image}
  title={pin.title}
  description={pin.description}
/>
                ))}

            </Masonry>

          </div>

        </motion.div>
      )}

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={fetchImages}
      />

    </div>
  );
}

export default Home;