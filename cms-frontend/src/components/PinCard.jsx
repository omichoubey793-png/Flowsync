import {
  Heart,
  Share2,
  Bookmark,
  Trash2,
} from "lucide-react";

function PinCard({
  id,
  image,
  title,
  description,
  tags = [],
  createdAt,
  ownerName,
  isOwner,
  onDelete,
  onPreview,
}) {

  const handleCardClick = () => {
    if (onPreview) {
      onPreview({ id, image, title, description, tags, createdAt, ownerName });
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-[28px] cursor-pointer bg-[#111] border border-white/5 hover:border-red-500/20 transition-all duration-500 shadow-lg hover:shadow-[0_10px_50px_rgba(255,0,0,0.15)]"
    >
      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full object-cover transition duration-700 group-hover:scale-110"
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
        
        {/* TOP ACTIONS */}
        <div className="absolute top-4 right-4 flex gap-2">
          {isOwner && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onDelete) onDelete(id);
              }}
              className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-red-500 hover:text-white hover:bg-red-600 transition"
              title="Delete Pin"
            >
              <Trash2 size={18} />
            </button>
          )}

          <button
            onClick={(e) => e.stopPropagation()}
            className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-red-500 transition"
          >
            <Heart size={18} />
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-red-500 transition"
          >
            <Share2 size={18} />
          </button>
        </div>

        {/* BOTTOM CONTENT */}
        <div className="absolute bottom-0 left-0 w-full p-5 text-white">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-lg font-bold truncate">
                  {title}
                </h3>
                {description && (
                  <p className="mt-0.5 text-sm text-gray-300 line-clamp-2">
                    {description}
                  </p>
                )}
              </div>

              {/* SAVE */}
              <button
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all flex-shrink-0"
              >
                <Bookmark size={16} />
              </button>
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] bg-red-500/10 text-red-300 px-2 py-0.5 rounded-full border border-red-500/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Upload Date & Owner */}
            <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/5 text-[9px] text-gray-400">
              <span>{new Date(createdAt).toLocaleDateString()}</span>
              <span className="truncate max-w-[120px]">by {ownerName || "Anonymous"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PinCard;