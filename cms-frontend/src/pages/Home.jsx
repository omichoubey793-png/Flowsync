import { useState, useEffect } from "react";
import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
  const [previewPin, setPreviewPin] = useState(null);
  const [deleteConfirmPin, setDeleteConfirmPin] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");

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
        createdAt: img.createdAt,
        tags: img.tags || [],
        ownerId: img.ownerId
      }));
      setUploadedPins(formattedImages);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/images/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDeleteConfirmPin(null);
      fetchImages();
    } catch (err) {
      console.error("Error deleting image:", err);
      alert(err.response?.data?.msg || "Failed to delete image.");
    }
  };

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
                    id={pin.id}
                    image={pin.image}
                    title={pin.title}
                    description={pin.description}
                    tags={pin.tags}
                    createdAt={pin.createdAt}
                    ownerName={pin.ownerName}
                    isOwner={pin.ownerId === loggedInUser._id || pin.ownerId === loggedInUser.id}
                    onDelete={(id) => setDeleteConfirmPin(id)}
                    onPreview={(p) => setPreviewPin(p)}
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

      {/* FULL-SCREEN IMAGE PREVIEW MODAL */}
      <AnimatePresence>
        {previewPin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewPin(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl flex flex-col md:flex-row z-10 shadow-[0_20px_80px_rgba(255,0,0,0.2)]"
            >
              {/* Left Side: Image */}
              <div className="flex-1 bg-black/40 flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-white/10 max-h-[50vh] md:max-h-[90vh] overflow-hidden">
                <img
                  src={previewPin.image}
                  alt={previewPin.title}
                  className="max-w-full max-h-[45vh] md:max-h-[80vh] object-contain rounded-2xl"
                />
              </div>

              {/* Right Side: Info */}
              <div className="w-full md:w-[350px] p-6 md:p-8 flex flex-col justify-between text-white overflow-y-auto max-h-[40vh] md:max-h-[90vh]">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/30 uppercase tracking-widest font-black">
                      Preview
                    </span>
                    <button
                      onClick={() => setPreviewPin(null)}
                      className="rounded-full bg-white/5 p-2 text-gray-400 border border-white/10 hover:text-white hover:bg-white/10 transition"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <h2 className="text-3xl font-black mb-2">{previewPin.title}</h2>
                  {previewPin.description && (
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                      {previewPin.description}
                    </p>
                  )}

                  {previewPin.tags && previewPin.tags.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs text-gray-500 font-bold uppercase mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {previewPin.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs bg-white/5 border border-white/10 text-white px-3 py-1 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 pt-6 mt-6 flex items-center justify-between text-xs text-gray-400">
                  <div>
                    <p className="font-bold text-white">Uploaded by</p>
                    <p className="truncate max-w-[120px]">{previewPin.ownerName || "Anonymous"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">Upload Date</p>
                    <p>{new Date(previewPin.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteConfirmPin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmPin(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-[#111] p-6 shadow-2xl z-10 text-white"
            >
              <h3 className="text-xl font-bold mb-2">Delete Pin</h3>
              <p className="text-gray-400 text-sm mb-6">
                Are you sure you want to permanently delete this pin? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={() => setDeleteConfirmPin(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmPin)}
                  className="px-5 py-2.5 rounded-xl bg-red-600 text-sm font-semibold hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Home;