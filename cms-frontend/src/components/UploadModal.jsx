import { useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, FileText, Tag, AlertCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function UploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError("");
    } else {
      setError("Please select a valid image file (PNG, JPG, GIF, WEBP).");
    }
  };

  const onFileSelectChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!imageFile) {
      setError("Please select or drag an image to upload.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("tags", tags.trim());
    formData.append("image", imageFile);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/api/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear form
      setTitle("");
      setDescription("");
      setTags("");
      setImageFile(null);
      setImagePreview("");
      
      onUploadSuccess();
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      const errMsg = err.response?.data?.msg || err.message || "Failed to upload image.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 md:p-8 shadow-[0_20px_80px_rgba(255,0,0,0.15)] z-10 text-white max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <h2 className="text-3xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Create New Pin
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/5 p-2 text-gray-400 border border-white/10 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold"
            >
              <AlertCircle size={20} />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Image Upload Area */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-400">Upload Image</label>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 min-h-[250px] cursor-pointer transition-all duration-300 ${
                    dragActive
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/10 bg-white/5 hover:border-red-500/30 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onFileSelectChange}
                    className="hidden"
                    accept="image/*"
                  />

                  {imagePreview ? (
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageFile(null);
                          setImagePreview("");
                        }}
                        className="absolute top-4 right-4 rounded-full bg-black/80 p-2 text-white border border-white/10 hover:bg-red-600 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="rounded-full bg-red-500/10 border border-red-500/20 p-4 text-red-500">
                        <UploadCloud size={32} className="animate-bounce" />
                      </div>
                      <div>
                        <p className="font-bold text-white">Drag and drop image here</p>
                        <p className="text-xs text-gray-500 mt-1">or click to browse from device</p>
                      </div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full border border-white/5 mt-2">
                        JPG, PNG, WEBP, GIF (MAX 10MB)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Metadata Fields */}
              <div className="flex flex-col gap-5">
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-400">Title</label>
                  <div className="relative">
                    <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Give your pin a title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full rounded-2xl bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white outline-none focus:border-red-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-400">Description</label>
                  <textarea
                    placeholder="Describe what people can see in your pin..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-red-500/50 transition-all resize-none"
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-400">Tags</label>
                  <div className="relative">
                    <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="gaming, design, setup (comma separated)"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full rounded-2xl bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white outline-none focus:border-red-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 border-t border-white/10 pt-6 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 font-semibold text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-[0_10px_40px_rgba(255,0,0,0.35)] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Uploading to S3...</span>
                  </>
                ) : (
                  <span>Publish Pin</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default UploadModal;
